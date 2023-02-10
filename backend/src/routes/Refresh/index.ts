import { Router } from "express";
import Refresh from "../../controllers/Refresh";

const router = Router();

router.get("/", Refresh);

export default router;
