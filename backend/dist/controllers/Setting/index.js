"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../../models/User/User"));
const deleteFile_1 = require("../../utils/deleteFile");
const Setting = async (req, res) => {
    try {
        //! Here decoded access token and get user data
        const token = req.headers.authorization?.slice(7, req.headers.authorization.length);
        const decoded = await (0, jsonwebtoken_1.decode)(token || "");
        //! If  decoded didn't exist , return...
        if (!decoded) {
            return res.status(404).json({ message: "User is not exist" });
        }
        const user = await User_1.default.findOne({
            username: decoded.user.username,
        });
        if (!user) {
            return res.status(404).json({ message: "User is not exist" });
        }
        const { name, lastname, bio } = req.body;
        console.log(req.file?.path);
        if (req.file) {
            (0, deleteFile_1.deleteProfileFile)(decoded.user.username);
        }
        await User_1.default.updateOne({
            username: decoded.user.username,
        }, {
            $set: {
                name,
                lastName: lastname,
                bio,
                profile: req.file
                    ? `profile/${req.file.filename}`
                    : decoded.user.profile,
            },
        });
        const data = {
            _id: user._id,
            username: user.username,
            name,
            lastname,
            bio: bio,
            profile: req.file ? `profile/${req.file.filename}` : user.profile,
            followers: user.followers.length,
            followings: user.followings.length,
            posts: user.posts.length,
        };
        return res.status(200).json({ message: "success", data });
    }
    catch (err) {
        res.status(500).json({ message: "Failed , Please try again" });
    }
};
exports.default = Setting;
