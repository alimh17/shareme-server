import { Router } from "express";
import Authorization from "../../middlewares/Authorization";

import createConversation from "../../controllers/ConversationsController/createConversations";
import getConversations from "../../controllers/ConversationsController/getConversations";
import removeConversation from "../../controllers/ConversationsController/removeConversation";

const router = Router();

//! new Conversation
router.post("/", Authorization, createConversation);
//! get Conversation of a user
router.get("/:userId", Authorization, getConversations);

router.delete("/:conversationId", Authorization, removeConversation);

export default router;
