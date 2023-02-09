"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Follow_1 = require("../../controllers/Follow");
const Authorization_1 = __importDefault(require("../../middlewares/Authorization"));
const router = (0, express_1.Router)();
router.put("/", Authorization_1.default, Follow_1.Follow);
exports.default = router;
