import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[80vh] flex items-center bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-fashion-bg.jpg" 
          alt="Aura Marketplace" 
          className="w-full h-full object-cover opacity-10 dark:opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-gray-950 dark:via-gray-950/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <span className="text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase text-sm">
            Curated Marketplace
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mt-3 mb-6 leading-tight">
            Find Your Style, <br />
            <span className="text-amber-500">Define Your Aura</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            A premium multi-vendor destination for unique fashion. 
            Connect with top designers and discover pieces that speak to you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-amber-500/30">
              Explore Collections
            </button>
            <button className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-full font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              Apply as Vendor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
