"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authorization_1 = __importDefault(require("../../middlewares/Authorization"));
const postMulter_1 = __importDefault(require("../../middlewares/postMulter"));
const DeletePost_1 = __importDefault(require("../../controllers/Post/DeletePost"));
const index_1 = __importDefault(require("../../controllers/Post/CreatePost/index"));
const GetPosts_1 = __importDefault(require("../../controllers/Post/GetPosts"));
const UserPost_1 = __importDefault(require("../../controllers/Post/UserPost"));
const router = (0, express_1.Router)();
router.post("/", Authorization_1.default, postMulter_1.default.any(), index_1.default);
router.put("/", Authorization_1.default, DeletePost_1.default);
router.get("/get-posts", GetPosts_1.default);
router.post("/user-posts", UserPost_1.default);
exports.default = router;
