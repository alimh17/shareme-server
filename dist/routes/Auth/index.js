"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RegisterController_1 = __importDefault(require("../../controllers/Auth/RegisterController"));
const LoginController_1 = __importDefault(require("../../controllers/Auth/LoginController"));
const profileMulter_1 = __importDefault(require("../../middlewares/profileMulter"));
const CodeController_1 = __importDefault(require("../../controllers/Auth/CodeController"));
const ForgetPassword_1 = __importDefault(require("../../controllers/Auth/ForgetPassword"));
const ChangePassword_1 = __importDefault(require("../../controllers/Auth/ChangePassword"));
const router = (0, express_1.Router)();
router.post("/register", profileMulter_1.default.single("file"), RegisterController_1.default);
router.post("/login", LoginController_1.default);
router.post("/code", CodeController_1.default);
router.post("/forget-password", ForgetPassword_1.default);
router.post("/change-password", ChangePassword_1.default);
exports.default = router;
