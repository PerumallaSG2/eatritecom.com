import React from 'react'

/**
 * How It Works section explaining the Eatrite process
 * Simple 4-step breakdown of the user journey
 */
const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Complete Your Health Profile",
      description: "Tell us about your goals, preferences, and lifestyle through our simple questionnaire.",
      emoji: "📝"
    },
    {
      number: 2,
      title: "Receive Your Custom Plan",
      description: "Our nutrition experts create a meal plan tailored specifically to your needs.",
      emoji: "🎯"
    },
    {
      number: 3,
      title: "Get Fresh Meals Delivered",
      description: "Enjoy delicious, healthy meals delivered fresh to your door with perfect portions.",
      emoji: "🚚"
    },
    {
      number: 4,
      title: "Track Your Progress",
      description: "Monitor your wellness journey and adjust your plan as you reach your goals.",
      emoji: "📈"
    }
  ]

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <div className="section-title">
          <h2>How Eatrite Works</h2>
          <p>Your wellness transformation in four simple steps</p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.number} className="step-card">
              <div className="step-number">{step.number}</div>
              <div className="step-emoji">{step.emoji}</div>
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