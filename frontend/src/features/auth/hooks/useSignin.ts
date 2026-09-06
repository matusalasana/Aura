import api from "@/lib/authApi"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { type SigninInput } from "../schemas"

const signin = async (data: SigninInput) => {
  const res = await api.post(`/sign-in/email`, data)
  return res.data.data
}

export const useSignin = () => {
  const queryClient = useQueryClient()
  return useMutation ({
    mutationFn: signin, 
    onSuccess: () => {
    
      queryClient.invalidateQueries(["auth"]);
    
      toast.success("You have logged in successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    }
  })
}