import React, { createContext, useContext, useState, useEffect } from 'react'

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system'
export type ColorScheme = 'default' | 'forest' | 'ocean' | 'sunset' | 'modern'

export interface ThemeColors {
  // Primary brand colors
  primary: string
  primaryHover: string
  secondary: string
  secondaryHover: string
  accent: string
  accentHover: string
  
  // Background colors
  background: string
  backgroundSecondary: string
  backgroundTertiary: string
  surface: string
  surfaceHover: string
  
  // Text colors
  textPrimary: string
  textSecondary: string
  textTertiary: string
  textInverse: string
  
  // Border and divider colors
  border: string
  borderLight: string
  divider: string
  
  // Status colors
  success: string
  warning: string
  error: string
  info: string
  
  // Interactive states
  focus: string
  selection: string
  overlay: string
}

export interface Theme {
  name: string
  mode: 'light' | 'dark'
  colors: ThemeColors
}

// Color scheme definitions
const colorSchemes: Record<ColorScheme, { light: ThemeColors; dark: ThemeColors }> = {
  default: {
    light: {
      primary: '#0F2B1E',
      primaryHover: '#1a4d33',
      secondary: '#D4B46A',
      secondaryHover: '#B8935A',
      accent: '#FF6B35',
      accentHover: '#E55A2B',
      
      background: '#FFFFFF',
      backgroundSecondary: '#F5F2E8',
      backgroundTertiary: '#FAFAFA',
      surface: '#FFFFFF',
      surfaceHover: '#F8F9FA',
      
      textPrimary: '#1A1A1A',
      textSecondary: '#6B7280',
      textTertiary: '#9CA3AF',
      textInverse: '#FFFFFF',
      
      border: '#E5E7EB',
      borderLight: '#F3F4F6',
      divider: '#E5E7EB',
      
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
      
      focus: '#3B82F6',
      selection: 'rgba(59, 130, 246, 0.1)',
      overlay: 'rgba(0, 0, 0, 0.5)'
    },
    dark: {
      primary: '#34D399',
      primaryHover: '#10B981',
      secondary: '#FBBF24',
      secondaryHover: '#F59E0B',
      accent: '#F472B6',
      accentHover: '#EC4899',
      
      background: '#0F1419',
      backgroundSecondary: '#1F2937',
      backgroundTertiary: '#111827',
      surface: '#1F2937',
      surfaceHover: '#374151',
      
      textPrimary: '#F9FAFB',
      textSecondary: '#D1D5DB',
      textTertiary: '#9CA3AF',
      textInverse: '#1F2937',
      
      border: '#374151',
      borderLight: '#4B5563',
      divider: '#374151',
      
      success: '#10B981',
      warning: '#F59E0B',
      error: '#F87171',
      info: '#60A5FA',
      
      focus: '#60A5FA',
      selection: 'rgba(96, 165, 250, 0.2)',
      overlay: 'rgba(0, 0, 0, 0.8)'
    }
  },
  forest: {
    light: {
      primary: '#064E3B',
      primaryHover: '#047857',
      secondary: '#92C5A7',
      secondaryHover: '#6EE7B7',
      accent: '#F97316',
      accentHover: '#EA580C',
      
      background: '#F0FDF4',
      backgroundSecondary: '#ECFDF5',
      backgroundTertiary: '#F7FEF0',
      surface: '#FFFFFF',
      surfaceHover: '#F0FDF4',
      
      textPrimary: '#064E3B',
      textSecondary: '#166534',
      textTertiary: '#15803D',
      textInverse: '#FFFFFF',
      
      border: '#BBF7D0',
      borderLight: '#DCFCE7',
      divider: '#BBF7D0',
      
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      info: '#0284C7',
      
      focus: '#059669',
      selection: 'rgba(5, 150, 105, 0.1)',
      overlay: 'rgba(6, 78, 59, 0.5)'
    },
    dark: {
      primary: '#6EE7B7',
      primaryHover: '#34D399',
      secondary: '#FCD34D',
      secondaryHover: '#FBBF24',
      accent: '#FB923C',
      accentHover: '#F97316',
      
      background: '#0C1F17',
      backgroundSecondary: '#14532D',
      backgroundTertiary: '#166534',
      surface: '#14532D',
      surfaceHover: '#166534',
      
      textPrimary: '#ECFDF5',
      textSecondary: '#BBF7D0',
      textTertiary: '#86EFAC',
      textInverse: '#064E3B',
      
      border: '#166534',
      borderLight: '#15803D',
      divider: '#166534',
      
      success: '#10B981',
      warning: '#F59E0B',
      error: '#F87171',
      info: '#60A5FA',
      
      focus: '#34D399',
      selection: 'rgba(52, 211, 153, 0.2)',
      overlay: 'rgba(12, 31, 23, 0.8)'
    }
  },
  ocean: {
    light: {
      primary: '#0C4A6E',
      primaryHover: '#0369A1',
      secondary: '#7DD3FC',
      secondaryHover: '#38BDF8',
      accent: '#8B5CF6',
      accentHover: '#7C3AED',
      
      background: '#F0F9FF',
      backgroundSecondary: '#E0F2FE',
      backgroundTertiary: '#F8FAFC',
      surface: '#FFFFFF',
      surfaceHover: '#F0F9FF',
      
      textPrimary: '#0C4A6E',
      textSecondary: '#0369A1',
      textTertiary: '#0284C7',
      textInverse: '#FFFFFF',
      
      border: '#BAE6FD',
      borderLight: '#E0F2FE',
      divider: '#BAE6FD',
      
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      info: '#0284C7',
      
      focus: '#0284C7',
      selection: 'rgba(2, 132, 199, 0.1)',
      overlay: 'rgba(12, 74, 110, 0.5)'
    },
    dark: {
      primary: '#7DD3FC',
      primaryHover: '#38BDF8',
      secondary: '#A78BFA',
      secondaryHover: '#8B5CF6',
      accent: '#F472B6',
      accentHover: '#EC4899',
      
      background: '#0F1729',
      backgroundSecondary: '#1E293B',
      backgroundTertiary: '#334155',
      surface: '#1E293B',
      surfaceHover: '#334155',
      
      textPrimary: '#F1F5F9',
      textSecondary: '#CBD5E1',
      textTertiary: '#94A3B8',
      textInverse: '#0F172A',
      
      border: '#334155',
      borderLight: '#475569',
      divider: '#334155',
      
      success: '#10B981',
      warning: '#F59E0B',
      error: '#F87171',
      info: '#60A5FA',
      
      focus: '#38BDF8',
      selection: 'rgba(56, 189, 248, 0.2)',
      overlay: 'rgba(15, 23, 41, 0.8)'
    }
  },
  sunset: {
    light: {
      primary: '#9A3412',
      primaryHover: '#C2410C',
      secondary: '#FBBF24',
      secondaryHover: '#F59E0B',
      accent: '#EC4899',
      accentHover: '#DB2777',
      
      background: '#FFF7ED',
      backgroundSecondary: '#FFEDD5',
      backgroundTertiary: '#FEF3C7',
      surface: '#FFFFFF',
      surfaceHover: '#FFF7ED',
      
      textPrimary: '#9A3412',
      textSecondary: '#C2410C',
      textTertiary: '#EA580C',
      textInverse: '#FFFFFF',
      
      border: '#FED7AA',
      borderLight: '#FFEDD5',
      divider: '#FED7AA',
      
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      info: '#0284C7',
      
      focus: '#F59E0B',
      selection: 'rgba(245, 158, 11, 0.1)',
      overlay: 'rgba(154, 52, 18, 0.5)'
    },
    dark: {
      primary: '#FB923C',
      primaryHover: '#F97316',
      secondary: '#FBBF24',
      secondaryHover: '#F59E0B',
      accent: '#F472B6',
      accentHover: '#EC4899',
      
      background: '#1C1917',
      backgroundSecondary: '#44403C',
      backgroundTertiary: '#57534E',
      surface: '#292524',
      surfaceHover: '#44403C',
      
      textPrimary: '#FAFAF9',
      textSecondary: '#E7E5E4',
      textTertiary: '#D6D3D1',
      textInverse: '#1C1917',
      
      border: '#57534E',
      borderLight: '#6B7280',
      divider: '#57534E',
      
      success: '#10B981',
      warning: '#F59E0B',
      error: '#F87171',
      info: '#60A5FA',
      
      focus: '#FB923C',
      selection: 'rgba(251, 146, 60, 0.2)',
      overlay: 'rgba(28, 25, 23, 0.8)'
    }
  },
  modern: {
    light: {
      primary: '#6366F1',
      primaryHover: '#4F46E5',
      secondary: '#8B5CF6',
      secondaryHover: '#7C3AED',
      accent: '#06B6D4',
      accentHover: '#0891B2',
      
      background: '#FFFFFF',
      backgroundSecondary: '#F8FAFC',
      backgroundTertiary: '#F1F5F9',
      surface: '#FFFFFF',
      surfaceHover: '#F8FAFC',
      
      textPrimary: '#0F172A',
      textSecondary: '#475569',
      textTertiary: '#64748B',
      textInverse: '#FFFFFF',
      
      border: '#E2E8F0',
      borderLight: '#F1F5F9',
      divider: '#E2E8F0',
      
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      info: '#0284C7',
      
      focus: '#6366F1',
      selection: 'rgba(99, 102, 241, 0.1)',
      overlay: 'rgba(15, 23, 42, 0.5)'
    },
    dark: {
      primary: '#A78BFA',
      primaryHover: '#8B5CF6',
      secondary: '#06B6D4',
      secondaryHover: '#0891B2',
      accent: '#F472B6',
      accentHover: '#EC4899',
      
      background: '#020617',
      backgroundSecondary: '#0F172A',
      backgroundTertiary: '#1E293B',
      surface: '#0F172A',
      surfaceHover: '#1E293B',
      
      textPrimary: '#F1F5F9',
      textSecondary: '#CBD5E1',
      textTertiary: '#94A3B8',
      textInverse: '#020617',
      
      border: '#1E293B',
      borderLight: '#334155',
      divider: '#1E293B',
      
      success: '#10B981',
      warning: '#F59E0B',
      error: '#F87171',
      info: '#60A5FA',
      
      focus: '#A78BFA',
      selection: 'rgba(167, 139, 250, 0.2)',
      overlay: 'rgba(2, 6, 23, 0.8)'
    }
  }
}

