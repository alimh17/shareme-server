"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
// const nodemailer = require("nodemailer");
const Auth_Validation_1 = require("../../../utils/Vlidation/Auth-Validation");
const User_1 = __importDefault(require("../../../models/User/User"));
const registerController = async (req, res) => {
    try {
        const data = req.body;
        const { error, value } = Auth_Validation_1.registerSchema.validate(data);
        console.log(error);
        console.log(value);
        if (error) {
            return res.status(409).json({ error: error.details });
        }
        const userEmail = await User_1.default.findOne({ email: value.email });
        const userUsername = await User_1.default.findOne({ username: value.username });
        if (userEmail) {
            return res
                .status(401)
                .json({ message: "There is a user with this profile" });
        }
        if (userUsername) {
            return res
                .status(401)
                .json({ message: "There is a user with this profile" });
        }
        const hashPassword = await (0, bcrypt_1.hash)(value.password, 10);
        const user = new User_1.default({
            username: value.username,
            email: value.email,
            password: hashPassword,
            profile: req.file ? `public/profile/${req.file.filename}` : "",
        });
        await user.save();
        res.status(200).json({ success: "success" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
        process.exit(1);
    }
};
exports.default = registerController;
