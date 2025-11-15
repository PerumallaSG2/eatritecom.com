/**
 * EatRite Premium Design System
 * Complete brand design tokens for luxury nutrition platform
 */

export const EatRiteDesignTokens = {
  // Core Brand Colors (from EatRite logo)
  colors: {
    primary: {
      gold: '#D4B46A',
      goldLight: '#E5C57A',
      goldDark: '#C3A359',
      goldMetallic: '#DAB875',
    },
    surface: {
      darkGreen: '#0F2B1E',
      darkGreenLight: '#1A3527',
      darkGreenDark: '#0A1E15',
      softBlack: '#0A0A0A',
      softBlackLight: '#1A1A1A',
      offWhite: '#F5F2E8',
      overlay: 'rgba(15, 43, 30, 0.95)',
    },
    text: {
      primary: '#F5F2E8',
      secondary: '#E0DDD5',
      tertiary: '#C8C5BD',
      accent: '#D4B46A',
      inverse: '#0A0A0A',
    },
    semantic: {
      success: '#4A7C59',
      warning: '#D4B46A',
      error: '#D85B53',
      info: '#6B9080',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #D4B46A 0%, #C3A359 100%)',
      surface: 'linear-gradient(135deg, #0F2B1E 0%, #1A3527 100%)',
      overlay: 'linear-gradient(135deg, rgba(15, 43, 30, 0.95) 0%, rgba(26, 53, 39, 0.9) 100%)',
    }
  },

  // Premium Typography Scale
  typography: {
    fontFamilies: {
      heading: '"Playfair Display", "Cormorant Garamond", Georgia, serif',
      body: '"Inter", "Nunito", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
      mono: '"SF Mono", "Monaco", "Cascadia Code", monospace',
    },
    scale: {
      // Luxury heading scale
      hero: { size: '3.5rem', lineHeight: '1.1', weight: 700, letterSpacing: '-0.02em' }, // 56px
      h1: { size: '3rem', lineHeight: '1.15', weight: 600, letterSpacing: '-0.025em' }, // 48px
      h2: { size: '2.25rem', lineHeight: '1.2', weight: 600, letterSpacing: '-0.02em' }, // 36px
      h3: { size: '1.875rem', lineHeight: '1.25', weight: 500, letterSpacing: '-0.015em' }, // 30px
      h4: { size: '1.5rem', lineHeight: '1.3', weight: 500, letterSpacing: '-0.01em' }, // 24px
      h5: { size: '1.25rem', lineHeight: '1.35', weight: 500, letterSpacing: '0em' }, // 20px
      
      // Body text scale
      bodyLarge: { size: '1.125rem', lineHeight: '1.6', weight: 400 }, // 18px
      body: { size: '1rem', lineHeight: '1.6', weight: 400 }, // 16px
      bodySmall: { size: '0.875rem', lineHeight: '1.5', weight: 400 }, // 14px
      caption: { size: '0.75rem', lineHeight: '1.4', weight: 500 }, // 12px
      
      // UI text scale  
      buttonLarge: { size: '1.125rem', lineHeight: '1.2', weight: 600 },
      button: { size: '1rem', lineHeight: '1.2', weight: 600 },
      buttonSmall: { size: '0.875rem', lineHeight: '1.2', weight: 600 },
      label: { size: '0.875rem', lineHeight: '1.2', weight: 500 },
    }
  },

  // Luxury Spacing System
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    '3xl': '3rem',    // 48px
    '4xl': '4rem',    // 64px
    '5xl': '6rem',    // 96px
    '6xl': '8rem',    // 128px
    
    // Component-specific spacing
    componentPadding: {
      tight: '0.75rem',      // 12px
      comfortable: '1rem',    // 16px  
      spacious: '1.5rem',    // 24px
      luxury: '2rem',        // 32px
    },
    sectionSpacing: {
      small: '3rem',         // 48px
      medium: '4rem',        // 64px
      large: '6rem',         // 96px
      hero: '8rem',          // 128px
    }
  },

  // Premium Border Radius
  borderRadius: {
    sm: '0.375rem',     // 6px
    md: '0.5rem',       // 8px
    lg: '0.75rem',      // 12px
    xl: '1rem',         // 16px
    '2xl': '1.125rem',  // 18px - signature EatRite radius
    '3xl': '1.5rem',    // 24px
    full: '9999px',
  },

  // Luxury Shadow System
  shadows: {
    // Gold glow effects
    goldGlow: {
      sm: '0 0 10px rgba(212, 180, 106, 0.25)',
      md: '0 0 20px rgba(212, 180, 106, 0.35)',
      lg: '0 0 30px rgba(212, 180, 106, 0.45)',
    },
    
    // Depth shadows
    depth: {
      sm: '0 2px 4px rgba(0, 0, 0, 0.4)',
      md: '0 4px 8px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)',
      lg: '0 8px 16px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)',
      xl: '0 16px 32px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.3)',
    },
    
    // Premium combined shadows
    luxury: {
      sm: '0 2px 4px rgba(0, 0, 0, 0.4), 0 0 8px rgba(212, 180, 106, 0.15)',
      md: '0 4px 8px rgba(0, 0, 0, 0.4), 0 0 16px rgba(212, 180, 106, 0.2)',
      lg: '0 8px 16px rgba(0, 0, 0, 0.4), 0 0 24px rgba(212, 180, 106, 0.25)',
    }
  },

  // Animation & Transitions
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.2s',
      slow: '0.3s',
      slower: '0.5s',
    },
    easing: {
      easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      luxury: 'cubic-bezier(0.23, 1, 0.32, 1)',
    }
  },

  // Component Design Tokens
  components: {
    // Button tokens
    button: {
      height: {
        sm: '2rem',      // 32px
        md: '2.5rem',    // 40px
        lg: '3rem',      // 48px
        xl: '3.5rem',    // 56px
      },
      padding: {
        sm: '0.75rem 1rem',
        md: '1rem 1.5rem', 
        lg: '1.25rem 2rem',
        xl: '1.5rem 2.5rem',
      }
    },

    // Card tokens
    card: {
      padding: {
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      borderWidth: '1px',
      borderColor: 'rgba(212, 180, 106, 0.2)',
    },

    // Input tokens
    input: {
      height: {
        sm: '2.25rem',   // 36px
        md: '2.75rem',   // 44px
        lg: '3.25rem',   // 52px
      },
      padding: '0.75rem 1rem',
      borderWidth: '1px',
      focusBorderWidth: '2px',
    },

    // Navigation tokens
    nav: {
      height: '4rem',    // 64px
      mobileHeight: '3.5rem', // 56px
      logoSize: '2rem',  // 32px
      itemSpacing: '2rem', // 32px
    }
  },

  // Breakpoints
  breakpoints: {
    xs: '375px',
    sm: '640px', 
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-Index Scale
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    overlay: 30,
    modal: 40,
    popover: 50,
    tooltip: 60,
    toast: 70,
  }
} as const;

export type EatRiteDesignTokens = typeof EatRiteDesignTokens;