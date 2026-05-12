import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  User,
  Heart,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartItems } from "../../../features/cart/hooks/useCartItems";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { name: "Women", path: "/collections" },
  { name: "Men", path: "/collections" },
  { name: "Kids", path: "/collections" },
  { name: "Collections", path: "/collections" },
];

const Topbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: cartItems } = useCartItems();
  const totalItems = cartItems?.length ?? 0;

  const iconClass =
    "w-5 h-5 transition-colors text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white";

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between py-5">
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className="text-xs uppercase tracking-widest font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              {name}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-serif tracking-tighter italic text-gray-900 dark:text-white"
          >
            Aura
          </motion.span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-5 lg:gap-6">
          <ThemeToggle />

          <Link aria-label="Wishlist" to="/wishlist" className="hidden sm:block">
            <Heart className={iconClass} strokeWidth={1.5} />
          </Link>

          <Link aria-label="Notifications" to="/notifications" className="relative">
            <Bell className={iconClass} strokeWidth={1.5} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full" />
          </Link>

          <Link aria-label="Profile" to="/profile">
            <User className={iconClass} strokeWidth={1.5} />
          </Link>

          <Link aria-label="Cart" to="/cart" className="relative group">
            <ShoppingBag className={iconClass} strokeWidth={1.5} />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium transition">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-gray-800 dark:text-gray-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
          >
            <div className="flex flex-col px-6 py-5 gap-4">
              {NAV_LINKS.map(({ name, path }) => (
                <Link
                  key={name}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition border-b border-gray-100 dark:border-gray-800 pb-2"
                >
                  {name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Topbar;