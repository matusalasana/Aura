
import { addToCart } from "../api"
import { 
  useQueryClient, 
  useQuery, 
  useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getApiErrorMessage } from "../../../shared/utils/getApiErrorMessage"


export const useAddToCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addToCart,
    retry: false,
    
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", "items"]
      })
      toast.success("Item added to cart")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    }
  });
};