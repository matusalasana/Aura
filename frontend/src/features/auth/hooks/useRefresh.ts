import api from "@/lib/axios"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { setAccessToken } from "@/utils/token";
import { getErrorMessage } from "@/utils/getErrorMessage";

const refresh = async () => {
  const res = await api.post("/auth/refresh");
  return res.data.accessToken
};

export const useRefresh = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: refresh,

    onSuccess: (accessToken) => {
      setAccessToken(accessToken);

      queryClient.invalidateQueries({
          queryKey: ["auth"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};