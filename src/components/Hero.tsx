import { Link } from 'react-router-dom';
import newArrivals from '../assets/New-Arrival-High-Quality-Male-Jacket.jpeg';
import Title from './Title';
import { FaGreaterThan } from 'react-icons/fa';
import TiltleDiscription from './TiltleDiscription';

function Hero() {

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-5 sm:px-6 lg:px-8 overflow-hidden pt-30">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
         
          <div className="text-center lg:text-left space-y-6 lg:space-y-8 order-2 lg:order-1 animate-fade-in">
            
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-0.5 bg-gray-500"></div>
              <span className="text-sm font-medium text-gray-500 uppercase">
                Our Bestsellers
              </span>
              <div className="w-10 h-0.5 bg-gray-500"></div>
            </div>

           
            <div className="flex flex-col justify-center items-center">
              <Title text1='NEW' text2='ARRIVALS' />
              <TiltleDiscription
                text="Discover our premium collection of stylish jackets and outerwear for the modern man."
              />
            </div>

           
            
              
            
              <button className="flex items-center justify-center mx-auto bg-blue-600 text-white hover:bg-blue-700 font-medium py-5 px-8 rounded-xl transition-all duration-300">

                <Link to={'/collection'} className='flex gap-3 items-center'>
                  <span>
                    View Our Collections
                  </span>
                  < FaGreaterThan />
                </Link>

              </button>
            
            

           
            <div className="flex justify-center items-center gap-6 pt-4">
              <div >
                <div className="text-2xl font-bold text-gray-900">200+</div>
                <div className="text-sm text-gray-500">Premium Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">5K+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
              <div>
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
              
              
              <div className="absolute -top-4 -right-4 bg-linear-to-r from-blue-600 to-blue-700 rounded-2xl shadow-black shadow-sm p-4 animate-pulse">
                <div className="text-sm font-semibold text-white">🔥 Hot Item</div>
              </div>
              
              <div className="absolute bottom-0 -left-4 bg-blue-600 text-white rounded-2xl shadow-xl p-4">
                <div className="text-sm font-semibold">New Season</div>
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