import {
  Request,
  Response,
  NextFunction,
} from "express";

import { 
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken
} from "../utils/jwt";
import { 
  createRefreshTokenRepo,
  updateRefreshTokenRepo,
  findRefreshTokenRepo
} from "../modules/auth/auth.repository";

import { 
  hashToken,
  compareToken
} from "../utils/hash"

type Role = "user" | "admin";

// VERIFY JWT
export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  try {
    
    // ACCESS TOKEN VALIDATION 
    if (!accessToken) {
      throw new Error();
    }

    const decoded = verifyAccessToken(accessToken);

    req.user = decoded;

    return next();

  } catch {

    try {
      
      // ________________  REFRESH FLOW  ________________
      if (!refreshToken) {
        return res.status(401).json({
          message: "Unauthorized"
        });
      }

      // Verify refresh JWT
      const refreshDecoded = verifyRefreshToken(refreshToken);

      // Find refresh token in DB
      const storedToken = await findRefreshTokenRepo(
        refreshDecoded.id
      );

      // Check the one in DB
      if (!storedToken) {
        return res.status(401).json({
          message: "Unauthorized"
        });
      }

      // Check revoked
      if (storedToken.revoked_at) {
        return res.status(401).json({
          message: "Session revoked"
        });
      }

      // Compare hashed tokens
      const isMatch = await compareToken(
        refreshToken,
        storedToken.token
      );

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid refresh token"
        });
      }

      // ________________  ROTATE TOKENS  ________________
      const newAccessToken = generateAccessToken({
        id: refreshDecoded.id,
        role: refreshDecoded.role,
        email: refreshDecoded.email
      });

      const newRefreshToken = generateRefreshToken({
        id: refreshDecoded.id,
        role: refreshDecoded.role,
        email: refreshDecoded.email
      });

      const hashedRefreshToken = await hashToken(newRefreshToken);

      await rotateRefreshTokenRepo(
        refreshDecoded.id,
        hashedRefreshToken
      );

      // ________________  SET COOKIES  ________________
      res.cookie(
        "accessToken",
        newAccessToken,
        {
          httpOnly: true,
          secure: true,
          sameSite: "strict"
        }
      );

      res.cookie(
        "refreshToken",
        newRefreshToken,
        {
          httpOnly: true,
          secure: true,
          sameSite: "strict"
        }
      );

      req.user = {
        id: refreshDecoded.id,
        role: refreshDecoded.role,
        email: refreshDecoded.email
      };

      return next();

    } catch {

      return res.status(401).json({
        message: "Unauthorized"
      });

    }

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