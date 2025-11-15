/**
 * EatRite Theme Provider
 * React context for managing theme across the application
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { designTokens } from '../styles/design-system/tokens';
import { componentThemes } from '../styles/design-system/components';

// Theme context type
interface EatRiteTheme {
  tokens: typeof designTokens;
  components: typeof componentThemes;
  utils: {
    // Utility functions for working with the theme
    getColor: (path: string) => string;
    getSpacing: (value: keyof typeof designTokens.spacing) => string;
    getRadius: (value: keyof typeof designTokens.borderRadius) => string;
    getShadow: (value: keyof typeof designTokens.boxShadow) => string;
    getTransition: (value: keyof typeof designTokens.transitions) => string;
  };
}

// Create the theme context
const EatRiteThemeContext = createContext<EatRiteTheme | null>(null);

// Theme provider props
interface EatRiteThemeProviderProps {
  children: ReactNode;
}

// Utility function to get nested object values by path
const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => current?.[key], obj) || '';
};

// Theme provider component
export const EatRiteThemeProvider: React.FC<EatRiteThemeProviderProps> = ({ children }) => {
  const theme: EatRiteTheme = {
    tokens: designTokens,
    components: componentThemes,
    utils: {
      getColor: (path: string) => getNestedValue(designTokens.colors, path),
      getSpacing: (value) => designTokens.spacing[value],
      getRadius: (value) => designTokens.borderRadius[value],
      getShadow: (value) => designTokens.boxShadow[value],
      getTransition: (value) => designTokens.transitions[value],
    }
  };

  return (
    <EatRiteThemeContext.Provider value={theme}>
      {children}
    </EatRiteThemeContext.Provider>
  );
};

// Hook to use the theme
export const useEatRiteTheme = (): EatRiteTheme => {
  const theme = useContext(EatRiteThemeContext);
  
  if (!theme) {
    throw new Error('useEatRiteTheme must be used within an EatRiteThemeProvider');
  }
  
  return theme;
};

// CSS Variables Provider - Injects CSS custom properties
export const EatRiteStyleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  React.useEffect(() => {
    // Inject CSS custom properties into document root
    const root = document.documentElement;
    
    // Colors
    Object.entries(designTokens.colors.primary).forEach(([key, value]) => {
      root.style.setProperty(`--color-primary-${key}`, String(value));
    });
    
    Object.entries(designTokens.colors.background).forEach(([key, value]) => {
      root.style.setProperty(`--color-bg-${key}`, String(value));
    });
    
    Object.entries(designTokens.colors.surface).forEach(([key, value]) => {
      root.style.setProperty(`--color-surface-${key}`, String(value));
    });
    
    Object.entries(designTokens.colors.text).forEach(([key, value]) => {
      root.style.setProperty(`--color-text-${key}`, String(value));
    });
    
    // Spacing
    Object.entries(designTokens.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, String(value));
    });
    
    // Border radius
    Object.entries(designTokens.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, String(value));
    });
    
    // Box shadows
    Object.entries(designTokens.boxShadow).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, String(value));
    });
    
    // Gradients
    Object.entries(designTokens.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--gradient-${key}`, String(value));
    });
    
    // Transitions
    Object.entries(designTokens.transitions).forEach(([key, value]) => {
      root.style.setProperty(`--transition-${key}`, String(value));
    });
    
  }, []);
  
  return <>{children}</>;
};

// Combined provider for convenience
export const EatRiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <EatRiteThemeProvider>
      <EatRiteStyleProvider>
        {children}
      </EatRiteStyleProvider>
    </EatRiteThemeProvider>
  );
};

// Styled component helper hook
export const useStyledComponent = () => {
  const theme = useEatRiteTheme();
  
  return {
    // Create style objects from theme
    createStyles: (styles: Record<string, any>) => {
      const processStyles = (obj: Record<string, any>): Record<string, any> => {
        const result: Record<string, any> = {};
        
        Object.entries(obj).forEach(([key, value]) => {
          if (typeof value === 'string' && value.startsWith('theme.')) {
            // Replace theme references with actual values
            const path = value.replace('theme.', '');
            result[key] = getNestedValue(theme.tokens, path);
          } else if (typeof value === 'object' && !Array.isArray(value)) {
            result[key] = processStyles(value);
          } else {
            result[key] = value;
          }
        });
        
        return result;
      };
      
      return processStyles(styles);
    },
    
    // Get component theme
    getComponentTheme: (component: keyof typeof componentThemes, variant?: string) => {
      const componentTheme = theme.components[component] as any;
      if (!variant) return componentTheme;
      
      return {
        ...componentTheme.base,
        ...(componentTheme.variants?.[variant] || {}),
      };
    }
  };
};

export default EatRiteProvider;