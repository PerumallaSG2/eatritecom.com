/**
 * Employee Layout
 * Simplified layout for EMPLOYEE role
 * Limited access to personal orders and wellness tracking only
 */

import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Package, Activity, LogOut } from 'lucide-react'

interface EmployeeLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'My Orders', href: '/employee/orders', icon: Package },
  { name: 'Wellness', href: '/employee/wellness', icon: Activity },
]

export const EmployeeLayout: React.FC<EmployeeLayoutProps> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-900">EatRite</span>
            </div>

            {/* Navigation */}
            <nav className="flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2
                      ${isActive
                        ? 'border-primary-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }
                    `}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                Employee Portal
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
