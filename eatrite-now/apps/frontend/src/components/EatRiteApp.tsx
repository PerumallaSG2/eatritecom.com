/**
 * EatRite Main App Component
 * Premium nutrition platform with complete screen integration
 */

import React, { useState, useEffect } from 'react'
import { EatRiteDesignTokens } from '../styles/design-system/eatrite-design-tokens'

// Import all screen components
import SplashScreen from './screens/SplashScreen'
import OnboardingFlow from './screens/OnboardingFlow'
import { LoginScreen } from './screens/AuthenticationScreens'
import SignupWithVerification from './SignupWithVerification'
import HomeDashboard from './screens/HomeDashboard'
import MealBuilder from './screens/MealBuilder'
import SupplementsCatalog from './screens/SupplementsCatalog'
import UserProfile from './screens/UserProfile'
import {
  EatRiteButton,
  EatRiteIcon,
  UserIcon,
  LeafIcon,
  ProteinIcon,
  CartIcon,
} from './eatrite/EatRiteComponentLibrary'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type AppScreen =
  | 'splash'
  | 'onboarding'
  | 'auth'
  | 'signup'
  | 'dashboard'
  | 'meal-builder'
  | 'supplements'
  | 'profile'

interface AppState {
  currentScreen: AppScreen
  isAuthenticated: boolean
  hasCompletedOnboarding: boolean
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    subscriptionTier: 'basic' | 'premium' | 'elite'
  } | null
  cartItems: string[]
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'info' | 'warning'
    message: string
    timestamp: Date
  }>
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

