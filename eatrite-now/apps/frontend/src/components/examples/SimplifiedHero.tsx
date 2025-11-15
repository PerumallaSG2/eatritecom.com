/**
 * Simplified Hero Section - More Conversion Focused
 */

import { EatRiteButton } from '../ui/Button/EatRiteButton'
import EatRiteIcons from '../icons/EatRiteIcons'
import { FadeIn } from '../AnimationComponents'

export const SimplifiedHero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          {/* Simplified branding */}
          <div className="mb-8">
            <EatRiteIcons.ThreeLeaves size="lg" color="gold" className="mx-auto mb-4" />
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-gradient-gold mb-4 leading-tight">
              EatRite
            </h1>
          </div>
          
          {/* Clear value proposition */}
          <h2 className="text-2xl md:text-3xl text-eatrite-text-primary mb-6 font-medium">
            Chef-Crafted Meals, Delivered Fresh
          </h2>
          
          <p className="text-lg text-eatrite-text-secondary mb-8 max-w-2xl mx-auto">
            Premium ingredients, nutritionist-approved recipes, zero prep time.
            <span className="text-eatrite-gold-400 font-medium"> Starting at $12.99/meal.</span>
          </p>
          
          {/* Simplified CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <EatRiteButton
              variant="primary"
              size="lg"
              as="a"
              href="/menu"
            >
              View Our Meals
            </EatRiteButton>
            
            <EatRiteButton
              variant="ghost"
              size="lg"
              as="a"
              href="/plans"
            >
              See Pricing
            </EatRiteButton>
          </div>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-8 text-sm text-eatrite-text-tertiary">
            <div className="flex items-center gap-2">
              <EatRiteIcons.Star size="sm" color="gold" />
              <span>4.9★ Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <EatRiteIcons.Truck size="sm" color="gold" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <EatRiteIcons.Clock size="sm" color="gold" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default SimplifiedHero