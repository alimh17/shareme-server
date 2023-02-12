import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

const sendMail = (to: string) => {
  const transportDetails = smtpTransport({
    host: MAIL_HOST,
    port: 587,
    secure: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const transporter = nodemailer.createTransport(transportDetails);

  const option = {
    from: "sharme@alimh.ir",
    to,
    subject: "Test Email Subject",
    html: "<h1>Example HTML Message Body</h1>",
  };

  transporter.sendMail(option, (err, info) => {
    if (err) return console.log(err);
    console.log(info);
  });
};

export default sendMail;
