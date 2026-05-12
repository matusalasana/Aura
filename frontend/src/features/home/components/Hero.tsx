import { Pointer, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative bg-black h-[90vh] text-gray-700 dark:text-gray-300 flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
          alt="Hero Fashion"
          className="w-full h-full blur-xs dark:opacity-30 opacity-80 object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-aura-black/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl space-y-8"
        >
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[10px] uppercase tracking-[0.5em] text-aura-white font-medium"
            >
              Collection 2026
            </motion.span>
            <h1 className="text-6xl transition-colors md:text-8xl font-serif text-aura-white italic tracking-tighter leading-[0.9]">
              Dress Like<br /> the Aura You Want
               
            </h1>
          </div>
          <p className="text-gray-300 font-light text-lg max-w-md leading-relaxed">
            Curated essentials for the modern lifestyle. Experience the perfect harmony of comfort and sophistication.
          </p>
          <div className="flex justify-center items-center space-x-6 pt-4">
            <Link to="/collections">
            <button className="flex gap-2 text-black font-bold rounded-lg border-2 border-gray-700 dark:border-gray-900 hover:bg-gray-900 bg-white/30 px-4 py-4">
              Explore Collections <ArrowRight size={24} />
            </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 90, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-aura-white/40 rotate-90 origin-center translate-y-8"><Pointer size={24} /></span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-aura-white/40 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
