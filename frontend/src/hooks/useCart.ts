import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from './useAuth'
import { toast } from 'react-toastify'

interface CartItem {
  id: string
  user_id: string
  product_id: string
  size: string
  quantity: number
  created_at: string
  products?: {
    _id: string
    name: string
    price: number
    image: string[]
  }
}

export const useCart = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const { data: cartItems = [], isLoading, error } = useQuery({
    queryKey: ['cart', user?.id],
    queryFn: async (): Promise<CartItem[]> => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('cart')
        .select(`
          *,
          products!inner (
            _id,
            name,
            price,
            image
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Cart fetch error:', error);
        throw new Error(error.message);
      }
      
      return data || [];
    },
    enabled: !!user,
  })

  const addToCart = useMutation({
    mutationFn: async ({ productId, size, quantity = 1 }: { productId: string, size: string, quantity?: number }) => {
      if (!user) {
        toast.info("Please login to shop");
        throw new Error('Authentication required');
      }

      // Check if item already exists
      const { data: existingItem, error: checkError } = await supabase
        .from('cart')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .eq('size', size)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingItem) {
        // Increment quantity
        const { error: updateError } = await supabase
          .from('cart')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);
        
        if (updateError) throw updateError;
      } else {
        // New insert
        const { error: insertError } = await supabase
          .from('cart')
          .insert([{ 
            user_id: user.id, 
            product_id: productId, 
            size, 
            quantity 
          }]);
        
        if (insertError) throw insertError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
      toast.success('Added to bag', { icon: '🛍️' });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add to cart');
    }
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string, quantity: number }) => {
      if (quantity < 1) throw new Error('Quantity must be at least 1');
      
      const { error } = await supabase
        .from('cart')
        .update({ quantity })
        .eq('id', itemId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update quantity');
    }
  });

  const removeFromCart = useMutation({
    mutationFn: async (itemId: string) => {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('id', itemId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
      toast.success('Removed from bag');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to remove item');
    }
  });

  const cartCount = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  return { 
    cartItems, 
    isLoading,
    error,
    addToCart: addToCart.mutate, 
    isAdding: addToCart.isPending,
    updateQuantity: updateQuantity.mutate,
    removeFromCart: removeFromCart.mutate,
    cartCount
  }
}