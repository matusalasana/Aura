import { Link } from 'react-router-dom';
import newArrivals from '../assets/New-Arrival-High-Quality-Male-Jacket.jpeg';

function Hero() {

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-5 sm:px-6 lg:px-8 overflow-hidden pt-30">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
         
          <div className="text-center lg:text-left space-y-6 lg:space-y-8 order-2 lg:order-1 animate-fade-in">
            
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-10 h-0.5 bg-blue-500"></div>
              <span className="text-sm font-medium text-gray-500 tracking-wider uppercase">
                Our Bestsellers
              </span>
              <div className="w-10 h-0.5 bg-blue-500"></div>
            </div>

           
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                New{' '}
                <span className="text-blue-600 bg-linear-to-r from-blue-600 to-red-600 bg-clip-text">
                  Arrivals
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Discover our premium collection of stylish jackets and outerwear for the modern man.
              </p>
            </div>

           
            <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center">
              <button className="group relative bg-[#00BCD4] hover:bg-[#00BCE0] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">
                <span className="flex items-center gap-2">
                  Shop Now
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              
              <Link to={'/collection'}>
                <button className="group border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-medium py-4 px-8 rounded-xl transition-all duration-300">
                  <span className="flex items-center gap-2">
                    View Collection
                    <svg 
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>

           
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">200+</div>
                <div className="text-sm text-gray-500">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">5K+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-500">Quality Guarantee</div>
              </div>
            </div>
          </div>

         
          <div className="order-1 lg:order-2 relative animate-float">
            <div className="relative">
             
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img 
                  src={newArrivals}
                  alt="Latest arrivals - High Quality Male Jacket" 
                  className="w-full h-[500px] lg:h-[600px] object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
               
                <div className="absolute bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              
              <div className="absolute -top-4 -right-4 bg-linear-to-r from-cyan-900 to-cyan-700 rounded-2xl shadow-black shadow-sm p-4 animate-pulse duration-100">
                <div className="text-sm  text-white font-bold">🔥 Hot Item</div>
              </div>
              
              <div className="absolute bottom-0 -left-4 bg-linear-to-r from-cyan-900 to-cyan-700 text-white rounded-2xl shadow-xl p-4">
                <div className="text-sm">New Season</div>
              </div>
            </div>
          </div>

        </div>
      </div>

     
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </section>
  )
}

export default Hero