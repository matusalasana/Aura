import { authClient } from "@/lib/authClient";
import { useMutation } from "@tanstack/react-query";
import { type SigninInput } from "../schemas";
import { toast } from "react-hot-toast";


const signin = async (data: SigninInput) => {
  let CALLBACK_URL;

  if(import.meta.env.DEV){
    CALLBACK_URL="http://localhost:5173/"
  }else{
    CALLBACK_URL = import.meta.env.VITE_CALLBACK_URL
  }
  
  const res = await authClient.signIn.email({
    email: data.email,
    password: data.password,
    callbackURL: CALLBACK_URL,
  });

  if (res.error) {
    toast.error(res.error?.message || res.error?.code || "Signin Error");
  }

  if (!res.data) {
    toast.error("Sign-in returned no data");
  }

  toast.success("signin Successful")
  return res.data;
};

export const useSignin = () =>
  useMutation({
    mutationFn: signin,
  });