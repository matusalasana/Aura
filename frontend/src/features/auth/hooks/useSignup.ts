import api from "@/lib/authApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { type  SignupInput } from "../schemas";

const signup = async (data: SignupInput) => {
  const res = await api.post("/sign-up/email", data);
  return res.data.data;
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,

    onSuccess: (data) => {
      toast.success(data.message || "Sign up successful);
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};