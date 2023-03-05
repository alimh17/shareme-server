import nodemailer from "nodemailer";

const sendMail = (to: string, code: string) => {
  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const detaile = {
    from: "amohamadi17@gmail.com",
    to,
    subject: "Register virify code",
    text: `Your register code has : ${code}`,
  };

  mailTransporter.sendMail(detaile, (err) => {
    console.log(err);
  });
};

export default sendMail;
