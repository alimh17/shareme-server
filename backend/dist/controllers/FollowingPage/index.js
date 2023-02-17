"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../../models/User/User"));
const followingPage = async (req, res) => {
    try {
        const token = req.headers.authorization?.slice(7, req.headers.authorization.length);
        const decoded = (0, jsonwebtoken_1.decode)(token || "");
        if (!decoded) {
            return res.status(409).json({ message: "Token is not valid" });
        }
        const user = await User_1.default.findOne({ username: decoded.user.username });
        const users = await User_1.default.find({});
        const editUser = [];
        for (const u of users) {
            editUser.push({
                username: u.username,
                _id: u._id,
                name: u.name,
                profile: u.profile,
            });
        }
        //! Filter of following list user
        const filteredUsers = editUser.filter((u) => !user.followings.some((f) => f.username === u.username));
        //! Filter self user
        const data = filteredUsers.filter((user) => user.username !== decoded.user.username);
        console.log(data);
        return res.status(200).json({ message: "success", data });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed , please try again" });
    }
};
exports.default = followingPage;
