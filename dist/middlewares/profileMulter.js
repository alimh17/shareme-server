"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/profile/");
    },
    filename: function (req, file, cb) {
        switch (file.mimetype) {
            case "image/png":
                return cb(null, file.fieldname + "-" + Date.now() + ".png");
            case "image/jpg":
                return cb(null, file.fieldname + "-" + Date.now() + ".jpg");
            case "image/jpeg":
                return cb(null, file.fieldname + "-" + Date.now() + ".jpeg");
            default:
                cb(null, file.fieldname + "-" + Date.now());
        }
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("File is not an image"));
        }
        cb(null, true);
    },
});
exports.default = upload;
