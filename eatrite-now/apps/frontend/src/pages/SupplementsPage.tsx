const SupplementsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-factor-green-50 to-factor-orange-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-factor-gray-900 mb-4 sm:mb-6">
              From the makers of Factor meals
            </h1>
            <p className="text-lg sm:text-xl text-factor-gray-700 max-w-3xl mx-auto mb-6 sm:mb-8">
              Supplements with the same food-first philosophy you trust, created by Factor chefs and dietitians.
            </p>
            <button className="btn-factor-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              Shop now
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-6 sm:mb-8">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.612-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm sm:text-base text-factor-gray-700">5 stars by 35,000+ users for Factor on Trustpilot</span>
          </div>

          {/* Quality badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-factor-gray-700">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 sm:w-8 sm:h-8 bg-factor-green-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-factor-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span>NO SUGAR ADDED</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 sm:w-8 sm:h-8 bg-factor-green-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-factor-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </span>
              <span>KETO FRIENDLY</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 sm:w-8 sm:h-8 bg-factor-green-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-factor-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>DIETITIAN APPROVED</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 sm:w-8 sm:h-8 bg-factor-green-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-factor-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </span>
              <span>ON-THE-GO PACKETS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Factor Form */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-factor-gray-900 mb-12 sm:mb-16">Why Factor Form</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-factor-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-factor-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">More Flexibility</h3>
              <p className="text-sm sm:text-base text-factor-gray-600">Create your perfect wellness routine with products designed for gut health, immune support, recovery, and more.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-factor-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-factor-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">More Quality</h3>
              <p className="text-sm sm:text-base text-factor-gray-600">Made with no added sugar, our products are keto-friendly and free of unnecessary ingredients.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-factor-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-factor-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">More Nutrition</h3>
              <p className="text-sm sm:text-base text-factor-gray-600">Enjoy dietitian-approved formulas packed with premium, nutritional ingredients.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-factor-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-factor-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 01-1 1H7a1 1 0 110-2h3a1 1 0 011 1zm-1-1a1 1 0 100-2H7a1 1 0 100 2h2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">More Convenience</h3>
              <p className="text-sm sm:text-base text-factor-gray-600">Take your life on the go with our single-serving packets you can tuck in your bag, car, or suitcase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-factor-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Daily Greens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-20">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-factor-gray-900 mb-4 sm:mb-6">Daily Greens</h2>
              <div className="flex flex-wrap gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-factor-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-factor-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586 13.293 6.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Gut Health Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-factor-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-factor-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-0.257-.257A6 6 0 1118 8zM10 2a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Immune System Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-factor-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-factor-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Energy and Mood</span>
                </div>
              </div>
              <p className="text-base sm:text-lg text-factor-gray-700 mb-4 sm:mb-6">
                A greens powder you'll look forward to drinking. This once-daily supplement helps fill nutrient gaps and boost overall wellbeing*, with a refreshing citrusy taste.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-factor-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                  Shop Daily Greens
                </button>
                <button className="text-factor-green-600 hover:text-factor-green-700 font-semibold text-sm sm:text-base">
                  View Ingredients
                </button>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <img 
                src="https://images.unsplash.com/photo-1614088344782-9b39c34e82c7?w=800&h=800&fit=crop&crop=center" 
                alt="Daily Greens powder packaging" 
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Whey Protein */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-20">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=800&fit=crop&crop=center" 
                alt="Whey protein powder packaging" 
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-factor-gray-900 mb-4 sm:mb-6">Whey Protein</h2>
              <div className="flex flex-wrap gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-factor-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-factor-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zM8 6a2 2 0 114 0v1H8V6zm0 3a1 1 0 012 0 1 1 0 11-2 0zm4 0a1 1 0 012 0 1 1 0 11-2 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Build Muscle</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-factor-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-factor-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Support Recovery</span>
                </div>
              </div>
              <p className="text-base sm:text-lg text-factor-gray-700 mb-4 sm:mb-6">
                Hitting your protein goals never tasted so good. Enjoy a complete protein source with all 9 essential amino acids to help you build muscle and meet your daily protein needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-factor-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                  Shop Whey Protein
                </button>
                <button className="text-factor-green-600 hover:text-factor-green-700 font-semibold text-sm sm:text-base">
                  View Ingredients
                </button>
              </div>
            </div>
          </div>

          {/* Hydration Boost */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-20">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-factor-gray-900 mb-4 sm:mb-6">Hydration Boost</h2>
              <div className="flex flex-wrap gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-factor-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-factor-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 8a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Replenish Electrolytes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-factor-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-factor-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Help Stay Hydrated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-factor-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-factor-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-0.257-.257A6 6 0 1118 8zM10 2a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Immune System Support</span>
                </div>
              </div>
              <p className="text-base sm:text-lg text-factor-gray-700 mb-4 sm:mb-6">
                Your water deserves an upgrade. A great-tasting electrolyte mix with added vitamins and benefits to help you get the most out of every drop.*
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-factor-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                  Shop Hydration Boost
                </button>
                <button className="text-factor-green-600 hover:text-factor-green-700 font-semibold text-sm sm:text-base">
                  View Ingredients
                </button>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <img 
                src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=800&fit=crop&crop=center" 
                alt="Hydration boost packets" 
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-factor-gray-900 mb-12 sm:mb-16">Elevate Your Wellness Routine</h2>
          <p className="text-lg sm:text-xl text-center text-factor-gray-700 mb-8 sm:mb-12 max-w-3xl mx-auto">
            Power your routine with on-the-go products that fit seamlessly into your daily life.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Testimonial 1 */}
            <div className="bg-factor-gray-50 p-4 sm:p-6 rounded-lg">
              <div className="flex items-center mb-3 sm:mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" 
                  alt="Shaun W." 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                />
                <div>
                  <p className="font-semibold text-sm sm:text-base">Shaun W.</p>
                  <p className="text-xs sm:text-sm text-factor-gray-600">Daily Greens | Paid review†</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-factor-gray-700">
                "Before I tried Daily Greens I was worried about whether or not it would be worth the money, but it definitely is. I'm saving money already by replacing my coffee with the greens and I feel much better."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-factor-gray-50 p-4 sm:p-6 rounded-lg">
              <div className="flex items-center mb-3 sm:mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" 
                  alt="Brian L." 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                />
                <div>
                  <p className="font-semibold text-sm sm:text-base">Brian L.</p>
                  <p className="text-xs sm:text-sm text-factor-gray-600">Daily Greens | Verified Purchase</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-factor-gray-700">
                "It tastes great compared to AG1"
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-factor-gray-50 p-4 sm:p-6 rounded-lg">
              <div className="flex items-center mb-3 sm:mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=50&h=50&fit=crop&crop=face" 
                  alt="Ryan A." 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                />
                <div>
                  <p className="font-semibold text-sm sm:text-base">Ryan A.</p>
                  <p className="text-xs sm:text-sm text-factor-gray-600">Whey Protein | Verified Purchase</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-factor-gray-700">
                "The packets make it nice and easy in the morning to put into my smoothie. Not having a scoop makes it a lot less messy."
              </p>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-factor-gray-50 p-4 sm:p-6 rounded-lg">
              <div className="flex items-center mb-3 sm:mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face" 
                  alt="Axel J." 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                />
                <div>
                  <p className="font-semibold text-sm sm:text-base">Axel J.</p>
                  <p className="text-xs sm:text-sm text-factor-gray-600">Whey Protein | Verified Purchase</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-factor-gray-700">
                "If you're looking for a convenient protein or a protein with no chalky taste, a cleaner formula, this is it."
              </p>
            </div>

            {/* Testimonial 5 */}
            <div className="bg-factor-gray-50 p-4 sm:p-6 rounded-lg">
              <div className="flex items-center mb-3 sm:mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face" 
                  alt="Janine K." 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                />
                <div>
                  <p className="font-semibold text-sm sm:text-base">Janine K.</p>
                  <p className="text-xs sm:text-sm text-factor-gray-600">Hydration | Verified Purchase</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-factor-gray-700">
                "I need to drink more water and the hydration packets make it more exciting. I really love the orange yuzu for the extra vitamin C - especially during cold/flu season."
              </p>
            </div>

            {/* Testimonial 6 */}
            <div className="bg-factor-gray-50 p-4 sm:p-6 rounded-lg">
              <div className="flex items-center mb-3 sm:mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" 
                  alt="Linda B." 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                />
                <div>
                  <p className="font-semibold text-sm sm:text-base">Linda B.</p>
                  <p className="text-xs sm:text-sm text-factor-gray-600">Hydration | Verified Purchase</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-factor-gray-700">
                "My doctor recommended it...I feel better hydrated with the drinks! More alert...more energy..."
              </p>
            </div>
          </div>

          <div className="text-center">
            <button className="btn-factor-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              Shop all products
            </button>
          </div>
        </div>
      </section>

      {/* Welcome Kit Offer */}
      <section className="py-12 sm:py-16 lg:py-20 bg-factor-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-factor-gray-900 mb-4">FREE Daily Greens Welcome Kit worth $36</h2>
            <p className="text-lg sm:text-xl text-factor-gray-700 max-w-3xl mx-auto">
              Turn your daily habit into a delicious ritual with a kit full of greens essentials. Free welcome kit with first time purchase of Daily Greens.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center" 
                alt="Greens Welcome Kit" 
                className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between py-3 sm:py-4 border-b border-factor-gray-200">
                  <span className="text-base sm:text-lg font-medium">Shaker bottle</span>
                  <span className="text-base sm:text-lg font-semibold text-factor-green-600">$20.00 FREE</span>
                </div>
                <div className="flex items-center justify-between py-3 sm:py-4 border-b border-factor-gray-200">
                  <span className="text-base sm:text-lg font-medium">Full-size samples (3)</span>
                  <span className="text-base sm:text-lg font-semibold text-factor-green-600">$10.00 FREE</span>
                </div>
                <div className="flex items-center justify-between py-3 sm:py-4 border-b border-factor-gray-200">
                  <span className="text-base sm:text-lg font-medium">Shipping</span>
                  <span className="text-base sm:text-lg font-semibold text-factor-green-600">$5.99 FREE</span>
                </div>
              </div>
              <button className="w-full btn-factor-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 mt-6 sm:mt-8">
                Shop Daily Greens
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-factor-gray-900 mb-12 sm:mb-16">Common Questions</h2>
          
          <div className="space-y-6 sm:space-y-8">
            <div className="border-b border-factor-gray-200 pb-4 sm:pb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-factor-gray-900 mb-3 sm:mb-4">
                What makes Factor Form supplements different from other supplements?
              </h3>
              <p className="text-sm sm:text-base text-factor-gray-700">
                Food is our foundation. Factor has been delivering high-quality, convenient nutrition via our ready-to-eat meals since 2013. However, we know nutrition exists beyond the food you consume at home, and Factor Form was born to solve that problem.
              </p>
            </div>
            
            <div className="border-b border-factor-gray-200 pb-4 sm:pb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-factor-gray-900 mb-3 sm:mb-4">
                What if I don't like the product - can I get my money back?
              </h3>
              <p className="text-sm sm:text-base text-factor-gray-700">
                We offer a satisfaction guarantee on all our products. If you're not completely satisfied, please contact our customer service team for assistance.
              </p>
            </div>
            
            <div className="border-b border-factor-gray-200 pb-4 sm:pb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-factor-gray-900 mb-3 sm:mb-4">
                Can I cancel my subscription at any time?
              </h3>
              <p className="text-sm sm:text-base text-factor-gray-700">
                Yes, you can cancel your subscription at any time through your account settings or by contacting our customer service team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 sm:py-16 bg-factor-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-factor-gray-900 mb-4">Subscribe for articles, tips and offers</h2>
          <p className="text-base sm:text-lg text-factor-gray-700 mb-6 sm:mb-8">
            Sign up for our email list and be the first to know about new product launches, exclusive offers, and lifestyle content from our wellness experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-factor-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-factor-green-500"
            />
            <button className="btn-factor-primary px-6 py-3 text-sm sm:text-base">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 sm:py-8 bg-white border-t border-factor-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm text-factor-gray-500 text-center">
            *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </section>
    </div>
  )
}

export default SupplementsPage