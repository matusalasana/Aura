import { Response } from "express";
import {  Env } from "../config/env";

const isProduction = Env.NODE_ENV === 'production';
  
const refreshCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: Env.REFRESH_COOKIE_MAX_AGE
  };

const setRefreshToken = (res: Response, token: string) => {
  res.cookie('refreshToken', token, refreshCookieOptions);
};

const clearRefreshToken = (res: Response) => {
  res.clearCookie('refreshToken');
};


export const Cookie = {
  setRefreshToken,
  clearRefreshToken
}