import { authClient } from "@/lib/authClient";
import { useMutation } from "@tanstack/react-query";
import { type SigninInput } from "../schemas";

const signin = async (data: SigninInput) => {
  const res = await authClient.signIn.email({
    email: data.email,
    password: data.password,
    callbackURL: "/",
  });

  if (res.error) {
    throw new Error(res.error.message || "Failed to sign in");
  }

  if (!res.data) {
    throw new Error("Sign-in returned no data");
  }

  return res.data;
};

export const useSignin = () =>
  useMutation({
    mutationFn: signin,
  });