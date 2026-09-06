import BecomeVendor from "@/components/common/BecomeVendor";
import BecomeVendorForm from "@/features/vendors/components/BecomeVendorForm";
import Hero from "../components/Hero";
import ValueProps from "../components/ValueProps";
import FeaturedVendors from "../components/FeaturedVendors";
import TrendingCategories from "../components/TrendingCategories";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import { useSignout } from "@/features/auth/hooks/useSignout"
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser"


const Home = () => {
  const { data: user, isLoading} = useCurrentUser();
  const { mutate: signout, isPending} = useSignout();
  

  if(isLoading){
    return<p>Loading user...</p>
  }
  return (
    <div>
      
      <button
        onClick={() => signout()}
        disabled={isPending}
        className="btn btn-danger"
      >
        {isPending ? "Signing Out..." : "Sign Out " }
      </button>

      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>email: {user.email}</p>
        </div>)
      }
      
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