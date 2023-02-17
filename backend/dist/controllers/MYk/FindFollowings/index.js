"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const User_1 = __importDefault(require("../../../models/User/User"));
const findFollowings = async (user) => {
    //! Here get user followings names
    const names = user.followings.map((following) => following.username);
    //   { username: { $in: names } }
    //! Here get data following users
    const data = await User_1.default.find({ username: { $in: names } });
    //! Here get followers data of following users
    const followers = data.map((following) => {
        return following.followers;
    });
    //! Here flat Array
    const flat = lodash_1.default.flatten(followers);
    //! Here filter by user username
    const filter = flat.filter((f) => f.username !== user.username);
    //! Here uniq data
    const uniqueData = filter.filter((obj, index, self) => index === self.findIndex((o) => o.username === obj.username));
    //! Here get followers user
    const myFollowers = user.followers.map((follower) => follower.username);
    //! Here we check whether the following followers are in the user's following list or not
    const filteredUsers = uniqueData.filter((user) => !myFollowers.includes(user.username));
    //! Here we check whether the following followers are in the user's followers list or not
    const filterByFollowing = filteredUsers.filter((user) => !names.includes(user.username));
    console.log(filterByFollowing);
    return filterByFollowing;
};
exports.default = findFollowings;
