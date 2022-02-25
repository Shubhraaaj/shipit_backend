
// const nodemailer = require('nodemailer')

// exports.sendEmail = async (to, subject, html) => {
// 	try {
// 		let smtpTrans = nodemailer.createTransport({
// 			host: config.EMAIL_HOST,
// 			port: config.EMAIL_PORT,
// 			secure: config.SECURE,
// 			auth: {
// 				user: config.EMAIL_USER,
// 				pass: config.EMAIL_PASS
// 			}
// 		})

// 		let mailOpts = {
// 			from: config.EMAIL_USER,
// 			to,
// 			subject,
// 			html,

// 		}

// 		let mailObj = await smtpTrans.sendMail(mailOpts)
// 		console.log(mailObj);
// 		return true

// 	} catch (error) {
// 		console.log(error);
// 		return false
// 	}
// }

