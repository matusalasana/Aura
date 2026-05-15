
import Hero from '../components/Hero';
import CategoriesSection from '../components/CategoriesSection';
import FeaturedSection from '../components/FeaturedSection';
import Bestsellers from '../components/Bestsellers';
import PromoBanner from '../components/PromoBanner';
import WhyChooseUs from '../components/WhyChooseUs';
import AuraTestimonials from '../components/AuraTestimonials';
import Newsletter from '../components/Newsletter';
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
        data={products} 
      />
      
      {/* Bestsellers Section */}
      <Bestsellers 
        data={products} 
      />
      
      {/* Promo Section */}
      <PromoBanner />
      
      {/* Why us Section */}
      <WhyChooseUs />
      
      {/* Testimonials Section */}
      <AuraTestimonials />
      
      {/* Newsletter Section */}
      <Newsletter />
      
    </div>
  );
};

export default HomePage;
