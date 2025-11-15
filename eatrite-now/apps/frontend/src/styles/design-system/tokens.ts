/**
 * EatRite Design System - Design Tokens
 * Luxury brand design system with dark theme and gold accents
 * Based on the 3-leaf logo: elegant, premium, health-focused
 */

export const designTokens = {
  // === COLORS ===
  colors: {
    // Primary Gold Palette (main brand color)
    primary: {
      50: '#fdfbf7',
      100: '#fbf5e8', 
      200: '#f6e6c4',
      300: '#f0d090',
      400: '#e8b85c',
      500: '#d4a047', // Main brand gold
      600: '#c18d39',
      700: '#a1742f',
      800: '#85602c',
      900: '#6f5028',
      950: '#3f2c14'
    },

    // Background System (Dark theme)
    background: {
      primary: '#000000',    // Pure black
      secondary: '#0a0a0a',  // Slightly elevated
      tertiary: '#111111',   // Cards and surfaces
      elevated: '#1a1a1a',   // Modal/drawer backgrounds
      overlay: 'rgba(0, 0, 0, 0.85)' // Modal overlays
    },

    // Surface Colors (for cards, inputs, etc.)
    surface: {
      primary: '#1a1a1a',
      secondary: '#262626', 
      tertiary: '#333333',
      border: '#404040',
      divider: '#2a2a2a',
      hover: '#404040'
    },

    // Text System
    text: {
      primary: '#ffffff',     // Main text
      secondary: '#e5e5e5',   // Secondary text
      tertiary: '#a3a3a3',    // Muted text
      quaternary: '#737373',  // Disabled text
      inverse: '#000000',     // Text on gold backgrounds
      placeholder: '#525252'  // Placeholder text
    },

    // Semantic Colors (using gold theme)
    semantic: {
      success: {
        main: '#d4a047',
        light: '#f0d090', 
        dark: '#85602c',
        bg: '#5c3b14'
      },
      warning: {
        main: '#f4c430',
        light: '#f9d672',
        dark: '#c18d39',
        bg: '#7a4f1a'
      },
      error: {
        main: '#737373',
        light: '#a3a3a3',
        dark: '#404040', 
        bg: '#262626'
      },
      info: {
        main: '#e8b85c',
        light: '#f0d090',
        dark: '#a1742f',
        bg: '#3f2c14'
      }
    },

    // Accent Colors
    accent: {
      light: '#f9d672',
      medium: '#d4a047',
      dark: '#96661f'
    },

    // Interactive States
    interactive: {
      hover: '#404040',
      pressed: '#333333',
      focus: 'rgba(212, 160, 71, 0.2)',
      disabled: '#262626'
    }
  },

  // === TYPOGRAPHY ===
  typography: {
    // Font Families
    fontFamily: {
      serif: 'Georgia, "Times New Roman", serif',
      sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      mono: '"JetBrains Mono", Consolas, Monaco, monospace'
    },

    // Font Weights
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800
    },

    // Font Sizes (with line heights)
    fontSize: {
      xs: {
        size: '0.75rem',    // 12px
        lineHeight: '1rem'   // 16px
      },
      sm: {
        size: '0.875rem',   // 14px  
        lineHeight: '1.25rem' // 20px
      },
      base: {
        size: '1rem',       // 16px
        lineHeight: '1.5rem' // 24px
      },
      lg: {
        size: '1.125rem',   // 18px
        lineHeight: '1.75rem' // 28px
      },
      xl: {
        size: '1.25rem',    // 20px
        lineHeight: '1.75rem' // 28px
      },
      '2xl': {
        size: '1.5rem',     // 24px
        lineHeight: '2rem'   // 32px
      },
      '3xl': {
        size: '1.875rem',   // 30px
        lineHeight: '2.25rem' // 36px
      },
      '4xl': {
        size: '2.25rem',    // 36px
        lineHeight: '2.5rem'  // 40px
      },
      '5xl': {
        size: '3rem',       // 48px
        lineHeight: '1.2'
      },
      '6xl': {
        size: '3.75rem',    // 60px
        lineHeight: '1.1'
      },
      '7xl': {
        size: '4.5rem',     // 72px
        lineHeight: '1'
      }
    },

    // Heading Styles
    headings: {
      h1: {
        fontFamily: 'serif',
        fontSize: '5xl',
        fontWeight: 'bold',
        letterSpacing: '-0.025em',
        color: 'gradient' // Will use gold gradient
      },
      h2: {
        fontFamily: 'serif', 
        fontSize: '4xl',
        fontWeight: 'bold',
        letterSpacing: '-0.025em',
        color: 'primary.400'
      },
      h3: {
        fontFamily: 'serif',
        fontSize: '3xl', 
        fontWeight: 'semiBold',
        letterSpacing: '-0.025em',
        color: 'primary.500'
      },
      h4: {
        fontFamily: 'serif',
        fontSize: '2xl',
        fontWeight: 'semiBold',
        color: 'text.secondary'
      },
      h5: {
        fontFamily: 'sans',
        fontSize: 'xl',
        fontWeight: 'semiBold', 
        color: 'text.secondary'
      },
      h6: {
        fontFamily: 'sans',
        fontSize: 'lg',
        fontWeight: 'medium',
        color: 'text.tertiary'
      }
    }
  },

  // === SPACING ===
  spacing: {
    0: '0rem',
    px: '1px',
    0.5: '0.125rem',  // 2px
    1: '0.25rem',     // 4px  
    1.5: '0.375rem',  // 6px
    2: '0.5rem',      // 8px
    2.5: '0.625rem',  // 10px
    3: '0.75rem',     // 12px
    3.5: '0.875rem',  // 14px
    4: '1rem',        // 16px
    5: '1.25rem',     // 20px
    6: '1.5rem',      // 24px
    7: '1.75rem',     // 28px
    8: '2rem',        // 32px
    9: '2.25rem',     // 36px
    10: '2.5rem',     // 40px
    12: '3rem',       // 48px
    14: '3.5rem',     // 56px
    16: '4rem',       // 64px
    20: '5rem',       // 80px
    24: '6rem',       // 96px
    28: '7rem',       // 112px
    32: '8rem',       // 128px
    36: '9rem',       // 144px
    40: '10rem',      // 160px
    48: '12rem',      // 192px
    56: '14rem',      // 224px
    64: '16rem'       // 256px
  },

  // === BORDER RADIUS ===
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px'
  },

  // === SHADOWS ===
  boxShadow: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.7), 0 1px 2px 0 rgba(0, 0, 0, 0.6)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.7), 0 2px 4px -1px rgba(0, 0, 0, 0.6)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.8), 0 4px 6px -2px rgba(0, 0, 0, 0.7)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.7)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)',
    
    // Brand shadows
    gold: '0 0 20px rgba(212, 160, 71, 0.3), 0 0 40px rgba(212, 160, 71, 0.1)',
    goldSm: '0 0 10px rgba(212, 160, 71, 0.4)',
    goldLg: '0 0 30px rgba(212, 160, 71, 0.4), 0 0 60px rgba(212, 160, 71, 0.15)'
  },

  // === GRADIENTS ===
  gradients: {
    gold: 'linear-gradient(135deg, #f4d03f 0%, #d4a047 50%, #b8903d 100%)',
    goldVertical: 'linear-gradient(180deg, #f4d03f 0%, #d4a047 100%)', 
    dark: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
    surface: 'linear-gradient(135deg, #1a1a1a 0%, #262626 100%)',
    overlay: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)',
    
    // Subtle gradients for surfaces
    cardHover: 'linear-gradient(135deg, #262626 0%, #333333 100%)',
    buttonHover: 'linear-gradient(135deg, #f9d672 0%, #e8b85c 50%, #d4a047 100%)'
  },

  // === TRANSITIONS ===
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)', 
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Specific easing curves
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },

  // === BREAKPOINTS ===
  breakpoints: {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // === Z-INDEX ===
  zIndex: {
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1020,
    banner: 1030,
    overlay: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
    max: 2147483647
  }
} as const;

// Export individual token categories for easier consumption
export const colors = designTokens.colors;
export const typography = designTokens.typography;
export const spacing = designTokens.spacing;
export const borderRadius = designTokens.borderRadius;
export const boxShadow = designTokens.boxShadow;
export const gradients = designTokens.gradients;
export const transitions = designTokens.transitions;
export const breakpoints = designTokens.breakpoints;
export const zIndex = designTokens.zIndex;

// Type definitions for better TypeScript support
export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type BreakpointToken = keyof typeof breakpoints;