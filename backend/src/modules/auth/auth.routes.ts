import { Router } from "express";

import {
  register,
  login,
  logout,
  getCurrentUser,
  refresh 
} from "./auth.controller";

import { validate } from "../../middleware/validation.middleware";
import { registerSchema, loginSchema } from "./auth.validation";

import { verifyJWT } from "../../middleware/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.post("/refresh", refresh);

router.post("/logout", verifyJWT, logout);

router.get("/me", verifyJWT, getCurrentUser);


export default router;