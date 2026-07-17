import { db } from "../../db";
import { users } from "../../db/schema/users";
import { refreshTokens } from "../../db/schema/refreshTokens";
import { otps } from "../../db/schema/otps";
import { type OTPType } from "./auth.validation";
import { type RegisterCustomerDBInput } from "./auth.validation"

import { eq, and, gt, lt } from "drizzle-orm";


const findUserByEmail = async (email: string) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user[0] || null;
};

const findUserById = async (id: string) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  return user[0] || null;
};

const registerCustomer = async (
  data: RegisterCustomerDBInput) => {
  const [user] = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role,
      isVerified: true,
    })
    .returning();

  return user;
};

const updatePassword = async ({
  email,
  passwordHash,
}: {
  email: string;
  passwordHash: string;
}) => {
  await db
    .update(users)
    .set({
      passwordHash,
      updatedAt: new Date(),
    })
    .where(eq(users.email, email));
};

const createRefreshToken = async ({
  userId,
  tokenHash,
  sessionId,
  expiresAt,
  device,
  ipAddress,
}: {
  userId: string;
  sessionId: string;
  tokenHash: string;
  expiresAt: Date;
  device?: string;
  ipAddress?: string;
}) => {
  const [session] = await db
    .insert(refreshTokens)
    .values({
      userId,
      tokenHash,
      sessionId,
      expiresAt,
      device,
      ipAddress,
      revoked: false,
    })
    .returning();

  return session;
};

const findRefreshToken = async ({
  userId,
  sessionId,
}: {
  userId: string;
  sessionId: string;
}) => {
  const session = await db
    .select()
    .from(refreshTokens)
    .where(
      and(
        eq(refreshTokens.userId, userId),
        eq(refreshTokens.sessionId, sessionId)
      )
    )
    .limit(1);

  return session[0] || null;
};

const revokeRefreshToken = async (tokenHash: string) => {
  await db
    .update(refreshTokens)
    .set({
      revoked: true,
    })
    .where(eq(refreshTokens.tokenHash, tokenHash));
};

const revokeAllUserTokens = async (userId: string) => {
  await db
    .update(refreshTokens)
    .set({
      revoked: true,
    })
    .where(eq(refreshTokens.userId, userId));
};

const deleteExpiredTokens = async () => {
  await db
    .delete(refreshTokens)
    .where(lt(refreshTokens.expiresAt, new Date()));
};

// FIND OTP
const findOTP = async ({
  email,
  type,
}: {
  email: string;
  type: OTPType;
}) => {

  const result = await db
    .select()
    .from(otps)
    .where(
      and(
        eq(otps.email, email),
        eq(otps.type, type),
        gt(otps.expiresAt, new Date())
      )
    )
    .limit(1);

  return result[0] || null;
};

// CREATE OTP
const createOTP = async ({
  email,
  codeHash,
  type,
  expiresAt,
  usedAt,
}: {
  email: string;
  codeHash: string;
  type: OTPType;
  expiresAt: Date;
  usedAt?: string;
}) => {

  const result = await db
    .insert(otps)
    .values({
      email,
      codeHash,
      type,
      usedAt: new Date(),
      expiresAt: new Date(
        Date.now() + 10 * 60 * 1000
      ),
    })
    .returning();

  return result[0];
};

// DELETE OTP
const deleteOTP = async ({
  email,
  type,
}: {
  email: string;
  type: OTPType;
}) => {

  const result = await db
    .delete(otps)
    .where(
      and(
        eq(otps.email, email),
        eq(otps.type, type)
      )
    )
    .returning();

  return result;
};



export const AuthRepository = {
  // users
  findUserByEmail,
  findUserById,
  registerCustomer,
  updatePassword,

  // refresh tokens
  createRefreshToken,
  findRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens,
  deleteExpiredTokens,
  
  // otps
  findOTP,
  deleteOTP,
  createOTP,
};