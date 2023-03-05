"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authorization_1 = __importDefault(require("../../middlewares/Authorization"));
const IsLike_1 = __importDefault(require("../../controllers/Like/IsLike"));
const AddLike_1 = __importDefault(require("../../controllers/Like/AddLike"));
const RemoveLike_1 = __importDefault(require("../../controllers/Like/RemoveLike"));
const router = (0, express_1.Router)();
router.post("/is-like", Authorization_1.default, IsLike_1.default);
router.put("/add-like", Authorization_1.default, AddLike_1.default);
router.put("/remove-like", Authorization_1.default, RemoveLike_1.default);
exports.default = router;
