import React from "react";
import { ShoppingCart, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { Link } from "react-router-dom"

import { useCartItems } from "../../features/cart/hooks/useCartItems";

const Topbar = () => {
  const { data: cartItems, isLoading } = useCartItems();
  const itemCount = cartItems?.length ?? 0;
  
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        
        {/* LOGO */}
        <Link to="/">
          <Logo />
        </Link>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* CART */}
          <Link to="/cart">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100 dark:hover:bg-gray-800">
              <ShoppingCart size={20} className="text-gray-800 dark:text-gray-200" />
  
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white dark:bg-white dark:text-black">
                {itemCount >= 10 ? "9+" : itemCount}
              </span>
            </button>
          </Link>

          {/* PROFILE */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100 dark:hover:bg-gray-800">
            <User size={20} className="text-gray-800 dark:text-gray-200" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;