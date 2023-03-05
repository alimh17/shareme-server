"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../../../models/Post/Post"));
const User_1 = __importDefault(require("../../../models/User/User"));
const AddComment = async (req, res) => {
    try {
        //! Add new comment for post schema
        await Post_1.default.updateMany({ _id: req.body.from }, { $push: { comment: req.body } });
        const post = await Post_1.default.findOne({ _id: req.body.from });
        //! Add new comment for posts user schema
        await User_1.default.updateMany({ username: post?.owner?.name }, { $push: { "posts.$[].comment": req.body } });
        return res.status(200).json({ message: "success" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed , Please try again" });
    }
};
exports.default = AddComment;
