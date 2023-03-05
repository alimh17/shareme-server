import { Router } from "express";
import Setting from "../../controllers/Setting";
import Authorization from "../../middlewares/Authorization";
import upload from "../../middlewares/profileMulter";

const router = Router();

router.post("/", Authorization, upload.single("file"), Setting);

export default router;
