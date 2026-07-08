import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { Cookie } from "../../utils/cookies";
import logger from "../../utils/logger";

/* -------------------------- REGISTER CUSTOMER -------------------------- */

const registerCustomer = async (req, res) => {
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
    logger.error(`Register customer error: ${error.cause || error.message}`);

    return res.status(400).json({
      message: error.message,
    });
  }
};

const registerVendor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      store_name,
      description,
    } = req.body;

    const files = req.files as any;

    const vendor = await AuthService.registerVendor({
      userId: req.user?.userId,

      name,
      email,
      password,

      store_name,
      description,

      logo_buffer: files?.logo?.[0]?.buffer,
      banner_buffer: files?.banner?.[0]?.buffer,
      license_buffer: files?.license?.[0]?.buffer,
    });

    return res.status(200).json({
      message: "OTP sent to your email",
    });
  } catch (error: any) {
    logger.error(`Register vendor error: ${error.message}`);

    return res.status(400).json({
      message: error.message,
    });
  }
};


const verifyEmail = async (req: Request, res: Response) => {
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
    logger.error(`${error.cause || error.message}`)

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req: Request, res: Response) => {
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
    logger.error(`${error.cause || error.message}`)

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const refresh = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken } =
      await AuthService.refresh(req.cookies.refreshToken);

    Cookie.setRefreshToken(res, refreshToken);

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error: any) {
    logger.error(`${error.cause || error.message}`)
    console.log(error)

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    await AuthService.logout(req.cookies.refreshToken);

    Cookie.clearRefreshToken(res);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error: any) {
    logger.error(`${error.cause || error.message}`)

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const logoutAll = async (req: Request, res: Response) => {
  try {
    await AuthService.logoutAll(req.user.id);

    Cookie.clearRefreshToken(res);

    return res.status(200).json({
      success: true,
      message: "All sessions revoked successfully.",
    });
  } catch (error: any) {
    logger.error(`${error.cause || error.message}`)

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    await AuthService.forgotPassword(req.body);

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent.",
    });
  } catch (error: any) {
    logger.error(`${error.cause || error.message}`)

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    await AuthService.resetPassword(req.body);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error: any) {
    logger.error(`${error.cause || error.message}`)

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const resendOTP = async (req: Request, res: Response) => {
  try {
    await AuthService.resendOTP(req.body);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });
  } catch (error: any) {
    logger.error(`${error.cause || error.message}`)

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.getMe(req.user.id);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    logger.error(`${error.cause || error.message}`)

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const AuthController = {
  registerCustomer,
  registerVendor,
  
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