import bcrypt from "bcryptjs";
import { 
  SALT_ROUNDS
} from "../config/env"

if(!SALT_ROUNDS){
  throw new Error("Hash Error: missing salt from .env")
};

// PASSWORD HASH AND VERIFICATION 
export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
  return hashedPassword;
}

export const comparePassword = async (password: string, hashedPassword:string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword)
  
  return isMatch;
}

// REFRESH TOKEN  AND VERIFICATION
export const hashToken = async (token: string) => {
  const hashedToken = await bcrypt.hash(token, SALT_ROUNDS);
  
  return hashedToken;
}

export const compareToken = async (token: string, hashedToken: string) => {
  const isMatch = await bcrypt.compare(token, hashedToken)
  
  return isMatch;
}