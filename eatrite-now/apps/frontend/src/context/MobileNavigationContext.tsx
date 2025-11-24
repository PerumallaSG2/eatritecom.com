import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface MobileNavState {
  isBottomNavVisible: boolean
  isMobileMenuOpen: boolean
  currentPage: string
  previousPage: string
  navigationHistory: string[]
}

interface MobileNavActions {
  setBottomNavVisible: (visible: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
  goBack: () => void
  addToHistory: (page: string) => void
  clearHistory: () => void
}

interface MobileNavigationContextType {
  state: MobileNavState
  actions: MobileNavActions
}

const MobileNavigationContext = createContext<MobileNavigationContextType | null>(null)

interface MobileNavigationProviderProps {
  children: React.ReactNode
}

export const MobileNavigationProvider: React.FC<MobileNavigationProviderProps> = ({ children }) => {
  const location = useLocation()
  
  const [state, setState] = useState<MobileNavState>({
    isBottomNavVisible: true,
    isMobileMenuOpen: false,
    currentPage: location.pathname,
    previousPage: '/',
    navigationHistory: [location.pathname]
  })

  // Update current page when location changes
  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      previousPage: prevState.currentPage,
      currentPage: location.pathname,
      navigationHistory: [...prevState.navigationHistory.slice(-9), location.pathname] // Keep last 10 pages
    }))
  }, [location.pathname])

  // Hide bottom navigation on certain pages or when scrolling
  useEffect(() => {
    const hiddenPages = ['/checkout', '/payment', '/onboarding']
    const shouldHide = hiddenPages.some(page => location.pathname.startsWith(page))
    
    if (shouldHide !== !state.isBottomNavVisible) {
      setState(prevState => ({
        ...prevState,
        isBottomNavVisible: !shouldHide
      }))
    }
  }, [location.pathname, state.isBottomNavVisible])

  // Handle scroll-based bottom nav visibility
  useEffect(() => {
    let lastScrollY = window.scrollY
    let scrollTimeout: number

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY
      const scrollDifference = Math.abs(currentScrollY - lastScrollY)

      // Only hide/show if scroll difference is significant
      if (scrollDifference > 5) {
        setState(prevState => ({
          ...prevState,
          isBottomNavVisible: !isScrollingDown || currentScrollY < 100
        }))
      }

      lastScrollY = currentScrollY

      // Clear timeout and set new one
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          isBottomNavVisible: true
        }))
      }, 1000) // Show nav after 1 second of no scrolling
    }

    // Throttle scroll events
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  const actions: MobileNavActions = {
    setBottomNavVisible: (visible: boolean) => {
      setState(prevState => ({
        ...prevState,
        isBottomNavVisible: visible
      }))
    },

    setMobileMenuOpen: (open: boolean) => {
      setState(prevState => ({
        ...prevState,
        isMobileMenuOpen: open
      }))
    },

    goBack: () => {
      const history = state.navigationHistory
      if (history.length > 1) {
        window.history.back()
        // The location change will be handled by the useEffect above
      }
    },

    addToHistory: (page: string) => {
      setState(prevState => ({
        ...prevState,
        navigationHistory: [...prevState.navigationHistory.slice(-9), page]
      }))
    },

    clearHistory: () => {
      setState(prevState => ({
        ...prevState,
        navigationHistory: [prevState.currentPage]
      }))
    }
  }

  return (
    <MobileNavigationContext.Provider value={{ state, actions }}>
      {children}
    </MobileNavigationContext.Provider>
  )
}

export const useMobileNavigation = () => {
  const context = useContext(MobileNavigationContext)
  if (!context) {
    throw new Error('useMobileNavigation must be used within a MobileNavigationProvider')
  }
  return context
}

// Custom hooks for common mobile navigation patterns
export const useBackButton = () => {
  const { actions, state } = useMobileNavigation()
  
  const canGoBack = state.navigationHistory.length > 1
  const goBack = actions.goBack
  
  return { canGoBack, goBack }
}

export const useBottomNavVisibility = () => {
  const { state, actions } = useMobileNavigation()
  
  return {
    isVisible: state.isBottomNavVisible,
    show: () => actions.setBottomNavVisible(true),
    hide: () => actions.setBottomNavVisible(false),
    toggle: () => actions.setBottomNavVisible(!state.isBottomNavVisible)
  }
}

export const useMobileMenu = () => {
  const { state, actions } = useMobileNavigation()
  
  return {
    isOpen: state.isMobileMenuOpen,
    open: () => actions.setMobileMenuOpen(true),
    close: () => actions.setMobileMenuOpen(false),
    toggle: () => actions.setMobileMenuOpen(!state.isMobileMenuOpen)
  }
}

// Device detection hook
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkIsMobile = () => {
      const width = window.innerWidth
      const userAgent = navigator.userAgent
      
      // Check for mobile user agents
      const mobileUserAgents = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      const isMobileUserAgent = mobileUserAgents.test(userAgent)
      
      // Check for mobile screen size (768px is typical tablet breakpoint)
      const isMobileScreen = width < 768
      
      // Check for touch capability
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      setIsMobile(isMobileUserAgent || (isMobileScreen && hasTouch))
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])
  
  return isMobile
}

// Screen orientation hook
export const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')
  
  useEffect(() => {
    const checkOrientation = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape')
    }

    checkOrientation()
    window.addEventListener('resize', checkOrientation)
    window.addEventListener('orientationchange', checkOrientation)
    
    return () => {
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [])
  
  return orientation
}

export default MobileNavigationContext