"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../../models/User/User"));
const codeController = async (req, res) => {
    try {
        const findUser = await User_1.default.findOne({ email: req.body.email });
        if (findUser.code !== req.body.code) {
            return res.status(404).json({ message: "your code not correct" });
        }
        const secret = process.env.SECRET_KEY;
        const { _id, username } = findUser;
        const user = {
            _id,
            username,
        };
        const access = jsonwebtoken_1.default.sign({ user }, secret, {
            expiresIn: "14d",
        });
        const refresh = jsonwebtoken_1.default.sign({ user }, secret, {
            expiresIn: "365d",
        });
        const options = {
            maxAge: 1000 * 60 * 60 * 24 * 14,
            httpOnly: true,
            signed: true, // Indicates if the cookie should be signed
        };
        res.cookie("user-shareme", { email: findUser.email }, options);
        return res.status(200).json({ access, refresh });
    }
    catch (err) {
        return res.status(500).json({ message: "Failed , please try again" });
    }
};
exports.default = codeController;
