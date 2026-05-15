import { Response } from "express";
import { 
  REFRESH_COOKIE_MAX_AGE,
  ACCESS_COOKIE_MAX_AGE,
  NODE_ENV
} from "../config/env";

const accessCookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: ACCESS_COOKIE_MAX_AGE
  };
  
const refreshCookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: REFRESH_COOKIE_MAX_AGE
  };

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie('refreshToken', token, refreshCookieOptions);
};

export const clearRefreshTokenCookie = (res: Response) => {
  res.clearCookie('refreshToken');
};


export const setAccessTokenCookie = (res: Response, token: string) => {
  res.cookie('accessToken', token, accessCookieOptions);
};

export const clearAccessTokenCookie = (res: Response) => {
  res.clearCookie('accessToken');
};