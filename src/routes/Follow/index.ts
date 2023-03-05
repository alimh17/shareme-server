import { Router } from "express";
import { Follow } from "../../controllers/Follow";
import Authorization from "../../middlewares/Authorization";

const router = Router();

router.put("/", Authorization, Follow);

export default router;
