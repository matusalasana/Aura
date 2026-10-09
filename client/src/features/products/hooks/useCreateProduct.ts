import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

const createProduct = async (formData: FormData) => {
  const response = await api.post("/products", formData);

  return response.data;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,

    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      toast.success(message || "Product created");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};