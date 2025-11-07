import React from 'react'

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Complete Assessment",
      description: "Fill out our comprehensive questionnaire about your health goals, dietary preferences, and lifestyle.",
      icon: "📋"
    },
    {
      number: "02", 
      title: "Get Your Plan",
      description: "Receive a personalized nutrition plan created by certified nutritionists based on your unique needs.",
      icon: "📊"
    },
    {
      number: "03",
      title: "Enjoy Fresh Meals",
      description: "Get delicious, healthy meals delivered to your door, perfectly portioned and ready to eat.",
      icon: "🚚"
    },
    {
      number: "04",
      title: "Track Progress",
      description: "Monitor your health journey with our app and adjust your plan as you reach your goals.",
      icon: "📈"
    }
  ]

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How Eatrite Works</h2>
          <p>Your personalized nutrition journey in 4 simple steps</p>
        </div>
        
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks