import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'

export interface Product {
  _id: string
  id: string
  name: string
  description: string
  price: number
  image: string[]
  category: string
  subCategory: string
  sub_category: string
  sizes: string[]
  date?: number
  created_at: string
  bestseller: boolean
}

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category], 
    queryFn: async (): Promise<Product[]> => {
      console.log('Fetching products...');
      
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false }); // Changed from 'date' to 'created_at'
      
      // Add category filter if provided
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }
      
      console.log('Raw products from DB:', data);
      
      // Map the data to ensure _id is present
      const mappedProducts = data?.map(item => ({
        ...item,
        _id: item.id, // Use id as _id
        id: item.id,  // Keep id for reference
        subCategory: item.sub_category || item.subCategory,
        date: new Date(item.created_at).getTime() // Convert created_at to timestamp for date field
      })) || [];
      
      console.log('Mapped products:', mappedProducts);
      return mappedProducts;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};