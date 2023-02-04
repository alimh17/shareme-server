"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Authorization = (req, res, next) => {
    const token = req.headers["authorization"] || req.headers["x-access-token"];
    if (!token) {
        return res.status(401).send("Access token is required.");
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "");
        next();
    }
    catch (err) {
        return res.status(401).send("Access token is invalid or has expired.");
    }
};
exports.default = Authorization;
