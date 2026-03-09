// src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Product } from '../stores/types';

export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (filters: any) => [...productKeys.lists(), filters] as const,
};

export const useProducts = (category?: string) => {
    return useQuery({
        queryKey: productKeys.list({ category }),
        queryFn: async () => {
            console.log('🔍 Fetching products from Supabase...');
            
            try {
                // First, check if table exists by getting a single row
                const { error: testError } = await supabase
                    .from('products')
                    .select('id')
                    .limit(1);
                
                if (testError) {
                    console.error('❌ Table access error:', testError);
                    throw new Error(`Cannot access products table: ${testError.message}`);
                }
                
let query = supabase
    .from('products')
    .select('_id, name, price, image, category, sub_category, bestseller, date') 
    .order('date', { ascending: false });

                

                if (category) {
                    query = query.eq('category', category);
                }

                const { data, error } = await query;

                if (error) {
                    console.error('❌ Supabase error:', error);
                    throw new Error(error.message);
                }

                console.log('✅ Fetched products:', data?.length || 0);
                
                // Transform the data to match your Product type
                const transformedData = data?.map(item => ({
                    ...item,
                    subCategory: item.sub_category, // Map sub_category to subCategory
                })) as Product[];
                
                return transformedData || [];
                
            } catch (err) {
                console.error('❌ Fatal error:', err);
                throw err;
            }
        },
        retry: 3, // Retry 3 times on failure
        retryDelay: 1000, // Wait 1 second between retries
        // staleTime: 1000 * 60 * 5, // 5 minutes
    });
};