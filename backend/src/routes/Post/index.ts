import { Router } from "express";
import Authorization from "../../middlewares/Authorization";
import upload from "../../middlewares/postMulter";

import deletePost from "../../controllers/Post/DeletePost";
import createPost from "../../controllers/Post/CreatePost/index";

const router = Router();

router.post("/", Authorization, upload.any(), createPost);
router.put("/", Authorization, deletePost);

export default router;
