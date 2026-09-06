import api from "@/lib/authApi"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

const signout = async () => {
  await api.post("/sign-out");
};

export const useSignout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signout,

    onSuccess: () => {
      
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