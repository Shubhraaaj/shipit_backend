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



@Injectable()
export class OrderService {

  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Vendor) private vendorRepository: Repository<Vendor>) { }

  findAll(status: string, vendor_id: string) {

    return this.orderRepository.find({ where: { order_status: status, vendor_id: vendor_id } })
  }

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    createOrderInput["order_no"] = short.generate().slice(0, 10).toUpperCase()
    createOrderInput["tracking_id"] = Math.floor(100000000 + Math.random() * 999999999)
    createOrderInput["order_status"] = "Ordered"
    createOrderInput["live_status"] = JSON.stringify(live_status)
    console.log("createOrderInput", createOrderInput)
    let orders = this.orderRepository.create(createOrderInput)
    let result = await this.orderRepository.save(orders)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>result", result)
    let vendor = await this.vendorRepository.findOne({ vendor_id: orders.vendor_id })

    //     let receiver = JSON.parse(result.receiver)
    //     let sender = JSON.parse(result.sender)
    //     let subject = "[Shipit] Order Confirmed!"
    //     let html = `<p>Dear ${result.created_by}</p>,
    // <p>Thank you for placing the order (Order No. - ${result.order_no}). Please find the details of the order in this email.</p>

    // <p>Your order will be picked up by ${result.pickup_date_time}.</p>
    // <p>Sender Details - ${sender.name}, ${sender.address}, ${sender.state}, ${sender.pincode}</p>
    // <p>Receiver Details - ${receiver.name}, ${receiver.address}, ${receiver.state}, ${receiver.pincode}</p>
    // <p>Tracking ID - ${orders.tracking_id}</p>
    // <p>Vendor - ${vendor.name}</p>

    // <b>Thank you.<br/>
    // Shipit - We ship happiness</b>`

    //     let mailSentStatus = await sendEmail(orders.created_by, subject, html)
    //     if (!mailSentStatus) throw new InternalServerErrorException("Something Went Wrong while sending mail!")
    return result
  }

  async findOne(id: string) {
    let order = await this.orderRepository.findOne({ order_no: id })
    console.log("order", order)
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
        pass: 'DevSatish@1994'
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
