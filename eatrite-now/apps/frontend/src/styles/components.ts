/**
 * EatRite Component Theme Library
 * Pre-styled components matching the brand design system
 */

// import { eatRiteTheme } from './theme';

// === BUTTON STYLES ===
export const buttonStyles = {
  // Base button styles
  base: `
    inline-flex items-center justify-center
    font-medium transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
    transform hover:scale-105 active:scale-95
  `,

  // Size variants
  sizes: {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-2xl'
  },

  // Variant styles
  variants: {
    // Primary gold button
    primary: `
      bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600
      text-black font-semibold
      hover:from-yellow-400 hover:via-yellow-600 hover:to-yellow-700
      focus:ring-yellow-500
      shadow-lg hover:shadow-xl
      border border-yellow-400
    `,

    // Secondary outline button
    secondary: `
      border-2 border-yellow-500
      text-yellow-500 bg-transparent
      hover:bg-yellow-500 hover:text-black
      focus:ring-yellow-500
    `,

    // Dark button for premium feel
    dark: `
      bg-gray-900 border border-gray-700
      text-white
      hover:bg-gray-800 hover:border-gray-600
      focus:ring-gray-600
    `,

    // Success button (gold theme)
    success: `
      bg-eatrite-gold-800 border border-eatrite-gold-700
      text-eatrite-gold-100
      hover:bg-eatrite-gold-700 hover:border-eatrite-gold-600
      focus:ring-eatrite-gold-600
    `,

    // Danger button (gray theme - no red)
    danger: `
      bg-eatrite-black-700 border border-eatrite-black-600
      text-eatrite-black-300
      hover:bg-eatrite-black-600 hover:border-eatrite-black-500
      focus:ring-eatrite-black-500
    `,

    // Ghost button
    ghost: `
      text-yellow-500 bg-transparent
      hover:bg-yellow-500 hover:bg-opacity-10
      focus:ring-yellow-500
    `
  }
};

// === CARD STYLES ===
export const cardStyles = {
  base: `
    bg-gray-900 border border-gray-700
    rounded-xl shadow-lg
    transition-all duration-300
    hover:shadow-xl hover:border-gray-600
  `,
  
  variants: {
    default: 'p-6',
    compact: 'p-4',
    spacious: 'p-8',
    
    // Premium card with gold accent
    premium: `
      bg-gradient-to-br from-gray-900 to-gray-800
      border border-yellow-600
      shadow-xl shadow-yellow-500/10
      hover:shadow-2xl hover:shadow-yellow-500/20
    `,

    // Elevated card
    elevated: `
      bg-gray-800 border border-gray-600
      shadow-2xl
    `,

    // Interactive card
    interactive: `
      cursor-pointer
      hover:scale-105 hover:-translate-y-1
      active:scale-100 active:translate-y-0
    `
  }
};

// === INPUT STYLES ===
export const inputStyles = {
  base: `
    w-full px-4 py-3
    bg-gray-900 border border-gray-700
    text-white placeholder-gray-400
    rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent
    hover:border-gray-600
  `,

  variants: {
    default: '',
    
    // Premium input with gold focus
    premium: `
      bg-black border-gray-600
      focus:ring-yellow-600 focus:shadow-lg focus:shadow-yellow-500/20
    `,

    // Error state
    error: `
      border-red-500 bg-red-900 bg-opacity-20
      focus:ring-red-500
      text-red-100 placeholder-red-300
    `,

    // Success state (gold theme)
    success: `
      border-eatrite-gold-500 bg-eatrite-gold-900 bg-opacity-20
      focus:ring-eatrite-gold-500
      text-eatrite-gold-100 placeholder-eatrite-gold-300
    `
  },

  // Label styles
  label: `
    block text-sm font-medium text-gray-300 mb-2
  `,

  // Error message
  errorMessage: `
    mt-2 text-sm text-red-400
  `,

  // Helper text
  helperText: `
    mt-2 text-sm text-gray-500
  `
};

