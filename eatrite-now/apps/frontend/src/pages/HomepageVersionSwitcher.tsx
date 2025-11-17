/**
 * Homepage Version Switcher - Easy way to test different approaches
 */

import { useState } from 'react'
import { EatRiteButton } from '../components/ui/Button/EatRiteButton'
import EatRiteIcons from '../components/icons/EatRiteIcons'

// Import all versions
// import OptimizedHomePage from './OptimizedHomePage' // Removed
import HomePage from './HomePage'
import { RevolutionaryHomePage } from './RevolutionaryHomePage'

type HomepageVersion = 'optimized' | 'original' | 'revolutionary'

const HomepageVersionSwitcher = () => {
  const [version, setVersion] = useState<HomepageVersion>('revolutionary')

  return (
    <div className="min-h-screen">
      {/* Version Switcher Controls */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
        <div className="bg-eatrite-black-800 rounded-lg p-3 border border-eatrite-gold-400">
          <div className="text-xs text-eatrite-text-tertiary mb-2 text-center">
            Homepage Version
          </div>

          <div className="flex flex-col gap-2 min-w-[150px]">
            <EatRiteButton
              variant={version === 'optimized' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setVersion('optimized')}
              leftIcon={<EatRiteIcons.Target size="sm" />}
            >
              Optimized
            </EatRiteButton>

            <EatRiteButton
              variant={version === 'original' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setVersion('original')}
              leftIcon={<EatRiteIcons.Star size="sm" />}
            >
              Original
            </EatRiteButton>

            <EatRiteButton
              variant={version === 'revolutionary' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setVersion('revolutionary')}
              leftIcon={<EatRiteIcons.Heart size="sm" />}
            >
              Revolutionary
            </EatRiteButton>
          </div>

          {/* Version Info */}
          <div className="mt-3 pt-3 border-t border-eatrite-black-600">
            <div className="text-xs text-eatrite-text-tertiary">
              {version === 'optimized' ? (
                <div>
                  <div className="font-medium text-eatrite-gold-400 mb-1">
                    Conversion Focused
                  </div>
                  <div>• Simplified hero</div>
                  <div>• Early social proof</div>
                  <div>• Progressive features</div>
                  <div>• Mobile optimized</div>
                </div>
              ) : version === 'revolutionary' ? (
                <div>
                  <div className="font-medium text-eatrite-gold-400 mb-1">
                    Living Food Interface
                  </div>
                  <div>• Adaptive colors</div>
                  <div>• Breathing animations</div>
                  <div>• AI personalization</div>
                  <div>• Market disrupting</div>
                </div>
              ) : (
                <div>
                  <div className="font-medium text-eatrite-gold-400 mb-1">
                    Feature Rich
                  </div>
                  <div>• Comprehensive features</div>
                  <div>• Advanced tools</div>
                  <div>• Premium aesthetics</div>
                  <div>• Full functionality</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Render Selected Version */}
      {version === 'optimized' ? (
        <HomePage />
      ) : version === 'revolutionary' ? (
        <RevolutionaryHomePage />
      ) : (
        <HomePage />
      )}
    </div>
  )
}

export default HomepageVersionSwitcher
