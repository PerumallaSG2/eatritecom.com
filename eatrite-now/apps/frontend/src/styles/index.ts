/**
 * EatRite Design System - Main Export
 * Complete luxury design system for React applications
 */

import React from 'react';

// === DESIGN TOKENS ===
export { 
  designTokens,
  colors,
  typography,
  spacing,
  borderRadius,
  boxShadow,
  gradients,
  transitions,
  breakpoints,
  zIndex,
  type ColorToken,
  type SpacingToken,
  type BreakpointToken
} from './design-system/tokens';

// Import for internal use
import {
  designTokens,
  colors,
  typography,
  spacing,
  borderRadius,
  boxShadow,
  gradients,
  transitions,
  breakpoints,
  zIndex
} from './design-system/tokens';

// === COMPONENT THEMES ===
export {
  componentThemes,
  createCSS
} from './design-system/components';

// Import for internal use
import { componentThemes } from './design-system/components';

// === THEME PROVIDER ===
export {
  EatRiteThemeProvider,
  EatRiteStyleProvider,
  EatRiteProvider,
  useEatRiteTheme,
  useStyledComponent
} from '../context/EatRiteThemeProvider';

// === UI COMPONENTS ===
export {
  EatRiteButton,
  type EatRiteButtonProps
} from '../components/ui/Button/EatRiteButton';

export {
  EatRiteCard,
  type EatRiteCardProps
} from '../components/ui/Card/EatRiteCard';

export {
  EatRiteInput,
  type EatRiteInputProps
} from '../components/ui/Input/EatRiteInput';

// === ICONS ===
export {
  EatRiteIcons,
  // Individual icon exports
  LeafIcon,
  ThreeLeavesIcon,
  PlantIcon,
  SeedIcon,
  AppleIcon,
  CarrotIcon,
  BowlIcon,
  ChefHatIcon,
  HeartIcon,
  StarIcon,
  CheckIcon,
  PlusIcon,
  MinusIcon,
  CartIcon,
  UserIcon,
  MenuIcon,
  CloseIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ClockIcon,
  TruckIcon,
  MapPinIcon,
  ActivityIcon,
  WeightIcon,
  TargetIcon,
  SettingsIcon,
  FilterIcon,
  SearchIcon
} from '../components/icons/EatRiteIcons';

// === EXAMPLE SCREENS ===
export {
  default as EatRiteHomeScreen
} from '../components/examples/EatRiteHomeScreen';

// === UTILITY FUNCTIONS ===

/**
 * Get a design token value by path
 * @example getToken('colors.primary.500') // Returns '#d4a047'
 */
export const getToken = (path: string) => {
  return path.split('.').reduce((obj: any, key) => obj?.[key], designTokens) || '';
};

/**
 * Create CSS variables from design tokens
 * Useful for dynamic theming
 */
export const createCSSVariables = (prefix = 'eatrite') => {
  const variables: Record<string, string> = {};
  
  const flatten = (obj: any, parentKey = '') => {
    Object.keys(obj).forEach(key => {
      const newKey = parentKey ? `${parentKey}-${key}` : key;
      const value = obj[key];
      
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        flatten(value, newKey);
      } else {
        variables[`--${prefix}-${newKey}`] = String(value);
      }
    });
  };
  
  flatten(designTokens);
  return variables;
};

/**
 * Apply theme to document root
 * Injects CSS variables for use in stylesheets
 */
export const applyThemeToRoot = (prefix = 'eatrite') => {
  const variables = createCSSVariables(prefix);
  const root = document.documentElement;
  
  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

/**
 * Responsive helper function
 * Returns media query string for breakpoint
 */
export const mediaQuery = (breakpoint: keyof typeof breakpoints) => {
  return `@media (min-width: ${breakpoints[breakpoint]})`;
};

/**
 * Color utility functions
 */
export const colorUtils = {
  // Get color with opacity
  withOpacity: (color: string, opacity: number) => {
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  },
  
  // Get primary color variant
  primary: (variant: keyof typeof colors.primary = 500) => colors.primary[variant],
  
  // Get text color variant
  text: (variant: keyof typeof colors.text = 'primary') => colors.text[variant],
  
  // Get surface color variant
  surface: (variant: keyof typeof colors.surface = 'primary') => colors.surface[variant]
};

/**
 * Typography utility functions
 */
export const typographyUtils = {
  // Get font size with line height
  fontSize: (size: keyof typeof typography.fontSize) => typography.fontSize[size],
  
  // Get heading styles
  heading: (level: keyof typeof typography.headings) => typography.headings[level],
  
  // Generate responsive font size
  responsive: (minSize: string, maxSize: string, minViewport = '320px', maxViewport = '1200px') => {
    return `clamp(${minSize}, calc(${minSize} + (${parseFloat(maxSize)} - ${parseFloat(minSize)}) * ((100vw - ${minViewport}) / (${parseFloat(maxViewport)} - ${parseFloat(minViewport)}))), ${maxSize})`;
  }
};

/**
 * Spacing utility functions
 */
export const spacingUtils = {
  // Get spacing value
  get: (value: keyof typeof spacing) => spacing[value],
  
  // Create padding/margin shorthand
  shorthand: (...values: Array<keyof typeof spacing>) => {
    return values.map(v => spacing[v]).join(' ');
  }
};

// === TYPE DEFINITIONS ===
export interface EatRiteTheme {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  boxShadow: typeof boxShadow;
  gradients: typeof gradients;
  transitions: typeof transitions;
  breakpoints: typeof breakpoints;
  zIndex: typeof zIndex;
}

export interface ComponentVariant {
  [key: string]: React.CSSProperties;
}

export interface EatRiteComponentProps {
  variant?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: React.ReactNode;
}

// === DEFAULT EXPORT ===
const EatRiteDesignSystem = {
  // Core tokens
  tokens: designTokens,
  colors,
  typography,
  spacing,
  borderRadius,
  boxShadow,
  gradients,
  transitions,
  breakpoints,
  zIndex,
  
  // Component themes
  components: componentThemes,
  
  // Utilities
  utils: {
    getToken,
    createCSSVariables,
    applyThemeToRoot,
    mediaQuery,
    colorUtils,
    typographyUtils,
    spacingUtils
  }
};

export default EatRiteDesignSystem;