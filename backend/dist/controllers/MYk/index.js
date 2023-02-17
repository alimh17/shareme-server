"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../../models/User/User"));
const FindFollowings_1 = __importDefault(require("./FindFollowings"));
const maybeYouKnow = async (req, res) => {
    try {
        const token = req.headers.authorization?.slice(7, req.headers.authorization.length);
        const decoded = (0, jsonwebtoken_1.decode)(token || "");
        if (!jsonwebtoken_1.decode) {
            return res.status(409).json({ message: "Access token is required" });
        }
        const user = await User_1.default.findOne({ _id: decoded.user._id });
        if (!user) {
            return res.status(404).json({ message: "User is not defined" });
        }
        const MYK = await (0, FindFollowings_1.default)(user);
        res.status(200).json({ message: "success", MYK });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed , please try again" });
        process.exit(1);
    }
};
exports.default = maybeYouKnow;
