import { randomUUID } from "crypto";

import { AuthRepository } from "./auth.repository.js";
import { HashUtils } from "@/utils/hash.js";
import { redis } from "@/config/redis.js";
import { generateOTP } from "@/utils/otp.js";
import { sendEmail } from "@/utils/email.js";
import { verifyEmailTemplate } from "@/templates/verifyEmail.js";
// import { resetPasswordTemplate } from "../../templates/resetPassword";

type OTPType = {
  type: string;
  email: string;
}


// constants
const OTP_EXP = 600;
const getOtpKey = ({ type, email}: OTPType) => `otp:${type}:${email}`;

const getEmailParams = ({name, otp, type, email}) => {
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





// send otp
const sendOTP = async ({email, type, name}) => {

  const otp = generateOTP();
  const hashedOTP = HashUtils.hashOTP(otp);
  
  const cacheKey = getOtpKey(type, email);
  await redis.set(cacheKey, otp, { ex: OTP_EXP});

  const emailParams = getEmailParams({name, otp, type, email});

  await sendEmail(emailParams);
  
  return {
    message: "OTP sent successfully"
  };
  
};


// verify otp
const verifyOTP = async ({
  type,
  email,
  otp
}) => {

  const cacheKey = getOtpKey(type, email);
  const hashedOTP = await redis.get(cacheKey);

  const isValid = await HashUtils.compareOTP(otp, hashedOTP)
  if(!isValid) throw new Error("OTP invalid or expired");

  return {
    message: "OTP verified successfully"
  };
  
};


// resend OTP
const resendOTP = async ({ email, type, name }) => {
  
  const otp = generateOTP();
  const otpHash = await HashUtils.hashOTP(otp);

  const cacheKey = getOtpKey(type, email);
  
  const oldOTP = await redis.get(cacheKey);
  if(oldOTP){
    await redis.del(cacheKey)
  }

  const emailParams = getEmailParams({name, otp, type, email});
  await sendEmail(emailParams);
  
  return { message: "OTP resent successfully" };
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