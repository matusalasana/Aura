import { AuthRepository } from "./auth.repository";
import { 
  RegisterInput,
  LoginInput
} from "./auth.validation"
import { JWT } from "../../utils/jwt";
import { HashUtils } from "../../utils/hash";

// REGISTER
const register = async (userData: RegisterInput) => {
  const { first_name, last_name, email, password } = userData;
  const exists = await AuthRepository.findUserByEmail(email);

  if (exists) {
    throw new Error("Email already exists");
  };

  const hashedPassword = 
    await HashUtils.hashPassword(password);

  const newUser = await AuthRepository.register(
    first_name, 
    last_name,
    email,
    hashedPassword
  );
  
  const payload = {
    id: newUser.id,
    role: newUser.role,
    email: newUser.email
  };
  
  const refreshToken = await JWT.generateRefreshToken(payload);
  const accessToken = await JWT.generateAccessToken(payload);
  
  const hashedRefreshToken = 
    await HashUtils.hashToken(refreshToken);
  
  await AuthRepository.createRefreshToken(
    newUser.id, 
    hashedRefreshToken
  );
  
  return { accessToken, refreshToken, user: newUser };
  
};

// LOGIN
const login = async (
  userData: LoginInput
) => {
  const {
    email,
    password,
  } = userData;

  const user = await AuthRepository.findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await HashUtils.comparePassword(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid password");
  }
  
  const payload = {
    id: user.id,
    role: user.role,
    email: user.email,
  };

  const accessToken = await JWT.generateAccessToken(payload);
  const refreshToken = await JWT.generateRefreshToken(payload);
  
  const hashedRefreshToken = 
    await HashUtils.hashToken(refreshToken);

  await AuthRepository.rotateRefreshToken(
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
const refresh = async (oldRefreshToken: string) => {
  
  if (!oldRefreshToken) {
    throw new Error("No refresh token");
  }

  const decoded = JWT.verifyRefreshToken(oldRefreshToken);

  const payload = {
    id: decoded.id,
    role: decoded.role,
    email: decoded.email
  };

  const newAccessToken = await JWT.generateAccessToken(payload);
  const newRefreshToken = await JWT.generateRefreshToken(payload);

  const hashed = await HashUtils.hashToken(newRefreshToken);

  await AuthRepository.rotateRefreshToken(decoded.id, hashed);

  return {
    newAccessToken,
    newRefreshToken,
  };
};


// LOGOUT
const logout = async (
  oldRefreshToken: string
) => {
  
  if (!oldRefreshToken) {
    throw new Error("No refresh token");
  }
  
  const decoded = JWT.verifyRefreshToken(oldRefreshToken);

  await AuthRepository.deleteRefreshToken(
    decoded.id
  );
};

// CURRENT USER
const getMe =
  async (userId: string) => {
    
    if (!userId) {
      throw new Error("user Id not found");
    };
    
    const user = await AuthRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    };

    const {
      password_hash,
      ...safe
    } = user;

    return safe;
  };
  
export const AuthService = {
  register,
  login,
  logout,
  refresh,
  getMe
}