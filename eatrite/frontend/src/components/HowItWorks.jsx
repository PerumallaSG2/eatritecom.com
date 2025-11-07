import React from 'react'

/**
 * How It Works section explaining the Eatrite process
 * Breaks down the user journey into clear, digestible steps
 */
const HowItWorks = () => {
  // Process steps data - could be moved to a separate config file in larger apps
  const processSteps = [
    {
      stepNumber: 1,
      title: "Complete Your Profile",
      description: "Share your health goals, dietary preferences, and lifestyle habits through our quick questionnaire.",
      icon: "📝"
    },
    {
      stepNumber: 2,
      title: "Get Your Custom Plan",
      description: "Our nutrition experts create a personalized meal plan tailored specifically to your needs.",
      icon: "🎯"
    },
    {
      stepNumber: 3,
      title: "Receive Fresh Meals",
      description: "Enjoy delicious, healthy meals delivered fresh to your doorstep with perfect portions.",
      icon: "🚚"
    },
    {
      stepNumber: 4,
      title: "Track Your Progress",
      description: "Monitor your health journey and adjust your plan as you achieve your wellness goals.",
      icon: "📊"
    }
  ]

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <header className="section-header">
          <h2>How Eatrite Works</h2>
          <p>Your path to better health in four simple steps</p>
        </header>

        <div className="steps-container">
          {processSteps.map((step) => (
            <div key={step.stepNumber} className="process-step">
              <div className="step-indicator">
                <span className="step-number">{step.stepNumber}</span>
              </div>
              
              <div className="step-content">
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks