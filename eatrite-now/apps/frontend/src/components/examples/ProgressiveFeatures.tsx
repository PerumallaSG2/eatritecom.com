/**
 * Progressive Feature Tabs - Reveal Advanced Features Gradually
 */

import { useState } from 'react'
import { EatRiteCard } from '../ui/Card/EatRiteCard'
import EatRiteIcons from '../icons/EatRiteIcons'
import ROICalculator from '../ROICalculator'
import AIPoweredMealRecommendations from '../AIPoweredMealRecommendations'
import InteractiveMealBuilder from '../InteractiveMealBuilder'

type FeatureTab = 'basics' | 'smart' | 'premium'

export const ProgressiveFeatures = () => {
  const [activeTab, setActiveTab] = useState<FeatureTab>('basics')

  const tabs = [
    { 
      id: 'basics' as const, 
      label: 'How It Works', 
      icon: <EatRiteIcons.Clock size="sm" />,
      description: 'Simple meal delivery'
    },
    { 
      id: 'smart' as const, 
      label: 'Smart Features', 
      icon: <EatRiteIcons.Target size="sm" />,
      description: 'AI-powered personalization'
    },
    { 
      id: 'premium' as const, 
      label: 'Premium Tools', 
      icon: <EatRiteIcons.Star size="sm" />,
      description: 'Advanced analytics'
    }
  ]

  return (
    <section className="py-20 bg-eatrite-black-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-eatrite-black-800 rounded-lg p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-md transition-all
                  ${activeTab === tab.id 
                    ? 'bg-gradient-gold text-eatrite-text-inverse shadow-gold-sm' 
                    : 'text-eatrite-text-tertiary hover:text-eatrite-text-secondary'
                  }
                `}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'basics' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <EatRiteCard variant="flat" className="text-center p-8">
                <EatRiteIcons.ChefHat size="lg" color="gold" className="mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-eatrite-gold-400 mb-4">
                  Chef-Crafted
                </h3>
                <p className="text-eatrite-text-secondary">
                  Professional chefs design every meal with premium ingredients and perfect nutrition balance.
                </p>
              </EatRiteCard>

              <EatRiteCard variant="flat" className="text-center p-8">
                <EatRiteIcons.Truck size="lg" color="gold" className="mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-eatrite-gold-400 mb-4">
                  Fresh Delivery
                </h3>
                <p className="text-eatrite-text-secondary">
                  Insulated packaging keeps meals fresh. Delivered weekly to your door, ready in 2 minutes.
                </p>
              </EatRiteCard>

              <EatRiteCard variant="flat" className="text-center p-8">
                <EatRiteIcons.Heart size="lg" color="gold" className="mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-eatrite-gold-400 mb-4">
                  Health First
                </h3>
                <p className="text-eatrite-text-secondary">
                  Nutritionist-approved recipes. Track calories, macros, and health goals effortlessly.
                </p>
              </EatRiteCard>
            </div>
          )}

          {activeTab === 'smart' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <AIPoweredMealRecommendations />
              <InteractiveMealBuilder />
            </div>
          )}

          {activeTab === 'premium' && (
            <div>
              <div className="text-center mb-8">
                <h3 className="font-serif text-2xl font-bold text-gradient-gold mb-4">
                  Premium Analytics & ROI Tools
                </h3>
                <p className="text-eatrite-text-secondary">
                  Advanced tools for serious health optimization
                </p>
              </div>
              <ROICalculator />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProgressiveFeatures