import { randomUUID } from "crypto";

import { AuthRepository } from "./auth.repository.js";
import { HashUtils } from "@/utils/hash.js";
import { redis } from "@/config/redis.js";
import { generateOTP } from "@/utils/otp.js";
import { sendEmail } from "@/utils/email.js";
import { verifyEmailTemplate } from "@/templates/verifyEmail.js";
import { resetPasswordTemplate } from "../../templates/resetPassword.js";
import type { 
  SendOTPInput,
  ResendOTPInput,
  VerifyOTPInput } from "@/modules/auth/auth.validation.js";


const OTP_EXP = 600;

const getOtpKey = ({ type, email }: { type: string; email: string; }) => {
  return `otp:${type}:${email}`;
};

const getEmailParams = ({name, otp, type, email}: {
  name: string;
  otp: string;
  type: string;
  email: string;
}) => {
  const emailSubject = type === "email-verification"
    ? "Email Verification Code" 
    : "Password Reset Code"
  const emailTemplate = type === "email-verification"
    ? verifyEmailTemplate({
        name: name || "",
        otp,
      })
    : resetPasswordTemplate({
      name: name || "",
      resetLink: otp,
    })

  return {
    to: email,
    subject: emailSubject,
    template: emailTemplate
  }
}



// SEND OTP
const sendOTP = async ({ email, type, name }: SendOTPInput) => {
  if (!email || !type || !name) {
    throw new Error("Missing required fields");
  }

  const otp = generateOTP();
  const hashedOTP = await HashUtils.hashOTP(otp);

  const cacheKey = getOtpKey({
    type,
    email,
  });

  await redis.set(cacheKey, hashedOTP, {
    ex: OTP_EXP,
  });

  const emailParams = getEmailParams({
    name,
    otp,
    type,
    email,
  });

  await sendEmail(emailParams);

  return {
    message: "OTP sent successfully",
  };
};


// VERIFY OTP
const verifyOTP = async ({
  type,
  email,
  otp,
}: VerifyOTPInput) => {
  if (!email || !type || !otp) {
    throw new Error("Missing required fields");
  }

  const cacheKey = getOtpKey({
    type,
    email,
  });

  const hashedOTP = await redis.get<string>(cacheKey);

  if (!hashedOTP) {
    throw new Error("OTP invalid or expired");
  }

  const isValid = await HashUtils.compareOTP(
    otp,
    hashedOTP as string
  );

  if (!isValid) {
    throw new Error("OTP invalid or expired");
  }

  // Prevent OTP reuse
  await redis.del(cacheKey);

  return {
    message: "OTP verified successfully",
  };
};


// RESEND OTP
const resendOTP = async ({ email, type, name }: ResendOTPInput) => {
  if (!email || !type || !name) {
    throw new Error("Missing required fields");
  }

  const otp = generateOTP();
  const otpHash = await HashUtils.hashOTP(otp);

  const cacheKey = getOtpKey({
    type,
    email,
  });

  // Replace old OTP
  await redis.del(cacheKey);

  await redis.set(cacheKey, otpHash, {
    ex: OTP_EXP,
  });

  const emailParams = getEmailParams({
    name,
    otp,
    type,
    email,
  });

  await sendEmail(emailParams);

  return {
    message: "OTP resent successfully",
  };
};


// getMe
const getMe = async(id: string) => {
  return await AuthRepository.findUserById(id);
}

export const AuthService = {
  getMe,
  sendOTP,
  verifyOTP,
  resendOTP,
};