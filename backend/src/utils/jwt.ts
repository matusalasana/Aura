import jwt from "jsonwebtoken";
import { Env } from "../config/env";
import { type UserPayload } from "../modules/auth/auth.validation"


if(!Env.ACCESS_TOKEN_SECRET || !Env.ACCESS_TOKEN_EXPIRY || !Env.REFRESH_TOKEN_EXPIRY || !Env.REFRESH_TOKEN_SECRET){
  throw new Error("Missing JWT env variables");
}



const generateAccessToken = (payload: UserPayload) => {
  return jwt.sign(payload, Env.ACCESS_TOKEN_SECRET, { expiresIn: Env.ACCESS_TOKEN_EXPIRY });
};

const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, Env.ACCESS_TOKEN_SECRET) as UserPayload;
  } catch (error) {
    throw new Error("Invalid access token");
  }
};




const generateRefreshToken = (payload: UserPayload) => {
  return jwt.sign(payload, Env.REFRESH_TOKEN_SECRET, { expiresIn: Env.REFRESH_TOKEN_EXPIRY });
};

const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, Env.REFRESH_TOKEN_SECRET) as UserPayload;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};


export const JWT = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
}