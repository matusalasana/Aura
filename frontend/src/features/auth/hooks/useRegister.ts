import { register } from "../api"
import { getApiErrorMessage } from "../../../shared/utils/getApiErrorMessage"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";


export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("You have registered successfully")
      queryClient.invalidateQueries({
        queryKey: ['auth', 'me']
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    }
  })
}