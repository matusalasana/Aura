import api from "../../api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ResendOTPInput } from "../../types/auth";
import { getErrorMessage } from "@utils/getErrorMessage";

const resendOTP = async (data: ResendOTPInput) => {
  const res = await api.post("/auth/resend-otp", data);
  return res.data;
};

export const useResendOTP = () => {
  return useMutation({
    mutationFn: resendOTP,

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};