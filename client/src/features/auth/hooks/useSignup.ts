import { authClient } from "@/lib/authClient";
import { useMutation } from "@tanstack/react-query";
import { type SignupInput } from "../schemas";

const signup = async (data: SignupInput) => {
  const res = await authClient.signUp.email(data);

  if (res.error) {
    throw new Error(res.error.message || "Failed to sign up");
  }

  if (!res.data) {
    throw new Error("Sign-up returned no data");
  }

  return res.data;
};

export const useSignup = () =>
  useMutation({
    mutationFn: signup,
  });