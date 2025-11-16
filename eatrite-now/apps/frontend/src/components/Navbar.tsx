import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

import CartModal from './CartModal'
import EatRiteIcons from './icons/EatRiteIcons'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { totalItems } = useCart()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="bg-[#0F2B1E] backdrop-blur-md sticky top-0 z-50 shadow-2xl border-b border-[#D4B46A]/30">
      <div className="max-w-8xl mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-28">
          {/* EatRite Gold Leaf Logo - Left Side */}
          <Link to="/" className="flex-shrink-0 group flex-1">
            <div className="flex items-center gap-4 transition-all duration-300 group-hover:scale-105">
              <EatRiteIcons.ThreeLeaves size="xl" color="gold" className="animate-pulse-gold" />
              <span 
                className="text-4xl font-bold text-[#D4B46A] tracking-wide"
                style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.025em' }}
              >
                EatRite
              </span>
            </div>
          </Link>

          {/* Premium Desktop Navigation - Centered */}
          <div className="hidden lg:block flex-1">
            <div className="flex items-center justify-center gap-16">
              <Link
                to="/"
                className="text-[#F5F2E8] hover:text-[#D4B46A] font-semibold text-xl tracking-wide transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#D4B46A] after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:transition-all after:duration-300 hover:after:w-full"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className="text-[#F5F2E8] hover:text-[#D4B46A] font-semibold text-xl tracking-wide transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#D4B46A] after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:transition-all after:duration-300 hover:after:w-full"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Menu
              </Link>
              <Link
                to="/plans"
                className="text-[#F5F2E8] hover:text-[#D4B46A] font-semibold text-xl tracking-wide transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#D4B46A] after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:transition-all after:duration-300 hover:after:w-full"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Plans
              </Link>
              <Link
                to="/pricing"
                className="text-[#F5F2E8] hover:text-[#D4B46A] font-semibold text-xl tracking-wide transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#D4B46A] after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:transition-all after:duration-300 hover:after:w-full"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Pricing
              </Link>
              
              {/* Features Dropdown */}
              <div className="relative group">
                <button 
                  className="text-[#F5F2E8] hover:text-[#D4B46A] font-semibold text-xl tracking-wide transition-all duration-300 hover:scale-105 flex items-center gap-3 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#D4B46A] after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:transition-all after:duration-300 group-hover:after:w-full"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Features
                  <svg className="w-5 h-5 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-gradient-to-b from-[#0F2B1E] to-[#0A2418] border border-[#D4B46A]/30 rounded-2xl shadow-2xl py-6 min-w-[320px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 backdrop-blur-md">
                  <Link 
                    to="/dietary-profile" 
                    className="block px-6 py-3 text-[#F5F2E8] hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:text-[#D4B46A] transition-all duration-300 font-medium rounded-lg mx-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Dietary Profile Setup
                  </Link>
                  <Link 
                    to="/meal-builder" 
                    className="block px-6 py-3 text-[#F5F2E8] hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:text-[#D4B46A] transition-all duration-300 font-medium rounded-lg mx-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Interactive Meal Builder
                  </Link>
                  <Link 
                    to="/nutrition-calculator" 
                    className="block px-6 py-3 text-[#F5F2E8] hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:text-[#D4B46A] transition-all duration-300 font-medium rounded-lg mx-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Nutrition Calculator
                  </Link>
                  <Link 
                    to="/ai-recommendations" 
                    className="block px-6 py-3 text-[#F5F2E8] hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:text-[#D4B46A] transition-all duration-300 font-medium rounded-lg mx-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    AI Meal Recommendations
                  </Link>
                  <Link 
                    to="/health-goals" 
                    className="block px-6 py-3 text-[#F5F2E8] hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:text-[#D4B46A] transition-all duration-300 font-medium rounded-lg mx-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Health Goals Tracking
                  </Link>
                  <Link 
                    to="/order-tracking" 
                    className="block px-6 py-3 text-[#F5F2E8] hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:text-[#D4B46A] transition-all duration-300 font-medium rounded-lg mx-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Order Tracking
                  </Link>
                </div>
              </div>
              
              {/* Business Dropdown */}
              <div className="relative group">
                <button 
                  className="text-[#F5F2E8] hover:text-[#D4B46A] font-semibold text-xl tracking-wide transition-all duration-300 hover:scale-105 flex items-center gap-3 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#D4B46A] after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:transition-all after:duration-300 group-hover:after:w-full"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Business
                  <svg className="w-5 h-5 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-gradient-to-b from-[#0F2B1E] to-[#0A2418] border border-[#D4B46A]/30 rounded-2xl shadow-2xl py-6 min-w-[320px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 backdrop-blur-md">
                  <Link 
                    to="/b2b-dashboard" 
                    className="block px-6 py-3 text-[#F5F2E8] hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:text-[#D4B46A] transition-all duration-300 font-medium rounded-lg mx-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    B2B Partnership Dashboard
                  </Link>
                  <Link 
                    to="/corporate-partnerships" 
                    className="block px-6 py-3 text-[#F5F2E8] hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:text-[#D4B46A] transition-all duration-300 font-medium rounded-lg mx-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Corporate Partnerships
                  </Link>
                  <Link 
                    to="/business" 
                    className="block px-6 py-3 text-[#F5F2E8] hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:text-[#D4B46A] transition-all duration-300 font-medium rounded-lg mx-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Corporate Catering
                  </Link>
                  <Link 
                    to="/nutrition-coaching" 
                    className="block px-6 py-3 text-[#F5F2E8] hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:text-[#D4B46A] transition-all duration-300 font-medium rounded-lg mx-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Nutrition Coaching
                  </Link>
                  <Link 
                    to="/gift-cards" 
                    className="block px-6 py-3 text-[#F5F2E8] hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:text-[#D4B46A] transition-all duration-300 font-medium rounded-lg mx-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Gift Cards
                  </Link>
                  <Link 
                    to="/blog" 
                    className="block px-6 py-3 text-[#F5F2E8] hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:text-[#D4B46A] transition-all duration-300 font-medium rounded-lg mx-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Wellness Blog
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Cart Icon */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 text-[#F5F2E8] hover:text-[#D4B46A] transition-all duration-300 hover:scale-110"
            >
              <EatRiteIcons.Cart size="lg" color="gold" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4B46A] text-[#0F2B1E] text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Prominent CTA Button */}
            <Link
              to="/login"
              className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg transform"
              style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.025em' }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#F5F2E8] hover:text-[#D4B46A] p-3 rounded-full transition-all duration-300 hover:scale-105 hover:bg-[#D4B46A]/10"
            >
              {isMenuOpen ? (
                <EatRiteIcons.Close size="md" color="gold" />
              ) : (
                <EatRiteIcons.Menu size="md" color="gold" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-6 pt-6 pb-8 space-y-3 bg-gradient-to-b from-[#0F2B1E] to-[#0A2418] border-t border-[#D4B46A]/30 backdrop-blur-md shadow-2xl animate-in slide-in-from-top duration-300">
            <Link
              to="/"
              className="text-[#F5F2E8] hover:text-[#D4B46A] active:scale-95 block px-5 py-4 text-lg font-medium transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:shadow-lg touch-manipulation"
              style={{ fontFamily: 'Inter, sans-serif' }}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="text-[#F5F2E8] hover:text-[#D4B46A] block px-5 py-4 text-lg font-medium transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:shadow-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
              onClick={toggleMenu}
            >
              Menu
            </Link>
            <Link
              to="/plans"
              className="text-[#F5F2E8] hover:text-[#D4B46A] block px-5 py-4 text-lg font-medium transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:shadow-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
              onClick={toggleMenu}
            >
              Plans
            </Link>
            <Link
              to="/pricing"
              className="text-[#F5F2E8] hover:text-[#D4B46A] block px-5 py-4 text-lg font-medium transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:shadow-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link
              to="/supplements"
              className="text-[#F5F2E8] hover:text-[#D4B46A] block px-5 py-4 text-lg font-medium transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:shadow-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
              onClick={toggleMenu}
            >
              Supplements
            </Link>
            
            {/* Mobile Account Actions */}
            <div className="border-t border-[#D4B46A]/30 pt-6 mt-6 space-y-3">
              <Link
                to="/account"
                className="text-[#F5F2E8] hover:text-[#D4B46A] block px-5 py-4 text-lg font-medium transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-[#D4B46A]/20 hover:to-[#D4B46A]/10 hover:shadow-lg"
                style={{ fontFamily: 'Inter, sans-serif' }}
                onClick={toggleMenu}
              >
                Account
              </Link>
              <Link
                to="/login"
                className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-[#F5F2E8] block px-5 py-4 text-lg font-semibold transition-all duration-300 rounded-xl hover:shadow-lg text-center"
                style={{ fontFamily: 'Inter, sans-serif' }}
                onClick={toggleMenu}
              >
                Get Started
              </Link>
            
            {/* Business Section */}
            <div className="border-t border-[#D4B46A]/30 pt-4 mt-4">
              <div className="text-[#D4B46A] px-5 py-3 text-sm font-bold uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>Business Solutions</div>
              <Link 
                to="/b2b-dashboard" 
                className="text-[#F5F2E8] hover:text-[#D4B46A] block px-5 py-3 text-base font-medium transition-all rounded-lg hover:bg-gradient-to-r hover:from-[#D4B46A]/15 hover:to-[#D4B46A]/5" 
                style={{ fontFamily: 'Inter, sans-serif' }}
                onClick={toggleMenu}
              >
                B2B Dashboard
              </Link>
              <Link 
                to="/corporate-partnerships" 
                className="text-[#F5F2E8] hover:text-[#D4B46A] block px-5 py-3 text-base font-medium transition-all rounded-lg hover:bg-gradient-to-r hover:from-[#D4B46A]/15 hover:to-[#D4B46A]/5" 
                style={{ fontFamily: 'Inter, sans-serif' }}
                onClick={toggleMenu}
              >
                Corporate Partnerships
              </Link>
              <Link 
                to="/business" 
                className="text-[#F5F2E8] hover:text-[#D4B46A] block px-5 py-3 text-base font-medium transition-all rounded-lg hover:bg-gradient-to-r hover:from-[#D4B46A]/15 hover:to-[#D4B46A]/5" 
                style={{ fontFamily: 'Inter, sans-serif' }}
                onClick={toggleMenu}
              >
                Corporate Catering
              </Link>
              <Link 
                to="/nutrition-coaching" 
                className="text-[#F5F2E8] hover:text-[#D4B46A] block px-5 py-3 text-base font-medium transition-all rounded-lg hover:bg-gradient-to-r hover:from-[#D4B46A]/15 hover:to-[#D4B46A]/5" 
                style={{ fontFamily: 'Inter, sans-serif' }}
                onClick={toggleMenu}
              >
                Nutrition Coaching
              </Link>
              <Link 
                to="/gift-cards" 
                className="text-[#F5F2E8] hover:text-[#D4B46A] block px-5 py-3 text-base font-medium transition-all rounded-lg hover:bg-gradient-to-r hover:from-[#D4B46A]/15 hover:to-[#D4B46A]/5" 
                style={{ fontFamily: 'Inter, sans-serif' }}
                onClick={toggleMenu}
              >
                Gift Cards
              </Link>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  )
}

export default Navbar