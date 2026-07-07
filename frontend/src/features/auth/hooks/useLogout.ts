import api from "../../api"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { clearAccessToken } from "../../utils/token";
import { getErrorMessage } from "../../utils/getErrorMessage";

const logoutUser = async () => {
  await api.post("/auth/logout");
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      clearAccessToken();

      queryClient.removeQueries({
        queryKey: ["auth"],
      });

      toast.success("Logged out successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};