import { 
  addProduct
} from "../api"
import { getApiErrorMessage } from "../../../../shared/utils/getApiErrorMessage"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success("Product published successfully")
      queryClient.invalidateQueries({
        queryKey: ["products"]
      })
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    }
  })
}