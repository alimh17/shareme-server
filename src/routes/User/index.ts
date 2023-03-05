import { Router } from "express";

import Authorization from "../../middlewares/Authorization";
import UserController from "../../controllers/User";
import Users from "../../controllers/AllUsers";
import conversationUser from "../../controllers/User/ConversationUser";

const router = Router();

//! Here get user data
router.get("/", Authorization, UserController);
//! Here get all users
router.get("/users", Authorization, Users);

//! Here get user for conversation
router.get("/conversation/:userId", Authorization, conversationUser);

export default router;
