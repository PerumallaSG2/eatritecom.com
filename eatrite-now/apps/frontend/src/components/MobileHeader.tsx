import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Bell, Menu } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const MobileHeader: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, isAuthenticated } = useAuth()

  return (
    <header className="md:hidden bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/eatrite-full-logo.svg"
              alt="EatRite"
              className="h-8 w-auto"
            />
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <Link
              to="/search"
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Search size={20} />
            </Link>

            {/* Notifications */}
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                2
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {isAuthenticated && user ? (
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.name?.[0] || user.email?.[0] || 'U'}
                    </span>
                  </div>
                ) : (
                  <Menu size={20} />
                )}
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/subscriptions"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Subscriptions
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 font-medium"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Search Bar - Mobile */}
        <div className="mt-3">
          <div className="search-input-container">
            <Search className="search-icon text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search meals, ingredients..."
              className="w-full pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default MobileHeader