import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search, Heart } from 'lucide-react';
import { useCart } from "../hooks/useCart";
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop All', path: '/' },
    { name: 'New Arrivals', path: '/new' },
    { name: 'Collections', path: '/collections' },
  ];

  return (
    <nav className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
      scrolled 
        ? 'py-3 backdrop-blur-xl bg-white/70 border-b border-gray-100' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(true)}
            className="p-2 lg:hidden text-gray-900"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Left: Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-indigo-600 ${
                  location.pathname === link.path ? 'text-indigo-600' : 'text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Center: Brand Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 group">
            <h1 className="text-2xl font-black tracking-tighter text-gray-900 italic transition-transform group-hover:scale-105">
              AURA
            </h1>
            <div className="h-0.5 w-0 bg-black transition-all group-hover:w-full" />
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              className="p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors hidden sm:block"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            
            <Link 
              to={user ? "/profile" : "/login"} 
              className="p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link 
              to="/cart" 
              className="relative p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={() => setIsOpen(false)} 
        aria-hidden="true"
      />

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-[120] w-[80%] max-w-sm bg-white p-6 transition-transform duration-500 ease-out lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between mb-10">
          <span className="text-xl font-black italic tracking-tighter">AURA</span>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold tracking-tight text-gray-900 hover:text-indigo-600"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;