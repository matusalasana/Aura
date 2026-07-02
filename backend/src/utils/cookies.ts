import { Response } from "express";
import {  Env } from "../config/env";

const accessCookieOptions = {
    httpOnly: true,
    secure: Env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: Env.ACCESS_COOKIE_MAX_AGE
  };
  
const refreshCookieOptions = {
    httpOnly: true,
    secure: Env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: Env.REFRESH_COOKIE_MAX_AGE
  };


const setAccessToken = (res: Response, token: string) => {
  res.cookie('accessToken', token, accessCookieOptions);
};

const clearAccessToken = (res: Response) => {
  res.clearCookie('accessToken');
};

const setRefreshToken = (res: Response, token: string) => {
  res.cookie('refreshToken', token, refreshCookieOptions);
};

const clearRefreshToken = (res: Response) => {
  res.clearCookie('refreshToken');
};


export const Cookie = {
  setAccessToken,
  setRefreshToken,
  clearAccessToken,
  clearRefreshToken
}