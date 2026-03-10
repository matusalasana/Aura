import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'

export const useCart = () => {
  const queryClient = useQueryClient()

  // 1. Get the items in the cart
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data, error } = await supabase.from('cart').select('*')
      if (error) throw error
      return data
    }
  })

  // 2. Add an item (Mutation)
  const addToCart = useMutation({
    mutationFn: async ({ productId, size }: { productId: string, size: string }) => {
      // Logic: First check if this user already has this specific product/size
      const { data: existing } = await supabase
        .from('cart')
        .select('*')
        .eq('product_id', productId)
        .eq('size', size)
        .single()

      if (existing) {
        // If it exists, just increase the number
        return supabase.from('cart')
          .update({ quantity: existing.quantity + 1 })
          .eq('id', existing.id)
      } else {
        // If it's new, insert it
        return supabase.from('cart').insert({ 
          product_id: productId, 
          size 
        })
      }
    },
    onSuccess: () => {
      // Refresh the cart display everywhere
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })

  return { cartItems, addToCart: addToCart.mutate, isLoading }
}
