import { login } from "../api"
import { getApiErrorMessage } from "../../../shared/utils/getApiErrorMessage"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";


export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart", "items"],
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    },
  })
};