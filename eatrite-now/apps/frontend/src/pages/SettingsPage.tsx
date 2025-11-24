import { FadeIn, SlideIn } from '../components/LoadingStates'
import { ThemeSwitcher } from '../components/ThemeComponents'
import { useTheme, useThemeColors, useIsDark } from '../context/ThemeContext'
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Globe, 
  Palette,
  Moon,
  Sun,
  Monitor
} from 'lucide-react'

const SettingsPage = () => {
  const { theme, themeMode, colorScheme, systemTheme } = useTheme()
  const colors = useThemeColors()
  const isDark = useIsDark()

  const settingsGroups = [
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          name: 'Theme',
          description: 'Customize your visual experience',
          value: `${themeMode} mode (${colorScheme})`,
          component: <ThemeSwitcher className="mt-4" />
        }
      ]
    },
    {
      title: 'Account',
      icon: User,
      settings: [
        { name: 'Profile Settings', description: 'Manage your account information', action: 'Navigate' },
        { name: 'Privacy Settings', description: 'Control your data and privacy', action: 'Navigate' },
        { name: 'Security', description: 'Password and authentication', action: 'Navigate' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { name: 'Push Notifications', description: 'Order updates and promotions', toggle: true },
        { name: 'Email Notifications', description: 'Weekly menu and offers', toggle: true },
        { name: 'SMS Alerts', description: 'Delivery notifications', toggle: false }
      ]
    },
    {
      title: 'Accessibility',
      icon: Globe,
      settings: [
        { name: 'Language', description: 'English (US)', action: 'Select' },
        { name: 'Text Size', description: 'Medium', action: 'Adjust' },
        { name: 'High Contrast', description: 'Better visibility', toggle: false }
      ]
    }
  ]

  const themeStats = [
    {
      label: 'Current Theme',
      value: theme.name,
      icon: isDark ? Moon : Sun
    },
    {
      label: 'System Theme',
      value: systemTheme,
      icon: Monitor
    },
    {
      label: 'Color Scheme',
      value: colorScheme,
      icon: Palette
    },
    {
      label: 'Mode',
      value: themeMode === 'system' ? `Auto (${systemTheme})` : themeMode,
      icon: themeMode === 'system' ? Monitor : isDark ? Moon : Sun
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <div className="mb-8">
            <FadeIn>
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-primary-hover)] rounded-xl">
                  <SettingsIcon className="h-8 w-8 text-[var(--theme-text-inverse)]" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[var(--theme-text-primary)] theme-transition">
                    Settings
                  </h1>
                  <p className="text-[var(--theme-text-secondary)] theme-transition">
                    Customize your EatRite experience
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Theme Stats Cards */}
            <SlideIn direction="up" delay={200}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {themeStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={stat.label}
                      className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl p-4 theme-transition hover:shadow-lg"
                      style={{ 
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                        color: colors.textPrimary
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="h-5 w-5" style={{ color: colors.primary }} />
                      </div>
                      <div className="text-sm font-medium capitalize">{stat.value}</div>
                      <div className="text-xs opacity-75 mt-1">{stat.label}</div>
                    </div>
                  )
                })}
              </div>
            </SlideIn>
          </div>

          {/* Settings Groups */}
          <div className="space-y-8">
            {settingsGroups.map((group, groupIndex) => {
              const GroupIcon = group.icon
              return (
                <SlideIn key={group.title} direction="up" delay={300 + groupIndex * 100}>
                  <div 
                    className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-2xl overflow-hidden theme-transition theme-shadow"
                    style={{ 
                      backgroundColor: colors.surface,
                      borderColor: colors.border 
                    }}
                  >
                    {/* Group Header */}
                    <div 
                      className="px-6 py-4 border-b border-[var(--theme-border-light)]"
                      style={{ borderBottomColor: colors.borderLight }}
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ 
                            backgroundColor: colors.backgroundSecondary,
                            color: colors.primary
                          }}
                        >
                          <GroupIcon className="h-5 w-5" />
                        </div>
                        <h2 
                          className="text-lg font-semibold"
                          style={{ color: colors.textPrimary }}
                        >
                          {group.title}
                        </h2>
                      </div>
                    </div>

                    {/* Settings Items */}
                    <div className="divide-y" style={{ borderColor: colors.borderLight }}>
                      {group.settings.map((setting) => (
                        <div
                          key={setting.name}
                          className="px-6 py-4 hover:bg-[var(--theme-background-secondary)] theme-transition cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 
                                className="font-medium"
                                style={{ color: colors.textPrimary }}
                              >
                                {setting.name}
                              </h3>
                              <p 
                                className="text-sm mt-1"
                                style={{ color: colors.textSecondary }}
                              >
                              {setting.description}
                              </p>
                              {'value' in setting && setting.value && (
                                <p 
                                  className="text-sm mt-1 font-medium"
                                  style={{ color: colors.accent }}
                                >
                                  {setting.value}
                                </p>
                              )}
                            </div>
                            
                            {'toggle' in setting && setting.toggle !== undefined && (
                              <div className="ml-4">
                                <button
                                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    'toggle' in setting && setting.toggle
                                      ? 'bg-[var(--theme-primary)]'
                                      : 'bg-[var(--theme-border)]'
                                  }`}
                                  style={{
                                    backgroundColor: 'toggle' in setting && setting.toggle ? colors.primary : colors.border
                                  }}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                      'toggle' in setting && setting.toggle ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                  />
                                </button>
                              </div>
                            )}
                            
                            {'action' in setting && setting.action && (
                              <div className="ml-4">
                                <button 
                                  className="text-sm font-medium px-3 py-1 rounded-lg border theme-transition hover:bg-[var(--theme-background-secondary)]"
                                  style={{
                                    color: colors.primary,
                                    borderColor: colors.border
                                  }}
                                >
                                  {setting.action}
                                </button>
                              </div>
                            )}
                          </div>
                          
                          {'component' in setting && setting.component && (
                            <div className="mt-4">
                              {setting.component}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </SlideIn>
              )
            })}
          </div>

          {/* Theme Preview Section */}
          <SlideIn direction="up" delay={800}>
            <div 
              className="mt-8 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-2xl p-6 theme-transition"
              style={{ 
                backgroundColor: colors.surface,
                borderColor: colors.border 
              }}
            >
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: colors.textPrimary }}
              >
                Theme Preview
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Primary Colors */}
                <div>
                  <h4 
                    className="text-sm font-medium mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Primary Colors
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: colors.primary }}
                      />
                      <span className="text-xs" style={{ color: colors.textTertiary }}>
                        Primary
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: colors.secondary }}
                      />
                      <span className="text-xs" style={{ color: colors.textTertiary }}>
                        Secondary
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: colors.accent }}
                      />
                      <span className="text-xs" style={{ color: colors.textTertiary }}>
                        Accent
                      </span>
                    </div>
                  </div>
                </div>

                {/* Background Colors */}
                <div>
                  <h4 
                    className="text-sm font-medium mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Backgrounds
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded border"
                        style={{ 
                          backgroundColor: colors.background,
                          borderColor: colors.border
                        }}
                      />
                      <span className="text-xs" style={{ color: colors.textTertiary }}>
                        Background
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded border"
                        style={{ 
                          backgroundColor: colors.surface,
                          borderColor: colors.border
                        }}
                      />
                      <span className="text-xs" style={{ color: colors.textTertiary }}>
                        Surface
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Colors */}
                <div>
                  <h4 
                    className="text-sm font-medium mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Text Colors
                  </h4>
                  <div className="space-y-1">
                    <div style={{ color: colors.textPrimary }} className="text-sm">
                      Primary Text
                    </div>
                    <div style={{ color: colors.textSecondary }} className="text-sm">
                      Secondary Text
                    </div>
                    <div style={{ color: colors.textTertiary }} className="text-sm">
                      Tertiary Text
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SlideIn>

    </div>
  )
}

export default SettingsPage