import BecomeVendor from "@/components/common/BecomeVendor";
import BecomeVendorForm from "@/features/vendors/components/BecomeVendorForm";
import Hero from "../components/Hero";
import ValueProps from "../components/ValueProps";
import FeaturedVendors from "../components/FeaturedVendors";
import TrendingCategories from "../components/TrendingCategories";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import { useSignout } from "@/features/auth/hooks/useSignout"


const Home = () => {
  const { mutate: signout, isPending } = useSignout();
  return (
    <div>
      <button
        onClick={() => signout()}
        disabled={isPending}
        className="btn btn-danger"
      >
        {isPending ? "Signing Out..." : "Sign Out" }
      </button>
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