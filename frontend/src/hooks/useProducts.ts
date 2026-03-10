// hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'

export interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string[]
  category: string
  subCategory: string
  sizes: string[]
  date: number
  bestseller: boolean
}

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category], 
    queryFn: async (): Promise<Product[]> => {
      console.log('Fetching products...');
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }
      
      console.log('Raw products from DB:', data);
      
      // Map the data to ensure _id is present
      const mappedProducts = data?.map(item => ({
        ...item,
        _id: item._id || item.id, // Use _id if exists, fallback to id
      })) || [];
      
      console.log('Mapped products:', mappedProducts);
      return mappedProducts;
    },
    staleTime: 1000 * 60 * 5,
  });
};