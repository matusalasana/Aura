import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search, Zap } from 'lucide-react';
import { useCart } from "../hooks/useCart";
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop All', path: '/' },
    { name: 'New Arrivals', path: '/new' },
    { name: 'Collections', path: '/collections' },
  ];

  return (
    <nav className={`fixed top-0 z-[100] w-full transition-all duration-700 ease-in-out ${
      scrolled 
        ? 'py-4' 
        : 'py-8'
    }`}>
      {/* Background Layer */}
      <div className={`absolute inset-0 transition-all duration-700 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-2xl border-b border-slate-100/50 shadow-sm opacity-100' 
          : 'bg-transparent opacity-0'
      }`} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(true)}
            className="group p-2 lg:hidden text-slate-900"
          >
            <Menu className="h-6 w-6 group-active:scale-90 transition-transform" />
          </button>

          {/* Left: Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`group relative text-[10px] font-black uppercase tracking-[0.3em] transition-all ${
                  location.pathname === link.path ? 'text-indigo-600' : 'text-slate-900'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-indigo-600 transition-all duration-500 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* Center: Brand Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group">
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-slate-950 italic transition-all group-hover:tracking-normal group-active:scale-95">
              AURA
            </h1>
            <div className="flex gap-1 mt-0.5">
              <div className="h-1 w-1 rounded-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="h-1 w-1 rounded-full bg-slate-900 opacity-0 group-hover:opacity-100 transition-opacity delay-75" />
            </div>
          </Link>

          {/* Right: Action Suite */}
          <div className="flex items-center gap-1 sm:gap-3">
            <button 
              className="hidden sm:flex p-2.5 text-slate-900 hover:bg-slate-50 rounded-full transition-all active:scale-90"
              aria-label="Search"
            >
              <Search className="h-5 w-5 stroke-[2.5]" />
            </button>
            
            <Link 
              to={user ? "/profile" : "/login"} 
              className="p-2.5 text-slate-900 hover:bg-slate-50 rounded-full transition-all active:scale-90"
            >
              <User className="h-5 w-5 stroke-[2.5]" />
            </Link>

            <Link 
              to="/cart" 
              className="group relative p-2.5 text-slate-900 hover:bg-slate-50 rounded-full transition-all active:scale-90"
            >
              <ShoppingBag className="h-5 w-5 stroke-[2.5]" />
              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[8px] font-black text-white ring-2 ring-white animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* --- MOBILE ARCHITECTURE --- */}
      <div 
        className={`fixed inset-0 z-[110] bg-slate-950/20 backdrop-blur-md transition-all duration-500 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={() => setIsOpen(false)} 
      />

      <div className={`fixed inset-y-0 left-0 z-[120] w-full max-w-[320px] bg-white transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) lg:hidden ${
        isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-indigo-600 fill-indigo-600" />
              <span className="text-xl font-black italic tracking-tighter">AURA</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-50 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between"
              >
                <span className="text-3xl font-black tracking-tighter uppercase group-hover:text-indigo-600 transition-colors">
                  {link.name}
                </span>
                <div className="h-2 w-2 rounded-full bg-slate-100 group-hover:bg-indigo-600 transition-colors" />
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-slate-50">
            <div className="bg-slate-50 rounded-3xl p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Account</p>
              <Link 
                to={user ? "/profile" : "/login"} 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 text-sm font-bold text-slate-900"
              >
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <User size={18} />
                </div>
                {user ? 'View Profile' : 'Sign In / Join'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
