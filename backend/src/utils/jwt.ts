import jwt from "jsonwebtoken";
import { Env } from "../config/env";
import { UserPayload } from "../types/index"


if(!Env.ACCESS_TOKEN_SECRET || !Env.ACCESS_TOKEN_EXPIRY || !Env.REFRESH_TOKEN_EXPIRY || !Env.REFRESH_TOKEN_SECRET){
  throw new Error("Missing JWT env variables");
}



const generateAccessToken = (payload: UserPayload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new Error("Invalid access token");
  }
};




const generateRefreshToken = (payload: UserPayload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
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