import BecomeVendor from "@/components/common/BecomeVendor";
import BecomeVendorForm from "@/features/vendors/components/BecomeVendorForm";
import Hero from "../components/Hero";


const Home = () => {
  return (
    <div>
      <Hero />
      <BecomeVendor />
      <BecomeVendorForm />
    </div>
  )
}

export default Home