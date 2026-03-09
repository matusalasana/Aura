import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Product } from '../stores/types';

export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (filters: any) => [...productKeys.lists(), filters] as const,
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (id: string) => [...productKeys.details(), id] as const,
};

// Fetch all products
export const useProducts = (category?: string) => {
    return useQuery({
        queryKey: productKeys.list({ category }),
        queryFn: async () => {
            let query = supabase
                .from('products')
                .select('*')
                .order('date', { ascending: false });

            if (category) {
                query = query.eq('category', category);
            }

            const { data, error } = await query;

            if (error) {
                throw new Error(error.message);
            }

            return data as Product[];
        },
    });
};

// Fetch single product
export const useProduct = (id: string) => {
    return useQuery({
        queryKey: productKeys.detail(id),
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('_id', id)
                .single();

            if (error) {
                throw new Error(error.message);
            }

            return data as Product;
        },
        enabled: !!id,
    });
};

// Infinite scroll for products
export const useInfiniteProducts = (limit: number = 10) => {
    return useInfiniteQuery({
        queryKey: productKeys.lists(),
        queryFn: async ({ pageParam = 0 }) => {
            const from = pageParam * limit;
            const to = from + limit - 1;

            const { data, error, count } = await supabase
                .from('products')
                .select('*', { count: 'exact' })
                .range(from, to)
                .order('date', { ascending: false });

            if (error) throw error;

            return {
                products: data as Product[],
                nextPage: data.length === limit ? pageParam + 1 : undefined,
                totalCount: count,
            };
        },
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 0,
    });
};

// Search products
export const useSearchProducts = (searchTerm: string) => {
    return useQuery({
        queryKey: [...productKeys.lists(), 'search', searchTerm],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .ilike('name', `%${searchTerm}%`)
                .order('name');

            if (error) throw error;
            return data as Product[];
        },
        enabled: searchTerm.length > 2,
    });
};