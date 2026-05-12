import ProductCard from '../../products/components/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Title from '../../../shared/ui/Title';

const FeaturedSection = ({featuredProducts}) => {
  
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
      
      <div className="flex justify-between items-end">
        <Title 
          txt1="Featured" 
          txt2="Products" 
          topTitle="Worn and Admired"
        />
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
  )
}

export default FeaturedSection