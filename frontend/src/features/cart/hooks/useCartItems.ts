import { getCartItems } from "../api"
import { getApiErrorMessage } from "../../../shared/utils/getApiErrorMessage"

import { useQuery } from "@tanstack/react-query";


export const useCartItems = () => {
  return useQuery({
    queryKey: ['cart', 'items'],
    queryFn: getCartItems,
    retry: false,
    staleTime: 10*60*1000,
  });
};