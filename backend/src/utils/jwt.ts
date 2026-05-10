import jwt from "jsonwebtoken";
import { 
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET, 
  REFRESH_TOKEN_EXPIRY,
  REFRESH_COOKIE_MAX_AGE,
  ACCESS_COOKIE_MAX_AGE,
  NODE_ENV
} from "../config/env";

console.log(ACCESS_TOKEN_EXPIRY);
console.log(REFRESH_TOKEN_EXPIRY);


if(!ACCESS_TOKEN_SECRET || !ACCESS_TOKEN_EXPIRY || !ACCESS_COOKIE_MAX_AGE || !REFRESH_TOKEN_EXPIRY || !REFRESH_COOKIE_MAX_AGE || !REFRESH_TOKEN_SECRET){
  throw new Error("Missing JWT env variables");
}

export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new Error("Invalid access token");
  }
};

export const accessCookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: NODE_ENV === 'production' ? 'none' : 'lax' as const,
  maxAge: Number(ACCESS_COOKIE_MAX_AGE),
};


export const generateRefreshToken = (payload: any) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

export const refreshCookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: NODE_ENV === 'production' ? 'none' : 'lax' as const,
  maxAge: Number(REFRESH_COOKIE_MAX_AGE),
};