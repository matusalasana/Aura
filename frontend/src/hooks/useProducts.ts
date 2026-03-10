import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category], 
    queryFn: async () => {
      let query = supabase.from('products').select('*')
      
      if (category) {
        query = query.eq('category', category)
      }

      const { data, error } = await query
      if (error) throw new Error(error.message)
      return data
    },
    
    placeholderData: (previousData) => previousData,
  })
}
