"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newMessage_1 = __importDefault(require("../../controllers/Message/newMessage"));
const getMessage_1 = __importDefault(require("../../controllers/Message/getMessage"));
const router = (0, express_1.Router)();
//! Add
router.post("/", newMessage_1.default);
//! Get
router.get("/:conversationId", getMessage_1.default);
exports.default = router;
