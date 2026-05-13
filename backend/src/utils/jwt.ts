import jwt from "jsonwebtoken";
import { 
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET, 
  REFRESH_TOKEN_EXPIRY,
  NODE_ENV
} from "../config/env";
import { UserPayload } from "../types/index"

console.log(ACCESS_TOKEN_SECRET);
console.log(ACCESS_TOKEN_EXPIRY);
console.log(REFRESH_TOKEN_SECRET);
console.log(REFRESH_TOKEN_EXPIRY);
console.log(NODE_ENV);


if(!ACCESS_TOKEN_SECRET || !ACCESS_TOKEN_EXPIRY || !REFRESH_TOKEN_EXPIRY || !REFRESH_TOKEN_SECRET){
  throw new Error("Missing JWT env variables");
}



export const generateAccessToken = (payload: UserPayload) => {
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

