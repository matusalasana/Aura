import api from "@/lib/axios"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const refresh = async () => {
  const res = await api.post("/auth/refresh");
  return res.data
};

export const useRefresh = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: refresh,

    onSuccess: () => {

      queryClient.invalidateQueries({
          queryKey: ["auth"],
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });
};