import api from "@/lib/axios"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { type CreateOrderInput } from "@/features/orders/schemas"

const createOrder = async (data) => {
  
  const res = await api.post(`/orders`, data)
  
  return res.data.data;
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  return useMutation ({
    mutationFn: createOrder, 
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["orders"], data);
    
      toast.success("Order successfully created");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    }
  })
}