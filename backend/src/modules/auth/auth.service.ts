import { randomUUID } from "crypto";

import { AuthRepository } from "./auth.repository";
import { HashUtils } from "../../utils/hash";
import { JWT } from "../../utils/jwt";
import { CacheService } from "../../utils/CacheService";
import { generateOTP } from "../../utils/otp";

import { sendEmail } from "../../utils/email";
import { verifyEmailTemplate } from "../../templates/verify-email";
import { welcome } from "../../templates/welcome";
import { resetPasswordTemplate } from "../../templates/reset-password";

import { uploadToCloudinary } from "../../utils/cloudinary";

/* -------------------------------- CONSTANTS -------------------------------- */

const OTP_TTL = 600;

const getOtpKey = (type: string, email: string) =>
  `otp:${type}:${email}`;

/* ------------------------------- REGISTER USER ------------------------------ */

const registerCustomer = async ({
  name,
  email,
  password,
}) => {
  const existing = await AuthRepository.findUserByEmail(email);
  if (existing) throw new Error("User already exists");

  const passwordHash = await HashUtils.hashPassword(password);

  const otp = generateOTP();
  const otpHash = await HashUtils.hashOTP(otp);

  const cacheKey = getOtpKey("verify_email", email);

  await CacheService.set(
    cacheKey,
    {
      name,
      email,
      passwordHash,
      role: "customer",
      otp: otpHash,
    },
    OTP_TTL
  );

  await AuthRepository.createOTP({
    email,
    codeHash: otpHash,
    type: "verify_email",
    expiresAt: new Date(Date.now() + OTP_TTL * 1000),
  });

  sendEmail({
    to: email,
    subject: "Verify your Aura account",
    template: verifyEmailTemplate({
      name,
      otp,
    }),
  });
 
  return { message: "OTP sent successfully" };
};

/* ------------------------------- REGISTER VENDOR ---------------------------- */

const registerVendor = async ({
  userId,
  name,
  email,
  password,

  store_name,
  description,

  logo_buffer,
  banner_buffer,
  license_buffer,
}) => {
  const exists = await AuthRepository.findVendorByEmail(email);
  if (exists) throw new Error("Vendor already exists");

  const passwordHash = await HashUtils.hashPassword(password);

  const [logo, banner, license] = await Promise.all([
    uploadToCloudinary(logo_buffer, `vendors/logo/${userId}`),
    uploadToCloudinary(banner_buffer, `vendors/banner/${userId}`),
    uploadToCloudinary(license_buffer, `vendors/license/${userId}`, {
      type: "private",
    }),
  ]);

  const otp = generateOTP();
  const otpHash = await HashUtils.hashOTP(otp);

  const cacheKey = getOtpKey("verify_email", email);



  await CacheService.set(
    cacheKey,
    {
      name,
      email,
      passwordHash,
      role: "vendor",

      storeName: store_name,
      description,

      logoUrl: logo.secure_url,
      bannerUrl: banner.secure_url,
      licensePublicId: license.public_id,

      otp: otpHash,
    },
    OTP_TTL
  );

  await AuthRepository.createOTP({
    email,
    codeHash: otpHash,
    type: "verify_email",
    expiresAt: new Date(Date.now() + OTP_TTL * 1000),
  });

  await sendEmail({
    to: email,
    subject: "Verify your vendor account",
    template: verifyEmailTemplate({
      name: store_name,
      otp,
    }),
  });

  return { message: "OTP sent successfully" };
};

/* ------------------------------- VERIFY EMAIL ------------------------------- */

const verifyEmail = async ({ email, otp }) => {
  const cacheKey = getOtpKey("verify_email", email);

  let pending = await CacheService.get(cacheKey);

  if (!pending) {
    pending = await AuthRepository.findOTP({
      email,
      type: "verify_email",
    });
  }

  if (!pending) throw new Error("OTP expired or invalid");

  const isValid = await HashUtils.compareOTP(otp, pending.otp || pending.codeHash);
  if (!isValid) throw new Error("Invalid OTP");

  const user = await AuthRepository.createUser({
    name: pending.name,
    email: pending.email,
    passwordHash: pending.passwordHash,
    role: pending.role,
    isVerified: true,
  });

  await CacheService.del(cacheKey);

  await AuthRepository.deleteOTP({
    email,
    type: "verify_email",
  });

  const refreshToken = await JWT.generateRefreshToken({
    userId: user.id,
    role: user.role,
  });

  const accessToken = await JWT.generateAccessToken({
    userId: user.id,
    role: user.role,
  });

  await AuthRepository.createRefreshToken({
    userId: user.id,
    tokenHash: await HashUtils.hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    },
    accessToken,
    refreshToken,
  };
};

/* ---------------------------------- LOGIN ---------------------------------- */

