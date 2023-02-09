"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unfollow = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../../models/User/User"));
const Unfollow = async (req, res) => {
    try {
        //! Here checking access token
        const token = req.headers.authorization?.slice(7, req.headers.authorization.length);
        const decoded = await (0, jsonwebtoken_1.decode)(token || "");
        if (!decoded) {
            return res.status(409).json({ message: "Token is not valid" });
        }
        //! Here update user followers list
        const user = await User_1.default.findOneAndUpdate({ username: req?.body?.username }, { $pull: { followers: { _id: decoded.user._id } } }, { new: true });
        //! Here update me followings list
        const me = await User_1.default.findOneAndUpdate({ username: decoded.user.username }, { $pull: { followings: { _id: req?.body._id } } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User is not defined" });
        }
        if (!me) {
            return res.status(404).json({ message: "User is not defined" });
        }
        await user?.save();
        return res.status(200).json({ message: "success" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed , please try again" });
        process.exit(1);
    }
};
exports.Unfollow = Unfollow;
