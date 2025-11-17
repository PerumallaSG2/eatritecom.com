/**
 * Balanced Color Tokens - More Accessible Luxury
 */

// More balanced gold usage - use sparingly for maximum impact
export const balancedDesignTokens = {
  // Primary palette - more neutral
  colors: {
    primary: {
      50: '#FFFBF0', // Very light cream
      100: '#FFF7E6', // Light cream
      200: '#FFEFCC', // Soft cream
      300: '#FFE4B3', // Light gold
      400: '#D4A047', // Core gold (use sparingly)
      500: '#B8903D', // Medium gold
      600: '#9C7A33', // Dark gold
      700: '#806429', // Darker gold
      800: '#644E1F', // Very dark gold
      900: '#483815', // Deep gold
    },

    // More neutral grays for better readability
    neutral: {
      50: '#F8F9FA', // Almost white
      100: '#E9ECEF', // Light gray
      200: '#DEE2E6', // Medium light gray
      300: '#CED4DA', // Medium gray
      400: '#ADB5BD', // Medium dark gray
      500: '#6C757D', // Gray
      600: '#495057', // Dark gray
      700: '#343A40', // Very dark gray
      800: '#212529', // Almost black
      900: '#000000', // Pure black
    },
  },

  // Use gold only for key interactions
  semanticColors: {
    accent: '#D4A047', // Gold for CTAs only
    accentHover: '#B8903D', // Darker gold for hover
    text: {
      primary: '#F8F9FA', // High contrast white
      secondary: '#DEE2E6', // Medium gray
      tertiary: '#ADB5BD', // Lighter gray
      inverse: '#212529', // Dark text for light backgrounds
    },
    background: {
      primary: '#000000', // Pure black
      secondary: '#212529', // Dark gray
      tertiary: '#343A40', // Medium dark gray
      surface: '#495057', // Card backgrounds
    },
  },
}

// Usage guidelines for balanced design
export const goldUsageGuidelines = {
  // Use gold ONLY for:
  primary: [
    'Primary CTA buttons',
    'Brand logo',
    'Key hover states',
    'Success states',
    'Premium badges',
  ],

  // Use neutral grays for:
  secondary: [
    'Body text',
    'Secondary buttons',
    'Card backgrounds',
    'Navigation elements',
    'Form inputs',
  ],

  // Avoid gold on:
  avoid: [
    'Large background areas',
    'All text content',
    'Multiple elements in same section',
    'Secondary UI elements',
  ],
}

export default balancedDesignTokens
