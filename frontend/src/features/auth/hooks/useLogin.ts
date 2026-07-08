import api from "@/lib/axios"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { setAccessToken } from "../../../utils/token"
import { type LoginInput } from "../schemas"

const loginUser = async (data: LoginInput) => {
  const res = await api.post(`/auth/login`, data)
  return res.data
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation ({
    mutationFn: loginUser, 
    onSuccess: ({ user, accessToken }) => {
      setAccessToken(accessToken);
    
      queryClient.setQueryData(["auth"], user);
    
      toast.success("You have logged in successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    }
  })
}