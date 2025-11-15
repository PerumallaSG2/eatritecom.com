/**
 * Mobile-First Pricing Cards - Better Touch Experience
 */

import { EatRiteCard } from '../ui/Card/EatRiteCard'
import { EatRiteButton } from '../ui/Button/EatRiteButton'
import EatRiteIcons from '../icons/EatRiteIcons'

export const MobilePricingCards = () => {
  const plans = [
    {
      id: 'discovery',
      name: 'Discovery',
      price: 60,
      perMeal: 15,
      meals: 4,
      badge: null,
      description: 'Perfect for trying our cuisine'
    },
    {
      id: 'connoisseur', 
      name: 'Connoisseur',
      price: 108,
      perMeal: 13.5,
      meals: 8,
      badge: 'Most Popular',
      description: 'Optimal value and variety',
      savings: 12
    },
    {
      id: 'epicurean',
      name: 'Epicurean', 
      price: 144,
      perMeal: 12,
      meals: 12,
      badge: null,
      description: 'Maximum luxury experience',
      savings: 36
    }
  ]

  return (
    <section className="py-16 bg-eatrite-black-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-eatrite-text-primary mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-eatrite-text-secondary max-w-2xl mx-auto">
            Flexible meal plans with no commitment. Cancel or modify anytime.
          </p>
        </div>

        {/* Mobile-first stacked layout */}
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
          {plans.map((plan) => (
            <EatRiteCard 
              key={plan.id}
              variant={plan.badge ? "premium" : "default"}
              className={`
                relative p-6 text-center
                ${plan.badge ? 'md:scale-105 border-2 border-eatrite-gold-500' : ''}
              `}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-gold text-eatrite-text-inverse px-4 py-1 rounded-full text-sm font-bold">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-serif text-xl font-bold text-eatrite-text-primary mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-eatrite-text-tertiary">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="font-serif text-4xl font-bold text-eatrite-text-primary mb-1">
                  ${plan.price}
                </div>
                <div className="text-eatrite-text-secondary text-sm mb-2">
                  ${plan.perMeal}/meal • {plan.meals} meals/week
                </div>
                {plan.savings && (
                  <div className="text-eatrite-gold-400 text-sm font-medium">
                    Save ${plan.savings} vs Discovery
                  </div>
                )}
              </div>

              {/* Mobile-optimized features list */}
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center gap-2 text-sm">
                  <EatRiteIcons.Check size="sm" color="gold" />
                  <span className="text-eatrite-text-secondary">Free delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <EatRiteIcons.Check size="sm" color="gold" />
                  <span className="text-eatrite-text-secondary">Skip anytime</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <EatRiteIcons.Check size="sm" color="gold" />
                  <span className="text-eatrite-text-secondary">Premium ingredients</span>
                </div>
                {plan.badge && (
                  <div className="flex items-center gap-2 text-sm">
                    <EatRiteIcons.Star size="sm" color="gold" />
                    <span className="text-eatrite-gold-400 font-medium">Best value</span>
                  </div>
                )}
              </div>

              {/* Large touch-friendly button */}
              <EatRiteButton 
                variant={plan.badge ? "primary" : "secondary"}
                size="lg"
                className="w-full min-h-[48px]"
              >
                Select {plan.name}
              </EatRiteButton>
            </EatRiteCard>
          ))}
        </div>

        {/* Mobile-friendly guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-eatrite-text-tertiary">
            <EatRiteIcons.Check size="sm" color="gold" />
            <span>Money-back guarantee • Cancel anytime • No contracts</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobilePricingCards