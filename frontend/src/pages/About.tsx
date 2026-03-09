// src/pages/About.tsx
import Footer from "../components/Footer"
import Subscription from "../components/Subscription"
import Title from "../components/Title"
import aboutImg from '../assets/about_img.png'

function About() {
    return (
        <div className="pt-30">
            {/* Hero Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Title text1="ABOUT" text2="US" />
                
                <div className="flex flex-col md:flex-row gap-12 items-center mt-12">
                    {/* Image Section */}
                    <div className="md:w-1/2">
                        <img 
                            src={aboutImg} 
                            alt="About AuraStore" 
                            className="w-full h-auto rounded-2xl shadow-xl"
                        />
                    </div>
                    
                    {/* Content Section */}
                    <div className="md:w-1/2 space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Welcome to AuraStore
                        </h2>
                        
                        <p className="text-gray-600 leading-relaxed">
                            At AuraStore, we believe that shopping should be more than just a transaction - 
                            it should be an experience. Founded in 2024, we've quickly grown to become one 
                            of the most trusted online fashion destinations, offering a curated collection 
                            of the latest trends and timeless classics.
                        </p>
                        
                        <p className="text-gray-600 leading-relaxed">
                            Our mission is to bring you the best in fashion, with carefully selected pieces 
                            that combine quality, style, and affordability. We work directly with manufacturers 
                            to ensure that every item meets our high standards, while keeping prices accessible 
                            to everyone.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-6 pt-6">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">10K+</h3>
                                <p className="text-gray-600">Happy Customers</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">500+</h3>
                                <p className="text-gray-600">Products</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">50+</h3>
                                <p className="text-gray-600">Brands</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
                                <p className="text-gray-600">Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Values Section */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Our Values
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-md text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Quality First
                            </h3>
                            <p className="text-gray-600">
                                We never compromise on quality. Every product is carefully inspected before reaching you.
                            </p>
                        </div>
                        
                        <div className="bg-white p-8 rounded-2xl shadow-md text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">💚</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Customer First
                            </h3>
                            <p className="text-gray-600">
                                Your satisfaction is our priority. We're here to ensure you have the best shopping experience.
                            </p>
                        </div>
                        
                        <div className="bg-white p-8 rounded-2xl shadow-md text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🌱</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Sustainable
                            </h3>
                            <p className="text-gray-600">
                                We're committed to sustainable practices and ethical sourcing in everything we do.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                    Meet Our Team
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    The passionate people behind AuraStore working to bring you the best shopping experience
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="text-center">
                            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                                <div className="w-full h-full bg-gray-400"></div>
                            </div>
                            <h3 className="font-semibold text-gray-900">Team Member {item}</h3>
                            <p className="text-gray-600 text-sm">Position</p>
                        </div>
                    ))}
                </div>
            </div>

            <Subscription />
            <Footer />
        </div>
    )
}

export default About