const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const _const = require('../const');
const { secret } = _const
module.exports.generateToken = (data) => {
    try {
        const token = jwt.sign({
            ...data
        }, secret);
        return token
    } catch (error) {
        console.log("🚀 ~ file: index.js:5 ~ error", error)
    }
}
module.exports.verifyToken = (token) => {
    try {
        const { secret } = _const
        const isVerified = jwt.verify(token, secret)
        return isVerified
    } catch (error) {
        console.log("🚀 ~ file: index.js:5 ~ error", error)
    }
}

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail = async ({to,message,subject}) => {
    try {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Expense Tracker" <foo@example.com>', // sender address
            to: `${to}`, // list of receivers
            subject: `${subject}`, // Subject line
            text: `${message}`, // plain text body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return nodemailer.getTestMessageUrl(info)

    } catch (error) {
        console.log("🚀 ~ file: index.js:61 ~ module.exports.sendMail= ~ error", error)
    }
}
