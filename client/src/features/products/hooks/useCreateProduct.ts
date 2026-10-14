import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

type CreateProductVariables = {
  slug: string;
  formData: FormData;
};

const createProduct = async ({
  slug,
  formData,
}: CreateProductVariables) => {
  const response = await api.post(
    `/stores/${slug}/products`,
    formData
  );

  return response.data;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,

    onSuccess: ({ message }, { slug }) => {
      queryClient.invalidateQueries({
        queryKey: ["products", slug],
      });

      toast.success(message || "Product created");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};