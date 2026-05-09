import bcrypt from "bcryptjs";
import { SALT_FOR_PWD_HASH } from "../config/env"

if(!SALT_FOR_PWD_HASH){
  throw new Error("Hash Error: missing salt from .env")
};

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, Number(SALT_FOR_PWD_HASH));
  
  return hashedPassword;
}

export const comparePassword = async (password: string, hashedPassword:string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword)
  
  return isMatch;
}