"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../../models/User/User"));
const Users = async (req, res) => {
    try {
        const token = req.headers.authorization?.slice(7, req.headers.authorization.length);
        const decoded = (0, jsonwebtoken_1.decode)(token || "");
        if (!jsonwebtoken_1.decode) {
            return res.status(409).json({ message: "user is not exist or expire" });
        }
        const findUsers = await User_1.default.find();
        if (!findUsers) {
            return res.status(404).json({ message: "user not exist" });
        }
        const users = findUsers.map(({ username, _id, profile, name }) => {
            return { username, _id, profile, name };
        });
        const filter = users.filter((user) => user.username !== decoded.user.username);
        return res.status(200).json({ message: "success", users: filter });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed , Please try again" });
    }
};
exports.default = Users;
