"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User/User"));
const Profile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User_1.default.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User in not defined" });
        }
        return res.status(200).json({ message: "success", user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed , please try again" });
        process.exit(1);
    }
};
exports.default = Profile;
