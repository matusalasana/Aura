import {
  Request,
  Response,
  NextFunction,
} from "express";

import { JWT } from "../utils/jwt";


type Role = "customer" | "admin" | "vendor" | "support";


export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const accessToken = req.cookies?.accessToken;

  try {
    // No access token
    if (!accessToken) {
      console.log("No access token");
      return res.status(401).json({
        message: "No access token",
      });
    }

    // Verify access token
    const decoded = await verifyAccessToken(accessToken);

    // Attach user to request
    req.user = decoded;

    return next();
    
  } catch (error: any) {
    console.log(error.message || "Access token expired or invalid");
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