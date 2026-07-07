import api from "../../api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ForgotPasswordInput } from "../../types/auth";
import { getErrorMessage } from "@utils/getErrorMessage";

const forgotPassword = async (data: ForgotPasswordInput) => {
  const res = await api.post("/auth/forgot-password", data);
  return res.data;
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};