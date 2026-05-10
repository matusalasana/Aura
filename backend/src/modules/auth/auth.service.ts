import {
  findUserByEmailRepo,
  findUserByIdRepo,
  createUserRepo
} from './auth.repository';

import {
  generateAccessToken,
} from '../../utils/jwt';

import {
  hashPassword,
  comparePassword,
} from '../../utils/hash';


// REGISTER
export const registerService = async (
  userData: any
) => {
  const {
    full_name,
    email,
    password_hash,
  } = userData;

  if (!full_name || !email || !password_hash) {
    throw new Error('Missing required fields');
  }

  const exists = await findUserByEmailRepo(email);

  if (exists) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await hashPassword(
    password_hash
  );

  return await createUserRepo(
    full_name.trim(),
    email.trim(),
    hashedPassword
  );
};


// LOGIN
export const loginService = async (
  userData: any
) => {
  const { email, password_hash } = userData;

  const user = await findUserByEmailRepo(
    email.trim()
  );

  if (!user) {
    throw new Error('User not found');
  }

  const isValid = await comparePassword(
    password_hash,
    user.password_hash
  );

  if (!isValid) {
    throw new Error('Incorrect password');
  }

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    },

    accessToken
  };
};


// CURRENT USER
export const getCurrentUserService = async (
  userId: string
) => {
  const user = await findUserByIdRepo(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const {
    password_hash,
    refresh_token,
    ...safeUser
  } = user;

  return safeUser;
};