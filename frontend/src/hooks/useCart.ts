import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from './useAuth'
import { toast } from 'react-toastify'

export const useCart = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ['cart', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('cart')
        .select(`*, products (*)`) // This join requires the FK from Step 1
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  })

  const addToCart = useMutation({
    mutationFn: async ({ productId, size }: { productId: string, size: string }) => {
      if (!user) {
        toast.info("Please login to shop");
        throw new Error('Auth required');
      }

      // Check if item already exists
      const { data: existingItem } = await supabase
        .from('cart')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .eq('size', size)
        .maybeSingle();

      if (existingItem) {
        // Increment quantity
        const { error } = await supabase
          .from('cart')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);
        if (error) throw error;
      } else {
        // New insert
        const { error } = await supabase
          .from('cart')
          .insert([{ 
            user_id: user.id, 
            product_id: productId, 
            size, 
            quantity: 1 
          }]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
      toast.success('Added to bag', { icon: '🛍️' });
    }
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string, quantity: number }) => {
      const { error } = await supabase
        .from('cart')
        .update({ quantity })
        .eq('id', itemId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart', user?.id] })
  });

  const removeFromCart = useMutation({
    mutationFn: async (itemId: string) => {
      const { error } = await supabase.from('cart').delete().eq('id', itemId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
      toast.success('Removed from bag');
    }
  });

  return { 
    cartItems, 
    isLoading, 
    addToCart: addToCart.mutate, 
    isAdding: addToCart.isPending,
    updateQuantity: updateQuantity.mutate,
    removeFromCart: removeFromCart.mutate,
    cartCount: cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0)
  }
}
