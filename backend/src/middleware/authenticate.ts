import { Request, Response, NextFunction } from "express";
import { auth } from "@/config/auth.js";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    req.user = session.user;

    next();
  } catch (error) {
    next(error);
  }
};