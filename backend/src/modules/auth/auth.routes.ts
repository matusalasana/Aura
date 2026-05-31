import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../middleware/validation.middleware";
import { registerSchema, loginSchema } from "./auth.validation";
import { verifyJWT } from "../../middleware/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);
router.get("/me", verifyJWT, AuthController.getMe);

export default router;