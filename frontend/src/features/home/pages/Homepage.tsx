
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import Hero from '../components/Hero';
import CategoriesSection from '../components/CategoriesSection';
import FeaturedSection from '../components/FeaturedSection';
import { useProducts } from '../../products/hooks/useProducts';

const HomePage = () => {
  const {data: products, isLoading, isError} = useProducts()

  if(isLoading){
    return<p>Loading...</p>
  };
  
  return (
    <div className="space-y-32 pb-32">
    
      {/* Hero Section */}
      <Hero />
  
      {/* Category Section */}
      <CategoriesSection />

      {/* Featured Products */}
      <FeaturedSection 
        featuredProducts={products} 
      />

      {/* Atmosphere Section */}
      <section className="bg-aura-soft py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <motion.div 
              className="absolute -top-12 -left-12 w-64 h-64 aura-gradient rounded-full blur-3xl opacity-50"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative z-10 space-y-10">
              <h2 className="text-5xl md:text-6xl font-serif leading-tight">
                Designed for <br /> <span className="italic">Substance</span> & <span className="italic">Style</span>
              </h2>
              <p className="text-aura-black/60 font-light text-lg leading-relaxed max-w-lg">
                At Aura, we believe that fashion should be a quiet statement of who you are. Our pieces are designed to be lived in, aged with, and loved forever.
              </p>
              <ul className="space-y-6">
                {[
                  { title: 'Conscious Materials', desc: 'Sourced from strictly ethical and sustainable providers.' },
                  { title: 'Timeless Silhouette', desc: 'Designs that bypass trends to remain eternally relevant.' },
                  { title: 'Exceptional Craft', desc: 'Meticulously constructed to last for generations.' }
                ].map((item) => (
                  <li key={item.title} className="flex space-x-4 border-l border-aura-black/10 pl-6 hover:border-aura-accent transition-colors">
                    <div>
                      <h4 className="text-sm uppercase tracking-widest font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-aura-black/50 font-light">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative aspect-[3/4]">
             <img 
              src="https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=1000" 
              alt="Atmosphere" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-8 -right-8 bg-aura-black p-8 text-aura-white max-w-xs space-y-4">
              <p className="text-sm font-light italic">"Fashion fades, only style remains the same."</p>
              <div className="h-[1px] w-12 bg-aura-accent" />
              <p className="text-[10px] uppercase tracking-widest font-semibold">The Aura Philosophy</p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;
