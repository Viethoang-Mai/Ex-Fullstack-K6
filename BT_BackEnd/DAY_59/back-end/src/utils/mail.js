const nodemailer = require("nodemailer");
require("dotenv").config();
const { NODEMAILER_USER, NODEMAILER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASSWORD,
    },
});

module.exports = async (to, subject, content) => {
    const info = await transporter.sendMail({
        from: '"Fullstack K6 👻"<viethoangmai21199@gmail.com>',
        to,
        subject,
        html: content,
    });
    return info;
};

// Cách lấy smtp của gmail
// Host: smtp.gmail.com
// Port: 587,465
// Username: SMTP username (diachiemail dung lam smtp server, tránh nhấm lẫn với địa chỉ gửi đi)
// Password: SMTP password (mật khẩu ứng dụng)
