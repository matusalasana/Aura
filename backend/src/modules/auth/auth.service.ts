import {
  findUserByEmailRepo,
  findUserByIdRepo,
  registerUserRepo,
  rotateRefreshTokenRepo,
  createRefreshTokenRepo,
  revokeRefreshTokenRepo
} from "./auth.repository";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";

import { 
  hashPassword, 
  comparePassword,
  hashToken
} from "../../utils/hash";

import type { RegisterInput, LoginInput } from "./auth.validation";

// REGISTER
export const registerService = async (userData: RegisterInput) => {
  const { full_name, email, password_hash } = userData;

  const exists = await findUserByEmailRepo(email);

  if (exists) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await hashPassword(password_hash);

  return await registerUserRepo(
    full_name.trim(),
    email.trim(),
    hashedPassword
  );
};

// LOGIN
export const loginService = async (userData: LoginInput) => {
  const { email, password_hash } = userData;

  const user = await findUserByEmailRepo(email);

  if (!user) throw new Error("User not found");

  const isMatch = await comparePassword(password_hash, user.password_hash);

  if (!isMatch) throw new Error("Incorrect password");

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const hashedRefreshToken = await hashToken(refreshToken);
  await createRefreshTokenRepo(user.id, hashedRefreshToken);

  return {
    user,
    accessToken,
    refreshToken,
  };
};

// LOGOUT
export const logoutService = async (userId: string) => {
  await revokeRefreshTokenRepo(userId);
};

// CURRENT USER
export const getCurrentUserService = async (userId: string) => {
  const user = await findUserByIdRepo(userId);

  if (!user) throw new Error("User not found");

  const { password_hash, refresh_token, ...safeUser } = user;

  return safeUser;
};