import { Router } from "express";
import newMessage from "../../controllers/Message/newMessage";
import getMessage from "../../controllers/Message/getMessage";

const router = Router();

//! Add
router.post("/", newMessage);

//! Get
router.get("/:conversationId", getMessage);

export default router;
