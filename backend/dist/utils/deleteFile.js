"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostFiles = void 0;
const path_1 = __importDefault(require("path"));
const node_fs_1 = require("node:fs");
const User_1 = __importDefault(require("../models/User/User"));
const deletePostFiles = async (username, id) => {
    try {
        const user = await User_1.default.findOne({ username: username });
        const post = user?.posts.filter((f) => f._id.toString() === id.toString());
        post.forEach((item) => {
            item.media.forEach((media) => {
                (0, node_fs_1.unlink)(path_1.default.join(__dirname, `../../public/${media.source}`), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            });
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.deletePostFiles = deletePostFiles;
exports.default = exports.deletePostFiles;
