import api from "@/lib/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { type FormData } from "@/features/stores/schemas"

const signupStore = async (data: FormData) => {
  const res = await api.post("/stores", data);

  return res.data;
};

export const useSignupStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signupStore,

    onSuccess: ({ message, store }) => {
      toast.success(message || "Store application sent successfully");

      queryClient.setQueryData(["stores"]);
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};