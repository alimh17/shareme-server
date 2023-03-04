"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = (to, code) => {
    const mailTransporter = nodemailer_1.default.createTransport({
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
exports.default = sendMail;
