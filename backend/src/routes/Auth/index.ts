import { Router } from "express";

import registerController from "../../controllers/Auth/RegisterController";
import loginController from "../../controllers/Auth/LoginController";
import upload from "../../middlewares/profileMulter";

const router = Router();

router.post("/register", upload.single("file"), registerController);
router.post("/login", loginController);

export default router;
