"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authorization_1 = __importDefault(require("../../middlewares/Authorization"));
const ChatList_1 = __importDefault(require("../../controllers/ChatList"));
const addUserToChatList_1 = __importDefault(require("../../controllers/ChatList/addUserToChatList"));
const removeUserOfChatList_1 = __importDefault(require("../../controllers/ChatList/removeUserOfChatList"));
const router = (0, express_1.Router)();
router.get("/", Authorization_1.default, ChatList_1.default);
router.post("/add-user", Authorization_1.default, addUserToChatList_1.default);
router.post("/remove-user", Authorization_1.default, removeUserOfChatList_1.default);
exports.default = router;
