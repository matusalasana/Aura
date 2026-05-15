import {
  findUserByEmailRepo,
  findUserByIdRepo,
  registerUserRepo,
  createRefreshTokenRepo,
  rotateRefreshTokenRepo,
  deleteRefreshTokenRepo,
  findSessionByIdRepo,
} from "./auth.repository";
import { 
  RegisterInput,
  LoginInput
} from "./auth.validation"

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
export const registerService = async (
  userData: RegisterInput) => {
  const {
    full_name,
    email,
    password_hash,
  } = userData;

  const exists = await findUserByEmailRepo(email);

  if (exists) {
    throw new Error("Email already exists");
  };

  const hashedPassword = await hashPassword(password_hash);

  const newUser = await registerUserRepo(
    full_name,
    email,
    hashedPassword
  );
  
  const payload = {
    id: newUser.id,
    role: newUser.role,
    email: newUser.email
  };
  
  const refreshToken = await generateRefreshToken(payload);
  const accessToken = await generateAccessToken(payload);
  
  const hashedRefreshToken = await hashToken(refreshToken);
  
  await createRefreshTokenRepo(newUser.id, hashedRefreshToken);
  
  return { accessToken, refreshToken, user: newUser };
  
};

// LOGIN
export const loginService = async (
  userData: LoginInput
) => {
  const {
    email,
    password_hash,
  } = userData;

  const user = await findUserByEmailRepo(email);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await comparePassword(
    password_hash,
    user.password_hash
  );

  if (!isMatch) {
    throw new Error("Invalid password");
  }
  
  const payload = {
    id: user.id,
    role: user.role,
    email: user.email,
  };

  const accessToken = await generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);
  
  const hashedRefreshToken = await hashToken(refreshToken);

  await rotateRefreshTokenRepo(
    user.id,
    hashedRefreshToken
  );

  return {
    accessToken,
    refreshToken,
    user
  };
};

// REFRESH
export const refreshService = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const decoded = verifyRefreshToken(refreshToken);

  const payload = {
    id: decoded.id,
    role: decoded.role,
    email: decoded.email
  };

  const newAccessToken = await generateAccessToken(payload);
  const newRefreshToken = await generateRefreshToken(payload);

  const hashed = await hashToken(newRefreshToken);

  await rotateRefreshTokenRepo(decoded.id, hashed);

  return {
    newAccessToken,
    newRefreshToken,
  };
};


// LOGOUT
export const logoutService = async (
  refreshToken: string
) => {
  
  const decoded = verifyRefreshToken(refreshToken);

  await deleteRefreshTokenRepo(
    decoded.id
  );
};

// CURRENT USER
export const getCurrentUserService =
  async (userId: string) => {
    
    if (!userId) {
      throw new Error("user Id not found");
    };
    
    const user = await findUserByIdRepo(userId);

    if (!user) {
      throw new Error("User not found");
    };

    const {
      password_hash,
      ...safe
    } = user;

    return safe;
  };