import { Router } from "express";
import Authorization from "../../middlewares/Authorization";
import AddComment from "../../controllers/Comment/AddComment";
import DeleteComment from "../../controllers/Comment/DeleteComment";

const router = Router();

router.post("/add-comment", Authorization, AddComment);
router.post("/delete-comment", Authorization, DeleteComment);

export default router;
