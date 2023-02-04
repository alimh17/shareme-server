import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: any,
    cb: (param1: null, param2: string) => void
  ) {
    cb(null, "./public/profile/");
  },
  filename: function (
    req: Request,
    file: any,
    cb: (param1: null, param2: any) => void
  ) {
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

const upload = multer({
  storage: storage,
  fileFilter: function (
    req: Request,
    file: any,
    cb: (params: any, params2?: boolean) => void
  ) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("File is not an image"));
    }

    cb(null, true);
  },
});

export default upload;
