import React, { useState, useEffect } from 'react'
import { 
  Home, 
  Search, 
  ShoppingCart, 
  User, 
  Menu as MenuIcon,
  X,
  Package,
  Settings,
  Bell,
  MapPin,
  Heart,
  CreditCard
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FadeIn, SlideIn } from './LoadingStates'
import { ThemeToggle } from './ThemeComponents'

// ScaleIn animation component
const ScaleIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ 
  children, 
  delay = 0 
}) => (
  <div 
    className="animate-scaleIn"
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
)

interface NavItem {
  id: string
  label: string
  icon: React.ElementType
  path: string
  badge?: number
  isActive?: boolean
}

interface MobileNavigationProps {
  className?: string
}

// Bottom Navigation Bar Component
export const BottomNavigation: React.FC<MobileNavigationProps> = ({ className = '' }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { items } = useCart()
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/',
      isActive: location.pathname === '/'
    },
    {
      id: 'menu',
      label: 'Menu',
      icon: Search,
      path: '/menu',
      isActive: location.pathname === '/menu'
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingCart,
      path: '/cart',
      badge: cartItemCount,
      isActive: location.pathname === '/cart'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/profile',
      isActive: location.pathname === '/profile'
    }
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden ${className}`}>
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon
          return (
            <FadeIn key={item.id} delay={index * 100}>
              <button
                onClick={() => handleNavigation(item.path)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 min-w-[60px] ${
                  item.isActive
                    ? 'bg-[#0F2B1E] text-white scale-110'
                    : 'text-gray-500 hover:text-[#0F2B1E] hover:bg-gray-50 active:scale-95'
                }`}
                style={{
                  transform: item.isActive ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                <div className="relative">
                  <Icon className={`h-5 w-5 ${item.isActive ? 'animate-bounce' : ''}`} />
                  {item.badge && item.badge > 0 && (
                    <ScaleIn>
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {item.badge > 99 ? '99+' : item.badge}
                      </div>
                    </ScaleIn>
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium ${item.isActive ? 'text-white' : 'text-gray-500'}`}>
                  {item.label}
                </span>
                
                {/* Active indicator */}
                {item.isActive && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#D4B46A] rounded-full animate-ping" />
                )}
              </button>
            </FadeIn>
          )
        })}
      </div>
      
      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white" />
    </div>
  )
}

// Mobile Header with Hamburger Menu
export const MobileHeader: React.FC<MobileNavigationProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { items } = useCart()

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)

  const menuItems = [
    { icon: Home, label: 'Home', path: '/', description: 'Back to homepage' },
    { icon: Search, label: 'Menu', path: '/menu', description: 'Browse our meals' },
    { icon: ShoppingCart, label: 'Cart', path: '/cart', description: 'View your order', badge: cartItemCount },
    { icon: Package, label: 'Orders', path: '/orders', description: 'Order history' },
    { icon: User, label: 'Profile', path: '/profile', description: 'Account settings' },
    { icon: Heart, label: 'Favorites', path: '/favorites', description: 'Saved meals' },
    { icon: MapPin, label: 'Addresses', path: '/addresses', description: 'Delivery locations' },
    { icon: Bell, label: 'Notifications', path: '/notifications', description: 'Updates & alerts' },
    { icon: CreditCard, label: 'Payment', path: '/payment', description: 'Payment methods' },
    { icon: Settings, label: 'Settings', path: '/settings', description: 'App preferences' },
  ]

  const handleMenuItemClick = (path: string) => {
    navigate(path)
    setIsMenuOpen(false)
  }

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'EatRite'
      case '/menu': return 'Menu'
      case '/cart': return 'Cart'
      case '/profile': return 'Profile'
      case '/orders': return 'Orders'
      case '/favorites': return 'Favorites'
      default: return 'EatRite'
    }
  }

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <div className={`sticky top-0 z-40 bg-white border-b border-gray-200 md:hidden ${className}`}>
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-lg text-gray-600 hover:text-[#0F2B1E] hover:bg-gray-50 transition-colors active:scale-95"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          
          <h1 className="text-lg font-bold text-[#0F2B1E] dark:text-white truncate">
            {getPageTitle()}
          </h1>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-[#0F2B1E] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors active:scale-95"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <ScaleIn>
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </div>
                </ScaleIn>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Slide-out Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-50 md:hidden animate-fadeIn"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 md:hidden animate-slideInLeft shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#0F2B1E] to-[#1a4d33]">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#D4B46A] rounded-full flex items-center justify-center">
                    <span className="text-[#0F2B1E] font-bold text-lg">E</span>
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg">EatRite</h2>
                    <p className="text-white/80 text-sm">Healthy meals delivered</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 space-y-2">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path
                    
                    return (
                      <SlideIn key={item.path} direction="right" delay={index * 50}>
                        <button
                          onClick={() => handleMenuItemClick(item.path)}
                          className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                            isActive
                              ? 'bg-[#0F2B1E] text-white shadow-lg'
                              : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                          }`}
                        >
                          <div className="relative">
                            <Icon className={`h-5 w-5 ${isActive ? 'text-[#D4B46A]' : 'text-gray-500'}`} />
                            {item.badge && item.badge > 0 && (
                              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {item.badge > 9 ? '9+' : item.badge}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <div className={`font-medium ${isActive ? 'text-white' : 'text-gray-900'}`}>
                              {item.label}
                            </div>
                            <div className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                              {item.description}
                            </div>
                          </div>
                          {isActive && (
                            <div className="w-2 h-2 bg-[#D4B46A] rounded-full animate-pulse" />
                          )}
                        </button>
                      </SlideIn>
                    )
                  })}
                </div>
              </div>

              {/* Menu Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Need help?</p>
                  <button className="bg-[#0F2B1E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1a4d33] transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

// Touch-optimized component wrapper
export const TouchOptimized: React.FC<{
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}> = ({ children, className = '', onClick, disabled = false }) => {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <div
      className={`transition-all duration-150 ${
        isPressed && !disabled ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      onTouchStart={() => !disabled && setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  )
}

export default {
  BottomNavigation,
  MobileHeader,
  TouchOptimized
}