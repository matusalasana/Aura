// src/stores/productStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, AdminProduct } from './types';
import { products as initialProducts } from '../assets/assets';

interface ProductStore {
    products: Product[];
    adminProducts: AdminProduct[];
    addNewProduct: (product: AdminProduct) => void;
    getProductById: (productId: string) => Product | AdminProduct | undefined;
    clearAdminProducts: () => void;
}

const useProductStore = create<ProductStore>()(
    persist(
        (set, get) => ({
            products: initialProducts,
            adminProducts: [],
            
            addNewProduct: (product) => {
                set((state) => ({
                    adminProducts: [...state.adminProducts, product]
                }));
            },
            
            getProductById: (productId) => {
                const { products, adminProducts } = get();
                // First check in regular products
                const product = products.find(p => p._id === productId);
                if (product) return product;
                // Then check in admin products
                return adminProducts.find(p => p._id === productId);
            },
            
            clearAdminProducts: () => set({ adminProducts: [] })
        }),
        {
            name: 'product-storage',
            partialize: (state) => ({ adminProducts: state.adminProducts }),
        }
    )
);

export default useProductStore;