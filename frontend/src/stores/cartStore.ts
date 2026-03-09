// src/stores/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from './types';

interface CartStore {
    items: CartItem[];
    currency: string;
    shippingFee: number;
    addToCart: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
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
            
            updateQuantity: (productId, quantity) => {
                set((state) => ({
                    items: state.items.map(item =>
                        item.productId === productId
                            ? { ...item, quantity: Math.max(1, quantity) }
                            : item
                    )
                }));
            },
            
            clearCart: () => set({ items: [] }),
            
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
            }
        }),
        {
            name: 'cart-storage',
        }
    )
);

export default useCartStore;