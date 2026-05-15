import { Response } from "express";
import { 
  REFRESH_COOKIE_MAX_AGE,
  NODE_ENV
} from "../config/env";

const cookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: REFRESH_COOKIE_MAX_AGE
  };

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie('refreshToken', token, cookieOptions);
};

export const clearRefreshTokenCookie = (res: Response) => {
  res.clearCookie('refreshToken');
};