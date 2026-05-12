import bcrypt from "bcryptjs";
import { 
  SALT_FOR_PWD_HASH,
  SALT_FOR_TOKEN_HASH
} from "../config/env"

if(!SALT_FOR_PWD_HASH){
  throw new Error("Hash Error: missing salt from .env")
};

// PASSWORD HASH
export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, Number(SALT_FOR_PWD_HASH));
  
  return hashedPassword;
}

export const comparePassword = async (password: string, hashedPassword:string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword)
  
  return isMatch;
}

// REFRESH TOKEN HASH
export const hashToken = async (token: string) => {
  const hashedToken = await bcrypt.hash(token, Number(SALT_FOR_TOKEN_HASH));
  
  return hashedToken;
}

export const compareToken = async (token: string, hashedToken: string) => {
  const isMatch = await bcrypt.compare(token, hashedToken)
  
  return isMatch;
}