import { authClient } from "@/lib/authClient";
import { useMutation } from "@tanstack/react-query";

const socialSignin = async (providerName: string) => {

  const CALLBACK_URL = import.meta.env.DEV
    ? "http://localhost:5173/"
    : import.meta.env.VITE_CALLBACK_URL;
  
  const res = await authClient.signIn.social({
    provider: providerName,
    callbackURL: CALLBACK_URL,
  });
  return res.data;
};

export const useSocialSignin = () => {
  return useMutation({
    mutationFn: socialSignin,
  });
};