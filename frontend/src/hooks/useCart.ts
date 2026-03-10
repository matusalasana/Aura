// hooks/useCart.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from './useAuth'
import { toast } from 'react-toastify'

export const useCart = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  // Get cart items for the current user
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ['cart', user?.id],
    queryFn: async () => {
      if (!user) return []
      
      const { data, error } = await supabase
        .from('cart')
        .select(`
          *,
          products (*)
        `)
        .eq('user_id', user.id)
      
      if (error) throw error
      return data
    },
    enabled: !!user // Only run if user is logged in
  })

  // Calculate cart count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Add to cart mutation
  const addToCart = useMutation({
    mutationFn: async ({ productId, size }: { productId: string, size: string }) => {
      if (!user) throw new Error('Please login to add items to cart')

      // Check if item exists
      const { data: existing } = await supabase
        .from('cart')
        .select('*')
        .eq('product_id', productId)
        .eq('size', size)
        .eq('user_id', user.id)
        .single()

      if (existing) {
        // Update quantity
        const { error } = await supabase
          .from('cart')
          .update({ quantity: existing.quantity + 1 })
          .eq('id', existing.id)
        
        if (error) throw error
      } else {
        // Insert new item
        const { error } = await supabase
          .from('cart')
          .insert({ 
            product_id: productId, 
            size,
            user_id: user.id,
            quantity: 1
          })
        
        if (error) throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] })
      toast.success('Added to cart!')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  // Update quantity
  const updateQuantity = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string, quantity: number }) => {
      const { error } = await supabase
        .from('cart')
        .update({ quantity })
        .eq('id', itemId)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] })
    }
  })

  // Remove from cart
  const removeFromCart = useMutation({
    mutationFn: async (itemId: string) => {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('id', itemId)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] })
      toast.success('Item removed from cart')
    }
  })

  return { 
    cartItems, 
    cartCount,
    addToCart: addToCart.mutate, 
    removeFromCart: removeFromCart.mutate,
    updateQuantity: updateQuantity.mutate,
    isLoading,
    isAdding: addToCart.isPending
  }
}