import { Router } from "express";
import Authorization from "../../middlewares/Authorization";
import IsLike from "../../controllers/Like/IsLike";
import addLike from "../../controllers/Like/AddLike";
import removeLike from "../../controllers/Like/RemoveLike";

const router = Router();

router.post("/is-like", Authorization, IsLike);
router.put("/add-like", Authorization, addLike);
router.put("/remove-like", Authorization, removeLike);

export default router;
