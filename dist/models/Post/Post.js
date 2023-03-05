"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    media: {
        type: [{ source: "", title: "" }],
        required: true,
        default: [],
    },
    description: {
        type: String,
        required: true,
        default: "",
    },
    owner: {
        type: {},
        default: "",
        required: true,
    },
    location: {
        type: String,
        default: "",
    },
    like: {
        type: [],
        default: [],
    },
    comment: {
        type: [{}],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Post = (0, mongoose_1.model)("Post", postSchema);
exports.default = Post;
