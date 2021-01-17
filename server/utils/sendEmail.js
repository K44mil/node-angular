const nodemailer = require('nodemailer');

const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
        // service: 'gmail',
        // auth: {
        //     user: 'kdinztest@gmail.com',
        //     pass: '4Bf9b7.ed1kdinz'
        // }
    });

    const message = {
        // from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        from: `kdinz.xyz <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    };

    await transporter.sendMail(message);
};

module.exports = sendEmail;