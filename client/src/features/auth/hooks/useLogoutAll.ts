import api from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

const logoutAll = async () => {
  await api.post("/auth/logout-all");
};

export const useLogoutAll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutAll,

    onSuccess: () => {

      queryClient.clear();

      toast.success("All sessions have been logged out.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};