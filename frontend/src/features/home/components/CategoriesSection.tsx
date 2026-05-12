import { motion } from 'framer-motion';
import Title from '../../../shared/ui/Title';

const categories = [
  { name: 'Women', image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800', count: '124 Items' },
  { name: 'Men', image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=800', count: '86 Items' },
  { name: 'Kids', image: 'https://bxxwonszqwilodfqvjbv.supabase.co/storage/v1/object/public/product-images/p_img24.png', count: '52 Items' }
]

const CategoriesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12">
      <Title 
        txt1="Available" 
        txt2="Categories" 
        topTitle="Crafted for Every Mood"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
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
  )
}

export default CategoriesSection