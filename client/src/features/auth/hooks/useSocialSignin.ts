import { authClient } from "@/lib/authClient";
import { useMutation } from "@tanstack/react-query";

const socialSignin = async (providerName: string) => {
  const res = await authClient.signIn.social({
    provider: providerName,
    callbackURL: "/",
  });
  return res.data;
};

export const useSocialSignin = () => {
  return useMutation({
    mutationFn: socialSignin,
  });
};