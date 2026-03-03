// src/stores/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from './types';

interface CartStore {
    items: CartItem[];
    addToCart: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getCartCount: () => number; // Returns total quantity of items
    getUniqueItemCount: () => number; // Returns number of unique products
    getCartTotal: (products: Product[]) => number; // Calculate total with product data
    isInCart: (productId: string) => boolean;
    getItemQuantity: (productId: string) => number;
}

const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            currency: "USD",
            shippingFee: 50,
            items: [],
            
            addToCart: (productId) => {
                set((state) => {
                    const existingItem = state.items.find(item => item.productId === productId);
                    
                    if (existingItem) {
                        return {
                            items: state.items.map(item =>
                                item.productId === productId
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            )
                        };
                    }
                    
                    return {
                        items: [...state.items, { productId, quantity: 1 }]
                    };
                });
            },
            
            removeFromCart: (productId) => {
                set((state) => ({
                    items: state.items.filter(item => item.productId !== productId)
                }));
            },
            
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'cart-storage',
        }
    )
);

export default useCartStore;