// store/shopStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts } from "../assets/assets";

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
    category: string;
    subCategory: string;
    sizes: string[];
    date: number;
    bestseller: boolean;
}

export interface AdminProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
    category: string;
    subCategory: string;
    sizes: string[];
    date: number;
    bestseller: boolean;
}

export interface CartItem {
    productId: string;
    quantity: number;
}

export interface WishListItem {
    productId: string;
}

interface ShopState {
    // Search state
    text: boolean;
    closeSearch: () => void;
    openSearch: () => void;

    // Constants
    currency: string;
    delivery_fee: number;
    products: Product[];

    // Admin products
    adminProducts: AdminProduct[];
    addNewProduct: (product: AdminProduct) => void;

    // Cart
    cart: CartItem[];
    cartCount: number;
    cartTotal: number;
    addToCart: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;

    // Wishlist
    wishList: WishListItem[];
    addToWishList: (productId: string) => void;
    removeFromWishList: (productId: string) => void;
    clearWishList: () => void;

    // Hearts
    heartStates: { [productId: string]: boolean };
    toggleHeart: (productId: string) => void;
    isHeartToggled: (productId: string) => boolean;
    clearAllHearts: () => void;
}

export const useShopStore = create<ShopState>()(
    persist(
        (set, get) => ({
            // Initial state
            text: false,
            currency: "ETB ",
            delivery_fee: 10,
            products: initialProducts,
            adminProducts: initialProducts,
            cart: [],
            wishList: [],
            heartStates: {},

            // Search functions
            closeSearch: () => set({ text: false }),
            openSearch: () => set({ text: true }),

            // Admin products
            addNewProduct: (product) => 
                set((state) => ({ 
                    adminProducts: [...state.adminProducts, product] 
                })),

            // Cart functions
            addToCart: (productId) => 
                set((state) => {
                    const existingItem = state.cart.find(item => item.productId === productId);
                    
                    if (existingItem) {
                        return {
                            cart: state.cart.map(item =>
                                item.productId === productId
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            )
                        };
                    } else {
                        return {
                            cart: [...state.cart, { productId, quantity: 1 }]
                        };
                    }
                }),

            removeFromCart: (productId) =>
                set((state) => ({
                    cart: state.cart.filter(item => item.productId !== productId)
                })),

            clearCart: () => set({ cart: [] }),

            // Wishlist functions
            addToWishList: (productId) =>
                set((state) => {
                    const existingItem = state.wishList.find(item => item.productId === productId);
                    
                    if (existingItem) {
                        return {
                            wishList: state.wishList.filter(item => item.productId !== productId)
                        };
                    } else {
                        return {
                            wishList: [...state.wishList, { productId }]
                        };
                    }
                }),

            removeFromWishList: (productId) =>
                set((state) => {
                    // Also toggle heart off when removing from wishlist
                    const newHeartStates = { ...state.heartStates };
                    delete newHeartStates[productId];
                    
                    return {
                        wishList: state.wishList.filter(item => item.productId !== productId),
                        heartStates: newHeartStates
                    };
                }),

            clearWishList: () => 
                set({ wishList: [], heartStates: {} }),

            // Heart functions
            toggleHeart: (productId) =>
                set((state) => ({
                    heartStates: {
                        ...state.heartStates,
                        [productId]: !state.heartStates[productId]
                    }
                })),

            isHeartToggled: (productId) => {
                return !!get().heartStates[productId];
            },

            clearAllHearts: () => set({ heartStates: {} }),
        }),
        {
            name: 'shop-storage', // name for localStorage
            partialize: (state) => ({
                // Only persist these fields
                adminProducts: state.adminProducts,
                cart: state.cart,
                wishList: state.wishList,
                heartStates: state.heartStates,
            }),
        }
    )
);

// Computed values (these are derived from state)
export const useCartCount = () => useShopStore((state) => state.cart.length);

export const useCartTotal = () => 
    useShopStore((state) => {
        return state.cart.reduce((total, cartItem) => {
            const price = state.products.find(p => p._id === cartItem.productId)?.price || 0;
            return total + (price * cartItem.quantity);
        }, 0);
    });