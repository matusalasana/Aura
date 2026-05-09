import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, verifyRefreshToken, generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { findUserByIdRepo, updateRefreshTokenRepo } from '../modules/auth/auth.repository';
import { NODE_ENV } from '../config/env';

const accessCookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: NODE_ENV === 'production' ? 'none' : 'lax' as const,
  maxAge: 15 * 60 * 1000,   // 15 minutes – match auth.controller.ts
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: NODE_ENV === 'production' ? 'none' : 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    // 1. Try to verify access token
    if (accessToken) {
      try {
        const decoded = verifyAccessToken(accessToken) as any;
        req.user = decoded;
        return next(); // ✅ valid access token
      } catch (err) {
        console.log("Access token expired/invalid – attempting refresh");
      }
    }

    // 2. No access token or invalid – require refresh token
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    let decodedRefresh;
    try {
      decodedRefresh = verifyRefreshToken(refreshToken) as any;
    } catch (err) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await findUserByIdRepo(decodedRefresh.id);
    if (!user || user.refresh_token !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // 3. Rotate tokens
    const newAccessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const newRefreshToken = generateRefreshToken({ id: user.id });

    await updateRefreshTokenRepo(user.id, newRefreshToken);

    res.cookie("accessToken", newAccessToken, accessCookieOptions);
    res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);

    req.user = { id: user.id, email: user.email, role: user.role };
    return next();

  } catch (err) {
    console.error("JWT middleware error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}; 