"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = require("jsonwebtoken");
const updatePostsList_1 = __importDefault(require("./updatePostsList"));
const User_1 = __importDefault(require("../../../models/User/User"));
const deleteFile_1 = require("../../../utils/deleteFile");
const deletePost = async (req, res) => {
    try {
        //! Here decoded access token and get user data
        const token = req.headers.authorization?.slice(7, req.headers.authorization.length);
        const decoded = await (0, jsonwebtoken_1.decode)(token || "");
        //! If  decoded didn't exist , return...
        if (!decoded) {
            return res.status(409).json({ message: "can not decode" });
        }
        if (!req.body.id) {
            res.status(409).json({ message: "Please send post id" });
        }
        const objectId = new mongoose_1.Types.ObjectId(req.body.id);
        //! Delete posts files
        (0, deleteFile_1.deletePostFiles)(decoded.user.username, req.body.id);
        const user = await User_1.default.findOneAndUpdate({ username: decoded.user.username }, {
            $pull: { posts: { _id: objectId } },
        }, { new: true });
        //! Updating the Posts list of users who have followed this user
        (0, updatePostsList_1.default)(decoded.user.username, user.posts);
        res.status(200).json({ message: "success" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed , please try again" });
        process.exit(1);
    }
};
exports.default = deletePost;
