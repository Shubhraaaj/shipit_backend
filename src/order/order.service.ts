import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import * as short from 'short-uuid'
import { Vendor } from 'src/vendors/entities/vendor.entity';
const nodemailer = require('nodemailer')

const live_status = {
  orderPlaces: {
    description: "Order Placed",
    dateTime: new Date()
  },
  vendorConfirmation: {
    description: "",
    dateTime: ''
  },
  orderPickedUp: {
    description: "",
    dateTime: ''
  },
  inTransit: {
    description: "",
    dateTime: ''
  },
  outForDelievery: {
    description: "",
    dateTime: ''
  },
  packageDelivered: {
    description: "Expected Delivery Date",
    dateTime: ''
  }
}
Object.freeze(live_status)

const orderStatus = ["ordered", "rejected", "delivered", "intransit"]
const servingCities = ["delhi", "chandigarh", "jaipur", "manali", "mumbai", "hydrabad", "chennai", "kolkata", "lucknow", "indore"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

@Injectable()
export class OrderService {

  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Vendor) private vendorRepository: Repository<Vendor>) { }

  findAll(status: string, vendor_id: string) {
    return this.orderRepository.find({ where: { order_status: status, vendor_id: vendor_id } })
  }

  async orderMatrix(vendor_id: string, filterYear: number) {
    let orders = await this.orderRepository.find({ where: { vendor_id } })
    let numberOfOrdersByStatus = {}
    let topSourceCities = {}
    let topDestCities = {}
    let monthwiseOrders = {}
    let orderSuccessPerMonth = {}
    let monthWiseMatrix = {}
    for (let order of orders) {

      numberOfOrdersByStatus[order.order_status.toLocaleLowerCase()] = numberOfOrdersByStatus[order.order_status.toLocaleLowerCase()] + 1 || 1
      topSourceCities[order.source_city.toLocaleLowerCase()] = topSourceCities[order.source_city.toLocaleLowerCase()] + 1 || 1
      topDestCities[order.destination_city.toLocaleLowerCase()] = topDestCities[order.destination_city.toLocaleLowerCase()] + 1 || 1

      if (new Date(order.created_at).getFullYear() === filterYear) {
        monthwiseOrders[months[new Date(order.created_at).getMonth()]] = monthwiseOrders[months[new Date(order.created_at).getMonth()]] + 1 || 1
        if (order.order_status.toLocaleLowerCase() === "delivered") orderSuccessPerMonth[months[new Date(order.created_at).getMonth()]] = orderSuccessPerMonth[months[new Date(order.created_at).getMonth()]] + 1 || 1
      }

    }

    for (let status of orderStatus) {
      if (!numberOfOrdersByStatus.hasOwnProperty(status)) numberOfOrdersByStatus[status] = 0
    }

    for (let city of servingCities) {
      if (!topSourceCities.hasOwnProperty(city)) topSourceCities[city] = 0
      if (!topDestCities.hasOwnProperty(city)) topDestCities[city] = 0
    }

    for (let month of months) {
      if (!monthwiseOrders.hasOwnProperty(month)) monthwiseOrders[month] = 0
      if (!orderSuccessPerMonth.hasOwnProperty(month)) orderSuccessPerMonth[month] = 0
    }

    for (let month of months) {
      monthWiseMatrix[month] = { totalOrder: monthwiseOrders[month], successOrder: orderSuccessPerMonth[month] }
    }


    return { numberOfOrdersByStatus: JSON.stringify(numberOfOrdersByStatus), topSourceCities: JSON.stringify(topSourceCities), topDestCities: JSON.stringify(topDestCities), monthwiseOrders: JSON.stringify(monthWiseMatrix) }
  }

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    createOrderInput["order_no"] = short.generate().slice(0, 10).toUpperCase()
    createOrderInput["tracking_id"] = Math.floor(100000000 + Math.random() * 999999999)
    createOrderInput["order_status"] = "Ordered"
    createOrderInput["live_status"] = JSON.stringify(live_status)

    let orders = this.orderRepository.create(createOrderInput)
    let result = await this.orderRepository.save(orders)

    let receiver = JSON.parse(result.receiver)
    let sender = JSON.parse(result.sender)
    let subject = "[Shipit] Order Confirmed!"
    let html = `<p>Dear <b>${result.created_by}</b>,</p>
    <p>Thank you for placing the order (Order No. - <b> ${result.order_no} </b>).</p> 
   <p>Here is the <b>Tracking Id: ${result.tracking_id} </b> for tracking the order</p>
   <p>Please find the details of the order in this email.</p>

    <p>Your order will be picked up by <b>${new Date(result.pickup_date_time).toLocaleString()}</b>.</p>
    <p>Sender Details :- <br> 
     Name: <b>${sender.name}</b>,<br> 
     Address: <b>${sender.address}</b>, <br>
     State: <b>${sender.state}</b>,<br> 
     Pincode: <b>${sender.pincode}</b></p>

     <p>Receiver Details :- <br>
     Name: <b>${receiver.name}</b>,<br> 
     Address: <b>${receiver.address}</b>, <br>
     State: <b>${receiver.state}</b>,<br> 
     Pincode: <b>${receiver.pincode}</b></p>

    <b>Thank you.<br/>
    Shipit - We ship happiness</b>`

    let mailSentStatus = await sendEmail(orders.created_by, subject, html)
    if (!mailSentStatus) throw new InternalServerErrorException("Something Went Wrong while sending mail!")
    return result
  }

  async findOne(id: string) {
    let order = await this.orderRepository.findOne({ order_no: id })
    let vendor = await this.vendorRepository.findOne({ vendor_id: order.vendor_id })
    if (vendor) order.vendor_id = vendor.name
    if (!order) throw new BadRequestException("The Order Doesn't Exist!")
    return order
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    let order = await this.orderRepository.findOne({ order_no: id })
    if (!order) throw new BadRequestException("The Order Doesn't Exist!")
    Object.assign(order, updateOrderInput)
    console.log(order)
    let result = await this.orderRepository.update({ order_no: id }, order)
    console.log(result)
    return order
  }

  async remove(id: string) {
    let order = await this.orderRepository.findOne({ order_no: id })
    if (!order) throw new BadRequestException("The Order Doesn't Exist!")
    return this.orderRepository.delete({ order_no: id })
  }

  async trackorderByTrackId(id: string) {
    let order = await this.orderRepository.findOne({ tracking_id: id })
    if (!order) throw new BadRequestException("The Order Doesn't Exist!")
    let vendorInfo = await this.vendorRepository.findOne({ vendor_id: order.vendor_id })
    order.vendor_id = vendorInfo.name
    return order
  }
}


const sendEmail = async (to: string, subject: string, html: string) => {
  console.log(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.SECURE, process.env.EMAIL_USER, process.env.EMAIL_PASS)
  try {
    let smtpTrans = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'devsatish1994@gmail.com',
        pass: ''
      }
    })

    let mailOpts = {
      from: '"SHIPIT" <devsatish1994@gmail.com>',
      to,
      subject,
      html,

    }

    let mailObj = await smtpTrans.sendMail(mailOpts)
    console.log(mailObj);
    return true

  } catch (error) {
    console.log(error);
    return false
  }
}
