import { useProducts } from "@/features/products/hooks/useProducts";
import Hero from "@/dashboard/customer/components/Hero";
import FeaturedCategories from "@/dashboard/customer/components/FeaturedCategories";
import PopularStores from "@/dashboard/customer/components/PopularStores";
import WhyAura from "@/dashboard/customer/components/WhyAura";
import Testimonials from "@/dashboard/customer/components/Testimonials";
import FAQ from "@/dashboard/customer/components/FAQ";
import Pricing from "@/dashboard/customer/components/Pricing";
import VendorOnboarding from "@/components/common/VendorSignupForm";
import MerchantMarquee from "@/dashboard/customer/components/MerchantMarquee";
import ProductCard from "@/components/common/product/ProductCard";

export default function AuraHomePage() {
  const { data: products = [], isLoading } = useProducts();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  return (
    <div className="min-h-screen bg-foreground text-foreground font-sans antialiased px-5 space-y-4">

      <Hero />
    
      {products.map((p) => (
        <ProductCard product={p} />
      ))
        
      }
      <MerchantMarquee />
      <VendorOnboarding />
      <Pricing />
      <FeaturedCategories />
      <PopularStores />
      <WhyAura />
      <Testimonials />
      <FAQ />
      
    </div>
  );
}
