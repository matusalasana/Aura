import {
  findUserByEmailRepo,
  findUserByIdRepo,
  registerUserRepo,
  updateRefreshTokenRepo,
} from "./auth.repository";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";

import { hashPassword, comparePassword } from "../../utils/hash";

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
  });

  await updateRefreshTokenRepo(user.id, refreshToken);

  return {
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

// LOGOUT
export const logoutService = async (userId: string) => {
  await updateRefreshTokenRepo(userId, null);
};

// CURRENT USER
export const getCurrentUserService = async (userId: string) => {
  const user = await findUserByIdRepo(userId);

  if (!user) throw new Error("User not found");

  const { password_hash, refresh_token, ...safeUser } = user;

  return safeUser;
};

// REFRESH TOKEN
export const refreshTokenService = async (token: string) => {
  if (!token) throw new Error("No refresh token");

  const decoded = verifyRefreshToken(token);

  const user = await findUserByIdRepo(decoded.id);

  if (!user || user.refresh_token !== token) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const newRefreshToken = generateRefreshToken({
    id: user.id,
  });

  await updateRefreshTokenRepo(user.id, newRefreshToken);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};