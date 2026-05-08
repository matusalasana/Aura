
import { addToCart } from "../api"
import { 
  useQueryClient, 
  useQuery, 
  useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage"


export const useAddToCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addToCart,
    
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"]
      })
      toast.success("Item added to cart")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    }
  });
};