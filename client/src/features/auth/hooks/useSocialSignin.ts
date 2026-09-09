import { authClient } from "@/lib/authClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { type  SignupInput } from "../schemas";

const socialSignin = async (providerName: string) => {
  const res = await authClient.signIn.social({
    provider: providerName,
    callbackURL: "http://localhost:5173/",
  });
  return res.data;
};

export const useSocialSignin = () => {
  return useMutation({
    mutationFn: socialSignin,
  });
};