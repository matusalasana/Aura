import api from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { type  SignupInput } from "../schemas";


// sendOTP
const sendOTP = async ({email, type, name}) => {
  const res = await api.post("/auth/send-otp", {name, email, type})
  return res.data.message;
};

export const useSendOTP = () => {
  return useMutation({
    mutationFn: sendOTP,
    
    onSuccess: (message) => {
      toast.success(message || "OTP sent to your email, please check your email");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};


// verify otp
const verifyOTP = async ({otp, email, type}) => {
  const res = await api.post(
    "/auth/verify-otp", 
    {otp, email, type}
  );
  return res.data.message;
};

export const useVerifyOTP= () => {
  return useMutation({
    mutationFn: verifyOTP,

    onSuccess: (message) => {
      toast.success(message || "OTP verified");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};


// resend otp
const resendOTP = async ({email, name, type}) => {
  const res = await api.post("/auth/resend-otp", {email, name, type});
  return res.data.message;
};

export const useResendOTP= () => {
  return useMutation({
    mutationFn: resendOTP,

    onSuccess: (message) => {
      toast.success(message || "OTP sent to your email, please check it");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};