interface ThemeContextType {
  // Current theme state
  theme: Theme
  themeMode: ThemeMode
  colorScheme: ColorScheme
  
  // Theme actions
  setThemeMode: (mode: ThemeMode) => void
  setColorScheme: (scheme: ColorScheme) => void
  toggleTheme: () => void
  
  // System theme detection
  systemTheme: 'light' | 'dark'
  isSystemTheme: boolean
  
  // Theme utilities
  getThemeColors: (mode?: 'light' | 'dark') => ThemeColors
  applyThemeToDocument: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultMode?: ThemeMode
  defaultColorScheme?: ColorScheme
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'system',
  defaultColorScheme = 'default'
}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultMode)
  const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultColorScheme)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Load saved theme preferences
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode
    const savedScheme = localStorage.getItem('color-scheme') as ColorScheme
    
    if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
      setThemeMode(savedMode)
    }
    
    if (savedScheme && Object.keys(colorSchemes).includes(savedScheme)) {
      setColorScheme(savedScheme)
    }
  }, [])

  // Determine actual theme mode (resolve 'system' to 'light' or 'dark')
  const actualThemeMode = themeMode === 'system' ? systemTheme : themeMode
  const isSystemTheme = themeMode === 'system'

  // Get current theme
  const theme: Theme = {
    name: `${colorScheme}-${actualThemeMode}`,
    mode: actualThemeMode,
    colors: colorSchemes[colorScheme][actualThemeMode]
  }

  // Theme actions
  const handleSetThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode)
    localStorage.setItem('theme-mode', mode)
  }

  const handleSetColorScheme = (scheme: ColorScheme) => {
    setColorScheme(scheme)
    localStorage.setItem('color-scheme', scheme)
  }

  const toggleTheme = () => {
    const newMode = actualThemeMode === 'light' ? 'dark' : 'light'
    handleSetThemeMode(newMode)
  }

  const getThemeColors = (mode?: 'light' | 'dark'): ThemeColors => {
    const targetMode = mode || actualThemeMode
    return colorSchemes[colorScheme][targetMode]
  }

  // Apply theme to document root
  const applyThemeToDocument = () => {
    const root = document.documentElement
    const colors = theme.colors

    // Apply CSS custom properties
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = `--theme-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
      root.style.setProperty(cssVar, value)
    })

    // Apply data attributes for CSS selectors
    root.setAttribute('data-theme', actualThemeMode)
    root.setAttribute('data-color-scheme', colorScheme)
    
    // Apply class for CSS-based theme switching
    root.classList.remove('light', 'dark')
    root.classList.add(actualThemeMode)
  }

  // Apply theme changes to document
  useEffect(() => {
    applyThemeToDocument()
  }, [theme, actualThemeMode, colorScheme])

  const value: ThemeContextType = {
    theme,
    themeMode,
    colorScheme,
    setThemeMode: handleSetThemeMode,
    setColorScheme: handleSetColorScheme,
    toggleTheme,
    systemTheme,
    isSystemTheme,
    getThemeColors,
    applyThemeToDocument
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Utility hooks
export const useThemeColors = () => {
  const { theme } = useTheme()
  return theme.colors
}

export const useIsDark = () => {
  const { theme } = useTheme()
  return theme.mode === 'dark'
}

export const useSystemTheme = () => {
  const { systemTheme, isSystemTheme } = useTheme()
  return { systemTheme, isSystemTheme }
}

export default ThemeContext