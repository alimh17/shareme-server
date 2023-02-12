"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_smtp_transport_1 = __importDefault(require("nodemailer-smtp-transport"));
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const sendMail = (to) => {
    const transportDetails = (0, nodemailer_smtp_transport_1.default)({
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
    const transporter = nodemailer_1.default.createTransport(transportDetails);
    const option = {
        from: "sharme@alimh.ir",
        to,
        subject: "Test Email Subject",
        html: "<h1>Example HTML Message Body</h1>",
    };
    transporter.sendMail(option, (err, info) => {
        if (err)
            return console.log(err);
        console.log(info);
    });
};
exports.default = sendMail;
