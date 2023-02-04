"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Post_1 = require("../../controllers/Post");
const Authorization_1 = __importDefault(require("../../middlewares/Authorization"));
const postMulter_1 = __importDefault(require("../../middlewares/postMulter"));
const router = (0, express_1.Router)();
router.post("/", Authorization_1.default, postMulter_1.default.any(), Post_1.PostController);
exports.default = router;
