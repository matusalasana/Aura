import { Request, Response } from "express";

import {
  registerService,
  loginService,
  logoutService,
  getCurrentUserService,
  refreshTokenService,
} from "./auth.service";

import { 
  accessCookieOptions,
  refreshCookieOptions
} from "../../utils/jwt"

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerService(req.body);

    return res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (err: any) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } =
      await loginService(req.body);

    return res
      .status(200)
      .cookie("accessToken", accessToken, accessCookieOptions)
      .cookie("refreshToken", refreshToken, refreshCookieOptions)
      .json({
        message: "User logged in successfully",
        data: user,
      });
  } catch (err: any) {
    return res.status(401).json({
      message: err.message,
    });
  }
};

// LOGOUT
export const logout = async (req: Request, res: Response) => {
  try {
    await logoutService(req.user!.id);

    return res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({
        message: "User logged out successfully",
      });
  } catch (err: any) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// GET CURRENT USER
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await getCurrentUserService(req.user!.id);

    return res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (err: any) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

// REFRESH TOKEN
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken;

    const { accessToken, refreshToken: newRefreshToken } =
      await refreshTokenService(token);

    return res
      .status(200)
      .cookie("accessToken", accessToken, accessCookieOptions)
      .cookie("refreshToken", newRefreshToken, refreshCookieOptions)
      .json({
        message: "Token refreshed successfully",
      });
  } catch (err: any) {
    return res.status(401).json({
      message: err.message,
    });
  }
};