import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PromoBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-[2rem] my-24 shadow-2xl">
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000')",
        }}
      />

      {/* Gradient overlay instead of solid black */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />

      {/* Subtle animated shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col items-center text-center px-6 py-32 text-white"
      >
        {/* Decorative line */}
        <div className="w-12 h-px bg-white/30 mb-6" />

        <span className="text-xs uppercase tracking-[0.4em] text-white/70 font-light">
          Limited Collection 2026
        </span>

        <h2 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-serif italic leading-tight bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
          Elevate Your Aura
        </h2>

        <p className="mt-5 max-w-xl text-sm sm:text-base text-white/80 font-light">
          Minimal essentials crafted for timeless style and everyday confidence.
        </p>

        <div className="mt-10 relative">
          <span className="text-xs uppercase tracking-[0.3em] text-white/60">
            Up to
          </span>

          <div className="relative">
            <div className="absolute -inset-2 bg-red-500/20 blur-xl rounded-full" />
            <div className="relative text-6xl font-serif italic mt-3 text-red-500 animate-pulse sm:text-7xl font-black tracking-tighter">
              25% OFF
            </div>
          </div>
        </div>

        <Link
          to="/collections"
          className="
            group mt-12 inline-flex items-center gap-2
            rounded-full bg-white px-8 py-3.5
            text-sm font-semibold text-black
            transition-all duration-300 
            hover:bg-white hover:scale-105 hover:shadow-2xl
            active:scale-95
          "
        >
          Shop Now
          <ArrowRight
            size={16}
            className="transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
          />
        </Link>
      </motion.div>
    </section>
  );
};

export default PromoBanner;