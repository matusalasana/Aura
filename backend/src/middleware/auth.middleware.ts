import {
  Request,
  Response,
  NextFunction,
} from "express";

import { 
  verifyAccessToken
} from "../utils/jwt";


type Role = "user" | "admin";


export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  // Authorization: Bearer TOKEN
  const authHeader = req.headers.authorization;

  // Extract token from header
  const accessToken = authHeader?.split(" ")[1];

  try {
    // No access token
    if (!accessToken) {
      console.log("No access token");
      return res.status(401).json({
        message: "No access token",
      });
    }

    // Verify access token
    const decoded = verifyAccessToken(accessToken);

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