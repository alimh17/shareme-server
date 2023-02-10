import { Router } from "express";
import Authorization from "../../middlewares/Authorization";
import upload from "../../middlewares/postMulter";

import deletePost from "../../controllers/Post/DeletePost";
import createPost from "../../controllers/Post/CreatePost/index";
import getPosts from "../../controllers/Post/GetPosts";

const router = Router();

router.post("/", Authorization, upload.any(), createPost);
router.put("/", Authorization, deletePost);
router.get("/get-posts", getPosts);

export default router;
