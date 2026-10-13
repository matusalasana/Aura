import { Router } from "express";

import { authenticate } from "@/middleware/authenticate.js";
import { AuthController } from "./auth.controller.js"

const router = Router();


router.get(
  "/me", 
  authenticate,
  AuthController.getMe
);


router.post(
  "/send-otp", 
  AuthController.sendOTP
);


router.post(
  "/verify-otp", 
  AuthController.verifyOTP
);


router.post(
  "/resend-otp", 
  AuthController.resendOTP
);



export default router;