import Hero from "../components/Hero"
import LatestCollection from "../components/LatestCollection"
import BestSellers from '../components/BestSellers'
import Policies from "../components/Policies"
import Subscription from "../components/Subscription"
import Footer from "../components/Footer"

function Home() {
  return (
    <div className="pt-20 bg-[#f8f8f8">
      <Hero />
      <LatestCollection/>
      <BestSellers />
      <Policies />
      <Subscription />
      <Footer />
    </div>
  )
}

export default Home