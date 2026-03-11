import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from './useAuth'
import { toast } from 'react-toastify'

export const useCart = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  // Log when user changes
  console.log('useCart - user:', user?.id);

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ['cart', user?.id],
    queryFn: async () => {
      if (!user) {
        console.log('No user, returning empty cart');
        return [];
      }
      
      console.log('Fetching cart for user:', user.id);
      const { data, error } = await supabase
        .from('cart')
        .select(`*, products (*)`)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Cart fetch error:', error);
        throw error;
      }
      
      console.log('Cart data fetched:', data);
      return data || [];
    },
    enabled: !!user,
  })

  const addToCart = useMutation({
    mutationFn: async ({ productId, size }: { productId: string, size: string }) => {
      console.log('addToCart called with:', { productId, size, user });
      
      if (!user) {
        toast.info("Please login to shop");
        throw new Error('Auth required');
      }

      // Check if item already exists
      const { data: existingItem, error: checkError } = await supabase
        .from('cart')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .eq('size', size)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing item:', checkError);
        throw checkError;
      }

      console.log('Existing item:', existingItem);

      if (existingItem) {
        // Update existing item
        const { error } = await supabase
          .from('cart')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);
        
        if (error) {
          console.error('Error updating cart:', error);
          throw error;
        }
        console.log('Updated existing cart item');
      } else {
        // Insert new item
        const { error } = await supabase
          .from('cart')
          .insert([{ 
            user_id: user.id, 
            product_id: productId, 
            size, 
            quantity: 1 
          }]);
        
        if (error) {
          console.error('Error inserting to cart:', error);
          throw error;
        }
        console.log('Inserted new cart item');
      }
    },
    onSuccess: () => {
      console.log('addToCart success, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
      toast.success('Added to bag');
    },
    onError: (error: any) => {
      console.error('addToCart error:', error);
      toast.error(error.message);
    }
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string, quantity: number }) => {
      console.log('Updating quantity:', { itemId, quantity });
      const { error } = await supabase
        .from('cart')
        .update({ quantity })
        .eq('id', itemId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
    }
  });

  const removeFromCart = useMutation({
    mutationFn: async (itemId: string) => {
      console.log('Removing from cart:', itemId);
      const { error } = await supabase.from('cart').delete().eq('id', itemId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
      toast.success('Removed from bag');
    }
  });

  const cartCount = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
  console.log('Cart count:', cartCount, 'Cart items:', cartItems);

  return { 
    cartItems, 
    isLoading, 
    addToCart: addToCart.mutate, 
    isAdding: addToCart.isPending,
    updateQuantity: updateQuantity.mutate,
    removeFromCart: removeFromCart.mutate,
    cartCount
  }
}