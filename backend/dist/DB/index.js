"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = process.env.PORT || 3001;
const connectDB = (server) => {
    mongoose_1.default.set("strictQuery", true);
    mongoose_1.default
        .connect("mongodb://localhost:27017/shareme")
        .then(() => {
        server.listen(PORT, () => console.log(`server run on port ${PORT}`));
        console.log(`Mongodb connected ${mongoose_1.default.connection.port}`);
    })
        .catch((err) => {
        console.log(err);
        process.exit(1);
    });
};
exports.default = connectDB;
