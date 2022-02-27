"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const short = require("short-uuid");
const vendor_entity_1 = require("../vendors/entities/vendor.entity");
const nodemailer = require('nodemailer');
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
};
Object.freeze(live_status);
const orderStatus = ["ordered", "rejected", "delivered", "intransit"];
const servingCities = ["delhi", "chandigarh", "jaipur", "manali", "mumbai", "hydrabad", "chennai", "kolkata", "lucknow", "indore"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let OrderService = class OrderService {
    constructor(orderRepository, vendorRepository) {
        this.orderRepository = orderRepository;
        this.vendorRepository = vendorRepository;
    }
    findAll(status, vendor_id) {
        return this.orderRepository.find({ where: { order_status: status, vendor_id: vendor_id } });
    }
    async orderMatrix(vendor_id, filterYear) {
        let orders = await this.orderRepository.find({ where: { vendor_id } });
        let numberOfOrdersByStatus = {};
        let topSourceCities = {};
        let topDestCities = {};
        let monthwiseOrders = {};
        let orderSuccessPerMonth = {};
        let monthWiseMatrix = {};
        for (let order of orders) {
            numberOfOrdersByStatus[order.order_status.toLocaleLowerCase()] = numberOfOrdersByStatus[order.order_status.toLocaleLowerCase()] + 1 || 1;
            topSourceCities[order.source_city.toLocaleLowerCase()] = topSourceCities[order.source_city.toLocaleLowerCase()] + 1 || 1;
            topDestCities[order.destination_city.toLocaleLowerCase()] = topDestCities[order.destination_city.toLocaleLowerCase()] + 1 || 1;
            if (new Date(order.created_at).getFullYear() === filterYear) {
                monthwiseOrders[months[new Date(order.created_at).getMonth()]] = monthwiseOrders[months[new Date(order.created_at).getMonth()]] + 1 || 1;
                if (order.order_status.toLocaleLowerCase() === "delivered")
                    orderSuccessPerMonth[months[new Date(order.created_at).getMonth()]] = orderSuccessPerMonth[months[new Date(order.created_at).getMonth()]] + 1 || 1;
            }
        }
        for (let status of orderStatus) {
            if (!numberOfOrdersByStatus.hasOwnProperty(status))
                numberOfOrdersByStatus[status] = 0;
        }
        for (let city of servingCities) {
            if (!topSourceCities.hasOwnProperty(city))
                topSourceCities[city] = 0;
            if (!topDestCities.hasOwnProperty(city))
                topDestCities[city] = 0;
        }
        for (let month of months) {
            if (!monthwiseOrders.hasOwnProperty(month))
                monthwiseOrders[month] = 0;
            if (!orderSuccessPerMonth.hasOwnProperty(month))
                orderSuccessPerMonth[month] = 0;
        }
        for (let month of months) {
            monthWiseMatrix[month] = { totalOrder: monthwiseOrders[month], successOrder: orderSuccessPerMonth[month] };
        }
        return { numberOfOrdersByStatus: JSON.stringify(numberOfOrdersByStatus), topSourceCities: JSON.stringify(topSourceCities), topDestCities: JSON.stringify(topDestCities), monthwiseOrders: JSON.stringify(monthWiseMatrix) };
    }
    async create(createOrderInput) {
        createOrderInput["order_no"] = short.generate().slice(0, 10).toUpperCase();
        createOrderInput["tracking_id"] = Math.floor(100000000 + Math.random() * 999999999);
        createOrderInput["order_status"] = "Ordered";
        createOrderInput["live_status"] = JSON.stringify(live_status);
        let orders = this.orderRepository.create(createOrderInput);
        let result = await this.orderRepository.save(orders);
        let receiver = JSON.parse(result.receiver);
        let sender = JSON.parse(result.sender);
        let subject = "[Shipit] Order Confirmed!";
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
    Shipit - We ship happiness</b>`;
        let mailSentStatus = await sendEmail(orders.created_by, subject, html);
        if (!mailSentStatus)
            throw new common_1.InternalServerErrorException("Something Went Wrong while sending mail!");
        return result;
    }
    async findOne(id) {
        let order = await this.orderRepository.findOne({ order_no: id });
        let vendor = await this.vendorRepository.findOne({ vendor_id: order.vendor_id });
        if (vendor)
            order.vendor_id = vendor.name;
        if (!order)
            throw new common_1.BadRequestException("The Order Doesn't Exist!");
        return order;
    }
    async update(id, updateOrderInput) {
        let order = await this.orderRepository.findOne({ order_no: id });
        if (!order)
            throw new common_1.BadRequestException("The Order Doesn't Exist!");
        Object.assign(order, updateOrderInput);
        console.log(order);
        let result = await this.orderRepository.update({ order_no: id }, order);
        console.log(result);
        return order;
    }
    async remove(id) {
        let order = await this.orderRepository.findOne({ order_no: id });
        if (!order)
            throw new common_1.BadRequestException("The Order Doesn't Exist!");
        return this.orderRepository.delete({ order_no: id });
    }
    async trackorderByTrackId(id) {
        let order = await this.orderRepository.findOne({ tracking_id: id });
        if (!order)
            throw new common_1.BadRequestException("The Order Doesn't Exist!");
        let vendorInfo = await this.vendorRepository.findOne({ vendor_id: order.vendor_id });
        order.vendor_id = vendorInfo.name;
        return order;
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(vendor_entity_1.Vendor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
exports.OrderService = OrderService;
const sendEmail = async (to, subject, html) => {
    console.log(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.SECURE, process.env.EMAIL_USER, process.env.EMAIL_PASS);
    try {
        let smtpTrans = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'devsatish1994@gmail.com',
                pass: 'DevSatish@1994'
            }
        });
        let mailOpts = {
            from: '"SHIPIT" <devsatish1994@gmail.com>',
            to,
            subject,
            html,
        };
        let mailObj = await smtpTrans.sendMail(mailOpts);
        console.log(mailObj);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
//# sourceMappingURL=order.service.js.map