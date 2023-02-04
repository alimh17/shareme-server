"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const Post_1 = __importDefault(require("../../models/Post/Post"));
const User_1 = __importDefault(require("../../models/User/User"));
const getMediaPost = (files) => {
    const media = [];
    for (const file of files) {
        media.push({ source: file.path, title: file.filename });
    }
    return media;
};
const PostController = async (req, res) => {
    try {
        //! files is Requred for create post --- image or video
        if (!req.files) {
            return res.status(409).json({ message: "Please send a image or video" });
        }
        //! Here decoded access token and get user data
        const decoded = await (0, jsonwebtoken_1.decode)(req.headers.authorization || "");
        //! If  decoded didn't exist , return...
        if (!decoded) {
            return res.status(409).json({ message: "can not decode" });
        }
        //! Here get decoded data
        const data = decoded;
        //! This function retrun a object of include source and title
        const media = getMediaPost(req.files);
        const { Description, Location } = req.body;
        //! Here create a post and save to DB
        const post = new Post_1.default({
            media,
            description: Description,
            locaion: Location,
            owner: data.user.username,
        });
        //! Here add post to user data and update user information
        const user = await User_1.default.findOneAndUpdate({ username: data.user.username }, { $push: { posts: post } }, { new: true });
        //! save changes
        await post.save();
        await user?.save();
        res.status(200).json({ message: "success" });
    }
    catch (err) {
        console.log(err);
    }
};
exports.PostController = PostController;