const login = async ({ email, password }) => {
  const user = await AuthRepository.findUserByEmail(email);

  if (!user) throw new Error("Invalid credentials");

  const valid = await HashUtils.comparePassword(
    password,
    user.passwordHash
  );

  if (!valid) throw new Error("Invalid credentials");

  if (!user.isVerified) {
    throw new Error("Please verify your email first");
  }

  const refreshToken = await JWT.generateRefreshToken({
    userId: user.id,
    role: user.role,
  });

  const accessToken = await JWT.generateAccessToken({
    userId: user.id,
    role: user.role,
  });

  await AuthRepository.createRefreshToken({
    userId: user.id,
    tokenHash: await HashUtils.hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    },
    accessToken,
    refreshToken,
  };
};

/* -------------------------------- REFRESH ---------------------------------- */

const refresh = async ({ refreshToken }) => {
  if (!refreshToken) throw new Error("Missing refresh token");

  const decoded = await JWT.verifyRefreshToken(refreshToken);

  const tokenHash = await HashUtils.hashToken(refreshToken);

  const session = await AuthRepository.findRefreshToken({
    userId: decoded.userId,
    tokenHash,
  });

  if (!session || session.revoked) {
    throw new Error("Invalid session");
  }

  const accessToken = await JWT.generateAccessToken({
    userId: decoded.userId,
    role: decoded.role,
  });

  return { accessToken };
};

/* -------------------------------- LOGOUT ----------------------------------- */

const logout = async ({ refreshToken }) => {
  const tokenHash = await HashUtils.hashToken(refreshToken);

  await AuthRepository.revokeRefreshToken(tokenHash);

  return { message: "Logged out successfully" };
};

/* ------------------------------- LOGOUT ALL -------------------------------- */

const logoutAll = async ({ userId }) => {
  await AuthRepository.revokeAllUserTokens(userId);

  return { message: "All sessions revoked" };
};

/* ---------------------------------- ME ------------------------------------- */

const getMe = async ({ userId }) => {
  const user = await AuthRepository.findUserById(userId);

  if (!user) throw new Error("User not found");

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
  };
};

/* --------------------------- FORGOT PASSWORD ------------------------------- */

const forgotPassword = async ({ email }) => {
  const user = await AuthRepository.findUserByEmail(email);

  if (!user) throw new Error("User not found");

  const otp = generateOTP();
  const otpHash = await HashUtils.hashOTP(otp);

  const cacheKey = getOtpKey("reset_password", email);

  await CacheService.set(
    cacheKey,
    { email, otp: otpHash },
    OTP_TTL
  );

  await AuthRepository.createOTP({
    email,
    codeHash: otpHash,
    type: "reset_password",
    expiresAt: new Date(Date.now() + OTP_TTL * 1000),
  });

  await sendEmail({
    to: email,
    subject: "Password reset code",
    template: resetPasswordTemplate({
      name: "🔐",
      resetLink: otp,
    }),
  });

  return { message: "OTP sent successfully" };
};

/* ---------------------------- RESET PASSWORD ------------------------------- */

const resetPassword = async ({ email, otp, password }) => {
  const cacheKey = getOtpKey("reset_password", email);

  let data = await CacheService.get(cacheKey);

  if (!data) {
    data = await AuthRepository.findOTP({
      email,
      type: "reset_password",
    });
  }

  if (!data) throw new Error("OTP expired");

  const isValid = await HashUtils.compareOTP(
    otp,
    data.otp || data.codeHash
  );

  if (!isValid) throw new Error("Invalid OTP");

  const passwordHash = await HashUtils.hashPassword(password);

  await AuthRepository.updatePassword({
    email,
    passwordHash,
  });

  await CacheService.del(cacheKey);

  await AuthRepository.deleteOTP({
    email,
    type: "reset_password",
  });

  return { message: "Password reset successful" };
};

/* ------------------------------- RESEND OTP -------------------------------- */

const resendOTP = async ({ email, type }) => {
  const otp = generateOTP();
  const otpHash = await HashUtils.hashOTP(otp);

  const cacheKey = getOtpKey(type, email);

  await CacheService.set(
    cacheKey,
    { email, otp: otpHash },
    OTP_TTL
  );

  await AuthRepository.createOTP({
    email,
    codeHash: otpHash,
    type,
    expiresAt: new Date(Date.now() + OTP_TTL * 1000),
  });

  if(type === "reset_password"){
    await sendEmail({
      to: email,
      subject: "Password reset code",
      template: resetPasswordTemplate({
        name: "🔐",
        resetLink: otp,
      }),
    });
  }
  if(type === "verify-emai"){
    await sendEmail({
      to: email,
      subject: "Email verification code",
      template: verifyEmailTemplate({
        name: "",
        otp,
      }),
    });
  }

  return { message: "OTP resent successfully" };
};

/* -------------------------------- EXPORT ----------------------------------- */

export const AuthService = {
  registerCustomer,
  registerVendor,
  verifyEmail,
  login,
  refresh,
  logout,
  logoutAll,
  getMe,
  forgotPassword,
  resetPassword,
  resendOTP,
};