export const EatRiteApp: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'splash',
    isAuthenticated: false,
    hasCompletedOnboarding: false,
    user: null,
    cartItems: [],
    notifications: [],
  })

  // Simulate app initialization
  useEffect(() => {
    const initializeApp = async () => {
      // Simulate loading time for splash screen
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Check authentication status (simulate)
      const isLoggedIn = localStorage.getItem('eatrite_auth_token')
      const hasOnboarded = localStorage.getItem('eatrite_onboarding_complete')

      if (isLoggedIn && hasOnboarded) {
        setAppState(prev => ({
          ...prev,
          currentScreen: 'dashboard',
          isAuthenticated: true,
          hasCompletedOnboarding: true,
          user: {
            id: 'user123',
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah.johnson@email.com',
            subscriptionTier: 'premium',
          },
        }))
      } else if (isLoggedIn) {
        setAppState(prev => ({
          ...prev,
          currentScreen: 'onboarding',
          isAuthenticated: true,
        }))
      } else {
        setAppState(prev => ({
          ...prev,
          currentScreen: 'auth',
        }))
      }
    }

    initializeApp()
  }, [])

  // Navigation handlers
  const navigateToScreen = (screen: AppScreen) => {
    setAppState(prev => ({ ...prev, currentScreen: screen }))
  }

  const handleAuthentication = (user: any) => {
    localStorage.setItem('eatrite_auth_token', 'sample_token')
    setAppState(prev => ({
      ...prev,
      isAuthenticated: true,
      user,
      currentScreen: prev.hasCompletedOnboarding ? 'dashboard' : 'onboarding',
    }))

    showNotification(
      'success',
      'Welcome to EatRite! You have successfully signed in.'
    )
  }

  const handleSignupComplete = () => {
    localStorage.setItem('eatrite_auth_token', 'sample_token')
    setAppState(prev => ({
      ...prev,
      isAuthenticated: true,
      hasCompletedOnboarding: false, // New users need onboarding
      currentScreen: 'onboarding',
    }))

    showNotification(
      'success',
      'Account created successfully! Let us personalize your experience.'
    )
  }

  const handleOnboardingComplete = (preferences: any) => {
    console.log('Onboarding preferences:', preferences) // Use preferences to avoid TS error
    localStorage.setItem('eatrite_onboarding_complete', 'true')
    setAppState(prev => ({
      ...prev,
      hasCompletedOnboarding: true,
      currentScreen: 'dashboard',
    }))

    showNotification(
      'success',
      'Your profile has been set up! Welcome to your personalized nutrition journey.'
    )
  }

  const handleLogout = () => {
    localStorage.removeItem('eatrite_auth_token')
    localStorage.removeItem('eatrite_onboarding_complete')
    setAppState(prev => ({
      ...prev,
      currentScreen: 'auth',
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      user: null,
      cartItems: [],
    }))

    showNotification('info', 'You have been logged out successfully.')
  }

  const handleAddToCart = (itemId: string) => {
    setAppState(prev => ({
      ...prev,
      cartItems: [...prev.cartItems, itemId],
    }))

    showNotification('success', 'Item added to cart!')
  }

  const showNotification = (
    type: AppState['notifications'][0]['type'],
    message: string
  ) => {
    const notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
    }

    setAppState(prev => ({
      ...prev,
      notifications: [...prev.notifications, notification],
    }))

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setAppState(prev => ({
        ...prev,
        notifications: prev.notifications.filter(n => n.id !== notification.id),
      }))
    }, 5000)
  }

  // App container styles
  const appStyles: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: EatRiteDesignTokens.colors.surface.darkGreen,
    color: EatRiteDesignTokens.colors.text.primary,
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.body,
    position: 'relative',
  }

  return (
    <div style={appStyles}>
      {/* Main Screen Content */}
      {appState.currentScreen === 'splash' && (
        <SplashScreen onLoadingComplete={() => setAppState(prev => ({ ...prev, currentScreen: 'auth' }))} />
      )}

      {appState.currentScreen === 'auth' && (
        <LoginScreen
          onLogin={handleAuthentication}
          onSignupClick={() => navigateToScreen('signup')}
          onForgotPasswordClick={() => {}}
          loading={false}
        />
      )}

      {appState.currentScreen === 'signup' && (
        <SignupWithVerification
          onSignupComplete={handleSignupComplete}
          onBack={() => navigateToScreen('auth')}
        />
      )}

      {appState.currentScreen === 'onboarding' && (
        <OnboardingFlow
          onComplete={handleOnboardingComplete}
        />
      )}

      {appState.currentScreen === 'dashboard' && (
        <>
          <Navigation
            currentScreen={appState.currentScreen}
            onNavigate={navigateToScreen}
            onLogout={handleLogout}
            user={appState.user}
            cartItemCount={appState.cartItems.length}
          />
          <HomeDashboard
            userName={appState.user?.firstName}
            onMealClick={meal => {
              showNotification('info', `Viewing details for ${meal.name}`)
            }}
            onSupplementClick={supplement => {
              showNotification('info', `Viewing ${supplement.name}`)
            }}
            onViewAllMeals={() => navigateToScreen('meal-builder')}
            onViewAllSupplements={() => navigateToScreen('supplements')}
          />
        </>
      )}

      {appState.currentScreen === 'meal-builder' && (
        <>
          <Navigation
            currentScreen={appState.currentScreen}
            onNavigate={navigateToScreen}
            onLogout={handleLogout}
            user={appState.user}
            cartItemCount={appState.cartItems.length}
          />
          <MealBuilder
            onSaveMeal={meal => {
              showNotification(
                'success',
                `"${meal.name}" has been saved to your meal plans!`
              )
            }}
            onAddToCart={meal => {
              handleAddToCart(meal.name)
              showNotification('success', `"${meal.name}" added to cart!`)
            }}
          />
        </>
      )}

      {appState.currentScreen === 'supplements' && (
        <>
          <Navigation
            currentScreen={appState.currentScreen}
            onNavigate={navigateToScreen}
            onLogout={handleLogout}
            user={appState.user}
            cartItemCount={appState.cartItems.length}
          />
          <SupplementsCatalog
            onAddToCart={(supplement, quantity) => {
              handleAddToCart(supplement.id)
              showNotification(
                'success',
                `${quantity}x ${supplement.name} added to cart!`
              )
            }}
            onViewDetails={supplement => {
              showNotification('info', `Viewing details for ${supplement.name}`)
            }}
            cartItems={appState.cartItems}
          />
        </>
      )}

      {appState.currentScreen === 'profile' && (
        <>
          <Navigation
            currentScreen={appState.currentScreen}
            onNavigate={navigateToScreen}
            onLogout={handleLogout}
            user={appState.user}
            cartItemCount={appState.cartItems.length}
          />
          <UserProfile
            onSaveProfile={(_profile: any) => {
              showNotification('success', 'Profile updated successfully!')
            }}
            onSaveHealthProfile={(_healthProfile: any) => {
              showNotification(
                'success',
                'Health profile updated successfully!'
              )
            }}
            onSaveNutritionGoals={(_goals: any) => {
              showNotification(
                'success',
                'Nutrition goals updated successfully!'
              )
            }}
            onDeleteAccount={() => {
              showNotification(
                'warning',
                'Account deletion requires confirmation via email.'
              )
            }}
          />
        </>
      )}

      {/* Notification System */}
      <NotificationSystem notifications={appState.notifications} />

      {/* Cart Indicator (when authenticated) */}
      {appState.isAuthenticated && appState.cartItems.length > 0 && (
        <CartIndicator
          itemCount={appState.cartItems.length}
          onCartClick={() =>
            showNotification('info', 'Cart functionality coming soon!')
          }
        />
      )}
    </div>
  )
}

