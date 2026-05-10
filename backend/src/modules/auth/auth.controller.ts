import { Request, Response } from 'express';

import {
  registerService,
  loginService,
  getCurrentUserService,
} from './auth.service';

import { accessCookieOptions } from "../../utils/jwt"


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
    } = await loginService(req.body);
    return res
      .status(200)
      .cookie(
        'accessToken',
        accessToken,
        accessCookieOptions
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