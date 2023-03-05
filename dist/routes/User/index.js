"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authorization_1 = __importDefault(require("../../middlewares/Authorization"));
const User_1 = __importDefault(require("../../controllers/User"));
const AllUsers_1 = __importDefault(require("../../controllers/AllUsers"));
const ConversationUser_1 = __importDefault(require("../../controllers/User/ConversationUser"));
const router = (0, express_1.Router)();
//! Here get user data
router.get("/", Authorization_1.default, User_1.default);
//! Here get all users
router.get("/users", Authorization_1.default, AllUsers_1.default);
//! Here get user for conversation
router.get("/conversation/:userId", Authorization_1.default, ConversationUser_1.default);
exports.default = router;
