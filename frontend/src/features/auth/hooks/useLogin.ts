import { login } from "../api"
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";


export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("You have Logged in successfully")
      queryClient.invalidateQueries({
        queryKey: ['auth']
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    },
  })
};