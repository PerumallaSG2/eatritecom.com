/**
 * Balanced Design Tokens - Gold as Accent Only
 * More neutral approach for broader appeal while maintaining luxury feel
 */

// Use these classes in components for balanced gold usage
export const balancedClasses = {
  // Use gold ONLY for these elements
  goldAccent: {
    primaryButton: 'bg-eatrite-gold-400 hover:bg-eatrite-gold-500 text-black',
    brandLogo: 'text-eatrite-gold-400',
    successState: 'text-eatrite-gold-400 border-eatrite-gold-400',
    premiumBadge: 'bg-gradient-gold text-black',
    keyIcon: 'text-eatrite-gold-400',
    focusRing: 'ring-2 ring-eatrite-gold-400 ring-opacity-50'
  },

  // Use neutral grays for most UI elements
  neutralPrimary: {
    headings: 'text-white',
    bodyText: 'text-gray-200', 
    secondaryText: 'text-gray-400',
    tertiaryText: 'text-gray-500',
    cardBackground: 'bg-gray-800',
    borderColor: 'border-gray-600',
    hoverState: 'hover:bg-gray-700'
  },

  // Secondary buttons - no gold
  secondaryButton: 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-500',
  
  // Ghost buttons - minimal styling
  ghostButton: 'bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white',

  // Input fields - subtle gold only on focus
  inputField: 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-eatrite-gold-400 focus:ring-eatrite-gold-400',

  // Cards - neutral with optional gold accent
  card: {
    default: 'bg-gray-800 border border-gray-700',
    premium: 'bg-gray-800 border-2 border-eatrite-gold-400', // Gold border only for premium
    hover: 'hover:border-gray-600 transition-colors'
  }
}

// Usage guidelines for components
export const goldUsageRules = {
  // USE GOLD FOR (sparingly):
  allowGold: [
    'Primary CTA buttons (1-2 per page)',
    'EatRite logo and brand elements',
    'Success states and achievements', 
    'Premium badges and highlights',
    'Key interactive icons',
    'Focus states for accessibility'
  ],

  // USE NEUTRAL GRAYS FOR:
  useNeutral: [
    'All body text and headings',
    'Secondary and tertiary buttons',
    'Card backgrounds and borders', 
    'Navigation elements',
    'Form inputs (except focus state)',
    'General UI elements'
  ],

  // NEVER USE GOLD FOR:
  avoidGold: [
    'Large background areas',
    'All text content',
    'Multiple buttons in same section',
    'Decorative elements',
    'Secondary navigation'
  ]
}

export default balancedClasses