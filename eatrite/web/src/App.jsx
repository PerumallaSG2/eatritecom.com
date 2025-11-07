import React from 'react'
import HeroSection from './components/HeroSection'
import HowItWorks from './components/HowItWorks'
import QuestionnaireForm from './components/QuestionnaireForm'
import NutritionPlans from './components/NutritionPlans'
import Footer from './components/Footer'

/**
 * Main Eatrite web application
 * Combines all sections into a single-page experience
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