/**
 * Revolutionary "Living Food" Design System
 * The world's first adaptive, breathing food interface
 * Makes users say "WOW!" while building trust and appetite
 */

// 🌟 UNIQUE COLOR SYSTEM: Adaptive & Alive
export const livingFoodColors = {
  // Primary: Changes based on user's health goals (Dark Mode)
  adaptive: {
    // Energy focus: Warm, energizing
    energy: {
      primary: '#FF6B35', // Vibrant coral
      secondary: '#F7931E', // Sunset orange
      accent: '#FFD23F', // Golden yellow
      bg: '#1a1a1a', // Consistent dark background
      bgSecondary: '#2a2a2a', // Slightly lighter dark
    },
    // Wellness focus: Fresh, natural
    wellness: {
      primary: '#00C896', // Fresh mint
      secondary: '#05A777', // Deep green
      accent: '#40E0D0', // Turquoise
      bg: '#1a1a1a', // Consistent dark background
      bgSecondary: '#2a2a2a', // Slightly lighter dark
    },
    // Performance focus: Strong, confident
    performance: {
      primary: '#6C5CE7', // Royal purple
      secondary: '#A29BFE', // Light purple
      accent: '#00CEC9', // Cyan
      bg: '#1a1a1a', // Consistent dark background
      bgSecondary: '#2a2a2a', // Slightly lighter dark
    },
    // Balance focus: Harmonious, centered
    balance: {
      primary: '#FF7675', // Soft coral
      secondary: '#74B9FF', // Sky blue
      accent: '#FDCB6E', // Warm yellow
      bg: '#1a1a1a', // Consistent dark background
      bgSecondary: '#2a2a2a', // Slightly lighter dark
    },
  },

  // Supporting colors that work with all themes
  universal: {
    white: '#FFFFFF',
    cream: '#FFFEF7',
    lightGray: '#F8F9FA',
    mediumGray: '#6C757D',
    darkGray: '#495057',
    charcoal: '#2D3436',
    black: '#1A1A1A',

    // Nutrition colors (always consistent)
    protein: '#E17055', // Salmon pink
    carbs: '#FDCB6E', // Golden yellow
    fats: '#6C5CE7', // Purple
    fiber: '#00B894', // Green
    vitamins: '#A29BFE', // Light purple
  },
}

// 🎨 REVOLUTIONARY ANIMATIONS: Living & Breathing
export const livingAnimations = {
  // Food cards that pulse like heartbeat
  foodPulse: {
    name: 'foodPulse',
    keyframes: `
      0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 107, 53, 0.1); }
      50% { transform: scale(1.02); box-shadow: 0 0 30px rgba(255, 107, 53, 0.2); }
    `,
    duration: '3s',
    easing: 'ease-in-out',
    iteration: 'infinite',
  },

  // Ingredient particles that float
  ingredientFloat: {
    name: 'ingredientFloat',
    keyframes: `
      0% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
      33% { transform: translateY(-10px) rotate(120deg); opacity: 1; }
      66% { transform: translateY(-5px) rotate(240deg); opacity: 0.8; }
      100% { transform: translateY(0px) rotate(360deg); opacity: 0.7; }
    `,
    duration: '4s',
    easing: 'ease-in-out',
    iteration: 'infinite',
  },

  // Nutrition data that flows
  nutritionFlow: {
    name: 'nutritionFlow',
    keyframes: `
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    `,
    duration: '2s',
    easing: 'ease-in-out',
    iteration: 'infinite',
  },

  // Color transitions based on health goals
  healthShift: {
    name: 'healthShift',
    keyframes: `
      0% { filter: hue-rotate(0deg) saturate(1); }
      25% { filter: hue-rotate(90deg) saturate(1.1); }
      50% { filter: hue-rotate(180deg) saturate(1.2); }
      75% { filter: hue-rotate(270deg) saturate(1.1); }
      100% { filter: hue-rotate(360deg) saturate(1); }
    `,
    duration: '10s',
    easing: 'linear',
    iteration: 'infinite',
  },
}

// 🍃 UNIQUE TYPOGRAPHY: Organic & Flowing
export const livingTypography = {
  // Primary font: Modern but warm
  primary: '"Poppins", -apple-system, BlinkMacSystemFont, sans-serif',

  // Secondary font: Clean and scientific
  secondary: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',

  // Accent font: Handwritten for personal touch
  accent: '"Caveat", cursive',

  // Weights that feel alive
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Sizes that create rhythm
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    hero: '4rem',
  },
}

// 🎭 MICRO-INTERACTIONS: Delightful Surprises
export const livingInteractions = {
  // Hover effects that surprise
  surpriseHover: {
    scale: 1.05,
    rotate: 2,
    shadow: '0 10px 30px rgba(0,0,0,0.1)',
    duration: '0.3s',
  },

  // Click effects that satisfy
  satisfyingClick: {
    scale: 0.95,
    duration: '0.1s',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Loading states that entertain
  entertainingLoad: {
    shimmer:
      'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    duration: '1.5s',
  },
}

// 🌊 LAYOUT SYSTEM: Flowing & Organic
export const livingLayout = {
  // Organic spacing that feels natural
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
    '4xl': '6rem', // 96px
  },

  // Radius that flows
  radius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '50%',
    organic: '30% 70% 70% 30% / 30% 30% 70% 70%', // Unique organic shapes
  },

  // Shadows that have depth
  shadows: {
    soft: '0 2px 15px rgba(0,0,0,0.08)',
    medium: '0 4px 25px rgba(0,0,0,0.12)',
    strong: '0 8px 40px rgba(0,0,0,0.16)',
    glow: '0 0 30px rgba(255, 107, 53, 0.2)',
  },
}

export default {
  colors: livingFoodColors,
  animations: livingAnimations,
  typography: livingTypography,
  interactions: livingInteractions,
  layout: livingLayout,
}
