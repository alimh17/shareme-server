"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFollow = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../../models/User/User"));
const IsFollow = async (req, res) => {
    try {
        const token = req.headers.authorization?.slice(7, req.headers.authorization.length);
        const { profile } = req.body;
        const decoded = (0, jsonwebtoken_1.decode)(token || "");
        if (!decoded) {
            return res.status(409).json({ message: "Token is not valid" });
        }
        //! Here checking user exists in list followers
        const user = await User_1.default.findOne({
            username: profile?.username,
            followers: { $elemMatch: { _id: decoded.user._id } },
        });
        if (!user) {
            return res.status(200).json({
                message: "User is not exists in the followers",
                status: false,
            });
        }
        res
            .status(200)
            .json({ message: "User is exist in the followers", status: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed , please try again" });
        process.exit(1);
    }
};
exports.IsFollow = IsFollow;
