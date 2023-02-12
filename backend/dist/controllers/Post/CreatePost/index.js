"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const Post_1 = __importDefault(require("../../../models/Post/Post"));
const User_1 = __importDefault(require("../../../models/User/User"));
const getMediaPost_1 = __importDefault(require("./getMediaPost"));
const updateFollowingList_1 = __importDefault(require("./updateFollowingList"));
const createPost = async (req, res) => {
    try {
        //! files is Requred for create post --- image or video
        if (!req.files) {
            return res.status(409).json({ message: "Please send a image or video" });
        }
        //! Here decoded access token and get user data
        const token = req.headers.authorization?.slice(7, req.headers.authorization.length);
        const decoded = await (0, jsonwebtoken_1.decode)(token || "");
        //! If  decoded didn't exist , return...
        if (!decoded) {
            return res.status(409).json({ message: "can not decode" });
        }
        //! Here get decoded data
        const data = await User_1.default.findOne({ username: decoded?.user?.username });
        console.log(data);
        //! This function retrun a object of include source and title
        const media = (0, getMediaPost_1.default)(req.files);
        const { Description, Location } = req.body;
        //! Here create a post and save to DB
        const post = new Post_1.default({
            media,
            description: Description,
            location: Location,
            owner: { name: data.username, profile: data.profile },
        });
        //! Here add post to user data and update user information
        const user = await User_1.default.findOneAndUpdate({ username: data.username }, { $push: { posts: post } }, { new: true });
        //! Updating the following list of users who have followed this user
        (0, updateFollowingList_1.default)(data.username);
        //! save changes
        await post.save();
        await user?.save();
        return res.status(200).json({ message: "success" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed , please try again" });
        process.exit(1);
    }
};
exports.default = createPost;
