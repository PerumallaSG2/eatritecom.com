import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import { PremiumHomePage } from './pages/PremiumHomePage'
import { EatRiteApp as EatRiteUIApp } from './components/EatRiteApp'
import HomepageVersionSwitcher from './pages/HomepageVersionSwitcher'
import RevolutionaryMenuPage from './pages/RevolutionaryMenuPage'
import RevolutionaryPricingPage from './pages/RevolutionaryPricingPage'
import RevolutionaryPlansPage from './pages/RevolutionaryPlansPage'
import MenuPage from './pages/MenuPage'
import PricingPage from './pages/PricingPage'
import PlansPage from './pages/PlansPage'
import FAQPage from './pages/FAQPage'
import SupplementsPage from './pages/SupplementsPage'
import ProfilePage from './pages/ProfilePage'
import AccountPage from './pages/AccountPage'
import LoginPage from './pages/LoginPage'
import NutritionCoachingPage from './pages/NutritionCoachingPage'
import DietaryProfileSetup from './components/DietaryProfileSetup'
import B2BPartnershipROIDashboard from './components/B2BPartnershipROIDashboard'
import CorporatePartnerships from './components/CorporatePartnerships'
import InteractiveMealBuilder from './components/InteractiveMealBuilder'
import MealComparison from './components/MealComparison'
import NutritionCalculator from './components/NutritionCalculator'
import AIPoweredMealRecommendations from './components/AIPoweredMealRecommendations'
import OrderTracking from './components/OrderTracking'
import PersonalizedHealthGoals from './components/PersonalizedHealthGoals'
import HealthAchievementBadges from './components/HealthAchievementBadges'
import { CartProvider } from './context/CartContext'
import { UserPreferencesProvider } from './context/UserPreferencesContext'
import { EatRiteProvider } from './context/EatRiteThemeProvider'
import { ToastProvider } from './context/ToastContext'

// Placeholder component for routes not yet implemented
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center max-w-md mx-auto px-4">
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-surface border border-eatrite-gold-700 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gradient-gold opacity-80"></div>
        </div>
      </div>
      <h1 className="text-4xl font-serif font-bold text-gradient-gold mb-6">{title}</h1>
      <p className="text-xl text-eatrite-text-secondary mb-8 leading-relaxed">
        Something extraordinary is coming. Our team is crafting an exceptional experience 
        that embodies the luxury and wellness you expect from EatRite.
      </p>
      <div className="space-y-4">
        <div className="bg-eatrite-surface-primary border border-eatrite-surface-border rounded-xl p-6">
          <p className="text-eatrite-text-tertiary text-sm mb-2">Get notified when we launch</p>
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
  return (
    <EatRiteProvider>
      <UserPreferencesProvider>
        <CartProvider>
          <ToastProvider>
            <div className="min-h-screen">
            <Routes>
              {/* Premium Homepage - World-Class UI Design */}
              <Route path="/" element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow">
                    <HomePage />
                  </main>
                  <Footer />
                </div>
              } />
              
              {/* Original Homepage - Alternative Route */}
              <Route path="/original" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <HomePage />
                  </main>
                  <Footer />
                </div>
              } />
              
              {/* Premium Brand Homepage - Alternative */}
              <Route path="/premium" element={<PremiumHomePage />} />
              
              {/* New Premium EatRite UI System */}
              <Route path="/eatrite-ui" element={<EatRiteUIApp />} />
              
              {/* Core App Pages - With Premium Styling */}
              <Route path="/menu" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <MenuPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/pricing" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <PricingPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/plans" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <PlansPage />
                  </main>
                  <Footer />
                </div>
              } />
              
              {/* Revolutionary Pages - Alternative Design */}
              <Route path="/revolutionary" element={<HomepageVersionSwitcher />} />
              <Route path="/revolutionary/menu" element={<RevolutionaryMenuPage />} />
              <Route path="/revolutionary/pricing" element={<RevolutionaryPricingPage />} />
              <Route path="/revolutionary/plans" element={<RevolutionaryPlansPage />} />
              
              {/* Feature Pages */}
              <Route path="/dietary-profile" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <DietaryProfileSetup />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/meal-builder" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <InteractiveMealBuilder />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/meal-comparison" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <MealComparison availableMeals={[
                      {
                        id: '1',
                        name: 'Premium Grilled Salmon',
                        description: 'Fresh Atlantic salmon with quinoa and vegetables',
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
                        rating: 4.8
                      },
                      {
                        id: '2', 
                        name: 'Organic Chicken Bowl',
                        description: 'Free-range chicken with brown rice and seasonal vegetables',
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
                        rating: 4.6
                      }
                    ]} />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/nutrition-calculator" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <NutritionCalculator />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/ai-recommendations" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <AIPoweredMealRecommendations />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/order-tracking" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <OrderTracking />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/health-goals" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <PersonalizedHealthGoals />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/achievements" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <HealthAchievementBadges />
                  </main>
                  <Footer />
                </div>
              } />
              
              {/* Business Pages */}
              <Route path="/b2b-dashboard" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <B2BPartnershipROIDashboard />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/corporate-partnerships" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <CorporatePartnerships />
                  </main>
                  <Footer />
                </div>
              } />
              
              {/* Traditional Pages - With Navbar/Footer */}
              <Route path="/faq" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <FAQPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/supplements" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <SupplementsPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/profile" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <ProfilePage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/account" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <AccountPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/business" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <PlaceholderPage title="EatRite for Business" />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/nutrition-coaching" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <NutritionCoachingPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/gift-cards" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <PlaceholderPage title="Luxury Gift Cards" />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/blog" element={
                <div className="min-h-screen flex flex-col bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <PlaceholderPage title="EatRite Wellness Journal" />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<LoginPage />} />
            </Routes>
            </div>
          </ToastProvider>
        </CartProvider>
      </UserPreferencesProvider>
    </EatRiteProvider>
  )
}

export default App