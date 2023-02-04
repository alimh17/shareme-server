import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: any,
    cb: (param1: null, param2: string) => void
  ) {
    cb(null, "./public/posts/");
  },
  filename: function (
    req: Request,
    file: any,
    cb: (param1: null, param2: any) => void
  ) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({
  storage: storage,
  //   limits: {
  //     fileSize: 1024 * 1024 * 5,
  //   },
  fileFilter: function (
    req: Request,
    file: any,
    cb: (params: any, params2?: boolean) => void
  ) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/mpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export default upload;
