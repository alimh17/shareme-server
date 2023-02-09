import { Router } from "express";
import { Unfollow } from "../../controllers/Unfollow";

const router = Router();

router.put("/", Unfollow);

export default router;
