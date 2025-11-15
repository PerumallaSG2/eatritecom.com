// Enhanced Visual Theme System
// This file contains improved color schemes, typography, and design tokens

export const enhancedTheme = {
  colors: {
    // Primary Brand Colors - Enhanced Green Palette
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',  // Main brand green
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16'
    },
    
    // Secondary Colors - Sophisticated Blue
    secondary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    },

    // Accent Colors - Warm Orange
    accent: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',  // Main accent color
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
      950: '#431407'
    },

    // Success Colors - Fresh Green
    success: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
      950: '#022c22'
    },

    // Warning Colors - Amber
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03'
    },

    // Error Colors - Red
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a'
    },

    // Neutral Colors - Sophisticated Grays
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a'
    }
  },

  typography: {
    fontFamilies: {
      display: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace']
    },

    fontSizes: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }]
    },

    fontWeights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    }
  },

  spacing: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem'
  },

  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    default: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },

  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000'
  },

  gradients: {
    primary: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    secondary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    accent: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    sunset: 'linear-gradient(135deg, #f97316 0%, #dc2626 50%, #be185d 100%)',
    ocean: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%)',
    forest: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
    aurora: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)'
  },

  animations: {
    duration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms'
    },
    
    timingFunction: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      'elastic': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }
  }
};

// Design Tokens for Common Patterns
export const designTokens = {
  // Button Styles
  button: {
    primary: `
      bg-gradient-to-r from-green-600 to-green-700 
      text-white font-semibold 
      shadow-lg shadow-green-600/25 
      hover:shadow-xl hover:shadow-green-600/30 
      hover:from-green-700 hover:to-green-800 
      transition-all duration-200 
      transform hover:scale-105 active:scale-95
    `,
    secondary: `
      bg-gradient-to-r from-gray-100 to-gray-200 
      text-gray-800 font-semibold 
      shadow-md hover:shadow-lg 
      hover:from-gray-200 hover:to-gray-300 
      transition-all duration-200 
      transform hover:scale-105 active:scale-95
    `,
    accent: `
      bg-gradient-to-r from-orange-500 to-orange-600 
      text-white font-semibold 
      shadow-lg shadow-orange-500/25 
      hover:shadow-xl hover:shadow-orange-500/30 
      hover:from-orange-600 hover:to-orange-700 
      transition-all duration-200 
      transform hover:scale-105 active:scale-95
    `
  },

  // Card Styles
  card: {
    default: `
      bg-white rounded-xl shadow-lg 
      hover:shadow-2xl 
      transition-all duration-300 
      transform hover:-translate-y-1
    `,
    featured: `
      bg-gradient-to-br from-white to-green-50 
      rounded-2xl shadow-xl 
      border border-green-100 
      hover:shadow-2xl hover:border-green-200 
      transition-all duration-300 
      transform hover:-translate-y-2
    `,
    glass: `
      bg-white/80 backdrop-blur-xl 
      rounded-2xl shadow-xl 
      border border-white/20 
      hover:bg-white/90 
      transition-all duration-300
    `
  },

  // Input Styles
  input: {
    default: `
      px-4 py-3 
      bg-white border border-gray-300 
      rounded-lg 
      focus:ring-2 focus:ring-green-500 focus:border-transparent 
      transition-all duration-200 
      placeholder-gray-400
    `,
    filled: `
      px-4 py-3 
      bg-gray-50 border-0 
      rounded-lg 
      focus:bg-white focus:ring-2 focus:ring-green-500 
      transition-all duration-200 
      placeholder-gray-400
    `
  },

  // Typography Styles
  typography: {
    heading: `
      font-bold tracking-tight 
      bg-gradient-to-r from-gray-900 to-gray-700 
      bg-clip-text text-transparent
    `,
    subheading: `
      font-semibold text-gray-700 
      leading-relaxed
    `,
    body: `
      text-gray-600 leading-relaxed
    `,
    caption: `
      text-sm text-gray-500 
      leading-normal
    `
  }
};

// Utility Functions for Theme
export const getColorValue = (colorPath: string) => {
  const keys = colorPath.split('.');
  let value: any = enhancedTheme.colors;
  
  for (const key of keys) {
    value = value[key];
    if (!value) return null;
  }
  
  return value;
};

export const createGradient = (gradientName: keyof typeof enhancedTheme.gradients) => {
  return enhancedTheme.gradients[gradientName];
};

export const getSpacing = (size: keyof typeof enhancedTheme.spacing) => {
  return enhancedTheme.spacing[size];
};

// CSS Variables for Dynamic Theming
export const cssVariables = `
  :root {
    --color-primary-50: ${enhancedTheme.colors.primary[50]};
    --color-primary-100: ${enhancedTheme.colors.primary[100]};
    --color-primary-200: ${enhancedTheme.colors.primary[200]};
    --color-primary-300: ${enhancedTheme.colors.primary[300]};
    --color-primary-400: ${enhancedTheme.colors.primary[400]};
    --color-primary-500: ${enhancedTheme.colors.primary[500]};
    --color-primary-600: ${enhancedTheme.colors.primary[600]};
    --color-primary-700: ${enhancedTheme.colors.primary[700]};
    --color-primary-800: ${enhancedTheme.colors.primary[800]};
    --color-primary-900: ${enhancedTheme.colors.primary[900]};
    --color-primary-950: ${enhancedTheme.colors.primary[950]};
    
    --gradient-primary: ${enhancedTheme.gradients.primary};
    --gradient-secondary: ${enhancedTheme.gradients.secondary};
    --gradient-accent: ${enhancedTheme.gradients.accent};
    --gradient-sunset: ${enhancedTheme.gradients.sunset};
    --gradient-ocean: ${enhancedTheme.gradients.ocean};
    --gradient-forest: ${enhancedTheme.gradients.forest};
    --gradient-aurora: ${enhancedTheme.gradients.aurora};
    
    --shadow-sm: ${enhancedTheme.shadows.sm};
    --shadow-default: ${enhancedTheme.shadows.default};
    --shadow-md: ${enhancedTheme.shadows.md};
    --shadow-lg: ${enhancedTheme.shadows.lg};
    --shadow-xl: ${enhancedTheme.shadows.xl};
    --shadow-2xl: ${enhancedTheme.shadows['2xl']};
  }
`;