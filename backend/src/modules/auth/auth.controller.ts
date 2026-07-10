import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { Cookie } from "../../utils/cookies";
import logger from "../../utils/logger";


// REGISTER CUSTOMER
const registerCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    await AuthService.registerCustomer({
      name,
      email,
      password,
    });

    return res.status(200).json({
      message: "OTP sent to your email",
    });
  } catch (error: any) {
    next(error)
  }
};

// VERIFY EMAIL
const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      user,
      accessToken,
      refreshToken,
    } = await AuthService.verifyEmail(req.body);

    Cookie.setRefreshToken(res, refreshToken);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      accessToken,
      user,
    });
  } catch (error: any) {
    next(error)
  }
};

// LOGIN
const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      user,
      accessToken,
      refreshToken,
    } = await AuthService.login(req.body);

    Cookie.setRefreshToken(res, refreshToken);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      accessToken,
      user,
    });
  } catch (error: any) {
    next(error)
  }
};

// REFRESH 
const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = await AuthService.refresh(req.cookies.refreshToken);

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error: any) {
    next(error)
  }
};

// LOGOUT
const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await AuthService.logout(req.cookies.refreshToken);

    Cookie.clearRefreshToken(res);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error: any) {
    next(error)
  }
};

// LOGOUT ALL
const logoutAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await AuthService.logoutAll(req.user?.userId);

    Cookie.clearRefreshToken(res);

    return res.status(200).json({
      success: true,
      message: "All sessions revoked successfully.",
    });
  } catch (error: any) {
    next(error)
  }
};

// FORGOT PASSWORD
const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await AuthService.forgotPassword(req.body);

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent.",
    });
  } catch (error: any) {
    next(error)
  }
};

// RESET PASSWORD
const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await AuthService.resetPassword(req.body);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error: any) {
    next(error)
  }
};

// RESEND OTP
const resendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await AuthService.resendOTP(req.body);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });
  } catch (error: any) {
    next(error)
  }
};

// GET ME
const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await AuthService.getMe(req.user?.userId);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    next(error)
  }
};

export const AuthController = {
  registerCustomer,
  
  verifyEmail,
  
  login,
  
  refresh,
  
  logout,
  logoutAll,
  
  getMe,
  
  forgotPassword,
  resetPassword,
  resendOTP,
};