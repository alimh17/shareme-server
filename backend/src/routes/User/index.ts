import { Router } from "express";

import Authorization from "../../middlewares/Authorization";
import UserController from "../../controllers/User";

const router = Router();

router.get("/", Authorization, UserController);

export default router;
