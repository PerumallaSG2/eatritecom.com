/**
 * AppShell Layout
 * Main corporate admin dashboard layout
 * For: COMPANY_ADMIN, FINANCE_USER, OPERATIONS_USER
 */

import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Receipt, 
  Package, 
  BarChart3, 
  Users, 
  Settings,
  Menu,
  X,
  LogOut
} from 'lucide-react'

interface AppShellLayoutProps {
  children: React.ReactNode
}

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles?: string[]
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Billing', href: '/app/billing', icon: Receipt, roles: ['COMPANY_ADMIN', 'FINANCE_USER'] },
  { name: 'Orders', href: '/app/orders', icon: Package },
  { name: 'Analytics', href: '/app/analytics', icon: BarChart3, roles: ['COMPANY_ADMIN', 'OPERATIONS_USER'] },
  { name: 'Employees', href: '/app/employees', icon: Users, roles: ['COMPANY_ADMIN', 'OPERATIONS_USER'] },
  { name: 'Settings', href: '/app/settings', icon: Settings, roles: ['COMPANY_ADMIN'] },
]

export const AppShellLayout: React.FC<AppShellLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear auth and redirect
    localStorage.removeItem('auth_token')
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-900">EatRite</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname.startsWith(item.href)
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-3 py-2 rounded-md text-sm font-medium
                  transition-colors duration-150
                  ${isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center mb-2">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-sm font-medium text-primary-700">AD</span>
              </div>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Admin User
              </p>
              <p className="text-xs text-gray-500 truncate">
                Company Admin
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1"></div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
