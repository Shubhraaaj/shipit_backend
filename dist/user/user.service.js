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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const nodemailer = require('nodemailer');
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async loginForBookingOrder(loginUserInput) {
        let otp = Math.floor(100000 + Math.random() * 900000);
        let otpObj = this.userRepository.create({ email: loginUserInput.email, otp });
        let html = `<b>Dear ${loginUserInput.email}</b><br/><p>The OTP for Login is ${otp}</p><br/> <br/>
                 <b>Regards,</b<br/><i>Shipit Support Team</i>`;
        let mailSentStatus = await sendEmail(loginUserInput.email, "[Shipit] Login Otp", html);
        if (!mailSentStatus)
            throw new common_1.InternalServerErrorException("Something Went Wrong while sending mail!");
        return this.userRepository.save(otpObj);
    }
    async verifyUserLogin(email, otp) {
        let userObj = await this.userRepository.findOne({ email, otp });
        if (!userObj)
            throw new common_1.BadRequestException("Invalid email ot otp !");
        return userObj;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
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
//# sourceMappingURL=user.service.js.map