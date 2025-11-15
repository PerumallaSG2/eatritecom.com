import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

import CartModal from './CartModal'
import EatRiteIcons from './icons/EatRiteIcons'
import { EatRiteButton } from './ui/Button/EatRiteButton'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { totalItems } = useCart()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="nav backdrop-blur-md sticky top-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* EatRite Luxury Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <div className="flex items-center gap-sm transition-all duration-300 group-hover:scale-105">
              <EatRiteIcons.ThreeLeaves size="lg" color="gold" className="animate-pulse-gold" />
              <span className="heading-3 text-accent tracking-tight">
                EatRite
              </span>
            </div>
          </Link>

          {/* Luxury Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline gap-xl">
              <Link
                to="/menu"
                className="nav-item"
              >
                Curated Menu
              </Link>
              <Link
                to="/plans"
                className="nav-item"
              >
                Luxury Plans
              </Link>
              <Link
                to="/pricing"
                className="nav-item"
              >
                Membership
              </Link>
              
              {/* Features Dropdown */}
              <div className="relative group">
                <button className="nav-item flex items-center gap-xs">
                  Features
                  <svg className="icon text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-64 card border border-gold opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-md">
                    <Link to="/dietary-profile" className="block px-4 py-3 text-sm text-eatrite-gold-300 hover:bg-eatrite-black-700 hover:text-eatrite-gold-200 transition-colors">
                      Dietary Profile Setup
                    </Link>
                    <Link to="/meal-builder" className="block px-4 py-3 text-sm text-eatrite-gold-300 hover:bg-eatrite-black-700 hover:text-eatrite-gold-200 transition-colors">
                      Interactive Meal Builder
                    </Link>
                    <Link to="/nutrition-calculator" className="block px-4 py-3 text-sm text-eatrite-gold-300 hover:bg-eatrite-black-700 hover:text-eatrite-gold-200 transition-colors">
                      Nutrition Calculator
                    </Link>
                    <Link to="/ai-recommendations" className="block px-4 py-3 text-sm text-eatrite-gold-300 hover:bg-eatrite-black-700 hover:text-eatrite-gold-200 transition-colors">
                      AI Meal Recommendations
                    </Link>
                    <Link to="/health-goals" className="block px-4 py-3 text-sm text-eatrite-gold-300 hover:bg-eatrite-black-700 hover:text-eatrite-gold-200 transition-colors">
                      Health Goals Tracking
                    </Link>
                    <Link to="/achievements" className="block px-4 py-3 text-sm text-eatrite-gold-300 hover:bg-eatrite-black-700 hover:text-eatrite-gold-200 transition-colors">
                      Achievement Badges
                    </Link>
                    <Link to="/order-tracking" className="block px-4 py-3 text-sm text-eatrite-gold-300 hover:bg-eatrite-black-700 hover:text-eatrite-gold-200 transition-colors">
                      Order Tracking
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                to="/supplements"
                className="text-eatrite-gold-300 hover:text-eatrite-gold-200 px-4 py-2 font-medium transition-all duration-300 hover:bg-eatrite-black-800 rounded-lg"
              >
                Supplements
              </Link>
              
              {/* Business & More Dropdown */}
              <div className="relative group">
                <button className="text-eatrite-gold-300 hover:text-eatrite-gold-200 px-4 py-2 font-medium transition-all duration-300 hover:bg-eatrite-black-800 rounded-lg flex items-center">
                  Business
                  <svg className="ml-1 h-4 w-4 text-eatrite-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-64 bg-eatrite-black-800 border border-eatrite-gold-700 rounded-xl shadow-gold opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link to="/b2b-dashboard" className="block px-4 py-3 text-sm text-eatrite-gold-300 hover:bg-eatrite-black-700 hover:text-eatrite-gold-200 transition-colors">
                      B2B Partnership Dashboard
                    </Link>
                    <Link to="/corporate-partnerships" className="block px-4 py-3 text-sm text-eatrite-gold-300 hover:bg-eatrite-black-700 hover:text-eatrite-gold-200 transition-colors">
                      Corporate Partnerships
                    </Link>
                    <Link to="/business" className="block px-4 py-3 text-sm text-eatrite-gold-300 hover:bg-eatrite-black-700 hover:text-eatrite-gold-200 transition-colors">
                      Corporate Catering
                    </Link>
                    <Link to="/nutrition-coaching" className="block px-4 py-3 text-sm text-eatrite-gold-300 hover:bg-eatrite-black-700 hover:text-eatrite-gold-200 transition-colors">
                      Nutrition Coaching
                    </Link>
                    <Link to="/gift-cards" className="block px-4 py-3 text-sm text-eatrite-gold-300 hover:bg-eatrite-black-700 hover:text-eatrite-gold-200 transition-colors">
                      Gift Cards
                    </Link>
                    <Link to="/blog" className="block px-4 py-3 text-sm text-eatrite-gold-300 hover:bg-eatrite-black-700 hover:text-eatrite-gold-200 transition-colors">
                      Wellness Blog
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Icon */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-eatrite-gold-300 hover:text-eatrite-gold-200 transition-colors rounded-lg hover:bg-eatrite-black-800"
            >
              <EatRiteIcons.Cart size="md" color="gold" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-gold text-eatrite-text-inverse text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold border border-eatrite-black-pure shadow-gold-sm">
                  {totalItems}
                </span>
              )}
            </button>
            
            <Link
              to="/account"
              className="text-eatrite-gold-300 hover:text-eatrite-gold-200 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-eatrite-black-800 flex items-center gap-2"
            >
              <EatRiteIcons.User size="sm" color="gold" />
              Account
            </Link>
            
            <Link
              to="/login"
              className="text-eatrite-gold-300 hover:text-eatrite-gold-200 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-eatrite-black-800"
            >
              Member Access
            </Link>
            
            <EatRiteButton 
              variant="primary" 
              size="sm"
              as="a"
              href="/plans"
            >
              Start Your Journey
            </EatRiteButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-eatrite-gold-300 hover:text-eatrite-gold-200 p-2 rounded-lg transition-all hover:bg-eatrite-black-800"
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
        <div className="md:hidden animate-slide-up">
          <div className="px-4 pt-4 pb-6 space-y-2 bg-eatrite-black-900 border-t border-eatrite-gold-800 backdrop-blur-md max-h-96 overflow-y-auto">
            <Link
              to="/menu"
              className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-3 text-base font-medium transition-all rounded-lg hover:bg-eatrite-black-800"
              onClick={toggleMenu}
            >
              Curated Menu
            </Link>
            <Link
              to="/plans"
              className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-3 text-base font-medium transition-all rounded-lg hover:bg-eatrite-black-800"
              onClick={toggleMenu}
            >
              Luxury Plans
            </Link>
            <Link
              to="/pricing"
              className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-3 text-base font-medium transition-all rounded-lg hover:bg-eatrite-black-800"
              onClick={toggleMenu}
            >
              Membership
            </Link>
            <Link
              to="/supplements"
              className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-3 text-base font-medium transition-all rounded-lg hover:bg-eatrite-black-800"
              onClick={toggleMenu}
            >
              Supplements
            </Link>
            
            {/* Features Section */}
            <div className="border-t border-eatrite-gold-800 pt-3 mt-3">
              <div className="text-eatrite-gold-200 px-4 py-2 text-sm font-semibold uppercase tracking-wide">Features</div>
              <Link to="/dietary-profile" className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-2 text-sm transition-all rounded-lg hover:bg-eatrite-black-800" onClick={toggleMenu}>
                Dietary Profile Setup
              </Link>
              <Link to="/meal-builder" className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-2 text-sm transition-all rounded-lg hover:bg-eatrite-black-800" onClick={toggleMenu}>
                Interactive Meal Builder
              </Link>
              <Link to="/nutrition-calculator" className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-2 text-sm transition-all rounded-lg hover:bg-eatrite-black-800" onClick={toggleMenu}>
                Nutrition Calculator
              </Link>
              <Link to="/ai-recommendations" className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-2 text-sm transition-all rounded-lg hover:bg-eatrite-black-800" onClick={toggleMenu}>
                AI Recommendations
              </Link>
              <Link to="/health-goals" className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-2 text-sm transition-all rounded-lg hover:bg-eatrite-black-800" onClick={toggleMenu}>
                Health Goals
              </Link>
              <Link to="/achievements" className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-2 text-sm transition-all rounded-lg hover:bg-eatrite-black-800" onClick={toggleMenu}>
                Achievements
              </Link>
              <Link to="/order-tracking" className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-2 text-sm transition-all rounded-lg hover:bg-eatrite-black-800" onClick={toggleMenu}>
                Order Tracking
              </Link>
            </div>
            
            {/* Business Section */}
            <div className="border-t border-eatrite-gold-800 pt-3 mt-3">
              <div className="text-eatrite-gold-200 px-4 py-2 text-sm font-semibold uppercase tracking-wide">Business</div>
              <Link to="/b2b-dashboard" className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-2 text-sm transition-all rounded-lg hover:bg-eatrite-black-800" onClick={toggleMenu}>
                B2B Dashboard
              </Link>
              <Link to="/corporate-partnerships" className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-2 text-sm transition-all rounded-lg hover:bg-eatrite-black-800" onClick={toggleMenu}>
                Corporate Partnerships
              </Link>
              <Link to="/business" className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-2 text-sm transition-all rounded-lg hover:bg-eatrite-black-800" onClick={toggleMenu}>
                Corporate Catering
              </Link>
              <Link to="/nutrition-coaching" className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-2 text-sm transition-all rounded-lg hover:bg-eatrite-black-800" onClick={toggleMenu}>
                Nutrition Coaching
              </Link>
              <Link to="/gift-cards" className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-2 text-sm transition-all rounded-lg hover:bg-eatrite-black-800" onClick={toggleMenu}>
                Gift Cards
              </Link>
              <Link to="/blog" className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-2 text-sm transition-all rounded-lg hover:bg-eatrite-black-800" onClick={toggleMenu}>
                Wellness Blog
              </Link>
            </div>
            
            <div className="pt-6 pb-3 border-t border-eatrite-gold-800 mt-4">
              <Link
                to="/login"
                className="text-eatrite-gold-300 hover:text-eatrite-gold-200 block px-4 py-3 text-base font-medium mb-3 transition-all rounded-lg hover:bg-eatrite-black-800"
                onClick={toggleMenu}
              >
                Member Access
              </Link>
              <div className="px-4">
                <EatRiteButton 
                  variant="primary" 
                  size="md" 
                  className="w-full"
                  as="a"
                  href="/plans"
                  onClick={toggleMenu}
                >
                  Start Your Journey
                </EatRiteButton>
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