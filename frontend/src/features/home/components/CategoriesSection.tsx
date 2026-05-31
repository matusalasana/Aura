import { motion } from 'framer-motion';
import Title from '../../../shared/ui/Title';
import {useCategories} from "../hooks/useCategories";
import LoadingSkeleton from '../../../shared/ui/LoadingSkeleton';

const CategoriesSection = () => {
  const {data: categories, isLoading, isError} = useCategories();
  
  if (isLoading) {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <LoadingSkeleton
        amount={6}
        height="h-[400px]"
        containerStyle="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        itemStyle="rounded-2xl"
      />
    </section>
  );
}
  
  if(isError){
    return <p className="text-red-600 text-xs">fetching categories failed</p>;
  }
  
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <Title 
        txt1="Available" 
        txt2="Categories" 
        topTitle="Crafted for Every Mood"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] group overflow-hidden rounded-2xl bg-gray-100 cursor-pointer"
          >
            {/* Optimized Image Tag */}
            <img 
              src={cat.image_url} 
              alt={cat.name} 
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            
            {/* Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
            
            {/* Text Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <h3 className="text-4xl font-serif italic mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                {cat.name}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-80 font-medium">
                {120}
              </p>
              
              {/* Subtle underline effect */}
              <div className="w-0 group-hover:w-12 h-[1px] bg-white/50 mt-4 transition-all duration-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default CategoriesSection
