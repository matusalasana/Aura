import { Link } from "react-router-dom"
import { BiCopyright, BiPhone, BiEnvelope } from "react-icons/bi"
import storeLogo from '../assets/logo.svg'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-black text-gray-400 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-1">
              <img src={storeLogo} alt="Store Logo" className="h-7" />
            </div>
            <p className="text-sm text-center leading-relaxed max-w-md">
              Your premier destination for quality fashion and lifestyle products. 
              We're committed to providing exceptional shopping experiences.
            </p>
          </div>

          
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">COMPANY</h3>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block hover:text-white transition-colors">Home</Link>
              <Link to="/about" className="block hover:text-white transition-colors">About Us</Link>
              <Link to="/delivery" className="block hover:text-white transition-colors">Delivery</Link>
              <Link to="/privacy" className="block hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>

         
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">GET IN TOUCH</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <BiPhone className="w-4 h-4 text-gray-400" />
                <span>+251-945807386</span>
              </div>
              <div className="flex items-center gap-2">
                <BiEnvelope className="w-4 h-4 text-gray-400" />
                <a href="mailto:matusalasana@gmail.com" className="hover:text-white transition-colors">
                  matusalasana@gmail.com
                </a>
              </div>
              <div>
                <a href="#" className="hover:text-white transition-colors">@sana1514</a>
              </div>
            </div>
          </div>
        </div>

        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <BiCopyright className="w-4 h-4" />
            <span>Copyright {currentYear}. All rights reserved.</span>
          </div>
          <div>
            <Link to="/terms" className="text-sm hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer