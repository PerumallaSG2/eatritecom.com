import React, { useState } from 'react'
import { Sun, Moon, Monitor, Check, Palette } from 'lucide-react'
import { useTheme, ThemeMode, ColorScheme } from '../context/ThemeContext'
import { FadeIn, SlideIn } from './LoadingStates'

interface ThemeSwitcherProps {
  className?: string
  showColorSchemes?: boolean
  compact?: boolean
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className = '',
  showColorSchemes = true,
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { themeMode, colorScheme, setThemeMode, setColorScheme, systemTheme } = useTheme()

  const themeModes: Array<{ mode: ThemeMode; label: string; icon: React.ElementType; description?: string }> = [
    { 
      mode: 'light', 
      label: 'Light', 
      icon: Sun,
      description: 'Light mode'
    },
    { 
      mode: 'dark', 
      label: 'Dark', 
      icon: Moon,
      description: 'Dark mode'
    },
    { 
      mode: 'system', 
      label: 'System', 
      icon: Monitor,
      description: `Follow system (${systemTheme})`
    }
  ]

  const colorSchemes: Array<{ scheme: ColorScheme; label: string; description: string; preview: string[] }> = [
    { 
      scheme: 'default', 
      label: 'EatRite Classic', 
      description: 'Forest green with gold accents',
      preview: ['#0F2B1E', '#D4B46A', '#FF6B35']
    },
    { 
      scheme: 'forest', 
      label: 'Forest', 
      description: 'Deep greens and earth tones',
      preview: ['#064E3B', '#92C5A7', '#F97316']
    },
    { 
      scheme: 'ocean', 
      label: 'Ocean', 
      description: 'Blues with purple accents',
      preview: ['#0C4A6E', '#7DD3FC', '#8B5CF6']
    },
    { 
      scheme: 'sunset', 
      label: 'Sunset', 
      description: 'Warm oranges and yellows',
      preview: ['#9A3412', '#FBBF24', '#EC4899']
    },
    { 
      scheme: 'modern', 
      label: 'Modern', 
      description: 'Purple and cyan gradients',
      preview: ['#6366F1', '#8B5CF6', '#06B6D4']
    }
  ]

  if (compact) {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 dark:text-gray-300"
          aria-label="Theme settings"
        >
          <Palette className="h-5 w-5" />
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40 bg-black/10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-600 min-w-[280px] p-4 animate-slideInDown">
              <div className="space-y-4">
                {/* Theme Mode Selection */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Theme Mode</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {themeModes.map(({ mode, label, icon: Icon }) => (
                      <button
                        key={mode}
                        onClick={() => setThemeMode(mode)}
                        className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                          themeMode === mode
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-2 border-blue-200 dark:border-blue-600'
                            : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <Icon className="h-4 w-4 mb-1" />
                        <span className="text-xs font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {showColorSchemes && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Color Scheme</h3>
                    <div className="space-y-1">
                      {colorSchemes.map(({ scheme, label, preview }) => (
                        <button
                          key={scheme}
                          onClick={() => setColorScheme(scheme)}
                          className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-200 ${
                            colorScheme === scheme
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex space-x-1">
                              {preview.map((color, index) => (
                                <div
                                  key={index}
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">{label}</span>
                          </div>
                          {colorScheme === scheme && (
                            <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <Palette className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Theme Settings</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Customize your visual experience</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Theme Mode Selection */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Theme Mode</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {themeModes.map(({ mode, label, icon: Icon, description }) => (
              <FadeIn key={mode}>
                <button
                  onClick={() => setThemeMode(mode)}
                  className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 border-2 ${
                    themeMode === mode
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-600 text-blue-700 dark:text-blue-300'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">{label}</div>
                    {description && (
                      <div className="text-xs opacity-75 mt-1">{description}</div>
                    )}
                  </div>
                  {themeMode === mode && (
                    <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 ml-auto" />
                  )}
                </button>
              </FadeIn>
            ))}
          </div>
        </div>

        {showColorSchemes && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Color Scheme</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {colorSchemes.map(({ scheme, label, description, preview }, index) => (
                <SlideIn key={scheme} direction="up" delay={index * 100}>
                  <button
                    onClick={() => setColorScheme(scheme)}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 border-2 ${
                      colorScheme === scheme
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-600 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex space-x-2">
                      {preview.map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-4 h-4 rounded-full shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-medium">{label}</div>
                      <div className="text-xs opacity-75 mt-1">{description}</div>
                    </div>
                    {colorScheme === scheme && (
                      <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 ml-auto" />
                    )}
                  </button>
                </SlideIn>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Quick theme toggle button
export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { themeMode, toggleTheme, isSystemTheme } = useTheme()
  
  const getIcon = () => {
    if (isSystemTheme) {
      return Monitor
    }
    return themeMode === 'dark' ? Moon : Sun
  }
  
  const Icon = getIcon()
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 ${className}`}
      aria-label={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}

// Theme preview component
interface ThemePreviewProps {
  colorScheme: ColorScheme
  mode: 'light' | 'dark'
  isSelected?: boolean
  onClick?: () => void
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({
  colorScheme,
  mode,
  isSelected = false,
  onClick
}) => {
  const colorSchemes = {
    default: { light: '#FFFFFF', dark: '#1F2937' },
    forest: { light: '#F0FDF4', dark: '#0C1F17' },
    ocean: { light: '#F0F9FF', dark: '#0F1729' },
    sunset: { light: '#FFF7ED', dark: '#1C1917' },
    modern: { light: '#FFFFFF', dark: '#020617' }
  }

  const bgColor = colorSchemes[colorScheme][mode]

  return (
    <button
      onClick={onClick}
      className={`relative w-full h-20 rounded-lg overflow-hidden transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-blue-500 ring-offset-2 scale-105' 
          : 'hover:scale-102 hover:shadow-md'
      }`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="absolute inset-2 bg-white/10 dark:bg-black/10 rounded backdrop-blur-sm">
        <div className="p-2">
          <div className="text-xs font-medium capitalize text-gray-900 dark:text-gray-100">
            {colorScheme} {mode}
          </div>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-1">
          <Check className="h-3 w-3" />
        </div>
      )}
    </button>
  )
}

export default {
  ThemeSwitcher,
  ThemeToggle,
  ThemePreview
}