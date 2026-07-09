import {
  Request,
  Response,
  NextFunction,
} from "express";

import { JWT } from "../utils/jwt";
import logger from "../utils/logger"

type Role = "customer" | "admin" | "vendor" | "support";


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
export const authorize = (
  ...roles: Role[]
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (
      !req.user.role ||
      !roles.includes(req.user.role as Role)
    ) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
};