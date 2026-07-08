import api from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { type ResetPasswordInput } from "../types";
import { getErrorMessage } from "@/utils/getErrorMessage";

const resetPassword = async (data: ResetPasswordInput) => {
  const res = await api.post("/auth/reset-password", data);
  return res.data;
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};