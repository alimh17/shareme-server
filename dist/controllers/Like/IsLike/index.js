"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../../../models/Post/Post"));
const IsLike = async (req, res) => {
    try {
        const post = await Post_1.default.findOne({ _id: req.body.postId });
        // const hasLike = post?.like.includes(req.body.username);
        const hasLike = post?.like.find((user) => user.username === req.body.username);
        if (hasLike) {
            return res.status(200).json({ message: "success", status: true });
        }
        return res.status(200).json({ message: "success", status: false });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed , Please try again" });
    }
};
exports.default = IsLike;
