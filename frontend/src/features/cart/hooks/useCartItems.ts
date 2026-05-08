import { getCartItems } from "../api"
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage"

import { useQuery } from "@tanstack/react-query";


export const useCartItems = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems
  })
}