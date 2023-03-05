"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authorization_1 = __importDefault(require("../../middlewares/Authorization"));
const createConversations_1 = __importDefault(require("../../controllers/ConversationsController/createConversations"));
const getConversations_1 = __importDefault(require("../../controllers/ConversationsController/getConversations"));
const removeConversation_1 = __importDefault(require("../../controllers/ConversationsController/removeConversation"));
const router = (0, express_1.Router)();
//! new Conversation
router.post("/", Authorization_1.default, createConversations_1.default);
//! get Conversation of a user
router.get("/:userId", Authorization_1.default, getConversations_1.default);
router.delete("/:conversationId", Authorization_1.default, removeConversation_1.default);
exports.default = router;
