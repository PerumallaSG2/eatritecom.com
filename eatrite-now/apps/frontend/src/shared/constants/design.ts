/**
 * EatRite Enterprise Design System
 * Fortune 500-Grade B2B Design Constants
 * 
 * Design Principles:
 * - Conservative and professional
 * - Trust-building through predictability
 * - No consumer marketing aesthetics
 * - CFO/CHRO decision-maker focused
 */

// ============================================================================
// BRAND COLORS (SINGLE PRIMARY + GRAYSCALE)
// ============================================================================

export const COLORS = {
  // Primary Brand Color - Professional Forest Green
  primary: {
    50: '#f0f7f4',
    100: '#d9ede3',
    200: '#b6dcc9',
    300: '#88c5a8',
    400: '#5aa885',
    500: '#3d8f6a', // Primary brand color
    600: '#2e7355',
    700: '#265c46',
    800: '#214a39',
    900: '#1d3d30',
  },

  // Grayscale
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Functional Colors (minimal, professional)
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Background
  background: '#ffffff',
  surface: '#f9fafb',
  border: '#e5e7eb',
} as const

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const TYPOGRAPHY = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"SF Mono", Monaco, "Cascadia Code", "Courier New", monospace',
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const

// ============================================================================
// SPACING
// ============================================================================

export const SPACING = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
} as const

// ============================================================================
// LAYOUT
// ============================================================================

export const LAYOUT = {
  maxWidth: '1320px',
  sidebarWidth: '240px',
  headerHeight: '64px',
  gridColumns: 12,
  gutter: '24px',
} as const

// ============================================================================
// BORDER RADIUS (MINIMAL)
// ============================================================================

export const RADIUS = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  full: '9999px',
} as const

// ============================================================================
// SHADOWS (SUBTLE)
// ============================================================================

export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
} as const

// ============================================================================
// ANIMATION (MINIMAL - STATE CHANGES ONLY)
// ============================================================================

export const ANIMATION = {
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
  },
} as const

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// ============================================================================
// Z-INDEX
// ============================================================================

export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const
