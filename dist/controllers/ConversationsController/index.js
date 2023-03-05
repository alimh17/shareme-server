"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conversations_1 = __importDefault(require("../../models/Conversations/Conversations"));
const conversationController = async (req, res) => {
    try {
        const newConversation = new Conversations_1.default({
            members: [req.body.senderId, req.body.receiverId],
        });
        await newConversation.save();
        return res.status(200).json({ message: "success" });
    }
    catch (err) {
        return res.status(500).json({ message: "Failed , please try again" });
    }
};
exports.default = conversationController;
