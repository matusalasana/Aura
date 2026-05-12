import { Pointer, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effect: Image moves slower than the scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef}
      className="relative bg-black h-[95vh] text-white flex items-center overflow-hidden"
    >
      {/* Background with Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          style={{ y }}
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
          alt="Hero Fashion"
          className="w-full h-full object-cover opacity-60 scale-110"
          referrerPolicy="no-referrer"
        />
        {/* Modern Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl space-y-8"
        >
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-[1px] bg-white/40" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/60 font-medium">
                Collection 2026
              </span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter leading-[0.85] text-white">
              Dress Like<br /> 
              <span className="text-white/90">the Aura You Want</span>
            </h1>
          </div>

          <p className="text-gray-300 font-light text-lg max-w-md leading-relaxed">
            Curated essentials for the modern lifestyle. Experience the perfect harmony of comfort and sophistication.
          </p>

          <div className="flex items-center pt-4">
            <Link to="/collections">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 bg-white text-black font-bold rounded-full px-8 py-4 transition-colors hover:bg-gray-200"
              >
                Explore Collections 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Improved Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-2">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
