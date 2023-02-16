"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../../../models/Post/Post"));
const User_1 = __importDefault(require("../../../models/User/User"));
const addLike = async (req, res) => {
    try {
        const user = await User_1.default.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ message: "User is not exist" });
        }
        const { username, profile, _id } = user;
        //! Add like to post schema
        await Post_1.default.updateOne({ _id: req.body.postId }, {
            $push: { like: { username, profile, _id } },
        });
        //! Add new comment for posts user schema
        await User_1.default.updateMany({ username: req.body.owner }, { $push: { "posts.$[].like": { username, profile, _id } } });
        return res.status(200).json({ message: "success" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed , please try again" });
    }
};
exports.default = addLike;
