import BecomeVendor from "@/components/common/BecomeVendor";
import BecomeVendorForm from "@/features/vendors/components/BecomeVendorForm";
import Hero from "../components/Hero";
import ValueProps from "../components/ValueProps";


const Home = () => {
  return (
    <div>
      <Hero />
      <ValueProps />
      <BecomeVendor />
      <BecomeVendorForm />
    </div>
  )
}

export default Home