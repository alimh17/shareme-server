import { Router } from "express";
import { IsFollow } from "../../controllers/IsFollow";

const router = Router();

router.post("/", IsFollow);

export default router;
