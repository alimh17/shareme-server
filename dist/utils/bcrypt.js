"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compare = void 0;
const bcrypt_1 = require("bcrypt");
const Compare = (hashedPassword, plainPassword) => {
    return (0, bcrypt_1.compare)(plainPassword, hashedPassword);
};
exports.Compare = Compare;
