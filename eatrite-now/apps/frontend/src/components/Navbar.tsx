import { useState } from 'react'
import { Link } from 'react-router-dom'
// import { Home } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

import CartModal from './CartModal'
import EatRiteIcons from './icons/EatRiteIcons'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { totalItems } = useCart()
  const { user, isAuthenticated, logout } = useAuth()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="bg-white backdrop-blur-md sticky top-0 z-50 shadow-md border-b border-gray-100 hidden md:block">
      <div className="max-w-full mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* EatRite Full Logo - Left Side */}
          <Link to="/" className="flex-shrink-0 mr-8">
            <img
              src="/eatrite-full-logo.svg"
              alt="EatRite"
              className="h-16 w-auto py-1"
            />
          </Link>

          {/* Desktop Navigation - Full Width */}
          <div className="hidden lg:flex flex-1 items-center justify-start gap-1">
            <Link
              to="/menu"
              className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200 px-4 py-2 relative group"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Weekly Menu
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/plans"
              className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200 px-4 py-2 relative group"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Our Plans
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/ai-recommendations"
              className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200 px-4 py-2 relative group"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              AI Recommendations
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/meal-builder"
              className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200 px-4 py-2 relative group"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Meal Builder
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/corporate"
              className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200 px-4 py-2 relative group"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              B2B Solutions
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/supplements"
              className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200 px-4 py-2 relative group"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Supplements
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            {/* Enterprise Portals */}
            <div className="h-6 w-px bg-gray-200 mx-3" />
            
            <Link
              to="/app/employee/home"
              className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200 px-4 py-2 relative group"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Employee Portal
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link
              to="/app/admin/home"
              className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200 px-4 py-2 relative group"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Admin Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <EatRiteIcons.Cart size="md" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                  <span className="hidden lg:block text-sm">{user?.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setShowUserMenu(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg transition-colors duration-200"
            >
              {isMenuOpen ? (
                <EatRiteIcons.Close size="sm" />
              ) : (
                <EatRiteIcons.Menu size="sm" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-4 pt-4 pb-6 space-y-1 bg-white border-t border-gray-100 shadow-lg">
            <Link
              to="/menu"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
              onClick={toggleMenu}
            >
              Weekly Menu
            </Link>
            <Link
              to="/plans"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
              onClick={toggleMenu}
            >
              Our Plans
            </Link>
            <Link
              to="/ai-recommendations"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
              onClick={toggleMenu}
            >
              AI Recommendations
            </Link>
            <Link
              to="/meal-builder"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
              onClick={toggleMenu}
            >
              Meal Builder
            </Link>
            <Link
              to="/corporate"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
              onClick={toggleMenu}
            >
              B2B Solutions
            </Link>
            <Link
              to="/supplements"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
              onClick={toggleMenu}
            >
              Supplements
            </Link>

            {/* Mobile Account Actions */}
            <div className="border-t border-gray-100 pt-4 mt-4">
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="bg-gray-900 hover:bg-gray-800 text-white font-medium block px-3 py-2 text-sm transition-colors duration-200 rounded-lg text-center"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              )}
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
