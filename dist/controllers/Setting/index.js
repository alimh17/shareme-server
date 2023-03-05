"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../../models/User/User"));
const Post_1 = __importDefault(require("../../models/Post/Post"));
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
        if (req.file) {
            (0, deleteFile_1.deleteProfileFile)(decoded.user.username);
            //! update profile in post data
            await User_1.default.updateMany({
                username: decoded.user.username,
            }, { $set: { "posts.$[].owner.profile": `profile/${req.file.filename}` } });
            //! update profile in Post Schema
            await Post_1.default.updateMany({
                "owner.name": decoded.user.username,
            }, {
                $set: { "owner.profile": `profile/${req.file.filename}` },
            });
            //! update profile in like and comment post schema
            await Post_1.default.updateMany({
                "like.username": decoded.user.username,
            }, {
                $set: {
                    "like.$.profile": `profile/${req.file.filename}`,
                    "comment.$.profile": `profile/${req.file.filename}`,
                },
            });
            //! update profile in like and comment user schema
            await User_1.default.updateMany({ "posts.like.username": decoded.user.username }, {
                $set: {
                    "posts.$[].like.$[].profile": `profile/${req.file.filename}`,
                    "posts.$[].comment.$[].profile": `profile/${req.file.filename}`,
                },
            });
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
