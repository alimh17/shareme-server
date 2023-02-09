"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../models/User/User"));
const updatePostList = async (username, post) => {
    const user = await User_1.default.findOne({ username });
    if (!user) {
        return;
    }
    //! Get the list of followers
    const followers = await User_1.default.find({
        "followings.username": username,
    });
    for (const follower of followers) {
        //! Update the information in the follower's following list
        await User_1.default.findOneAndUpdate({ username: follower.username, "followings.username": username }, { "followings.$.posts": post });
    }
};
exports.default = updatePostList;
