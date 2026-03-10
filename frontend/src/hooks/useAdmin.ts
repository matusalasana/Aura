// hooks/useAdmin.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './useAuth';
import { toast } from 'react-toastify';

export const useAdmin = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: isAdmin, isLoading: adminLoading } = useQuery({
    queryKey: ['isAdmin', user?.id],
    queryFn: async () => {
      if (!user) {
        console.log('No user logged in');
        return false;
      }
      
      console.log('Checking admin for user ID:', user.id);
      
      // Try with different column names to be safe
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)  // Try with user_id first
        .maybeSingle();
      
      if (error) {
        console.error('Error checking admin with user_id:', error);
        
        // If that fails, try with id (some tables use 'id' as foreign key)
        const { data: data2, error: error2 } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        
        if (error2) {
          console.error('Error checking admin with id:', error2);
          return false;
        }
        
        console.log('Admin check result (with id):', data2);
        return !!data2;
      }
      
      console.log('Admin check result (with user_id):', data);
      return !!data;
    },
    enabled: !!user
  });

  console.log('isAdmin:', isAdmin);
  console.log('adminLoading:', adminLoading);

  // Get all products (admin view)
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin
  });

  // Get dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      // Total products
      const { count: totalProducts } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // Total orders
      const { count: totalOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      // Total revenue
      const { data: orders } = await supabase
        .from('orders')
        .select('total_amount');

      const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

      // Recent orders
      const { data: recentOrders } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      return {
        totalProducts: totalProducts || 0,
        totalOrders: totalOrders || 0,
        totalRevenue,
        recentOrders: recentOrders || []
      };
    },
    enabled: !!isAdmin
  });

  // Delete product mutation
  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('_id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Product removed');
    }
  });

  return { 
    isAdmin, 
    adminLoading, 
    products,
    stats,
    loading: productsLoading || statsLoading,
    deleteProduct: deleteProduct.mutate
  };
};