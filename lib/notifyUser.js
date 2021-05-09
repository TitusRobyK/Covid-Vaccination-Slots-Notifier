const notifier = require('node-notifier');
const nodemailer = require("nodemailer");

exports.send = function (customMessage) {
    notifier.notify(
        {
            title: 'Vaccination Slot Alert',
            message: 'Vaccination Slots Available ! \n'+customMessage,
            icon: './assets/vaccine-icon.png',
            sound: 'Submarine', 
            wait: true 
        });
};

exports.sendEmail = async function (emailConfig,payload) {
    let transporter = nodemailer.createTransport({
        service: emailConfig.mailservice,
        host: emailConfig.smtpHost,
        auth: {
            user: emailConfig.authUserName,
            pass: emailConfig.authPassword
        }
    });

    var mailOptions = {
        from: emailConfig.authUserName,
        to: emailConfig.recieverMailId,
        subject: "Vaccine Slots Available",
        text: payload
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('\nMessage sent successfully as %s', info.messageId);
    } catch (error) {
        console.error(error);
    }
};