// ============================================================================
// NAVIGATION COMPONENT
// ============================================================================

interface NavigationProps {
  currentScreen: AppScreen
  onNavigate: (screen: AppScreen) => void
  onLogout: () => void
  user: AppState['user']
  cartItemCount: number
}

const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  onLogout,
  user,
  cartItemCount,
}) => {
  const navStyles: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: EatRiteDesignTokens.colors.surface.darkGreen,
    borderBottom: `1px solid rgba(212, 180, 106, 0.2)`,
    padding: EatRiteDesignTokens.spacing.lg,
    boxShadow: EatRiteDesignTokens.shadows.depth.md,
  }

  const navContentStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const logoStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: EatRiteDesignTokens.spacing.md,
    cursor: 'pointer',
  }

  const navLinksStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: EatRiteDesignTokens.spacing.xl,
  }

  const navLinkStyles = (isActive: boolean): React.CSSProperties => ({
    color: isActive
      ? EatRiteDesignTokens.colors.primary.gold
      : EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.body.size,
    fontWeight: isActive ? 600 : 400,
    cursor: 'pointer',
    transition: `color ${EatRiteDesignTokens.animations.duration.normal}`,
    display: 'flex',
    alignItems: 'center',
    gap: EatRiteDesignTokens.spacing.sm,
  })

  const userSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: EatRiteDesignTokens.spacing.md,
  }

  return (
    <nav style={navStyles}>
      <div style={navContentStyles}>
        {/* Logo */}
        <div style={logoStyles} onClick={() => onNavigate('dashboard')}>
          <EatRiteIcon size="md" color="gold" />
          <span
            style={{
              fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
              fontSize: EatRiteDesignTokens.typography.scale.h4.size,
              fontWeight: EatRiteDesignTokens.typography.scale.h4.weight,
              color: EatRiteDesignTokens.colors.primary.gold,
            }}
          >
            EatRite
          </span>
        </div>

        {/* Navigation Links */}
        <div style={navLinksStyles}>
          <div
            style={navLinkStyles(currentScreen === 'dashboard')}
            onClick={() => onNavigate('dashboard')}
          >
            <LeafIcon
              size="sm"
              color={currentScreen === 'dashboard' ? 'gold' : 'inherit'}
            />
            Dashboard
          </div>

          <div
            style={navLinkStyles(currentScreen === 'meal-builder')}
            onClick={() => onNavigate('meal-builder')}
          >
            <ProteinIcon
              size="sm"
              color={currentScreen === 'meal-builder' ? 'gold' : 'inherit'}
            />
            Meal Builder
          </div>

          <div
            style={navLinkStyles(currentScreen === 'supplements')}
            onClick={() => onNavigate('supplements')}
          >
            <ProteinIcon
              size="sm"
              color={currentScreen === 'supplements' ? 'gold' : 'inherit'}
            />
            Supplements
          </div>
        </div>

        {/* User Section */}
        <div style={userSectionStyles}>
          {/* Cart */}
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <CartIcon size="md" color="inherit" />
            {cartItemCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: EatRiteDesignTokens.colors.semantic.error,
                  color: EatRiteDesignTokens.colors.surface.offWhite,
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: EatRiteDesignTokens.typography.scale.caption.size,
                  fontWeight: 700,
                }}
              >
                {cartItemCount}
              </span>
            )}
          </div>

          {/* User Menu */}
          <div
            style={navLinkStyles(currentScreen === 'profile')}
            onClick={() => onNavigate('profile')}
          >
            <UserIcon
              size="sm"
              color={currentScreen === 'profile' ? 'gold' : 'inherit'}
            />
            {user?.firstName || 'Profile'}
          </div>

          {/* Logout */}
          <EatRiteButton variant="outline" size="sm" onClick={onLogout}>
            Logout
          </EatRiteButton>
        </div>
      </div>
    </nav>
  )
}

