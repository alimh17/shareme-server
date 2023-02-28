import { Router } from "express";
import Authorization from "../../middlewares/Authorization";

import createConversation from "../../controllers/ConversationsController/createConversations";
import getConversations from "../../controllers/ConversationsController/getConversations";

const router = Router();

//! new Conversation
router.post("/", Authorization, createConversation);
//! get Conversation of a user
router.get("/:userId", Authorization, getConversations);

export default router;
