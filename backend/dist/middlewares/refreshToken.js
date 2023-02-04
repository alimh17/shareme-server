"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refreshTokenGenerator = (user) => {
    const secret = process.env.SECRET_KEY;
    const refreshToken = jsonwebtoken_1.default.sign({ user }, secret, {
        expiresIn: `${1000 * 365 * 60}d`,
    });
    return refreshToken;
};
exports.default = refreshTokenGenerator;
