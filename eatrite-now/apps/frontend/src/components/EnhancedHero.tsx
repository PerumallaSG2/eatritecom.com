import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

const EnhancedHero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Enhanced Content */}
          <div className="space-y-8 max-w-xl">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                Chef-Crafted & Nutritionist-Approved
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                The Healthiest Meals
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  You'll Crave
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Skip the meal prep, planning, and cleanup. Get restaurant-quality, 
                nutritionist-designed meals delivered fresh to your door.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">100+</div>
                <div className="text-sm text-gray-600">Weekly Options</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">90sec</div>
                <div className="text-sm text-gray-600">Ready to Eat</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">4.8★</div>
                <div className="text-sm text-gray-600">Customer Rating</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/plans"
                className="bg-black hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-lg transition-colors duration-300 text-lg text-center"
              >
                Get Started
              </Link>
              <Link
                to="/menu"
                className="border-2 border-gray-300 hover:border-gray-900 text-gray-900 font-bold px-8 py-4 rounded-lg transition-colors duration-300 text-lg text-center"
              >
                View Menu
              </Link>
            </div>
          </div>

          {/* Right Side - Modern Visual Element */}
          <div className="relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl transform rotate-3"></div>
            
            {/* Content card */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Nutrition Made Simple
                  </h3>
                  <p className="text-gray-600">
                    Every meal is perfectly portioned with macro-balanced nutrition
                  </p>
                </div>
                
                {/* Benefits list */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Ready in 90 seconds</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Dietitian approved recipes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Fresh, never frozen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">No prep, no cleanup</span>
                  </div>
                </div>
                
                {/* Trust indicators */}
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>50,000+ Happy Customers</span>
                    <span>5M+ Meals Delivered</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              Free Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedHero
