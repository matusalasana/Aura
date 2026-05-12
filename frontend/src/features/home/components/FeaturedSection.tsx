import ProductCard from '../../products/components/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Title from '../../../shared/ui/Title';

const FeaturedSection = ({data}) => {
  
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
  
        <Title 
          txt1="Featured" 
          txt2="Products" 
          topTitle="Worn and Admired"
        />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedSection