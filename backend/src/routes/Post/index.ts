import { Router } from "express";
import { PostController } from "../../controllers/Post";
import Authorization from "../../middlewares/Authorization";
import upload from "../../middlewares/postMulter";

const router = Router();

router.post("/", Authorization, upload.any(), PostController);

export default router;
