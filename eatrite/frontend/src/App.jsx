import React from 'react'
import HeroSection from './components/HeroSection'
import HowItWorks from './components/HowItWorks'
import QuestionnaireForm from './components/QuestionnaireForm'
import NutritionPlans from './components/NutritionPlans'
import Footer from './components/Footer'

/**
 * Main App component for Eatrite
 * Orchestrates all major sections of the application
 */
function App() {
  return (
    <div className="App">
      <HeroSection />
      <HowItWorks />
      <QuestionnaireForm />
      <NutritionPlans />
      <Footer />
    </div>
  )
}

export default App