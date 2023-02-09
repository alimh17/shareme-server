"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IsFollow_1 = require("../../controllers/IsFollow");
const router = (0, express_1.Router)();
router.post("/", IsFollow_1.IsFollow);
exports.default = router;
