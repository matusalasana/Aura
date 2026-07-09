import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../middleware/validation.middleware";
import { registerSchema, loginSchema } from "./auth.validation";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// register
router.post("/register/customer", AuthController.registerCustomer);

// email verification
router.post("/verify-email", AuthController.verifyEmail);

// login
router.post("/login", validate(loginSchema), AuthController.login);

// refresh token
router.post("/refresh", AuthController.refresh);

// logout
router.post("/logout", AuthController.logout);
router.post("/logout-all", AuthController.logoutAll);

// getMe
router.get("/me", authenticate, AuthController.getMe);

// password recovery
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);

// resend OTP (generic for both verify + reset)
router.post("/resend-otp", AuthController.resendOTP);

export default router;