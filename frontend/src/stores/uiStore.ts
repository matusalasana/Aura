// src/stores/uiStore.ts
import { create } from 'zustand';

interface UIStore {
    isSearchOpen: boolean;
    currency: string;
    delivery_fee: number;
    openSearch: () => void;
    closeSearch: () => void;
    toggleSearch: () => void;
}

const useUIStore = create<UIStore>((set) => ({
    isSearchOpen: false,
    currency: "ETB ",
    delivery_fee: 10,
    
    openSearch: () => set({ isSearchOpen: true }),
    closeSearch: () => set({ isSearchOpen: false }),
    toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
}));

export default useUIStore;