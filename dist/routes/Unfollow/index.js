"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Unfollow_1 = require("../../controllers/Unfollow");
const router = (0, express_1.Router)();
router.put("/", Unfollow_1.Unfollow);
exports.default = router;
