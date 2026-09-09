import { authClient } from "@/lib/authClient"
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { type  SignupInput } from "../schemas";

const signup = async (data: SignupInput) => {
  const res = await authClient.signUp.email(data);
  return res.data.data;
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};