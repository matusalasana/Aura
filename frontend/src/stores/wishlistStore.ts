// src/stores/wishlistStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WishlistItem, HeartStates } from './types';

interface WishlistStore {
    items: WishlistItem[];
    heartStates: HeartStates;
    toggleWishlist: (productId: string) => void;
    addToWishlist: (productId: string) => void;
    removeFromWishlist: (productId: string) => void;
    clearWishlist: () => void;
    toggleHeart: (productId: string) => void;
    isHeartToggled: (productId: string) => boolean;
    clearAllHearts: () => void;
    isInWishlist: (productId: string) => boolean;
}

const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            heartStates: {},
            
            toggleWishlist: (productId) => {
                set((state) => {
                    const exists = state.items.some(item => item.productId === productId);
                    
                    if (exists) {
                        return {
                            items: state.items.filter(item => item.productId !== productId),
                            heartStates: {
                                ...state.heartStates,
                                [productId]: false
                            }
                        };
                    } else {
                        return {
                            items: [...state.items, { productId }],
                            heartStates: {
                                ...state.heartStates,
                                [productId]: true
                            }
                        };
                    }
                });
            },
            
            addToWishlist: (productId) => {
                set((state) => {
                    const exists = state.items.some(item => item.productId === productId);
                    if (!exists) {
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
            
            removeFromWishlist: (productId) => {
                set((state) => ({
                    items: state.items.filter(item => item.productId !== productId),
                    heartStates: {
                        ...state.heartStates,
                        [productId]: false
                    }
                }));
            },
            
            clearWishlist: () => set({ items: [], heartStates: {} }),
            
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
            
            clearAllHearts: () => set({ heartStates: {} }),
            
            isInWishlist: (productId) => {
                return get().items.some(item => item.productId === productId);
            }
        }),
        {
            name: 'wishlist-storage',
        }
    )
);

export default useWishlistStore;