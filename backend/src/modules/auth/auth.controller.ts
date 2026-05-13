import { Request, Response } from "express";
import {
  registerService,
  loginService,
  logoutService,
  getCurrentUserService,
  refreshService
} from "./auth.service";

import { refreshCookieOptions } from "../../config/cookieOptions";

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerService(req.body);
    return res.status(201).json(user);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } =
      await loginService(req.body);

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, refreshCookieOptions)
      .json({
        data: user,
        accessToken,
      });

  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
};

// REFRESH
export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const { accessToken, newRefreshToken } =
      await refreshService(refreshToken);

    return res
      .status(200)
      .cookie("refreshToken", newRefreshToken, refreshCookieOptions)
      .json({ accessToken });

  } catch (err: any) {
    return res.status(401).json({ message: "Session expired" });
  }
};

// LOGOUT (session-based)
export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    await logoutService(refreshToken);

    return res
      .status(200)
      .clearCookie("refreshToken")
      .json({ message: "Logged out successfully" });

  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

// CURRENT USER
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await getCurrentUserService(req.user!.id);
    return res.status(200).json(user);
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
};