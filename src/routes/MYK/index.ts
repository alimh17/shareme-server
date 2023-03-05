import { Router } from "express";
import maybeYouKnow from "../../controllers/MYK";
import Authorization from "../../middlewares/Authorization";

const router = Router();

router.get("/", Authorization, maybeYouKnow);

export default router;
