import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from './types';
import { supabase } from '../lib/supabase';

interface CartStore {
    items: CartItem[];
    currency: string;
    shippingFee: number;
    isLoading: boolean;
    addToCart: (productId: string) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    syncCartWithSupabase: () => Promise<void>;
    getCartCount: () => number;
    getUniqueItemCount: () => number;
    getCartTotal: (products: Product[]) => number;
    isInCart: (productId: string) => boolean;
    getItemQuantity: (productId: string) => number;
}

const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            currency: "ETB ",
            shippingFee: 10,
            isLoading: false,

            addToCart: async (productId) => {
                set((state) => {
                    const existingItem = state.items.find(item => item.productId === productId);
                    
                    let newItems;
                    if (existingItem) {
                        newItems = state.items.map(item =>
                            item.productId === productId
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        );
                    } else {
                        newItems = [...state.items, { productId, quantity: 1 }];
                    }
                    
                    // Sync with Supabase in background
                    setTimeout(() => get().syncCartWithSupabase(), 0);
                    
                    return { items: newItems };
                });
            },

            removeFromCart: async (productId) => {
                set((state) => {
                    const newItems = state.items.filter(item => item.productId !== productId);
                    
                    setTimeout(() => get().syncCartWithSupabase(), 0);
                    
                    return { items: newItems };
                });
            },

            updateQuantity: async (productId, quantity) => {
                set((state) => {
                    const newItems = state.items.map(item =>
                        item.productId === productId
                            ? { ...item, quantity: Math.max(1, quantity) }
                            : item
                    );
                    
                    setTimeout(() => get().syncCartWithSupabase(), 0);
                    
                    return { items: newItems };
                });
            },

            clearCart: async () => {
                const { data: { user } } = await supabase.auth.getUser();
                
                if (user) {
                    await supabase
                        .from('carts')
                        .delete()
                        .eq('user_id', user.id);
                }
                
                set({ items: [] });
            },

            syncCartWithSupabase: async () => {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                set({ isLoading: true });

                try {
                    const { items } = get();
                    
                    const { error } = await supabase
                        .from('carts')
                        .upsert({
                            user_id: user.id,
                            items: items,
                            updated_at: new Date().toISOString(),
                        });

                    if (error) throw error;
                } catch (error) {
                    console.error('Error syncing cart:', error);
                } finally {
                    set({ isLoading: false });
                }
            },

            getCartCount: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getUniqueItemCount: () => {
                return get().items.length;
            },

            getCartTotal: (products) => {
                const { items } = get();
                return items.reduce((total, cartItem) => {
                    const product = products.find(p => p._id === cartItem.productId);
                    return total + (product?.price || 0) * cartItem.quantity;
                }, 0);
            },

            isInCart: (productId) => {
                return get().items.some(item => item.productId === productId);
            },

            getItemQuantity: (productId) => {
                const item = get().items.find(item => item.productId === productId);
                return item?.quantity || 0;
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);

// Load cart from Supabase on startup
supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
        const { data } = await supabase
            .from('carts')
            .select('items')
            .eq('user_id', session.user.id)
            .single();

        if (data?.items) {
            useCartStore.setState({ items: data.items });
        }
    }
});

export default useCartStore;