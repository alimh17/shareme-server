"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../../models/User/User"));
const Refresh = async (req, res) => {
    try {
        const token = req.headers.authorization?.slice(7, req.headers.authorization.length);
        if (!token) {
            return res.status(409).json({ message: "Please send access token" });
        }
        const decoded = await (0, jsonwebtoken_1.decode)(token || "");
        if (!decoded) {
            return res.status(409).json({ message: "Token is not valid" });
        }
        const findUser = await User_1.default.findOne({
            username: decoded.user.username,
        });
        if (!findUser) {
            return res.status(404).json({ message: "User is not exist" });
        }
        const user = {
            username: findUser.username,
            name: findUser.name,
            bio: findUser.bio,
            profile: findUser.profile,
        };
        const secret = process.env.SECRET_KEY;
        const access = (0, jsonwebtoken_1.sign)({ user }, secret, {
            expiresIn: "14d",
        });
        res.status(200).json({ message: "success", access, user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed , try again!" });
        process.exit(1);
    }
};
exports.default = Refresh;
