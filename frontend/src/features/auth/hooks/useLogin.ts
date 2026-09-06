import api from "@/lib/authApi"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { type LoginInput } from "../schemas"

const loginUser = async (data: LoginInput) => {
  const res = await api.post(`/sign-in/email`, data)
  return res.data.data
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation ({
    mutationFn: loginUser, 
    onSuccess: () => {
    
      queryClient.invalidateQueries(["auth"]);
    
      toast.success("You have logged in successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    }
  })
}