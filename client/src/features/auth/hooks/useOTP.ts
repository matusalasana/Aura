import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

type OTPType = "sign-in" | "sign-up" | "forget-password" | "email-verification";
  

interface SendOTPInput {
  email: string;
  type: OTPType;
  name?: string;
}

interface VerifyOTPInput {
  otp: string;
  email: string;
  type: OTPType;
}

interface ResendOTPInput {
  email: string;
  name?: string;
  type: OTPType;
}

interface OTPResponse {
  message?: string;
}

// Send OTP
const sendOTP = async ({
  email,
  type,
  name,
}: SendOTPInput): Promise<string | undefined> => {
  const res = await api.post<OTPResponse>("/auth/send-otp", {
    name,
    email,
    type,
  });

  return res.data.message;
};

export const useSendOTP = () =>
  useMutation({
    mutationFn: sendOTP,
    onSuccess: (message) => {
      toast.success(
        message || "OTP sent to your email, please check your email",
      );
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

// Verify OTP
const verifyOTP = async ({
  otp,
  email,
  type,
}: VerifyOTPInput): Promise<string | undefined> => {
  const res = await api.post<OTPResponse>("/auth/verify-otp", {
    otp,
    email,
    type,
  });

  return res.data.message;
};

export const useVerifyOTP = () =>
  useMutation({
    mutationFn: verifyOTP,
    onSuccess: (message) => {
      toast.success(message || "OTP verified");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

// Resend OTP
const resendOTP = async ({
  email,
  name,
  type,
}: ResendOTPInput): Promise<string | undefined> => {
  const res = await api.post<OTPResponse>("/auth/resend-otp", {
    email,
    name,
    type,
  });

  return res.data.message;
};

export const useResendOTP = () =>
  useMutation({
    mutationFn: resendOTP,
    onSuccess: (message) => {
      toast.success(
        message || "OTP sent to your email, please check it",
      );
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });