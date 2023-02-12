"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follow = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../../models/User/User"));
const Follow = async (req, res) => {
    const token = req.headers.authorization?.slice(7, req.headers.authorization.length);
    try {
        const decoded = (0, jsonwebtoken_1.decode)(token || "");
        if (!decoded) {
            return res.status(409).json({ message: "Token is not valid" });
        }
        //! update user followers list
        const user = await User_1.default.findOneAndUpdate({ username: req.body.username }, { $push: { followers: decoded.user } }, { new: true });
        //! update my followings list
        const me = await User_1.default.findOneAndUpdate({ username: decoded.user.username }, { $push: { followings: req?.body } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User is not defined" });
        }
        if (!me) {
            return res.status(404).json({ message: "User is not defined" });
        }
        await user?.save();
        await me?.save();
        return res.status(200).json({ message: "success" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed , please try again" });
        process.exit(1);
    }
};
exports.Follow = Follow;
