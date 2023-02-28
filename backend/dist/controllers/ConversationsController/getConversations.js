"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conversations_1 = __importDefault(require("../../models/Conversations/Conversations"));
const getConversations = async (req, res) => {
    try {
        const conversation = await Conversations_1.default.find({
            members: { $in: [req.params.userId] },
        });
        return res.status(200).json(conversation);
    }
    catch (err) {
        return res.status(500).json({ message: "Failed , please try again" });
    }
};
exports.default = getConversations;
