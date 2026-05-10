import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  verifyAccessToken,
} from "../utils/jwt";
import { accessCookieOptions } from "../utils/jwt"

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const accessToken = req.cookies?.accessToken;

  try {
    if (!accessToken) {
      return res.status(404).json({
        message: "Token not found, please login first"
      });
    };

    const decoded = verifyAccessToken(accessToken) as any;

    req.user = decoded;
    return next();
  } catch (err: any) {
    console.log("Token expired/invalid");
    return res.status(401).json({
      message: "Unauthorized"
    });
  }


};

// ROLE BASED AUTHORIZATION
export const authorize = (
  ...roles: string[]
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (
      !req.user ||
      !roles.includes(req.user.role)
    ) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    next();
  };
};