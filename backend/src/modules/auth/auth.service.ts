import {
  findUserByEmailRepo,
  findUserByIdRepo,
  registerUserRepo,
  createRefreshTokenRepo,
  rotateRefreshTokenRepo,
  revokeRefreshTokenRepo,
  findSessionByIdRepo,
} from "./auth.repository";

import { randomUUID } from "crypto";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";

import {
  hashPassword,
  comparePassword,
  hashToken,
} from "../../utils/hash";

// REGISTER
export const registerService = async (userData: any) => {
  const { full_name, email, password_hash } = userData;

  const exists = await findUserByEmailRepo(email);
  if (exists) throw new Error("Email already exists");

  const hashed = await hashPassword(password_hash);

  return await registerUserRepo(
    full_name,
    email,
    hashed
  );
};

// LOGIN
export const loginService = async (userData: any) => {
  const { email, password_hash } = userData;

  const user = await findUserByEmailRepo(email);
  if (!user) throw new Error("User not found");

  const ok = await comparePassword(password_hash, user.password_hash);
  if (!ok) throw new Error("Invalid password");

  const sessionId = randomUUID();

  const payload = {
    id: user.id,
    role: user.role,
    email: user.email,
    sessionId,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const hashedRefreshToken = await hashToken(refreshToken);

  await createRefreshTokenRepo(
    user.id,
    sessionId,
    hashedRefreshToken
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};

// REFRESH
export const refreshService = async (refreshToken: string) => {
  if (!refreshToken) throw new Error("No refresh token");

  const decoded = verifyRefreshToken(refreshToken);

  const session = await findSessionByIdRepo(
    decoded.id,
    decoded.sessionId
  );

  if (!session || session.revoked_at) {
    throw new Error("Invalid session");
  }

  const payload = {
    id: decoded.id,
    role: decoded.role,
    email: decoded.email,
    sessionId: decoded.sessionId,
  };

  const accessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  const hashed = await hashToken(newRefreshToken);

  await rotateRefreshTokenRepo(
    decoded.sessionId,
    hashed
  );

  return {
    accessToken,
    newRefreshToken,
  };
};

// LOGOUT (single session)
export const logoutService = async (refreshToken: string) => {
  const decoded = verifyRefreshToken(refreshToken);

  await revokeRefreshTokenRepo(decoded.sessionId);
};

// CURRENT USER
export const getCurrentUserService = async (userId: string) => {
  const user = await findUserByIdRepo(userId);
  if (!user) throw new Error("User not found");

  const { password_hash, ...safe } = user;
  return safe;
};