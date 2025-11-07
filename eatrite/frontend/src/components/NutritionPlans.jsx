import React from 'react'

/**
 * Nutrition Plans section showcasing available meal plan options
 * Displays pricing tiers and features in an easy-to-compare format
 */
const NutritionPlans = () => {
  // Plan configuration - in a real app, this might come from an API
  const availablePlans = [
    {
      id: 'starter',
      name: 'Starter Plan',
      price: '$89',
      billing: 'per week',
      description: 'Perfect for trying out personalized nutrition',
      features: [
        'Custom meal plan for 1 week',
        '10 meals included',
        'Basic nutrition tracking',
        'Email support',
        'Recipe cards included'
      ],
      isPopular: false,
      ctaText: 'Start Trial'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$149',
      billing: 'per week',
      description: 'Our most popular choice for serious health transformation',
      features: [
        'Custom meal plan for 2 weeks',
        '21 meals included',
        'Advanced nutrition tracking',
        'Priority customer support',
        '1-on-1 nutritionist consultation',
        'Supplement recommendations'
      ],
      isPopular: true,
      ctaText: 'Get Started'
    },
    {
      id: 'elite',
      name: 'Elite Plan',
      price: '$219',
      billing: 'per week',
      description: 'Complete nutrition transformation with premium support',
      features: [
        'Custom meal plan for 4 weeks',
        'Unlimited meals',
        'Weekly nutritionist check-ins',
        'Custom meal modifications',
        '24/7 support access',
        'Fitness plan integration',
        'Progress tracking dashboard'
      ],
      isPopular: false,
      ctaText: 'Go Elite'
    }
  ]

  // Handle plan selection (placeholder for future implementation)
  const handlePlanSelection = (planId) => {
    console.log(`Selected plan: ${planId}`)
    // Future: Navigate to checkout or plan customization
    alert(`You selected the ${planId} plan! This would normally take you to checkout.`)
  }

  return (
    <section id="plans" className="nutrition-plans">
      <div className="container">
        <header className="section-header">
          <h2>Choose Your Nutrition Plan</h2>
          <p>Select the plan that best fits your lifestyle and health goals</p>
        </header>

        <div className="plans-grid">
          {availablePlans.map((plan) => (
            <div 
              key={plan.id} 
              className={`plan-card ${plan.isPopular ? 'popular-plan' : ''}`}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="popularity-badge">
                  Most Popular
                </div>
              )}

              {/* Plan header with pricing */}
              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-pricing">
                  <span className="price">{plan.price}</span>
                  <span className="billing-period">{plan.billing}</span>
                </div>
                <p className="plan-description">{plan.description}</p>
              </div>

              {/* Features list */}
              <div className="plan-features">
                <ul className="features-list">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-check">✓</span>
                      <span className="feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call-to-action button */}
              <div className="plan-footer">
                <button 
                  className={`plan-cta ${plan.isPopular ? 'cta-primary' : 'cta-secondary'}`}
                  onClick={() => handlePlanSelection(plan.id)}
                >
                  {plan.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional plan information */}
        <div className="plans-footer">
          <p className="plan-note">
            All plans include free delivery, organic ingredients, and flexible scheduling. 
            Cancel or modify your plan anytime.
          </p>
        </div>
      </div>
    </section>
  )
}

export default NutritionPlans