"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const User_1 = __importDefault(require("../../../models/User/User"));
const changePassword = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User is not exist" });
        }
        if (req.body.code !== user.code) {
            return res.status(404).json({ message: "your code not correct" });
        }
        const hashPassword = await (0, bcrypt_1.hash)(req?.body?.values?.password, 10);
        await User_1.default.findOneAndUpdate({ email: req.body.email }, { password: hashPassword });
        return res.status(200).json({ message: "success , password changed" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed , please try again" });
    }
};
exports.default = changePassword;
