import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { setAccessToken } from "@/utils/token";
import { type VerifyEmailInput } from "../types";
import { getErrorMessage } from "@/utils/getErrorMessage";

const verifyEmail = async (data: VerifyEmailInput) => {
  const res = await api.post("/auth/verify-email", data);
  return res.data;
};

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyEmail,

    onSuccess: ({ user, accessToken, message }) => {
      setAccessToken(accessToken);

      queryClient.setQueryData(["auth"], user);

      toast.success(message);
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};