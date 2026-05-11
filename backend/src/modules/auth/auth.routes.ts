import { Router } from "express";

import {
  register,
  login,
  logout,
  getCurrentUser,
  refreshToken,
} from "./auth.controller";

import { validate } from "../../middleware/validation.middleware";
import { registerSchema, loginSchema } from "./auth.validation";

import { verifyJWT } from "../../middleware/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

router.post("/logout", verifyJWT, logout);
router.get("/me", verifyJWT, getCurrentUser);

router.post("/refresh", refreshToken);

export default router;