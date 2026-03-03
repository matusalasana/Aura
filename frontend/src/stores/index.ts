// src/stores/index.ts
export { default as useProductStore } from './productStore';
export { default as useCartStore } from './cartStore';
export { default as useWishlistStore } from './wishlistStore';
export { default as useUIStore } from './uiStore';

// // Optional: Combined hook if you need everything in one place
// import useProductStore from './productStore';
// import useCartStore from './cartStore';
// import useWishlistStore from './wishlistStore';
// import useUIStore from './uiStore';

const useStore = () => {
    const products = useProductStore();
    const cart = useCartStore();
    const wishlist = useWishlistStore();
    const ui = useUIStore();
    
    return {
        products,
        cart,
        wishlist,
        ui
    };
};

export default useStore;