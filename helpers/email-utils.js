const nodemailer = require("nodemailer");

export function createTransportEmail() {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      secure: true,
      user: process.env.nodemailer_username,
      pass: process.env.nodemailer_password,
    },
  });

  return transporter;
}

export async function sendEmail(transporter, sendTo, content) {
  const result = await transporter.sendMail({
      from: process.env.nodemailer_username,
      to: sendTo,
      subject: "Message",
      html: content,
    });

    return result;
}
