import { authClient } from "@/lib/authClient"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { type SigninInput } from "../schemas"

const signin = async (data: SigninInput) => {
  const res = await authClient.signIn.email({
    email: data.email,
    password: data.password,
    callbackURL: "/"
  })
  return res.data.data
}

export const useSignin = () => {
  const queryClient = useQueryClient()
  return useMutation ({
    mutationFn: signin
  })
}