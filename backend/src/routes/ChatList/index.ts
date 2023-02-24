import { Router } from "express";
import Authorization from "../../middlewares/Authorization";

import getChatList from "../../controllers/ChatList";
import addUserToChatList from "../../controllers/ChatList/addUserToChatList";
import removeUserOfChatList from "../../controllers/ChatList/removeUserOfChatList";

const router = Router();

router.get("/", Authorization, getChatList);
router.post("/add-user", Authorization, addUserToChatList);
router.post("/remove-user", Authorization, removeUserOfChatList);

export default router;
