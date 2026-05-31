import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { Cookie } from "../../utils/cookies";

// REGISTER
const register = async (
  req: Request,
  res: Response
) => {
  try {
    const { 
      accessToken, 
      refreshToken,
      user
    } = await AuthService.register(req.body);

    Cookie.setRefreshToken(res, refreshToken);
    Cookie.setAccessToken(res, accessToken);
    
    return res.status(201)
      .json(user);
      
  } catch (err: any) {
    console.log("Register error:", err.message);
    return res.status(400).json({
      message: err.message,
    });
  }
};

// LOGIN
const login = async (
  req: Request,
  res: Response
) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    const {
      accessToken,
      refreshToken,
      user
    } = await AuthService.login(req.body);
    
    Cookie.setRefreshToken(res, refreshToken);
    Cookie.setAccessToken(res, accessToken);
    
    return res.status(200)
      .json(user);

  } catch (err: any) {
    console.error("Login error:", err.message);
    
    return res.status(401).json({
      message: err.message,
    });
  }
};

// REFRESH
const refresh = async (
  req: Request,
  res: Response
) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;

    const {
      newAccessToken,
      newRefreshToken,
    } = await AuthService.refresh(oldRefreshToken);
    
    Cookie.setRefreshToken(res, newRefreshToken);
    Cookie.setAccessToken(res, newAccessToken);

    return res.status(200).json({ message: "Token refreshed" });

  } catch (err: any) {
    console.error("Refresh error:", err.message);
    Cookie.clearRefreshToken(res);
    Cookie.clearAccessToken(res);
    return res.status(401).json({
      message: "Session expired",
    });
  }
};

// LOGOUT
const logout = async (
  req: Request,
  res: Response
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    await AuthService.logout(refreshToken);
    
    Cookie.clearRefreshToken(res);
    Cookie.clearAccessToken(res);

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
const getMe = async (
  req: Request,
  res: Response
) => {
  try {
    
    const user = await AuthService.getMe(req.user!.id);

    return res.status(200).json(user);

  } catch (err: any) {
    console.log("Get me error:", err.message);
    return res.status(404).json({
      message: err.message,
    });
  }
};


export const AuthController = {
  register,
  login,
  refresh,
  logout,
  getMe
}