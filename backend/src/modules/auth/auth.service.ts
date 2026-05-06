import {
  findUserByEmailRepo,
  findUserByIdRepo,
  createUserRepo,
  updateRefreshTokenRepo
} from "./auth.repository";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from "../../utils/jwt";
import {
  hashPassword,
  comparePassword
} from "../../utils/hash";


// REGISTER
export const registerService = async (userData: any) => {
  const {full_name, email, password_hash} = userData;
  if(!full_name || !email || !password_hash){
    throw new Error("Missing required fields");
  };
  
  const normalizedName = full_name ? full_name as string : undefined;
  const normalizedEmail = email ? email.trim() as string : undefined;
  const normalizedPassword = password_hash ? password_hash.trim() as string : undefined;
  
  const exists = await findUserByEmailRepo(normalizedEmail);

  if (exists) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await hashPassword(normalizedPassword);
  
  const result = await createUserRepo(
    normalizedName, 
    normalizedEmail, 
    hashedPassword
  ); 
  
  return result;
};

// LOGIN
export const loginService = async (userData: any) => {
  const { email, password_hash } = userData;
  
  const user = await findUserByEmailRepo(email);

  if (!user) {
    throw new Error("User not found");
  }

  const isValid = await comparePassword(password_hash, user.password_hash);

  if (!isValid) {
    throw new Error ("Incorrect Password");
  }

  const refreshToken = generateRefreshToken({ id: user.id }); 
  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role     
  });

  await updateRefreshTokenRepo(user.id, refreshToken);

  const safeUser = {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
  };

  return { user: safeUser, accessToken, refreshToken };
};

// LOGOUT
export const logoutService = async (userId: string) => {
  await updateRefreshTokenRepo(userId, null);
};


export const refreshAccessTokenService = async(token: string) => {
  try {
    const decoded = verifyRefreshToken(token);

    const user = await findUserByIdRepo(decoded.id);

    if (!user || user.refresh_token !== token) {
      throw new Error("Invalid refresh token");
    }

    const refreshToken = generateRefreshToken({id: user.id});
    const accessToken = generateAccessToken({
      id: user.id, 
      email: user.email, 
      role: user.role
    });

    await updateRefreshTokenRepo(user.id, refreshToken);

    return { accessToken, refreshToken};
  } catch {
    throw new Error ("Expired refresh token");
  }
};

export const getCurrentUserService = async(userId: string) => {
  const user = await findUserByIdRepo(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const { password_hash, refresh_token, ...safeUser } = user;

  return safeUser;
};