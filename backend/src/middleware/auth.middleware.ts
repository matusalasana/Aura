import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  accessCookieOptions,
  refreshCookieOptions
} from "../utils/jwt";
import { 
  updateRefreshTokenRepo,
  findUserByIdRepo} from "../modules/auth/auth.repository.ts";


export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken; 

  // 1. Try verifying the Access Token
  if (accessToken) {
    try {
      const decoded = verifyAccessToken(accessToken) as any;
      req.user = decoded;
      return next();
    } catch (err: any) {
      console.log("Access token expired/invalid, attempting refresh...");
    }
  }

  // 2. Try verifying the Refresh Token
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized: No tokens provided" });
  }

  try {
    const decoded = (await verifyRefreshToken(refreshToken)) as any;

    // Ensure you await the DB call
    const user = await findUserByIdRepo(decoded.id);

    if (!user || user.refresh_token !== refreshToken) {
      return res.status(401).json({ 
        message: "Invalid refresh token" 
      });
    }

    // 3. Generate New Tokens
    const newAccessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const newRefreshToken = generateRefreshToken({ id: user.id });

    await updateRefreshTokenRepo(user.id, newRefreshToken);

    // 4. Set New Cookies
    res.cookie("accessToken", newAccessToken, accessCookieOptions);
    res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);

    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (error: any) {
    console.error("Refresh Token Error:", error.message);
    return res.status(401).json({ message: "Session expired, please login again" });
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