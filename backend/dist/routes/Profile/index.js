"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Profile_1 = __importDefault(require("../../controllers/Profile"));
const router = (0, express_1.Router)();
router.get("/:username", Profile_1.default);
exports.default = router;