// === NAVIGATION STYLES ===
export const navigationStyles = {
  // Main navbar
  navbar: `
    bg-black border-b border-gray-800
    shadow-lg shadow-black/50
  `,

  // Navigation links
  navLink: {
    base: `
      px-4 py-2 text-gray-300
      transition-all duration-200
      hover:text-yellow-500
      relative
    `,
    
    active: `
      text-yellow-500
      after:absolute after:bottom-0 after:left-0 after:right-0
      after:h-0.5 after:bg-gradient-to-r after:from-yellow-400 after:to-yellow-600
    `,

    inactive: `
      hover:text-gray-100
    `
  },

  // Mobile menu
  mobileMenu: `
    bg-black border-t border-gray-800
    shadow-lg
  `,

  // Tab navigation
  tabs: {
    container: 'border-b border-gray-700',
    tab: `
      px-6 py-3 text-gray-400
      border-b-2 border-transparent
      transition-all duration-200
      hover:text-gray-200 hover:border-gray-600
    `,
    activeTab: `
      text-yellow-500 border-yellow-500
      bg-yellow-500 bg-opacity-5
    `
  }
};

// === TYPOGRAPHY STYLES ===
export const typographyStyles = {
  // Headings (serif font for luxury)
  headings: {
    h1: `
      font-serif text-5xl md:text-6xl font-bold
      text-white leading-tight tracking-tight
      bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600
      bg-clip-text text-transparent
    `,
    
    h2: `
      font-serif text-3xl md:text-4xl font-bold
      text-white leading-tight
      bg-gradient-to-r from-yellow-300 to-yellow-500
      bg-clip-text text-transparent
    `,
    
    h3: `
      font-serif text-2xl md:text-3xl font-semibold
      text-yellow-400 leading-tight
    `,
    
    h4: `
      font-serif text-xl md:text-2xl font-semibold
      text-yellow-500 leading-tight
    `,
    
    h5: `
      font-serif text-lg md:text-xl font-medium
      text-gray-200 leading-tight
    `,
    
    h6: `
      font-serif text-base md:text-lg font-medium
      text-gray-300 leading-tight
    `
  },

  // Body text (sans-serif)
  body: {
    large: 'text-lg text-gray-200 leading-relaxed',
    base: 'text-base text-gray-300 leading-relaxed',
    small: 'text-sm text-gray-400 leading-relaxed',
    xs: 'text-xs text-gray-500 leading-normal'
  },

  // Special text styles
  special: {
    caption: 'text-xs text-gray-500 uppercase tracking-wider',
    quote: 'italic text-gray-300 border-l-4 border-yellow-500 pl-4',
    code: 'font-mono text-sm bg-eatrite-black-900 text-eatrite-gold-400 px-2 py-1 rounded',
    highlight: 'bg-yellow-500 bg-opacity-20 text-yellow-300 px-1 rounded'
  }
};

// === LAYOUT STYLES ===
export const layoutStyles = {
  // Container styles
  container: {
    base: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    narrow: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
    wide: 'max-w-full mx-auto px-4 sm:px-6 lg:px-8'
  },

  // Section styles
  section: {
    base: 'py-12 md:py-16 lg:py-20',
    compact: 'py-8 md:py-12',
    spacious: 'py-16 md:py-24 lg:py-32'
  },

  // Grid styles
  grid: {
    base: 'grid gap-6',
    responsive: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    auto: 'grid grid-cols-auto-fit gap-6'
  },

  // Flex styles
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-center justify-start',
    column: 'flex flex-col',
    columnCenter: 'flex flex-col items-center justify-center'
  }
};

// === UTILITY STYLES ===
export const utilityStyles = {
  // Dividers
  divider: {
    horizontal: 'border-t border-gray-700 my-8',
    vertical: 'border-l border-gray-700 mx-4',
    gold: 'border-t border-yellow-600 my-8'
  },

  // Backgrounds
  background: {
    primary: 'bg-black',
    secondary: 'bg-gray-900',
    surface: 'bg-gray-800',
    gradient: 'bg-gradient-to-br from-black via-gray-900 to-black'
  },

  // Animations
  animation: {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    bounce: 'animate-bounce-in',
    glow: 'animate-glow'
  },

  // Loading states
  loading: {
    spinner: `
      animate-spin rounded-full border-2 border-gray-700
      border-t-yellow-500 h-6 w-6
    `,
    shimmer: `
      animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800
      bg-size-200 bg-pos-0 hover:bg-pos-100
    `
  }
};

// Export complete component theme
export const componentTheme = {
  button: buttonStyles,
  card: cardStyles,
  input: inputStyles,
  navigation: navigationStyles,
  typography: typographyStyles,
  layout: layoutStyles,
  utility: utilityStyles
};

export default componentTheme;