// jwt.ts
import jwt from "jsonwebtoken";
import { 
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET, 
  REFRESH_TOKEN_EXPIRY,
  ACCESS_TOKEN_EXPIRY 
} from "../config/env";

if(!ACCESS_TOKEN_SECRET || !ACCESS_TOKEN_EXPIRY || !REFRESH_TOKEN_SECRET || !REFRESH_TOKEN_EXPIRY){
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