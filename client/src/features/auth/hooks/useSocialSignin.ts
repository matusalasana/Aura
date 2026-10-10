import { authClient } from "@/lib/authClient";
import { useMutation } from "@tanstack/react-query";

const socialSignin = async (providerName: string) => {
  let CALLBACK_URL;

  if(import.meta.env.DEV){
    CALLBACK_URL="http://localhost:5173/"
  }else{
    CALLBACK_URL = import.meta.env.VITE_CALLBACK_URL
  }
  
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