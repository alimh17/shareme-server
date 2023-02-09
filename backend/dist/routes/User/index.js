"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authorization_1 = __importDefault(require("../../middlewares/Authorization"));
const User_1 = __importDefault(require("../../controllers/User"));
const router = (0, express_1.Router)();
router.get("/", Authorization_1.default, User_1.default);
exports.default = router;
