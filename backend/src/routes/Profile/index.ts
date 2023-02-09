import { Router } from "express";
import Profile from "../../controllers/Profile";

const router = Router();

router.get("/:username", Profile);

export default router;
