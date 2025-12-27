const Subscription = () => {
  return (
    <section className="relative bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl mx-4 my-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="mt-5 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-700 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-blue-500 text-sm font-medium">Limited Time Offer</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Subscribe now &{' '}
              <span className="text-blue-500 bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text">
                get 20% off
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Join our newsletter and be the first to know about exclusive deals, new arrivals, and special promotions.
            </p>

            {/* Features List */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-gray-300">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">No spam, ever</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Unsubscribe anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Exclusive deals</span>
              </div>
            </div>
          </div>

          {/* Subscription Form */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
              <form className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-white font-medium text-sm">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>Subscribe & Get 20% Off</span>
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                {/* Privacy Note */}
                <p className="text-gray-400 text-xs text-center">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from our store.
                </p>
              </form>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-blue-700 text-white rounded-2xl shadow-xl p-4 animate-bounce">
              <div className="text-sm font-semibold">🔥 20% OFF</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Subscription;