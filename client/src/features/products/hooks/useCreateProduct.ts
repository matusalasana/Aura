import api from "@/lib/axios"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { type ProductFormData } from "@/features/products/schemas"

const createProduct = async (data) => {

  const { productData, variantsData } = data;
  
  const productResponse = await api.post(`/products`, productData)
  const product = productResponse.data.data;
  
  if (productData.type === "variant" && variantsData.length) {
    await api.post(`/products/${product.id}/variants`, variantsData)
  }
  
  return productResponse.data;
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation ({
    mutationFn: createProduct, 
    onSuccess: ({ data, message }) => {
      queryClient.setQueryData(["products"], data);
    
      toast.success(message || "Product created");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    }
  })
}