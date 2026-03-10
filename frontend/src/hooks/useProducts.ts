import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'

interface Product {
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
      try {
        let query = supabase.from('products').select('*')
        
        if (category) {
          query = query.eq('category', category)
        }

        const { data, error } = await query
        
        if (error) {
          console.error('Products fetch error:', error)
          throw new Error(error.message)
        }
        
        return data || []
      } catch (error) {
        console.error('Unexpected error in useProducts:', error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    gcTime: 1000 * 60 * 10, // Cache for 10 minutes
  })
}