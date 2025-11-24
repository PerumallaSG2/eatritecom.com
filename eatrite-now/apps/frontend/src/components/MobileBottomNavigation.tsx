import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Menu, ShoppingCart, User, Search } from 'lucide-react'
import { useCart } from '../context/CartContext'

const MobileBottomNavigation: React.FC = () => {
  const location = useLocation()
  const { totalItems } = useCart()

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      icon: Home,
    },
    {
      id: 'menu',
      label: 'Menu',
      path: '/menu',
      icon: Menu,
    },
    {
      id: 'search',
      label: 'Search',
      path: '/search',
      icon: Search,
    },
    {
      id: 'cart',
      label: 'Cart',
      path: '/cart',
      icon: ShoppingCart,
      badge: totalItems > 0 ? totalItems : null,
    },
    {
      id: 'profile',
      label: 'Profile',
      path: '/profile',
      icon: User,
    },
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-50 md:hidden">
        <div className="flex items-center justify-around px-2 py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = isActive(tab.path)
            
            return (
              <Link
                key={tab.id}
                to={tab.path}
                className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 relative transition-colors duration-200 ${
                  active
                    ? 'text-orange-500'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className="relative">
                  <Icon 
                    size={24} 
                    className={`transition-transform duration-200 ${
                      active ? 'scale-110' : ''
                    }`}
                  />
                  {tab.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold leading-none">
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </span>
                  )}
                </div>
                <span 
                  className={`text-xs mt-1 font-medium truncate max-w-[60px] transition-colors duration-200 ${
                    active ? 'text-orange-500' : 'text-gray-500'
                  }`}
                >
                  {tab.label}
                </span>
                {active && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-orange-500 rounded-full"></div>
                )}
              </Link>
            )
          })}
        </div>
      </nav>
      
      {/* Bottom Padding Spacer for Content */}
      <div className="h-16 md:hidden" />
    </>
  )
}

export default MobileBottomNavigation