// ============================================================================
// NOTIFICATION SYSTEM
// ============================================================================

interface NotificationSystemProps {
  notifications: AppState['notifications']
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
}) => {
  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: EatRiteDesignTokens.spacing.xl,
    right: EatRiteDesignTokens.spacing.xl,
    zIndex: 10000,
    display: 'flex',
    flexDirection: 'column',
    gap: EatRiteDesignTokens.spacing.md,
  }

  const getNotificationStyles = (
    type: AppState['notifications'][0]['type']
  ): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      padding: EatRiteDesignTokens.spacing.lg,
      borderRadius: EatRiteDesignTokens.borderRadius.lg,
      boxShadow: EatRiteDesignTokens.shadows.depth.lg,
      minWidth: '320px',
      maxWidth: '400px',
      fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
      fontWeight: 500,
      animation: 'slideIn 0.3s ease-out',
    }

    const typeStyles = {
      success: {
        backgroundColor: EatRiteDesignTokens.colors.semantic.success,
        color: EatRiteDesignTokens.colors.surface.offWhite,
      },
      error: {
        backgroundColor: EatRiteDesignTokens.colors.semantic.error,
        color: EatRiteDesignTokens.colors.surface.offWhite,
      },
      warning: {
        backgroundColor: EatRiteDesignTokens.colors.semantic.warning,
        color: EatRiteDesignTokens.colors.surface.darkGreen,
      },
      info: {
        backgroundColor: EatRiteDesignTokens.colors.semantic.info,
        color: EatRiteDesignTokens.colors.surface.offWhite,
      },
    }

    return { ...baseStyles, ...typeStyles[type] }
  }

  if (notifications.length === 0) {
    return null
  }

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
      <div style={containerStyles}>
        {notifications.map(notification => (
          <div
            key={notification.id}
            style={getNotificationStyles(notification.type)}
          >
            {notification.message}
          </div>
        ))}
      </div>
    </>
  )
}

// ============================================================================
// CART INDICATOR
// ============================================================================

interface CartIndicatorProps {
  itemCount: number
  onCartClick: () => void
}

const CartIndicator: React.FC<CartIndicatorProps> = ({
  itemCount,
  onCartClick,
}) => {
  const indicatorStyles: React.CSSProperties = {
    position: 'fixed',
    bottom: EatRiteDesignTokens.spacing.xl,
    right: EatRiteDesignTokens.spacing.xl,
    backgroundColor: EatRiteDesignTokens.colors.primary.gold,
    color: EatRiteDesignTokens.colors.surface.darkGreen,
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: EatRiteDesignTokens.shadows.goldGlow.lg,
    zIndex: 1000,
    transition: `transform ${EatRiteDesignTokens.animations.duration.normal}`,
  }

  const countStyles: React.CSSProperties = {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: EatRiteDesignTokens.colors.semantic.error,
    color: EatRiteDesignTokens.colors.surface.offWhite,
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: EatRiteDesignTokens.typography.scale.caption.size,
    fontWeight: 700,
  }

  return (
    <div
      style={indicatorStyles}
      onClick={onCartClick}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      <CartIcon size="lg" color="inherit" />
      <div style={countStyles}>{itemCount}</div>
    </div>
  )
}

export default EatRiteApp
