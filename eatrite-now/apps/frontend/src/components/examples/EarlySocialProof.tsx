/**
 * Early Social Proof - Build Trust Immediately
 */

import { EatRiteCard } from '../ui/Card/EatRiteCard'
import EatRiteIcons from '../icons/EatRiteIcons'
import { FadeIn } from '../AnimationComponents'

export const EarlySocialProof = () => {
  const stats = [
    { value: '50K+', label: 'Happy Customers', icon: <EatRiteIcons.Heart size="md" /> },
    { value: '4.9★', label: 'Average Rating', icon: <EatRiteIcons.Star size="md" /> },
    { value: '500+', label: 'Premium Meals', icon: <EatRiteIcons.ChefHat size="md" /> },
    { value: '98%', label: 'Would Recommend', icon: <EatRiteIcons.Check size="md" /> }
  ]

  const reviews = [
    {
      name: 'Sarah M.',
      rating: 5,
      text: 'Finally, healthy meals that actually taste amazing. The convenience is unmatched.',
      verified: true
    },
    {
      name: 'Michael R.',
      rating: 5, 
      text: 'Lost 15 lbs in 2 months without sacrificing flavor. Worth every penny.',
      verified: true
    },
    {
      name: 'Jennifer L.',
      rating: 5,
      text: 'As a busy mom, EatRite saves me hours while keeping my family healthy.',
      verified: true
    }
  ]

  return (
    <section className="py-16 bg-eatrite-black-900 border-t border-eatrite-black-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Stats */}
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 flex justify-center text-eatrite-gold-400">
                  {stat.icon}
                </div>
                <div className="font-serif text-2xl md:text-3xl font-bold text-eatrite-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-eatrite-text-tertiary uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Quick Reviews */}
        <FadeIn>
          <div className="text-center mb-8">
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-eatrite-text-primary mb-2">
              What Our Customers Say
            </h3>
            <p className="text-sm text-eatrite-text-tertiary">
              Real reviews from verified customers
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <EatRiteCard key={index} variant="flat" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <EatRiteIcons.Star key={i} size="sm" color="gold" />
                  ))}
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 text-xs text-eatrite-gold-400">
                    <EatRiteIcons.Check size="sm" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
              
              <p className="text-eatrite-text-secondary text-sm mb-4 leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="text-eatrite-text-tertiary text-xs font-medium">
                — {review.name}
              </div>
            </EatRiteCard>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-8 text-xs text-eatrite-text-tertiary">
            <div className="flex items-center gap-2">
              <EatRiteIcons.Check size="sm" color="gold" />
              <span>FDA Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <EatRiteIcons.Leaf size="sm" color="gold" />
              <span>Organic Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <EatRiteIcons.Activity size="sm" color="gold" />
              <span>Nutritionist Approved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EarlySocialProof