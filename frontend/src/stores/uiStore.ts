// src/stores/uiStore.js
import { create } from 'zustand';

const useUIStore = create((set) => ({
  isSearchOpen: false,
  currency: "ETB ",
  delivery_fee: 10,
  
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  
  // You can add more UI states here as needed
  // isCartOpen: false,
  // isMenuOpen: false,
  // toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));

export default useUIStore;