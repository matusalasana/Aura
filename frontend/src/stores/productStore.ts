// src/stores/productStore.ts - DEPRECATED
// Use useProducts hook from ../hooks/useProducts instead
// This file kept for backward compatibility only

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, AdminProduct } from './types';

interface ProductStore {
    adminProducts: AdminProduct[];
    addNewProduct: (product: AdminProduct) => void;
    getProductById: (productId: string) => AdminProduct | undefined;
    clearAdminProducts: () => void;
}

const useProductStore = create<ProductStore>()(
    persist(
        (set, get) => ({
            adminProducts: [],
            
            addNewProduct: (product) => {
                set((state) => ({
                    adminProducts: [...state.adminProducts, product]
                }));
            },
            
            getProductById: (productId) => {
                const { adminProducts } = get();
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