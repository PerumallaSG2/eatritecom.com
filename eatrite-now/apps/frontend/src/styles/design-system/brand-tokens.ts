/**
 * EatRite Premium Brand Design System
 * Luxury gold-on-dark-green aesthetic matching the EatRite logo
 * Premium, elegant, minimal, healthy brand identity
 */

// 🎨 BRAND COLOR PALETTE - Directly from EatRite Logo
export const eatRiteBrandColors = {
  // Primary Brand Colors
  primary: {
    gold: '#D4B46A', // Luxury metallic gold tone (primary accent)
    darkGreen: '#0F2B1E', // Deep forest green (main background)
    softBlack: '#0A0A0A', // Soft black for contrast
    offWhite: '#F5F2E8', // Off-white for text and highlights
  },

  // Extended Palette for UI Components
  surface: {
    primary: '#0F2B1E', // Main dark green background
    secondary: '#152D22', // Slightly lighter green for cards
    tertiary: '#1A3327', // Elevated surfaces
    overlay: '#0A0A0A', // Modal/overlay backgrounds
    accent: '#D4B46A', // Gold accents and highlights
  },

  text: {
    primary: '#F5F2E8', // Primary text (off-white)
    secondary: '#E0DDD5', // Secondary text (dimmed off-white)
    tertiary: '#B8B5AD', // Tertiary text (more dimmed)
    accent: '#D4B46A', // Gold accent text
    inverse: '#0A0A0A', // Text on light backgrounds
  },

  border: {
    primary: '#D4B46A', // Gold borders
    secondary: '#2A4235', // Subtle green borders
    tertiary: '#1A3327', // Very subtle borders
    focus: '#E6CD7A', // Gold focus states (lighter)
  },

  button: {
    primary: {
      background: '#D4B46A',
      text: '#0A0A0A',
      hover: '#E6CD7A',
      active: '#C4A55A',
    },
    secondary: {
      background: 'transparent',
      text: '#D4B46A',
      border: '#D4B46A',
      hover: '#1A3327',
    },
    tertiary: {
      background: '#152D22',
      text: '#F5F2E8',
      hover: '#1A3327',
    },
  },

  input: {
    background: '#152D22',
    text: '#F5F2E8',
    placeholder: '#B8B5AD',
    border: '#2A4235',
    borderFocus: '#D4B46A',
    borderError: '#CC4444',
  },

  status: {
    success: '#4A7C59', // Muted green success
    warning: '#D4B46A', // Gold warning (brand color)
    error: '#CC4444', // Muted red error
    info: '#5A8A7A', // Muted teal info
  },
}

// 📝 TYPOGRAPHY SCALE - Luxury Typography System
export const eatRiteTypography = {
  fontFamilies: {
    heading: '"Playfair Display", "Cormorant Garamond", Georgia, serif',
    body: '"Inter", "Nunito", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", Monaco, monospace',
  },

  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem', // 72px
  },

  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
}

// 🎯 SPACING SCALE - Premium Layout Spacing
export const eatRiteSpacing = {
  px: '1px',
  0: '0',
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
  40: '10rem', // 160px
  48: '12rem', // 192px
  56: '14rem', // 224px
  64: '16rem', // 256px
}

// 🔲 BORDER RADIUS - Refined Corner Styles
export const eatRiteBorderRadius = {
  none: '0',
  sm: '0.375rem', // 6px
  base: '0.5rem', // 8px
  md: '0.625rem', // 10px
  lg: '0.875rem', // 14px
  xl: '1rem', // 16px
  '2xl': '1.25rem', // 20px
  '3xl': '1.5rem', // 24px
  full: '9999px',
}

// 🌟 SHADOWS - Premium Depth & Elevation
export const eatRiteShadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',

  // Premium Gold Glows
  goldGlow: '0 0 20px rgba(212, 180, 106, 0.3)',
  goldGlowMd: '0 0 30px rgba(212, 180, 106, 0.4)',
  goldGlowLg: '0 0 40px rgba(212, 180, 106, 0.5)',
}

// 🎭 COMPONENT TOKENS - Specific Component Styling
export const eatRiteComponents = {
  button: {
    height: {
      sm: '2.25rem', // 36px
      md: '2.75rem', // 44px
      lg: '3.25rem', // 52px
      xl: '3.75rem', // 60px
    },
    padding: {
      sm: '0.5rem 1rem',
      md: '0.75rem 1.5rem',
      lg: '1rem 2rem',
      xl: '1.25rem 2.5rem',
    },
    borderRadius: eatRiteBorderRadius.lg,
    fontWeight: eatRiteTypography.fontWeight.semibold,
  },

  card: {
    borderRadius: eatRiteBorderRadius.xl,
    padding: eatRiteSpacing[6],
    shadow: eatRiteShadows.lg,
    border: `1px solid ${eatRiteBrandColors.border.secondary}`,
  },

  input: {
    height: '2.75rem',
    padding: '0.75rem 1rem',
    borderRadius: eatRiteBorderRadius.md,
    fontSize: eatRiteTypography.fontSize.base,
    fontWeight: eatRiteTypography.fontWeight.normal,
  },

  navbar: {
    height: '4rem',
    padding: `0 ${eatRiteSpacing[6]}`,
    background: eatRiteBrandColors.primary.darkGreen,
    shadow: eatRiteShadows.md,
  },
}

// 🎨 ANIMATION & TRANSITIONS - Smooth Premium Interactions
export const eatRiteAnimations = {
  transition: {
    fast: '150ms ease',
    base: '200ms ease',
    slow: '300ms ease',
    slower: '500ms ease',
  },

  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    premium: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smooth premium feel
  },

  keyframes: {
    fadeIn: 'fadeIn 0.3s ease-in-out',
    slideUp: 'slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    goldPulse: 'goldPulse 2s ease-in-out infinite',
    gentleFloat: 'gentleFloat 3s ease-in-out infinite',
  },
}

// Export complete brand system
export const eatRiteBrandSystem = {
  colors: eatRiteBrandColors,
  typography: eatRiteTypography,
  spacing: eatRiteSpacing,
  borderRadius: eatRiteBorderRadius,
  shadows: eatRiteShadows,
  components: eatRiteComponents,
  animations: eatRiteAnimations,
}

export default eatRiteBrandSystem
