import { Router } from "express";

import registerController from "../../controllers/Auth/RegisterController";
import loginController from "../../controllers/Auth/LoginController";
import upload from "../../middlewares/profileMulter";
import codeController from "../../controllers/Auth/CodeController";
import forgetPassword from "../../controllers/Auth/ForgetPassword";
import changePassword from "../../controllers/Auth/ChangePassword";

const router = Router();

router.post("/register", upload.single("file"), registerController);
router.post("/login", loginController);
router.post("/code", codeController);
router.post("/forget-password", forgetPassword);
router.post("/change-password", changePassword);

export default router;
