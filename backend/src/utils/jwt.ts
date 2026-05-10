import jwt from "jsonwebtoken";
import { 
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  NODE_ENV
} from "../config/env";

if(!ACCESS_TOKEN_SECRET || !ACCESS_TOKEN_EXPIRY){
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
  maxAge: 15 * 60 * 1000, // 15 minutes
};