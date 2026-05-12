import { logout } from "../api"
import { getApiErrorMessage } from "../../../shared/utils/getApiErrorMessage"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";


export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("You have logged out successfully")
      queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart", "items"],
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    }
  })
}