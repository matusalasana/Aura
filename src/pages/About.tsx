import Footer from "../components/Footer"
import Subscription from "../components/Subscription"
import Title from "../components/Title"
import aboutImg from '../assets/about_img.png'

function About() {
  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Title text1="ABOUT" text2="US" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={aboutImg} 
                alt="About SMstore" 
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              SMstore was born out of a passion for innovation and a desire to revolutionize 
              the way people shop online. Our journey began with a simple idea: to provide 
              a platform where customers can easily discover, explore, and purchase a wide 
              range of products from the comfort of their homes.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Since our inception, we've worked tirelessly to curate a diverse selection 
              of high-quality products that cater to every taste and preference. From fashion 
              and beauty to electronics and home essentials, we offer an extensive collection 
              sourced from trusted brands and suppliers.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 text-xl mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                Our mission at SMstore is to empower customers with choice, convenience, and confidence. 
                We're dedicated to providing a seamless shopping experience that exceeds expectations, 
                from browsing and ordering to delivery and beyond.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-12">
          <Title text1="WHY" text2="CHOOSE US" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-600 font-bold">✓</span>
            </div>
            <h3 className="font-semibold text-lg mb-3">Quality Assurance</h3>
            <p className="text-gray-600 text-sm">
              We meticulously select and vet each product to ensure it meets our stringent quality standards.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold">⚡</span>
            </div>
            <h3 className="font-semibold text-lg mb-3">Convenience</h3>
            <p className="text-gray-600 text-sm">
              With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-600 font-bold">❤️</span>
            </div>
            <h3 className="font-semibold text-lg mb-3">Customer Service</h3>
            <p className="text-gray-600 text-sm">
              Our team of dedicated professionals is here to assist you every step of the way.
            </p>
          </div>
        </div>
      </div>

      <Subscription />
      <Footer />
    </div>
  )
}

export default About