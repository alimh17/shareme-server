"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User/User"));
const getUserWithParams = async (req, res) => {
    try {
        console.log(req.query);
        console.log(req.params);
        const userId = req.query.userId;
        const user = await User_1.default.findById(userId);
        console.log(user);
        return res.status(200).json({ message: "success" });
    }
    catch (err) {
        return res.status(500).json({ message: "Failed , please try again" });
    }
};
exports.default = getUserWithParams;
