"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../models/User/User"));
const mailer_1 = __importDefault(require("../../../utils/mailer"));
const forgetPassword = async (req, res) => {
    try {
        const user = await User_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not exist" });
        }
        let code = "";
        for (let i = 0; code.length < 5; i++) {
            const random = Math.floor(Math.random() * 10);
            code += random;
        }
        (0, mailer_1.default)(user.email, code);
        await User_1.default.findOneAndUpdate({ email: user.email }, { code });
        return res.status(200).json({ message: "success", user: user.email });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed , please try again" });
    }
};
exports.default = forgetPassword;
