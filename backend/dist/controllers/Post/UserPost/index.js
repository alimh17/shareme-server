"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../../../models/User/User"));
const userPost = async (req, res) => {
    try {
        //! Here decoded access token and get user data
        const token = req.headers.authorization?.slice(7, req.headers.authorization.length);
        const decoded = await (0, jsonwebtoken_1.decode)(token || "");
        if (!decoded) {
            return res.status(409).json({ message: "token is not valid or expired" });
        }
        const user = await User_1.default.findOne({
            username: decoded.user.username,
        });
        if (!user) {
            return res.status(404).json({ message: "User is not exist" });
        }
        //! Sort posts by publication time
        const posts = user.posts.sort(function (a, b) {
            return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
        });
        //! Here pagnation posts
        const page = req.query.page ? +req.query.page : 1;
        const pageSize = req.query.pageSize ? +req.query.pageSize : 4;
        const startIndex = (page - 1) * pageSize;
        let endIndex = startIndex + pageSize;
        endIndex = endIndex > posts.length ? posts.length : endIndex;
        const hasNext = endIndex < posts.length;
        const paginatedData = posts.slice(startIndex, endIndex);
        return res.status(200).json({
            message: "success",
            posts: paginatedData,
            next: hasNext,
            postsLength: posts.length,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed , please try again" });
    }
};
exports.default = userPost;
