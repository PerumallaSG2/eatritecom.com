// EatRite Premium Design System Tokens
// Inspired by Apple + Stripe + WHOOP + Calm aesthetics

export const designTokens = {
  // Color Palette - Premium & Wellness Focused
  colors: {
    // Primary Brand Colors
    primary: {
      50: '#f0f9f4', // Lightest green
      100: '#dcf2e3', // Light green
      500: '#10b981', // Main green (health/wellness)
      600: '#059669', // Darker green
      900: '#064e3b', // Deepest green
    },

    // Accent Colors
    accent: {
      gold: {
        50: '#fffbeb',
        100: '#fef3c7',
        400: '#fbbf24', // Warm gold
        500: '#f59e0b', // Main gold
        600: '#d97706', // Deeper gold
      },
    },

    // Neutral Palette
    neutral: {
      white: '#ffffff',
      offWhite: '#fefefe',
      gray: {
        25: '#fcfcfd', // Lightest background
        50: '#f9fafb', // Card backgrounds
        100: '#f3f4f6', // Subtle borders
        200: '#e5e7eb', // Light borders
        300: '#d1d5db', // Medium borders
        400: '#9ca3af', // Disabled text
        500: '#6b7280', // Secondary text
        600: '#4b5563', // Primary text
        700: '#374151', // Dark text
        800: '#1f2937', // Heading text
        900: '#111827', // Darkest text
      },
    },

    // Semantic Colors
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },

  // Typography Scale
  typography: {
    fontFamily: {
      sans: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'system-ui',
        'sans-serif',
      ],
      display: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
    },

    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
      base: ['1rem', { lineHeight: '1.5rem' }], // 16px
      lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
      xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
      '5xl': ['3rem', { lineHeight: '1' }], // 48px
      '6xl': ['3.75rem', { lineHeight: '1' }], // 60px
    },

    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  // Spacing Scale (8pt grid system)
  spacing: {
    px: '1px',
    0.5: '0.125rem', // 2px
    1: '0.25rem', // 4px
    2: '0.5rem', // 8px
    3: '0.75rem', // 12px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    8: '2rem', // 32px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
    32: '8rem', // 128px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.375rem', // 6px
    DEFAULT: '0.5rem', // 8px
    md: '0.75rem', // 12px
    lg: '1rem', // 16px
    xl: '1.5rem', // 24px
    '2xl': '2rem', // 32px
    full: '9999px',
  },

  // Shadows (Premium & Subtle)
  boxShadow: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    premium: '0 32px 64px -12px rgb(0 0 0 / 0.14)', // Custom premium shadow
    card: '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px 0 rgb(0 0 0 / 0.06)', // Subtle card shadow
  },

  // Animation & Transitions
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      premium: 'cubic-bezier(0.16, 1, 0.3, 1)', // Custom premium easing
    },
  },

  // Layout & Grid
  layout: {
    maxWidth: {
      xs: '20rem', // 320px
      sm: '24rem', // 384px
      md: '28rem', // 448px
      lg: '32rem', // 512px
      xl: '36rem', // 576px
      '2xl': '42rem', // 672px
      '3xl': '48rem', // 768px
      '4xl': '56rem', // 896px
      '5xl': '64rem', // 1024px
      '6xl': '72rem', // 1152px
      '7xl': '80rem', // 1280px
      full: '100%',
      screen: '100vw',
      container: '1200px', // Main container width
    },

    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },

  // Component Specific Tokens
  components: {
    card: {
      padding: '1.5rem', // 24px
      borderRadius: '1rem', // 16px
      shadow: 'card',
      background: 'white',
    },

    button: {
      height: {
        sm: '2rem', // 32px
        md: '2.75rem', // 44px
        lg: '3rem', // 48px
        xl: '3.5rem', // 56px
      },
      padding: {
        sm: '0.5rem 1rem',
        md: '0.75rem 1.5rem',
        lg: '1rem 2rem',
        xl: '1.25rem 2.5rem',
      },
    },

    input: {
      height: '2.75rem', // 44px - Touch friendly
      borderRadius: '0.75rem', // 12px
      padding: '0.75rem 1rem',
    },
  },
} as const

// CSS Custom Properties for Tailwind
export const cssVariables = `
  :root {
    /* Colors */
    --color-primary-50: 240 249 244;
    --color-primary-100: 220 242 227;
    --color-primary-500: 16 185 129;
    --color-primary-600: 5 150 105;
    --color-primary-900: 6 78 59;
    
    --color-gold-50: 255 251 235;
    --color-gold-100: 254 243 199;
    --color-gold-400: 251 191 36;
    --color-gold-500: 245 158 11;
    --color-gold-600: 217 119 6;
    
    /* Spacing */
    --spacing-card: 1.5rem;
    --spacing-section: 4rem;
    --spacing-container: 2rem;
    
    /* Borders */
    --border-radius-card: 1rem;
    --border-radius-button: 0.75rem;
    
    /* Shadows */
    --shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px 0 rgb(0 0 0 / 0.06);
    --shadow-premium: 0 32px 64px -12px rgb(0 0 0 / 0.14);
  }
`

export type DesignTokens = typeof designTokens
