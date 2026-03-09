import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WishlistItem, HeartStates } from './types';
import { supabase } from '../lib/supabase';

interface WishlistStore {
    items: WishlistItem[];
    heartStates: HeartStates;
    isLoading: boolean;
    toggleWishlist: (productId: string) => Promise<void>;
    addToWishlist: (productId: string) => Promise<void>;
    removeFromWishlist: (productId: string) => Promise<void>;
    clearWishlist: () => Promise<void>;
    toggleHeart: (productId: string) => void;
    isHeartToggled: (productId: string) => boolean;
    isInWishlist: (productId: string) => boolean;
    syncWishlistWithSupabase: () => Promise<void>;
}

const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            heartStates: {},
            isLoading: false,

            toggleWishlist: async (productId) => {
                const { data: { user } } = await supabase.auth.getUser();
                
                set((state) => {
                    const exists = state.items.some(item => item.productId === productId);
                    
                    let newItems;
                    let newHeartStates;

                    if (exists) {
                        newItems = state.items.filter(item => item.productId !== productId);
                        newHeartStates = {
                            ...state.heartStates,
                            [productId]: false
                        };
                        
                        // Remove from Supabase
                        if (user) {
                            supabase
                                .from('wishlists')
                                .delete()
                                .eq('user_id', user.id)
                                .eq('product_id', productId)
                                .then();
                        }
                    } else {
                        newItems = [...state.items, { productId }];
                        newHeartStates = {
                            ...state.heartStates,
                            [productId]: true
                        };
                        
                        // Add to Supabase
                        if (user) {
                            supabase
                                .from('wishlists')
                                .insert({
                                    user_id: user.id,
                                    product_id: productId
                                })
                                .then();
                        }
                    }
                    
                    return {
                        items: newItems,
                        heartStates: newHeartStates
                    };
                });
            },

            addToWishlist: async (productId) => {
                const { data: { user } } = await supabase.auth.getUser();
                
                set((state) => {
                    const exists = state.items.some(item => item.productId === productId);
                    if (!exists) {
                        if (user) {
                            supabase
                                .from('wishlists')
                                .insert({
                                    user_id: user.id,
                                    product_id: productId
                                })
                                .then();
                        }
                        
                        return {
                            items: [...state.items, { productId }],
                            heartStates: {
                                ...state.heartStates,
                                [productId]: true
                            }
                        };
                    }
                    return state;
                });
            },

            removeFromWishlist: async (productId) => {
                const { data: { user } } = await supabase.auth.getUser();
                
                if (user) {
                    await supabase
                        .from('wishlists')
                        .delete()
                        .eq('user_id', user.id)
                        .eq('product_id', productId);
                }
                
                set((state) => ({
                    items: state.items.filter(item => item.productId !== productId),
                    heartStates: {
                        ...state.heartStates,
                        [productId]: false
                    }
                }));
            },

            clearWishlist: async () => {
                const { data: { user } } = await supabase.auth.getUser();
                
                if (user) {
                    await supabase
                        .from('wishlists')
                        .delete()
                        .eq('user_id', user.id);
                }
                
                set({ items: [], heartStates: {} });
            },

            toggleHeart: (productId) => {
                set((state) => ({
                    heartStates: {
                        ...state.heartStates,
                        [productId]: !state.heartStates[productId]
                    }
                }));
            },

            isHeartToggled: (productId) => {
                return !!get().heartStates[productId];
            },

            isInWishlist: (productId) => {
                return get().items.some(item => item.productId === productId);
            },

            syncWishlistWithSupabase: async () => {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                set({ isLoading: true });

                try {
                    const { data } = await supabase
                        .from('wishlists')
                        .select('product_id')
                        .eq('user_id', user.id);

                    if (data) {
                        const wishlistItems = data.map(item => ({ productId: item.product_id }));
                        const heartStates = wishlistItems.reduce((acc, item) => {
                            acc[item.productId] = true;
                            return acc;
                        }, {} as HeartStates);

                        set({ items: wishlistItems, heartStates });
                    }
                } catch (error) {
                    console.error('Error syncing wishlist:', error);
                } finally {
                    set({ isLoading: false });
                }
            }
        }),
        {
            name: 'wishlist-storage',
        }
    )
);

// Load wishlist from Supabase on startup
supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
        useWishlistStore.getState().syncWishlistWithSupabase();
    }
});

export default useWishlistStore;