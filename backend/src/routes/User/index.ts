import { Router } from "express";

import Authorization from "../../middlewares/Authorization";
import UserController from "../../controllers/User";
import Users from "../../controllers/AllUsers";

const router = Router();

//! Here get user data
router.get("/", Authorization, UserController);
//! Here get all users
router.get("/users", Authorization, Users);

export default router;
