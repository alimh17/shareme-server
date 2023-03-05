import { Router } from "express";
import searchController from "../../controllers/SearchController";

const router = Router();

router.get("/:username", searchController);

export default router;
