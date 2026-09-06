import { toNodeHandler } from "better-auth/node";
import { auth } from "@/config/auth";

export const authHandler = toNodeHandler(auth);