"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../../models/User/User"));
const UserController = async (req, res) => {
    try {
        const token = req.headers.authorization?.slice(7, req.headers.authorization.length);
        const decoded = await (0, jsonwebtoken_1.decode)(token || "");
        if (!jsonwebtoken_1.decode) {
            return res.status(409).json({ message: "Access token is required" });
        }
        const user = await User_1.default.findOne({ username: decoded?.user?.username });
        if (!user) {
            return res.status(404).json({ message: "User is not defined" });
        }
        return res.status(200).json({ message: "success", user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed , please try again" });
        process.exit(1);
    }
};
exports.default = UserController;
