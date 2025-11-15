/**
 * EatRite Brand Design System - Pure Black & Gold Luxury Theme
 * Elegant, minimal aesthetic matching the 3-leaf logo
 * Gold metallic accents (#D4A047) on deep black backgrounds
 * Optional organic dark green accent (#042F1A) 
 */

export const eatRiteTheme = {
  // === COLORS ===
  colors: {
    // Primary EatRite Gold - Sophisticated and Premium
    eatrite: {
      gold: {
        50: '#fefdf8',
        100: '#fef7e0',
        200: '#fdecc4',
        300: '#f9d672',
        400: '#f4c430',
        500: '#d4a047', // Main brand gold
        600: '#b8832d',
        700: '#96661f',
        800: '#7a4f1a',
        900: '#5c3b14',
      },
      
      // Deep Blacks - Ultra Premium Feel
      black: {
        pure: '#000000',    // True black for maximum contrast
        950: '#0a0a0a',     // Near black
        900: '#171717',     // Charcoal
        850: '#262626',     // Dark grey
        800: '#404040',     // Medium dark grey
        700: '#525252',     // Medium grey
        600: '#737373',     // Light grey
        500: '#a3a3a3',     // Very light grey
        400: '#d4d4d8',     // Lighter grey
        300: '#e4e4e7',     // Very light grey
      },
      
      // Optional Dark Green Accent (organic/natural)
      green: {
        50: '#ecfef6',
        100: '#d1fce6',
        200: '#a7f7d0',
        300: '#6eefb4',
        400: '#2fe091',
        500: '#0bc772',
        600: '#05a15b',
        700: '#087f4a',
        800: '#0c643d',
        900: '#042f1a', // Main dark green
        950: '#021c0f'
      },
    },

    // Primary Brand Colors (alias for easier access)
    primary: {
      50: '#fefdf8',
      100: '#fef7e0',
      200: '#fdecc4',
      300: '#f9d672',
      400: '#f4c430',
      500: '#d4a047', // Main brand gold
      600: '#b8832d',
      700: '#96661f',
      800: '#7a4f1a',
      900: '#5c3b14',
      950: '#3f2c14'
    },

    // Text Colors - Black & Gold Theme
    text: {
      primary: '#ffffff',      // Pure white text
      secondary: '#e5e5e5',    // Slightly muted white
      tertiary: '#a3a3a3',     // Gray text
      quaternary: '#737373',   // Darker gray
      inverse: '#000000',      // Black text on light backgrounds
      gold: '#d4a047',         // Gold text for accents
      goldLight: '#f4c430',    // Light gold text
      goldDark: '#b8832d',     // Dark gold text
    },

    // Surface & Border Colors - Pure Black Theme
    surface: {
      primary: '#000000',      // Pure black backgrounds
      secondary: '#0a0a0a',    // Near black surfaces
      tertiary: '#171717',     // Charcoal surfaces
      elevated: '#262626',     // Elevated surfaces
      card: '#171717',         // Card backgrounds
      border: '#404040',       // Subtle borders
      divider: '#2a2a2a',      // Divider lines
      gold: '#d4a047',         // Gold surface accents
      goldSubtle: '#5c3b14',   // Subtle gold backgrounds
    },

    // Status Colors - Black & Gold Theme Only
    status: {
      success: {
        primary: '#d4a047',     // Gold for success
        background: '#5c3b14',  // Dark gold background
        text: '#f4c430'         // Light gold text
      },
      warning: {
        primary: '#f4c430',     // Light gold for warnings
        background: '#7a4f1a',  // Medium gold background
        text: '#fef7e0'         // Very light gold text
      },
      error: {
        primary: '#737373',     // Gray for errors (no red)
        background: '#262626',  // Dark gray background
        text: '#a3a3a3'         // Light gray text
      },
      info: {
        primary: '#d4a047',     // Gold for info
        background: '#171717',  // Near black background
        text: '#f9d672'         // Light gold text
      }
    }
  },

  // === TYPOGRAPHY ===
  typography: {
    // Font Families
    fonts: {
      serif: 'Georgia, "Times New Roman", serif',     // For headings
      sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', // For body
      mono: 'JetBrains Mono, Consolas, Monaco, monospace' // For code
    },

    // Font Sizes & Line Heights
    sizes: {
      xs: { size: '0.75rem', lineHeight: '1rem' },     // 12px
      sm: { size: '0.875rem', lineHeight: '1.25rem' }, // 14px
      base: { size: '1rem', lineHeight: '1.5rem' },    // 16px
      lg: { size: '1.125rem', lineHeight: '1.75rem' }, // 18px
      xl: { size: '1.25rem', lineHeight: '1.75rem' },  // 20px
      '2xl': { size: '1.5rem', lineHeight: '2rem' },   // 24px
      '3xl': { size: '1.875rem', lineHeight: '2.25rem' }, // 30px
      '4xl': { size: '2.25rem', lineHeight: '2.5rem' },   // 36px
      '5xl': { size: '3rem', lineHeight: '1' },           // 48px
      '6xl': { size: '3.75rem', lineHeight: '1' },        // 60px
      '7xl': { size: '4.5rem', lineHeight: '1' },         // 72px
      '8xl': { size: '6rem', lineHeight: '1' }            // 96px
    },

    // Font Weights
    weights: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    },

    // Letter Spacing
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },

  // === SPACING & LAYOUT ===
  spacing: {
    0: '0',
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
    32: '8rem',      // 128px
    40: '10rem',     // 160px
    48: '12rem',     // 192px
    56: '14rem',     // 224px
    64: '16rem'      // 256px
  },

  // === BORDER RADIUS ===
  borderRadius: {
    none: '0',
    sm: '0.125rem',    // 2px
    base: '0.25rem',   // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px'
  },

  // === SHADOWS ===
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.7), 0 1px 2px 0 rgba(0, 0, 0, 0.6)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.7), 0 2px 4px -1px rgba(0, 0, 0, 0.6)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.8), 0 4px 6px -2px rgba(0, 0, 0, 0.7)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.7)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)',
    // Gold glow shadows for premium elements
    goldGlow: '0 0 20px rgba(212, 160, 71, 0.3), 0 0 40px rgba(212, 160, 71, 0.1)',
    goldGlowSm: '0 0 10px rgba(212, 160, 71, 0.4)'
  },

  // === GRADIENTS - Black & Gold Only ===
  gradients: {
    // Gold gradients (from logo)
    gold: 'linear-gradient(135deg, #f4c430 0%, #d4a047 50%, #b8832d 100%)',
    goldSubtle: 'linear-gradient(135deg, #f4c43020 0%, #d4a04720 50%, #b8832d20 100%)',
    goldVertical: 'linear-gradient(180deg, #f4c430 0%, #d4a047 100%)',
    goldRadial: 'radial-gradient(circle at center, #f4c430 0%, #d4a047 100%)',
    goldText: 'linear-gradient(135deg, #f4c430 0%, #d4a047 100%)',
    
    // Black gradients
    blackVertical: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
    blackRadial: 'radial-gradient(circle at center, #171717 0%, #000000 100%)',
    blackToGold: 'linear-gradient(135deg, #000000 0%, #171717 50%, #d4a047 100%)',
    blackCard: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
    
    // Surface gradients
    surface: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
    surfaceElevated: 'linear-gradient(135deg, #0a0a0a 0%, #171717 100%)',
    surfaceCard: 'linear-gradient(145deg, #171717 0%, #000000 100%)',
    
    // Luxury background gradients
    hero: 'linear-gradient(135deg, #000000 0%, #171717 50%, #0a0a0a 100%)',
    overlay: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)'
  },

  // === ANIMATION ===
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },

  // === BREAKPOINTS ===
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
} as const;

// === TYPE DEFINITIONS ===
export type EatRiteTheme = typeof eatRiteTheme;
export type ColorPalette = typeof eatRiteTheme.colors;
export type Typography = typeof eatRiteTheme.typography;

export default eatRiteTheme;