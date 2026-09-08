import {
  Request,
  Response,
  NextFunction,
} from "express";

import { AuthRepository } from "../modules/auth/auth.repository.js";
import logger from "../utils/logger.js"


type Role = "customer" | "vendor" | "admin";


// ROLE AUTHORIZATION
export const authorize = (...allowedRoles: Role[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const id = req.user.id as string;
    const user = await AuthRepository.findUserById(id)
    
    const userRole = user.role;
    
    if (!userRole || !allowedRoles.includes(userRole)) {
      logger.warn(`Unauthorized access attempt by user ${req.user.id} to ${req.originalUrl}`);
      return res.status(403).json({ message: "Forbidden: You do not have the required role" });
    }

    next();
  };
};