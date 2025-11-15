/**
 * A/B Testing Variants - Test Different Approaches
 */

import { useState, useEffect } from 'react'

// A/B Testing Hook
export const useABTest = (testName: string, variants: string[]) => {
  const [variant, setVariant] = useState<string>(variants[0])
  
  useEffect(() => {
    // Get or set variant from localStorage
    const savedVariant = localStorage.getItem(`ab_test_${testName}`)
    
    if (savedVariant && variants.includes(savedVariant)) {
      setVariant(savedVariant)
    } else {
      // Random assignment
      const randomVariant = variants[Math.floor(Math.random() * variants.length)]
      setVariant(randomVariant)
      localStorage.setItem(`ab_test_${testName}`, randomVariant)
    }
  }, [testName, variants])
  
  return variant
}

// A/B Test Configuration
export const abTestConfig = {
  // Test 1: Color Intensity
  colorIntensity: {
    variants: ['luxury', 'balanced', 'minimal'],
    description: 'Test different levels of gold usage'
  },
  
  // Test 2: Hero Message
  heroMessage: {
    variants: ['premium', 'simple', 'benefit'],
    description: 'Test different value propositions'
  },
  
  // Test 3: Feature Discovery
  featureDiscovery: {
    variants: ['progressive', 'immediate', 'hidden'],
    description: 'Test how to reveal advanced features'
  }
}

// Analytics tracking
export const trackABTestEvent = (testName: string, variant: string, event: string, value?: any) => {
  // Integration with analytics (Google Analytics, Mixpanel, etc.)
  console.log(`AB Test: ${testName} | Variant: ${variant} | Event: ${event}`, value)
  
  // Example: Send to analytics service
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, {
      ab_test_name: testName,
      ab_test_variant: variant,
      value: value
    })
  }
}

export { useABTest as default }