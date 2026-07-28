import BecomeVendor from "@/components/common/BecomeVendor";
import BecomeVendorForm from "@/features/vendors/components/BecomeVendorForm";
import Hero from "../components/Hero";
import ValueProps from "../components/ValueProps";
import FeaturedVendors from "../components/FeaturedVendors";
import TrendingCategories from "../components/TrendingCategories";
import Textarea from "@/components/ui/Textarea";


const Home = () => {
  return (
    <div>
      <Textarea 
        label={"description"} 
        placeholder="danger"
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