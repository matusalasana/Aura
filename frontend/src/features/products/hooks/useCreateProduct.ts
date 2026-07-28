import api from "@/lib/axios"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { type ProductFormData } from "../schemas"

const createProduct = async (data: ProductFormData) => {
  const res = await api.post(`/products`, data)
  return res.data
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation ({
    mutationFn: createProduct, 
    onSuccess: ({ products, message }) => {
      queryClient.setQueryData(["products"], user);
    
      toast.success(message || "Product created");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    }
  })
}