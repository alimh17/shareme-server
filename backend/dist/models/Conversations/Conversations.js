"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conversationsSchema = new mongoose_1.Schema({
    members: Array,
}, { timestamps: true });
const Conversations = (0, mongoose_1.model)("Conversations", conversationsSchema);
exports.default = Conversations;
