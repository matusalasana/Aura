import {
  Request,
  Response,
  NextFunction,
} from "express";

import { AuthRepository } from "../modules/auth/auth.repository";
import { JWT } from "../utils/jwt";
import logger from "../utils/logger"
import { type Role } from "../modules/auth/auth.validation"


export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No access token",
    });
  }
  
  const accessToken = authHeader.split(" ")[1];

  try {
    // No access token
    if (!accessToken) {
      logger.error("No access token");
      return res.status(401).json({
        message: "No access token",
      });
    }

    // Verify access token
    const decoded = await JWT.verifyAccessToken(accessToken);

    // Attach user to request
    req.user = decoded;

    return next();
    
  } catch (error: any) {
    logger.error(error.message || "Access token expired or invalid");
    return res.status(401).json({
      message: "Access token expired or invalid"
    })
    }
};


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