"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Conversations_1 = __importDefault(require("../../models/Conversations/Conversations"));
const Message_1 = __importDefault(require("../../models/Message"));
const removeConversation = async (req, res) => {
    try {
        const conversationId = new mongoose_1.default.Types.ObjectId(req.params.conversationId);
        await Conversations_1.default.findByIdAndDelete({
            _id: conversationId,
        });
        await Message_1.default.findOneAndDelete({ conversationId });
        return res.status(200).json({ message: "success" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed , please try again" });
    }
};
exports.default = removeConversation;
