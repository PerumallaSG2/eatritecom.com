import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { PageTransition } from './AnimatedComponents'

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
  showNavbar?: boolean
  showFooter?: boolean
  variant?: 'default' | 'premium' | 'corporate' | 'dashboard' | 'minimal'
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className = '',
  showNavbar = true,
  showFooter = true,
  variant = 'default'
}) => {
  // Define variant-specific styling
  const getVariantStyles = () => {
    switch (variant) {
      case 'premium':
        return 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      case 'corporate':
        return 'bg-gradient-to-br from-emerald-50 via-white to-emerald-100'
      case 'dashboard':
        return 'bg-gray-50'
      case 'minimal':
        return 'bg-white'
      default:
        return 'bg-white'
    }
  }

  // Define container max-width based on variant
  const getContainerStyles = () => {
    switch (variant) {
      case 'dashboard':
        return 'max-w-full'
      case 'corporate':
        return 'max-w-full'
      default:
        return 'max-w-full'
    }
  }

  return (
    <PageTransition>
      <div className={`min-h-screen flex flex-col ${getVariantStyles()} ${className}`}>
        {showNavbar && (
          <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <Navbar />
          </header>
        )}
        
        <main className={`flex-grow ${getContainerStyles()}`}>
          <div className="relative">
            {/* Optional page-specific decorative elements based on variant */}
            {variant === 'premium' && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5 pointer-events-none" />
            )}
            {variant === 'corporate' && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 via-green-400/5 to-teal-400/5 pointer-events-none" />
            )}
            
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </main>
        
        {showFooter && (
          <footer className="bg-white border-t border-gray-200">
            <Footer />
          </footer>
        )}
      </div>
    </PageTransition>
  )
}

export default PageLayout