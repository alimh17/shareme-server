"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("../../models/Message"));
const newMessage = async (req, res) => {
    try {
        const newMessage = new Message_1.default(req.body);
        await newMessage.save();
        return res.status(200).json({ message: "success", newMessage });
    }
    catch (err) {
        return res.status(500).json({ message: "Failed , please try again" });
    }
};
exports.default = newMessage;
