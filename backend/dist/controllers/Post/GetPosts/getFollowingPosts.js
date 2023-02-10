"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const User_1 = __importDefault(require("../../../models/User/User"));
const getFollowingPosts = async (decoded) => {
    const user = await User_1.default.findOne({ username: decoded.user.username });
    const posts = user?.followings.map((user) => {
        return user.posts;
    });
    const flat = lodash_1.default.flatten(posts);
    const sorted = flat.sort(function (a, b) {
        return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
    });
    return sorted;
};
exports.default = getFollowingPosts;
