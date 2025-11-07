import React from 'react'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import QuestionnaireForm from './components/QuestionnaireForm'
import NutritionPlans from './components/NutritionPlans'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="App">
      <Hero />
      <HowItWorks />
      <QuestionnaireForm />
      <NutritionPlans />
      <Footer />
    </div>
  )
}

export default App