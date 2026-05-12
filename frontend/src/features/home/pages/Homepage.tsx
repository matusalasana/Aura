
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import ProductCard from '../../products/components/ProductCard';
import Hero from '../components/Hero';
import { useProducts } from '../../products/hooks/useProducts';

const HomePage = () => {
  const {data: featuredProducts, isLoading, isError} = useProducts()

  if(isLoading){
    return<p>Loading...</p>
  };
  
  return (
    <div className="space-y-32 pb-32">
    
      <Hero />
  
      {/* Category Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Women', image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800', count: '124 Items' },
            { name: 'Men', image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=800', count: '86 Items' },
            { name: 'Kids', image: 'https://images.unsplash.com/photo-1519233073524-7935c330ce9e?auto=format&fit=crop&q=80&w=800', count: '52 Items' }
          ].map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] group overflow-hidden cursor-pointer"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-aura-black/10 group-hover:bg-aura-black/30 transition-colors duration-500" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-aura-white">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-70 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  Discover
                </span>
                <h3 className="text-4xl font-serif italic mb-2">{cat.name}</h3>
                <p className="text-[10px] uppercase tracking-widest opacity-60">{cat.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-aura-black/40">Curated Selection</span>
            <h2 className="text-5xl font-serif italic">Featured Essentials</h2>
          </div>
          <Link to="/products" className="group flex items-center space-x-3 text-xs uppercase tracking-widest font-semibold">
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

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
