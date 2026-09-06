import { toNodeHandler } from "better-auth/node";
import { Router } from "express";

import { auth } from "@/config/auth.js";
import { authenticate } from "@/middleware/authenticate.js";
import { AuthController } from "./auth.controller.js"

export const authHandler = toNodeHandler(auth);

const router = Router();


router.get(
  "/me", 
  authenticate,
  AuthController.getMe
);

export default router;