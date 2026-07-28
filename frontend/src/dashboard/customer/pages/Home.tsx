import BecomeVendor from "@/components/common/BecomeVendor";
import BecomeVendorForm from "@/features/vendors/components/BecomeVendorForm";
import Hero from "../components/Hero";
import ValueProps from "../components/ValueProps";
import FeaturedVendors from "../components/FeaturedVendors";
import TrendingCategories from "../components/TrendingCategories";
import Button from "@/components/ui/Button";


const Home = () => {
  return (
    <div>
    <div className="btn">
    This is card
    </div>
      <Button fullWidth={true} variant="danger">Edit</Button>
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