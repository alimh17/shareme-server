"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conversations_1 = __importDefault(require("../../models/Conversations/Conversations"));
const conversationController = async (req, res) => {
    try {
        const checkSender = await Conversations_1.default.find({
            members: [req.body.senderId, req.body.receiverId],
        });
        const checkReceiver = await Conversations_1.default.find({
            members: [req.body.receiverId, req.body.senderId],
        });
        if (checkSender.length > 0 || checkReceiver.length > 0) {
            return res.status(409).json({ message: "conversation is exist" });
        }
        const newConversation = new Conversations_1.default({
            members: [req.body.senderId, req.body.receiverId],
        });
        await newConversation.save();
        return res
            .status(200)
            .json({ message: "success", conversation: newConversation });
    }
    catch (err) {
        return res.status(500).json({ message: "Failed , please try again" });
    }
};
exports.default = conversationController;
