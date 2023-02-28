"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User/User"));
const searchController = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User_1.default.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User is not exist" });
        }
        const data = { username: user?.username, profile: user?.profile };
        return res.status(200).json({ message: "success", data });
    }
    catch (err) {
        return res.status(500).json({ message: "Failed , please try again" });
    }
};
exports.default = searchController;
