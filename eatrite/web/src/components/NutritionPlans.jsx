import React from 'react'

/**
 * Nutrition Plans section showcasing meal plan options
 * Displays pricing and features in a clean comparison format
 */
const NutritionPlans = () => {
  const mealPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$89',
      period: 'per week',
      description: 'Perfect for getting started with healthy eating',
      features: [
        'Personalized weekly meal plan',
        '10 meals included',
        'Basic nutrition tracking',
        'Email customer support',
        'Recipe cards and tips'
      ],
      isPopular: false,
      buttonText: 'Start Trial'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$149',
      period: 'per week',
      description: 'Most popular plan for complete nutrition transformation',
      features: [
        'Everything in Starter plan',
        '21 meals per week',
        'Advanced nutrition analytics',
        'Priority customer support',
        'Monthly nutritionist consultation',
        'Custom meal modifications'
      ],
      isPopular: true,
      buttonText: 'Get Started'
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '$219',
      period: 'per week',
      description: 'Ultimate plan with premium support and unlimited options',
      features: [
        'Everything in Premium plan',
        'Unlimited meal variety',
        'Weekly nutritionist check-ins',
        'Custom recipe requests',
        '24/7 priority support',
        'Fitness plan integration',
        'Detailed progress reports'
      ],
      isPopular: false,
      buttonText: 'Go Elite'
    }
  ]

  // Handle plan selection (placeholder for future checkout flow)
  const selectPlan = (planId) => {
    console.log(`Plan selected: ${planId}`)
    alert(`You selected the ${planId} plan! In a real app, this would take you to checkout.`)
  }

  return (
    <section id="nutrition-plans" className="nutrition-plans">
      <div className="container">
        <div className="section-title">
          <h2>Choose Your Plan</h2>
          <p>Select the nutrition plan that fits your lifestyle and goals</p>
        </div>

        <div className="plans-container">
          {mealPlans.map((plan) => (
            <div 
              key={plan.id} 
              className={`plan-card ${plan.isPopular ? 'featured-plan' : ''}`}
            >
              {plan.isPopular && (
                <div className="popular-badge">Most Popular</div>
              )}

              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-period">{plan.period}</span>
                </div>
                <p className="plan-description">{plan.description}</p>
              </div>

              <div className="plan-features">
                <ul className="features-list">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="checkmark">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="plan-footer">
                <button 
                  className={`plan-button ${plan.isPopular ? 'button-primary' : 'button-secondary'}`}
                  onClick={() => selectPlan(plan.id)}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="plans-info">
          <p>All plans include free delivery, organic ingredients, and 24/7 customer support. Cancel anytime.</p>
        </div>
      </div>
    </section>
  )
}

export default NutritionPlans