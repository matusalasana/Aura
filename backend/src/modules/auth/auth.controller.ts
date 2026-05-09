import { Request, Response } from 'express';

import {
  registerService,
  loginService,
  logoutService,
  getCurrentUserService,
  // refreshService
} from './auth.service';

import { NODE_ENV } from '../../config/env';

const accessCookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: NODE_ENV === 'production' ? 'none' : 'lax' as const,
  maxAge: 15 * 60 * 1000, // 15 minutes
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: NODE_ENV === 'production' ? 'none' : 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};


// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerService(req.body);

    return res.status(201).json({
      message: 'User registered successfully',
      data: user,
    });

  } catch (err: any) {
    console.log('Register error:', err.message);

    return res.status(400).json({
      message: err.message,
    });
  }
};


// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const {
      user,
      accessToken,
      refreshToken,
    } = await loginService(req.body);
    console.log(user)
    return res
      .status(200)
      .cookie(
        'accessToken',
        accessToken,
        accessCookieOptions
      )
      .cookie(
        'refreshToken',
        refreshToken,
        refreshCookieOptions
      )
      .json({
        message: 'User logged in successfully',
        data: user,
      });

  } catch (err: any) {
    console.log('Login error:', err.message);

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
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .json({
        message: 'User logged out successfully',
      });

  } catch (err: any) {
    console.log('Logout error:', err.message);

    return res.status(400).json({
      message: err.message,
    });
  }
};


// GET CURRENT USER
export const getCurrentUser = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await getCurrentUserService(
      req.user!.id
    );

    return res.status(200).json({
      message: 'User fetched successfully',
      data: user,
    });

  } catch (err: any) {
    console.log(
      'Get current user error:',
      err.message
    );

    return res.status(404).json({
      message: err.message,
    });
  }
};

// REFRESH 
// REFRESH 
// export const refresh = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const oldRefreshToken = req.cookies?.refreshToken;

//     if (!oldRefreshToken) {
//       console.log("Refresh attempt: No refresh token in cookies");
//       return res.status(401).json({
//         message: "No refresh token provided",
//       });
//     }

//     const {
//       newAccessToken,
//       newRefreshToken,
//     } = await refreshService(oldRefreshToken);

//     res.cookie(
//       "accessToken",
//       newAccessToken,
//       accessCookieOptions
//     );

//     res.cookie(
//       "refreshToken",
//       newRefreshToken,
//       refreshCookieOptions
//     );

//     return res.status(200).json({
//       message: "Tokens refreshed",
//     });

//   } catch (err: any) {
//     console.log("Refresh error:", err.message);
    
//     // Clear invalid cookies
//     res.clearCookie('accessToken');
//     res.clearCookie('refreshToken');
    
//     return res.status(401).json({
//       message: err.message || "Unauthorized",
//     });
//   }
// };