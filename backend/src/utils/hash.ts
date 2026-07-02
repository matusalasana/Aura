import bcrypt from "bcryptjs";
import { Env } from "../config/env"

if(!Env.SALT_ROUNDS){
  throw new Error("Hash Error: missing salt from .env")
};

// PASSWORD HASH AND VERIFICATION 
const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, Env.SALT_ROUNDS);
  
  return hashedPassword;
}

const comparePassword = async (password: string, hashedPassword:string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword)
  
  return isMatch;
}

// REFRESH TOKEN  AND VERIFICATION
const hashToken = async (token: string) => {
  const hashedToken = await bcrypt.hash(token, Env.SALT_ROUNDS);
  
  return hashedToken;
}

const compareToken = async (token: string, hashedToken: string) => {
  const isMatch = await bcrypt.compare(token, hashedToken)
  
  return isMatch;
}

// OTP HASH AND VERIFICATION
const hashOTP = async (otp: string) => {
  const hashedOTP = await bcrypt.hash(otp, Env.SALT_ROUNDS);
  
  return hashedOTP;
}

const compareOTP = async (otp: string, hashedOTP: string) => {
  const isMatch = await bcrypt.compare(otp, hashedOTP)
  
  return isMatch;
}


export const HashUtils = {
  hashPassword,
  hashToken,
  hashOTP,
  compareOTP,
  comparePassword,
  compareToken
}