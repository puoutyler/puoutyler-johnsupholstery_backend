const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const johns = require('../models/johnsupholstery.js')

const auth = {
    auth: {
        api_key: process.env.API_KEY, 
        domain: process.env.DOMAIN 
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, fullName, phoneNumber, message, cb) => {
    const mailOptions = {
        from: email,
        to: 'puoutyler@gmail.com',
        subject: fullName, phoneNumber,
        text: message
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err)
        }
            console.log('Email sent')
    });
}

module.exports = sendMail;