import {
  Request,
  Response,
  NextFunction,
} from "express";

import { AuthRepository } from "../modules/auth/auth.repository";
import logger from "../utils/logger"
import { type Role } from "../modules/auth/auth.validation"


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
    
    const user = await AuthRepository.findUserById(req.user.userId)
    
    const userRole = user.role;
    

    if (!userRole || !allowedRoles.includes(userRole)) {
      logger.warn(`Unauthorized access attempt by user ${req.user.id} to ${req.originalUrl}`);
      return res.status(403).json({ message: "Forbidden: You do not have the required role" });
    }

    next();
  };
};