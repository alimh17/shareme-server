"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Setting_1 = __importDefault(require("../../controllers/Setting"));
const Authorization_1 = __importDefault(require("../../middlewares/Authorization"));
const profileMulter_1 = __importDefault(require("../../middlewares/profileMulter"));
const router = (0, express_1.Router)();
router.post("/", Authorization_1.default, profileMulter_1.default.single("file"), Setting_1.default);
exports.default = router;
