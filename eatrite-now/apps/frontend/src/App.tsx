import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react'

// Core Layout Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loading from './components/Loading'
import PageLayout from './components/PageLayout'

// Critical Pages (loaded immediately)
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

// Lazy-loaded Pages for Performance
const MenuPage = lazy(() => import('./pages/MenuPage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const PlansPage = lazy(() => import('./pages/PlansPage'))
const FAQPage = lazy(() => import('./pages/FAQPage'))
const SupplementsPage = lazy(() => import('./pages/SupplementsPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const AccountPage = lazy(() => import('./pages/AccountPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const NutritionCoachingPage = lazy(() => import('./pages/NutritionCoachingPage'))
const OrderTrackingPage = lazy(() => import('./pages/OrderTrackingPage'))
const MealDetailPage = lazy(() => import('./pages/MealDetailPage'))
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))

// Premium & Revolutionary Pages (Lazy)
const PremiumHomePage = lazy(() => import('./pages/PremiumHomePage').then(module => ({ default: module.PremiumHomePage })))
const HomeDashboard = lazy(() => import('./pages/HomeDashboard'))
const HomepageVersionSwitcher = lazy(() => import('./pages/HomepageVersionSwitcher'))
const RevolutionaryMenuPage = lazy(() => import('./pages/RevolutionaryMenuPage'))
const RevolutionaryPricingPage = lazy(() => import('./pages/RevolutionaryPricingPage'))
const RevolutionaryPlansPage = lazy(() => import('./pages/RevolutionaryPlansPage'))

// Corporate Pages (Lazy)
const CorporateLandingPage = lazy(() => import('./pages/CorporateLandingPage'))
const EmployeeWellnessGamification = lazy(() => import('./pages/EmployeeWellnessGamification'))
const CorporateAnalyticsDashboard = lazy(() => import('./pages/CorporateAnalyticsDashboard'))

// Design System Components (Lazy)
const DesignSystemShowcase = lazy(() => import('./components/design-system/DesignSystemShowcase'))
const PremiumHomeDashboard = lazy(() => import('./components/design-system/PremiumHomeDashboard'))
const PremiumMenuPage = lazy(() => import('./components/design-system/PremiumMenuPage'))
const PremiumCorporateDashboard = lazy(() => import('./components/design-system/PremiumCorporateDashboard'))
const PremiumEmployeeWellnessDashboard = lazy(() => import('./components/design-system/PremiumEmployeeWellnessDashboard'))
const PremiumTasteProfileQuiz = lazy(() => import('./components/design-system/PremiumTasteProfileQuiz'))
const PremiumLandingHero = lazy(() => import('./components/design-system/PremiumLandingHero'))

// Feature Components (Lazy)
const EatRiteUIApp = lazy(() => import('./components/EatRiteApp').then(module => ({ default: module.EatRiteApp })))
const MenuManagementSimplification = lazy(() => import('./components/MenuManagementSimplification'))
const TestimonialSystem = lazy(() => import('./components/TestimonialSystem'))
const CorporateROICalculator = lazy(() => import('./components/CorporateROICalculator'))
const DietaryProfileSetup = lazy(() => import('./components/DietaryProfileSetup'))
const B2BPartnershipROIDashboard = lazy(() => import('./components/B2BPartnershipROIDashboard'))
const CorporatePartnerships = lazy(() => import('./components/CorporatePartnerships'))
const InteractiveMealBuilder = lazy(() => import('./components/InteractiveMealBuilder'))
import MealComparison from './components/MealComparison'
import NutritionCalculator from './components/NutritionCalculator'
import AIPoweredMealRecommendations from './components/AIPoweredMealRecommendations'
import OrderTracking from './components/OrderTracking'
import PersonalizedHealthGoals from './components/PersonalizedHealthGoals'
import HealthAchievementBadges from './components/HealthAchievementBadges'

// Context Providers
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { UserPreferencesProvider } from './context/UserPreferencesContext'
import { EatRiteProvider } from './context/EatRiteThemeProvider'
import { MobileNavigationProvider } from './context/MobileNavigationContext'
import { ThemeProvider } from './context/ThemeContext'
import { OrderTrackingProvider } from './context/OrderTrackingContext'
import { AnalyticsProvider } from './context/AnalyticsContext'

// PWA Components
import PWAInstaller from './components/PWAInstaller'
import UpdateNotification from './components/UpdateNotification'
import OfflineIndicator from './components/OfflineIndicator'

// Error Handling
import ErrorBoundary, { RouteErrorBoundary } from './components/ErrorBoundary'
import { setupGlobalErrorHandlers } from './hooks/useErrorHandler'

// Mobile Navigation
import { BottomNavigation, MobileHeader } from './components/MobileNavigation'

// Order Tracking Components
import { OrderNotificationCenter, LiveOrderStatusIndicator } from './components/OrderNotifications'

// PWA Hooks
import { useServiceWorker, ServiceWorkerUpdateEvent } from './utils/serviceWorker'

// Placeholder component for routes not yet implemented
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center max-w-md mx-auto px-4">
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-surface border border-eatrite-gold-700 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gradient-gold opacity-80"></div>
        </div>
      </div>
      <h1 className="text-4xl font-serif font-bold text-gradient-gold mb-6">
        {title}
      </h1>
      <p className="text-xl text-eatrite-text-secondary mb-8 leading-relaxed">
        Something extraordinary is coming. Our team is crafting an exceptional
        experience that embodies the luxury and wellness you expect from
        EatRite.
      </p>
      <div className="space-y-4">
        <div className="bg-eatrite-surface-primary border border-eatrite-surface-border rounded-xl p-6">
          <p className="text-eatrite-text-tertiary text-sm mb-2">
            Get notified when we launch
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 bg-eatrite-surface-secondary border border-eatrite-surface-tertiary rounded-lg px-4 py-2 text-eatrite-text-primary placeholder-eatrite-text-placeholder focus:border-eatrite-gold-500 focus:outline-none transition-colors"
            />
            <button className="bg-gradient-gold text-eatrite-text-inverse px-6 py-2 rounded-lg font-semibold hover:shadow-gold transition-all">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

function App() {
  const [showUpdateNotification, setShowUpdateNotification] = useState(false)
  const { register, onUpdate } = useServiceWorker()

  useEffect(() => {
    // Setup global error handlers
    setupGlobalErrorHandlers()

    // Register service worker on mount
    register().then(({ registration, error }) => {
      if (error) {
        console.warn('Service Worker registration failed:', error.message)
      } else if (registration) {
        console.log('Service Worker registered successfully')
      }
    })

    // Listen for updates
    const unsubscribe = onUpdate((event: ServiceWorkerUpdateEvent) => {
      if (event.type === 'update-available') {
        setShowUpdateNotification(true)
      }
    })

    return unsubscribe
  }, [register, onUpdate])

  const handleUpdateComplete = () => {
    setShowUpdateNotification(false)
  }

  const handleUpdateDismiss = () => {
    setShowUpdateNotification(false)
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <EatRiteProvider>
          <UserPreferencesProvider>
            <AuthProvider>
              <CartProvider>
                <OrderTrackingProvider>
                  <AnalyticsProvider>
                    <MobileNavigationProvider>
                    <div className="min-h-screen">
                  {/* PWA Components */}
                  <PWAInstaller />
                  <OfflineIndicator />
                  {showUpdateNotification && (
                    <UpdateNotification
                      onUpdate={handleUpdateComplete}
                      onDismiss={handleUpdateDismiss}
                    />
                  )}
                  
                  <Suspense fallback={<Loading />}>
                    <RouteErrorBoundary>
                      <Routes>
                  {/* Premium Homepage - World-Class UI Design */}
                  <Route
                    path="/"
                    element={
                      <PageLayout variant="premium">
                        <HomePage />
                      </PageLayout>
                    }
                  />
                  {/* Original Homepage - Alternative Route */}
                  <Route
                    path="/original"
                    element={
                      <PageLayout variant="default">
                        <HomePage />
                      </PageLayout>
                    }
                  />
                  {/* Premium Brand Homepage - Alternative */}
                  <Route path="/premium" element={
                    <PageLayout variant="premium">
                      <PremiumHomePage />
                    </PageLayout>
                  } />
                  {/* New Premium Dashboard */}
                  <Route path="/dashboard" element={
                    <PageLayout variant="dashboard">
                      <HomeDashboard />
                    </PageLayout>
                  } />
                  {/* Corporate Landing Page */}
                  <Route 
                    path="/corporate" 
                    element={
                      <PageLayout variant="corporate">
                        <CorporateLandingPage />
                      </PageLayout>
                    } 
                  />
                  {/* Employee Wellness Gamification */}
                  <Route
                    path="/gamification"
                    element={
                      <PageLayout variant="premium">
                        <EmployeeWellnessGamification />
                      </PageLayout>
                    }
                  />
                  {/* Corporate Analytics Dashboard */}
                  <Route
                    path="/corporate-analytics"
                    element={
                      <PageLayout variant="corporate">
                        <CorporateAnalyticsDashboard />
                      </PageLayout>
                    }
                  />
                  {/* Menu Management System */}
                  <Route
                    path="/menu-management"
                    element={
                      <PageLayout variant="dashboard">
                        <MenuManagementSimplification />
                      </PageLayout>
                    }
                  />
                  {/* Testimonial System */}
                  <Route path="/testimonials" element={
                    <PageLayout variant="premium">
                      <TestimonialSystem />
                    </PageLayout>
                  } />
                  {/* Corporate ROI Calculator */}
                  <Route
                    path="/roi-calculator"
                    element={
                      <PageLayout variant="corporate">
                        <CorporateROICalculator />
                      </PageLayout>
                    }
                  />
                  {/* Premium Design System */}
                  <Route
                    path="/design-system"
                    element={
                      <PageLayout variant="premium">
                        <DesignSystemShowcase />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/design/dashboard"
                    element={
                      <PageLayout variant="premium">
                        <PremiumHomeDashboard />
                      </PageLayout>
                    }
                  />
                  <Route path="/design/menu" element={
                    <PageLayout variant="premium">
                      <PremiumMenuPage />
                    </PageLayout>
                  } />
                  <Route
                    path="/design/corporate-dashboard"
                    element={
                      <PageLayout variant="corporate">
                        <PremiumCorporateDashboard />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/design/employee-dashboard"
                    element={
                      <PageLayout variant="dashboard">
                        <PremiumEmployeeWellnessDashboard />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/design/taste-quiz"
                    element={
                      <PageLayout variant="premium" showFooter={false}>
                        <PremiumTasteProfileQuiz />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/design/landing"
                    element={
                      <PageLayout variant="premium">
                        <PremiumLandingHero />
                      </PageLayout>
                    }
                  />{' '}
                  {/* New Premium EatRite UI System */}
                  <Route path="/eatrite-ui" element={
                    <PageLayout variant="premium">
                      <EatRiteUIApp />
                    </PageLayout>
                  } />
                  {/* Core App Pages - With Premium Styling */}
                  <Route
                    path="/menu"
                    element={
                      <PageLayout variant="premium">
                        <MenuPage />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/pricing"
                    element={
                      <PageLayout variant="premium">
                        <PricingPage />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/plans"
                    element={
                      <PageLayout variant="premium">
                        <PlansPage />
                      </PageLayout>
                    }
                  />
                  {/* Revolutionary Pages - Alternative Design */}
                  <Route
                    path="/revolutionary"
                    element={
                      <PageLayout variant="premium">
                        <HomepageVersionSwitcher />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/revolutionary/menu"
                    element={
                      <PageLayout variant="premium">
                        <RevolutionaryMenuPage />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/revolutionary/pricing"
                    element={
                      <PageLayout variant="premium">
                        <RevolutionaryPricingPage />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/revolutionary/plans"
                    element={
                      <PageLayout variant="premium">
                        <RevolutionaryPlansPage />
                      </PageLayout>
                    }
                  />
                  {/* Feature Pages */}
                  <Route
                    path="/dietary-profile"
                    element={
                      <PageLayout variant="premium">
                        <DietaryProfileSetup />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/meal-builder"
                    element={
                      <PageLayout variant="premium">
                        <InteractiveMealBuilder />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/meal-comparison"
                    element={
                      <PageLayout variant="premium">
                        <MealComparison
                          availableMeals={[
                            {
                              id: '1',
                              name: 'Premium Grilled Salmon',
                              description:
                                'Fresh Atlantic salmon with quinoa and vegetables',
                              calories: 450,
                              protein: 35,
                              carbs: 30,
                              fat: 18,
                              fiber: 8,
                              sodium: 420,
                              price: 24.99,
                              image_url: '/images/salmon.jpg',
                              dietary_tags: 'Keto, Gluten-Free',
                              is_popular: true,
                              rating: 4.8,
                            },
                            {
                              id: '2',
                              name: 'Organic Chicken Bowl',
                              description:
                                'Free-range chicken with brown rice and seasonal vegetables',
                              calories: 380,
                              protein: 32,
                              carbs: 35,
                              fat: 12,
                              fiber: 6,
                              sodium: 380,
                              price: 19.99,
                              image_url: '/images/chicken.jpg',
                              dietary_tags: 'Paleo, Gluten-Free',
                              is_popular: false,
                              rating: 4.6,
                            },
                          ]}
                        />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/nutrition-calculator"
                    element={
                      <PageLayout variant="premium">
                        <NutritionCalculator />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/ai-recommendations"
                    element={
                      <PageLayout variant="premium">
                        <AIPoweredMealRecommendations />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/order-tracking"
                    element={
                      <PageLayout variant="dashboard">
                        <OrderTracking />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/health-goals"
                    element={
                      <PageLayout variant="premium">
                        <PersonalizedHealthGoals />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/achievements"
                    element={
                      <div className="min-h-screen flex flex-col bg-white">
                        <Navbar />
                        <main className="flex-grow">
                          <HealthAchievementBadges />
                        </main>
                        <Footer />
                      </div>
                    }
                  />
                  {/* Business Pages */}
                  <Route
                    path="/b2b-dashboard"
                    element={
                      <PageLayout variant="corporate">
                        <B2BPartnershipROIDashboard />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/corporate-partnerships"
                    element={
                      <PageLayout variant="corporate">
                        <CorporatePartnerships />
                      </PageLayout>
                    }
                  />
                  {/* Traditional Pages - With Navbar/Footer */}
                  <Route
                    path="/faq"
                    element={
                      <PageLayout variant="default">
                        <FAQPage />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/supplements"
                    element={
                      <PageLayout variant="premium">
                        <SupplementsPage />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <div className="min-h-screen flex flex-col bg-white">
                        <Navbar />
                        <main className="flex-grow">
                          <ProfilePage />
                        </main>
                        <Footer />
                      </div>
                    }
                  />
                  <Route
                    path="/account"
                    element={
                      <PageLayout variant="dashboard">
                        <AccountPage />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <PageLayout variant="dashboard">
                        <SettingsPage />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/privacy"
                    element={
                      <PageLayout variant="default">
                        <PrivacyPolicyPage />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/business"
                    element={
                      <PageLayout variant="corporate">
                        <PlaceholderPage title="EatRite for Business" />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/nutrition-coaching"
                    element={
                      <PageLayout variant="premium">
                        <NutritionCoachingPage />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/gift-cards"
                    element={
                      <PageLayout variant="premium">
                        <PlaceholderPage title="Luxury Gift Cards" />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/blog"
                    element={
                      <div className="min-h-screen flex flex-col bg-white">
                        <Navbar />
                        <main className="flex-grow">
                          <PlaceholderPage title="EatRite Wellness Journal" />
                        </main>
                        <Footer />
                      </div>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <div className="min-h-screen flex flex-col bg-white">
                        <main className="flex-grow">
                          <CartPage />
                        </main>
                      </div>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <PageLayout variant="minimal" showNavbar={false} showFooter={false}>
                        <CheckoutPage />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/track"
                    element={
                      <PageLayout variant="dashboard" showFooter={false}>
                        <OrderTrackingPage />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/track/:orderId"
                    element={
                      <PageLayout variant="dashboard" showFooter={false}>
                        <OrderTrackingPage />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/meal/:id"
                    element={
                      <PageLayout variant="premium">
                        <MealDetailPage />
                      </PageLayout>
                    }
                  />
                  <Route
                    path="/analytics"
                    element={
                      <PageLayout variant="dashboard">
                        <AnalyticsPage />
                      </PageLayout>
                    }
                  />
                  <Route path="/login" element={
                    <PageLayout variant="minimal" showNavbar={false} showFooter={false}>
                      <LoginPage />
                    </PageLayout>
                  } />
                  <Route path="/signup" element={
                    <PageLayout variant="minimal" showNavbar={false} showFooter={false}>
                      <LoginPage />
                    </PageLayout>
                  } />
                </Routes>
                      </RouteErrorBoundary>
                    </Suspense>
                    
                    {/* Mobile Navigation Components */}
                    <MobileHeader />
                    <BottomNavigation />
                    
                    {/* Order Tracking Components */}
                    <OrderNotificationCenter />
                    <LiveOrderStatusIndicator />
                  </div>
                    </MobileNavigationProvider>
                  </AnalyticsProvider>
                </OrderTrackingProvider>
              </CartProvider>
            </AuthProvider>
          </UserPreferencesProvider>
        </EatRiteProvider>
      </ThemeProvider>
  </ErrorBoundary>
    )
}

export default App
