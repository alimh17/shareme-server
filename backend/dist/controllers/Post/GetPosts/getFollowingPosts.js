"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const Post_1 = __importDefault(require("../../../models/Post/Post"));
const User_1 = __importDefault(require("../../../models/User/User"));
const getFollowingPosts = async (decoded) => {
    const user = await User_1.default.findOne({ username: decoded.user.username });
    const posts = await Post_1.default.find({});
    //! Filter posts based on the user's following list
    const filter = posts.filter((post) => post.owner.name !== user?.username);
    console.log(user);
    const flat = lodash_1.default.flatten(filter);
    //! Sort posts by publication time
    const sorted = flat.sort(function (a, b) {
        return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
    });
    return sorted;
};
exports.default = getFollowingPosts;
