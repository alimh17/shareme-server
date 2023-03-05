"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const registerSchema = joi_1.default.object({
    username: joi_1.default.string().required().min(4).max(64).messages({
        "string.required": "نام کاربری الزامی می باشد",
        "string.min": "نام کاربری نباید کمتر از 4 کاراکتر باشد",
        "string.max": "نام کاربری نمی تواند بیشتر از 64 کاراکتر باشد",
    }),
    email: joi_1.default.string().required().email().messages({
        "string.required": "ایمیل الزامی می باشد",
        "string.email": "ایمیل معتبر نمی باشد",
    }),
    password: joi_1.default.string().required().min(8).max(64).messages({
        "string.required": "رمز عبور الزامی می باشد",
        "string.min": "رمز عبور نباید کمتر از 8 کاراکتر باشد",
        "string.max": "رمز عبور نباید بیشتر از 64 کاراکتر باشد",
    }),
});
exports.registerSchema = registerSchema;
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().required().email().messages({
        "string.required": "ایمیل الزامی می باشد",
        "string.email": "ایمیل معتبر نمی باشد",
    }),
    password: joi_1.default.string().required().min(8).max(64).messages({
        "string.required": "رمز عبور الزامی می باشد",
        "string.min": "رمز عبور نباید کمتر از 8 کاراکتر باشد",
        "string.max": "رمز عبور نباید بیشتر از 64 کاراکتر باشد",
    }),
});
exports.loginSchema = loginSchema;
