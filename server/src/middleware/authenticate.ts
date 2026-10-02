import { Request, Response, NextFunction } from "express";
import { auth } from "@/config/auth.js";
import { type User } from "@/db/schema/auth.js";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: new Headers(req.headers as Record<string, string>),
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    req.user = session.user as User;

    next();
  } catch (error) {
    next(error);
  }
};