import { getProducts } from "../api"
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage"

import { useQuery } from "@tanstack/react-query";


export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })
}