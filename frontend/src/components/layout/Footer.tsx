import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-aura-black text-aura-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {/* Brand Section */}
        <div className="space-y-6">
          <h2 className="text-4xl font-serif italic tracking-tighter">Aura</h2>
          <p className="text-sm font-light text-aura-soft/70 leading-relaxed max-w-xs">
            Elevating everyday essentials through conscious design and premium craftsmanship. Join us in our journey towards timeless elegance.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-aura-accent transition-colors"><Instagram className="w-5 h-5" strokeWidth={1.5} /></a>
            <a href="#" className="hover:text-aura-accent transition-colors"><Twitter className="w-5 h-5" strokeWidth={1.5} /></a>
            <a href="#" className="hover:text-aura-accent transition-colors"><Facebook className="w-5 h-5" strokeWidth={1.5} /></a>
          </div>
        </div>

        {/* Links: Shopping */}
        <div className="space-y-6">
          <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-aura-accent">Shop</h3>
          <ul className="space-y-4">
            <li><Link to="/category/women" className="text-sm text-aura-soft/60 hover:text-aura-white hover:translate-x-1 transition-all inline-block uppercase tracking-wider font-light">Women</Link></li>
            <li><Link to="/category/men" className="text-sm text-aura-soft/60 hover:text-aura-white hover:translate-x-1 transition-all inline-block uppercase tracking-wider font-light">Men</Link></li>
            <li><Link to="/category/kids" className="text-sm text-aura-soft/60 hover:text-aura-white hover:translate-x-1 transition-all inline-block uppercase tracking-wider font-light">Kids</Link></li>
            <li><Link to="/new-arrivals" className="text-sm text-aura-soft/60 hover:text-aura-white hover:translate-x-1 transition-all inline-block uppercase tracking-wider font-light">New Arrivals</Link></li>
          </ul>
        </div>

        {/* Links: Services */}
        <div className="space-y-6">
          <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-aura-accent">Support</h3>
          <ul className="space-y-4">
            <li><Link to="/shipping" className="text-sm text-aura-soft/60 hover:text-aura-white hover:translate-x-1 transition-all inline-block uppercase tracking-wider font-light">Shipping & Returns</Link></li>
            <li><Link to="/faq" className="text-sm text-aura-soft/60 hover:text-aura-white hover:translate-x-1 transition-all inline-block uppercase tracking-wider font-light">FAQ</Link></li>
            <li><Link to="/contact" className="text-sm text-aura-soft/60 hover:text-aura-white hover:translate-x-1 transition-all inline-block uppercase tracking-wider font-light">Contact Us</Link></li>
            <li><Link to="/terms" className="text-sm text-aura-soft/60 hover:text-aura-white hover:translate-x-1 transition-all inline-block uppercase tracking-wider font-light">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24 pt-8 border-t border-aura-soft/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] uppercase tracking-[0.3em] font-light text-aura-soft/30">
        <p>&copy; 2026 AURA. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-8">
          <Link to="/developers" className="hover:text-aura-white">DEVELOPER(S)</Link>
          <a href="#" className="hover:text-aura-white">PRIVACY POLICY</a>
          <a href="#" className="hover:text-aura-white">ACCESSIBILITY</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;