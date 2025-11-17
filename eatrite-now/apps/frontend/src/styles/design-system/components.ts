/**
 * EatRite Design System - Component Themes
 * Pre-defined component styling that matches the brand
 */

import { designTokens } from './tokens'

export const componentThemes = {
  // === BUTTON THEMES ===
  button: {
    // Base button styles
    base: {
      fontFamily: designTokens.typography.fontFamily.sans,
      fontWeight: designTokens.typography.fontWeight.semiBold,
      borderRadius: designTokens.borderRadius.lg,
      transition: designTokens.transitions.normal,
      cursor: 'pointer',
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      userSelect: 'none',
      outline: 'none',

      // Focus styles
      '&:focus-visible': {
        outline: `2px solid ${designTokens.colors.primary[500]}`,
        outlineOffset: '2px',
      },
    },

    // Size variants
    sizes: {
      sm: {
        fontSize: designTokens.typography.fontSize.sm.size,
        padding: `${designTokens.spacing[2]} ${designTokens.spacing[3]}`,
        minHeight: '2rem',
        gap: designTokens.spacing[1],
      },
      md: {
        fontSize: designTokens.typography.fontSize.base.size,
        padding: `${designTokens.spacing[3]} ${designTokens.spacing[6]}`,
        minHeight: '2.75rem',
        gap: designTokens.spacing[2],
      },
      lg: {
        fontSize: designTokens.typography.fontSize.lg.size,
        padding: `${designTokens.spacing[4]} ${designTokens.spacing[8]}`,
        minHeight: '3.25rem',
        gap: designTokens.spacing[2],
      },
    },

    // Style variants
    variants: {
      // Primary gold button
      primary: {
        background: designTokens.gradients.gold,
        color: designTokens.colors.text.inverse,
        boxShadow: designTokens.boxShadow.gold,

        '&:hover': {
          background: designTokens.gradients.buttonHover,
          transform: 'translateY(-2px)',
          boxShadow: `${designTokens.boxShadow.goldLg}, ${designTokens.boxShadow.lg}`,
        },

        '&:active': {
          transform: 'translateY(0)',
          boxShadow: designTokens.boxShadow.goldSm,
        },

        '&:disabled': {
          background: designTokens.colors.interactive.disabled,
          color: designTokens.colors.text.quaternary,
          boxShadow: 'none',
          cursor: 'not-allowed',
          transform: 'none',
        },
      },

      // Secondary outline button
      secondary: {
        background: 'transparent',
        color: designTokens.colors.primary[400],
        border: `2px solid ${designTokens.colors.primary[500]}`,

        '&:hover': {
          background: designTokens.colors.primary[500],
          color: designTokens.colors.text.inverse,
          borderColor: designTokens.colors.primary[400],
          boxShadow: designTokens.boxShadow.goldSm,
        },

        '&:active': {
          borderColor: designTokens.colors.primary[600],
          background: designTokens.colors.primary[600],
        },

        '&:disabled': {
          borderColor: designTokens.colors.interactive.disabled,
          color: designTokens.colors.text.quaternary,
          cursor: 'not-allowed',
        },
      },

      // Dark surface button
      dark: {
        background: designTokens.colors.surface.primary,
        color: designTokens.colors.text.primary,
        border: `1px solid ${designTokens.colors.surface.border}`,

        '&:hover': {
          background: designTokens.colors.surface.secondary,
          borderColor: designTokens.colors.surface.tertiary,
        },

        '&:active': {
          background: designTokens.colors.surface.tertiary,
        },

        '&:disabled': {
          background: designTokens.colors.interactive.disabled,
          borderColor: designTokens.colors.interactive.disabled,
          color: designTokens.colors.text.quaternary,
          cursor: 'not-allowed',
        },
      },

      // Ghost button
      ghost: {
        background: 'transparent',
        color: designTokens.colors.text.tertiary,

        '&:hover': {
          background: designTokens.colors.interactive.hover,
          color: designTokens.colors.text.secondary,
        },

        '&:active': {
          background: designTokens.colors.interactive.pressed,
        },
      },
    },
  },

  // === CARD THEMES ===
  card: {
    base: {
      background: designTokens.colors.surface.primary,
      border: `1px solid ${designTokens.colors.surface.border}`,
      borderRadius: designTokens.borderRadius['2xl'],
      padding: designTokens.spacing[6],
      boxShadow: designTokens.boxShadow.md,
      transition: designTokens.transitions.normal,
      overflow: 'hidden',
    },

    variants: {
      // Standard card
      default: {
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: designTokens.boxShadow.lg,
          borderColor: designTokens.colors.surface.tertiary,
        },
      },

      // Premium/featured card
      premium: {
        background: designTokens.gradients.surface,
        borderColor: designTokens.colors.primary[700],
        boxShadow: `${designTokens.boxShadow.lg}, 0 0 20px rgba(212, 160, 71, 0.1)`,

        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: `${designTokens.boxShadow.xl}, ${designTokens.boxShadow.goldSm}`,
        },
      },

      // Interactive card (clickable)
      interactive: {
        cursor: 'pointer',

        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: designTokens.boxShadow.lg,
          borderColor: designTokens.colors.primary[800],
        },

        '&:active': {
          transform: 'translateY(0)',
        },
      },

      // Flat card (no elevation)
      flat: {
        boxShadow: 'none',
        border: `1px solid ${designTokens.colors.surface.divider}`,

        '&:hover': {
          borderColor: designTokens.colors.surface.border,
        },
      },
    },
  },

  // === INPUT THEMES ===
  input: {
    base: {
      width: '100%',
      fontFamily: designTokens.typography.fontFamily.sans,
      fontSize: designTokens.typography.fontSize.base.size,
      lineHeight: designTokens.typography.fontSize.base.lineHeight,
      background: designTokens.colors.surface.primary,
      border: `1px solid ${designTokens.colors.surface.border}`,
      borderRadius: designTokens.borderRadius.md,
      color: designTokens.colors.text.primary,
      transition: designTokens.transitions.fast,
      outline: 'none',

      '&::placeholder': {
        color: designTokens.colors.text.placeholder,
      },

      '&:focus': {
        borderColor: designTokens.colors.primary[500],
        boxShadow: `0 0 0 3px ${designTokens.colors.interactive.focus}`,
      },

      '&:disabled': {
        background: designTokens.colors.interactive.disabled,
        borderColor: designTokens.colors.interactive.disabled,
        color: designTokens.colors.text.quaternary,
        cursor: 'not-allowed',
      },
    },

    sizes: {
      sm: {
        padding: `${designTokens.spacing[2]} ${designTokens.spacing[3]}`,
        fontSize: designTokens.typography.fontSize.sm.size,
      },
      md: {
        padding: `${designTokens.spacing[3]} ${designTokens.spacing[4]}`,
      },
      lg: {
        padding: `${designTokens.spacing[4]} ${designTokens.spacing[5]}`,
        fontSize: designTokens.typography.fontSize.lg.size,
      },
    },

    variants: {
      default: {},

      error: {
        borderColor: designTokens.colors.semantic.error.main,

        '&:focus': {
          borderColor: designTokens.colors.semantic.error.main,
          boxShadow: `0 0 0 3px rgba(115, 115, 115, 0.1)`,
        },
      },

      success: {
        borderColor: designTokens.colors.semantic.success.main,

        '&:focus': {
          borderColor: designTokens.colors.semantic.success.main,
          boxShadow: `0 0 0 3px ${designTokens.colors.interactive.focus}`,
        },
      },
    },
  },

  // === NAVIGATION THEMES ===
  navigation: {
    navbar: {
      background: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${designTokens.colors.surface.border}`,
      boxShadow: designTokens.boxShadow.lg,
      padding: `${designTokens.spacing[4]} 0`,
      position: 'sticky',
      top: 0,
      zIndex: designTokens.zIndex.sticky,
    },

    navLink: {
      color: designTokens.colors.text.tertiary,
      padding: `${designTokens.spacing[2]} ${designTokens.spacing[4]}`,
      transition: designTokens.transitions.fast,
      textDecoration: 'none',
      borderRadius: designTokens.borderRadius.md,
      position: 'relative',

      '&:hover': {
        color: designTokens.colors.primary[400],
        background: designTokens.colors.interactive.hover,
      },

      '&.active': {
        color: designTokens.colors.primary[500],

        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-1px',
          left: 0,
          right: 0,
          height: '2px',
          background: designTokens.gradients.gold,
        },
      },
    },

    tabBar: {
      background: designTokens.colors.surface.primary,
      borderTop: `1px solid ${designTokens.colors.surface.border}`,
      padding: designTokens.spacing[2],
      display: 'flex',
      justifyContent: 'space-around',
    },

    tabItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${designTokens.spacing[2]} ${designTokens.spacing[3]}`,
      color: designTokens.colors.text.tertiary,
      transition: designTokens.transitions.fast,
      borderRadius: designTokens.borderRadius.md,

      '&.active': {
        color: designTokens.colors.primary[500],
      },

      '&:hover': {
        color: designTokens.colors.primary[400],
        background: designTokens.colors.interactive.hover,
      },
    },
  },

  // === BADGE/CHIP THEMES ===
  badge: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: designTokens.typography.fontFamily.sans,
      fontSize: designTokens.typography.fontSize.sm.size,
      fontWeight: designTokens.typography.fontWeight.medium,
      borderRadius: designTokens.borderRadius.full,
      padding: `${designTokens.spacing[1]} ${designTokens.spacing[3]}`,
      border: '1px solid transparent',
    },

    variants: {
      primary: {
        background: designTokens.colors.primary[900],
        color: designTokens.colors.primary[300],
        borderColor: designTokens.colors.primary[700],
      },

      secondary: {
        background: designTokens.colors.surface.secondary,
        color: designTokens.colors.text.secondary,
        borderColor: designTokens.colors.surface.border,
      },

      success: {
        background: designTokens.colors.semantic.success.bg,
        color: designTokens.colors.semantic.success.light,
        borderColor: designTokens.colors.semantic.success.dark,
      },

      warning: {
        background: designTokens.colors.semantic.warning.bg,
        color: designTokens.colors.semantic.warning.light,
        borderColor: designTokens.colors.semantic.warning.dark,
      },

      error: {
        background: designTokens.colors.semantic.error.bg,
        color: designTokens.colors.semantic.error.light,
        borderColor: designTokens.colors.semantic.error.dark,
      },
    },
  },

  // === MODAL/OVERLAY THEMES ===
  modal: {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: designTokens.colors.background.overlay,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: designTokens.zIndex.modal,
      backdropFilter: 'blur(4px)',
    },

    content: {
      background: designTokens.colors.surface.primary,
      borderRadius: designTokens.borderRadius['2xl'],
      boxShadow: designTokens.boxShadow['2xl'],
      border: `1px solid ${designTokens.colors.surface.border}`,
      maxWidth: '90vw',
      maxHeight: '90vh',
      overflow: 'auto',
    },
  },

  // === LOADING STATES ===
  loading: {
    spinner: {
      width: '24px',
      height: '24px',
      border: `2px solid ${designTokens.colors.surface.tertiary}`,
      borderTop: `2px solid ${designTokens.colors.primary[500]}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },

    shimmer: {
      background: `linear-gradient(
        90deg,
        ${designTokens.colors.surface.primary} 25%,
        ${designTokens.colors.surface.secondary} 50%,
        ${designTokens.colors.surface.primary} 75%
      )`,
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
    },
  },
} as const

// CSS-in-JS helper function to convert theme object to CSS
export const createCSS = (styles: Record<string, any>): string => {
  return Object.entries(styles)
    .map(([property, value]) => {
      // Handle nested objects (like hover states)
      if (typeof value === 'object' && !Array.isArray(value)) {
        return `${property} { ${createCSS(value)} }`
      }

      // Convert camelCase to kebab-case
      const kebabProperty = property.replace(
        /[A-Z]/g,
        letter => `-${letter.toLowerCase()}`
      )
      return `${kebabProperty}: ${value};`
    })
    .join(' ')
}

export default componentThemes
