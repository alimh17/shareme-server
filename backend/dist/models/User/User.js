"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        default: "",
    },
    email: {
        type: String,
        required: true,
        default: "",
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    profile: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    posts: {
        type: [{}],
        default: [],
    },
    followers: {
        type: [{}],
        default: [],
    },
    followings: {
        type: [{}],
        default: [],
    },
    chatList: {
        type: [
            {
                name: String,
                username: {
                    type: String,
                    unique: true,
                },
                avatar: String,
            },
        ],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    code: {
        type: String,
        default: "",
    },
    breathday: Date,
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
