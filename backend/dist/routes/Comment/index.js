"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authorization_1 = __importDefault(require("../../middlewares/Authorization"));
const AddComment_1 = __importDefault(require("../../controllers/Comment/AddComment"));
const DeleteComment_1 = __importDefault(require("../../controllers/Comment/DeleteComment"));
const router = (0, express_1.Router)();
router.post("/add-comment", Authorization_1.default, AddComment_1.default);
router.post("/delete-comment", Authorization_1.default, DeleteComment_1.default);
exports.default = router;
