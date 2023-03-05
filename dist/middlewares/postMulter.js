"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/posts/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    //   limits: {
    //     fileSize: 1024 * 1024 * 5,
    //   },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "video/mp4" ||
            file.mimetype === "video/mpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    },
});
exports.default = upload;
