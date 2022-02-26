import { BadRequestException, Injectable, InternalServerErrorException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserInput } from './dto/user-login.input';
import { User } from './entities/user.entity';
const nodemailer = require('nodemailer')

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async loginForBookingOrder(loginUserInput: LoginUserInput): Promise<User> {
    let otp = Math.floor(100000 + Math.random() * 900000)
    let otpObj = this.userRepository.create({ email: loginUserInput.email, otp })
    let html = `<b>Dear ${loginUserInput.email}</b><br/><p>The OTP for Login is ${otp}</p><br/> <br/>
                 <b>Regards,</b<br/><i>Shipit Support Team</i>`
    let mailSentStatus = await sendEmail(loginUserInput.email, "[Shipit] Login Otp", html)
    if (!mailSentStatus) throw new InternalServerErrorException("Something Went Wrong while sending mail!")
    return this.userRepository.save(otpObj)
  }

  async verifyUserLogin(email: string, otp: number): Promise<User> {
    let userObj = await this.userRepository.findOne({ email, otp })
    if (!userObj) throw new BadRequestException("Invalid email ot otp !")
    return userObj
  }

}



const sendEmail = async (to, subject, html) => {
  console.log(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.SECURE, process.env.EMAIL_USER, process.env.EMAIL_PASS)
  try {
    let smtpTrans = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'devsatish1994@gmail.com',
        pass: 'password'
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
