"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("../../models/Message"));
const getMessage = async (req, res) => {
    try {
        const messages = await Message_1.default.find({
            conversationId: req.params.conversationId,
        });
        return res.status(200).json({ message: "success", messages });
    }
    catch (err) {
        return res.status(500).json({ message: "Failed , please try again" });
    }
};
exports.default = getMessage;
