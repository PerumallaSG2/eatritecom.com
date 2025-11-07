import React from 'react'

const NutritionPlans = () => {
  const plans = [
    {
      name: "Essential",
      price: "$99",
      period: "/week",
      description: "Perfect for getting started with healthy eating",
      features: [
        "Personalized meal plan",
        "14 meals per week",
        "Basic nutrition tracking",
        "Email support",
        "Recipe collection access"
      ],
      popular: false
    },
    {
      name: "Premium", 
      price: "$149",
      period: "/week",
      description: "Most popular choice for comprehensive nutrition",
      features: [
        "Everything in Essential",
        "21 meals per week",
        "Advanced nutrition tracking",
        "1-on-1 nutritionist consultation",
        "Supplement recommendations",
        "Priority support"
      ],
      popular: true
    },
    {
      name: "Elite",
      price: "$199", 
      period: "/week",
      description: "Ultimate plan for serious health transformation",
      features: [
        "Everything in Premium",
        "Unlimited meals",
        "Weekly nutritionist calls",
        "Custom meal modifications",
        "Fitness plan integration",
        "24/7 support",
        "Progress analysis reports"
      ],
      popular: false
    }
  ]

  return (
    <section id="plans" className="nutrition-plans">
      <div className="container">
        <div className="section-header">
          <h2>Choose Your Nutrition Plan</h2>
          <p>Select the plan that best fits your lifestyle and goals</p>
        </div>

        <div className="plans-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
                <p className="plan-description">{plan.description}</p>
              </div>

              <div className="plan-features">
                <ul>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <span className="checkmark">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} plan-btn`}>
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="plans-footer">
          <p>All plans include fresh, organic ingredients and free delivery. Cancel anytime.</p>
        </div>
      </div>
    </section>
  )
}

export default NutritionPlans