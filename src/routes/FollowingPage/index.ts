import { Router } from "express";
import followingPage from "../../controllers/FollowingPage";

const router = Router();

router.get("/", followingPage);

export default router;
