import BecomeVendor from "@/components/common/BecomeVendor";
import BecomeVendorForm from "@/features/vendors/components/BecomeVendorForm";
import Hero from "../components/Hero";
import ValueProps from "../components/ValueProps";
import FeaturedVendors from "../components/FeaturedVendors";
import TrendingCategories from "../components/TrendingCategories";
import ProgressIndicator from "@/components/ui/ProgressIndicator";


const Home = () => {
  return (
    <div>
      <ProgressIndicator 
        steps={["1", "2", "3", "4", "5"]} 
        currentStep={1}
      />
      <Hero />
      <ValueProps />
      <FeaturedVendors />
      <TrendingCategories />
      <BecomeVendor />
      <BecomeVendorForm />
    </div>
  )
}

export default Home