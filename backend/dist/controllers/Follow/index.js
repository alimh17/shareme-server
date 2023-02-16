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
        const user = await User_1.default.findOne({ username: req.body.username });
        const me = await User_1.default.findOne({ username: decoded.user.username });
        if (!user) {
            return res.status(404).json({ message: "User is not defined" });
        }
        if (!me) {
            return res.status(404).json({ message: "User is not defined" });
        }
        const { _id, username, profile, name } = me;
        //! update user followers list
        await User_1.default.findOneAndUpdate({ username: req.body.username }, { $push: { followers: { _id, username, profile, name } } }, { new: true });
        //! update my followings list
        await User_1.default.findOneAndUpdate({ username: decoded.user.username }, {
            $push: {
                followings: {
                    _id: user._id,
                    username: user.username,
                    profile: user.profile,
                    name: user.name,
                },
            },
        }, { new: true });
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
