import { Request, Response } from "express";

import {
  registerService,
  loginService,
  logoutService,
  getCurrentUserService,
  refreshService,
} from "./auth.service";

import { 
  setRefreshTokenCookie,
  clearRefreshTokenCookie
} from "../../utils/cookies";

// REGISTER
export const register = async (
  req: Request,
  res: Response
) => {
  try {
    
    const { 
      accessToken, 
      refreshToken,
      user
    } = await registerService(req.body);

    setRefreshTokenCookie(res, refreshToken);
    
    return res.status(201)
      .json({
        accessToken,
        user
      });
    
  } catch (err: any) {
    console.log("Register error:", err.message);
    return res.status(400).json({
      message: err.message,
    });
  }
};

// LOGIN
export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      accessToken,
      refreshToken,
      user
    } = await loginService(req.body);
    
    setRefreshTokenCookie(res, refreshToken);

    return res.status(200)
      .json({
        user,
        accessToken,
      });

  } catch (err: any) {
    console.error("Login error:", err.message);
    
    return res.status(401).json({
      message: err.message,
    });
  }
};

// REFRESH
export const refresh = async (
  req: Request,
  res: Response
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const {
      newAccessToken,
      newRefreshToken,
    } = await refreshService(refreshToken);
    
    setRefreshTokenCookie(res, newRefreshToken);

    return res.status(200).json({
      newAccessToken,
    });

  } catch (err: any) {
    console.error("Refresh error:", err.message);
    clearRefreshTokenCookie(res);
    return res.status(401).json({
      message: "Session expired",
    });
  }
};

// LOGOUT
export const logout = async (
  req: Request,
  res: Response
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    await logoutService(refreshToken);
    
    clearRefreshTokenCookie(res)

    return res.status(200)
      .json({
        message: "Logged out successfully",
      });

  } catch (err: any) {
    console.log("Logout error:", err.message);
    return res.status(400).json({
      message: err.message,
    });
  }
};

// CURRENT USER
export const getCurrentUser = async (
  req: Request,
  res: Response
) => {
  try {
    
    const user = await getCurrentUserService(req.user!.id);

    return res.status(200).json({
      data: user,
    });

  } catch (err: any) {
    console.log("Get me error:", err.message);
    return res.status(404).json({
      message: err.message,
    });
  }
};