"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../../models/User/User"));
const getChatList = async (req, res) => {
    try {
        const token = req.headers.authorization?.slice(7, req.headers.authorization.length);
        const decoded = (0, jsonwebtoken_1.decode)(token || "");
        if (!decoded) {
            return res.status(409).json({ message: "Token is not valid" });
        }
        const user = await User_1.default.findOne({ username: decoded.user.username });
        if (!user) {
            return res.status(404).json({ message: "User is not found" });
        }
        return res.status(200).json({ message: "success", data: user.chatList });
    }
    catch (err) {
        return res.status(500).json({ message: "Failed , please try again" });
    }
};
exports.default = getChatList;
