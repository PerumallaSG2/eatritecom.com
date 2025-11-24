import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Globe, 
  Palette,
  ChevronRight,
  LucideIcon
} from 'lucide-react'

// Types for better code clarity
interface SettingItemProps {
  icon: LucideIcon
  title: string
  description: string
  action?: boolean
  onClick?: () => void
}

interface SettingToggleProps {
  icon: LucideIcon
  title: string
  description: string
  enabled: boolean
  onChange: (value: boolean) => void
}

interface SettingsSectionProps {
  title: string
  icon: LucideIcon
  children: React.ReactNode
}

// Simple components for better readability
const SettingItem = ({ icon: Icon, title, description, action, onClick }: SettingItemProps) => (
  <div 
    className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer rounded-lg"
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      <Icon className="w-5 h-5 text-gray-600" />
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
    {action && <ChevronRight className="w-5 h-5 text-gray-400" />}
  </div>
)

const SettingToggle = ({ icon: Icon, title, description, enabled, onChange }: SettingToggleProps) => (
  <div className="flex items-center justify-between p-4">
    <div className="flex items-center space-x-3">
      <Icon className="w-5 h-5 text-gray-600" />
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
)

const SettingsSection = ({ title, icon: Icon, children }: SettingsSectionProps) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <Icon className="w-5 h-5 text-gray-700" />
        <h2 className="font-semibold text-gray-900">{title}</h2>
      </div>
    </div>
    <div className="divide-y divide-gray-200">
      {children}
    </div>
  </div>
)

const SettingsPage = () => {
  const { toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false
  })

  const handleNotificationChange = (type: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [type]: value }))
  }

  const navigateToProfile = () => {
    // Navigate to profile page
    console.log('Navigate to profile')
  }

  const navigateToPrivacy = () => {
    // Navigate to privacy page
    console.log('Navigate to privacy')
  }

  const navigateToSecurity = () => {
    // Navigate to security page
    console.log('Navigate to security')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          </div>
          <p className="text-gray-600">Manage your account and app preferences</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          
          {/* Appearance Settings */}
          <SettingsSection title="Appearance" icon={Palette}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Theme</h3>
                  <p className="text-sm text-gray-500">Choose your preferred theme</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Switch Theme
                </button>
              </div>
            </div>
          </SettingsSection>

          {/* Account Settings */}
          <SettingsSection title="Account" icon={User}>
            <SettingItem
              icon={User}
              title="Profile Settings"
              description="Manage your account information"
              action={true}
              onClick={navigateToProfile}
            />
            <SettingItem
              icon={Globe}
              title="Privacy Settings"
              description="Control your data and privacy"
              action={true}
              onClick={navigateToPrivacy}
            />
            <SettingItem
              icon={SettingsIcon}
              title="Security"
              description="Password and authentication"
              action={true}
              onClick={navigateToSecurity}
            />
          </SettingsSection>

          {/* Notification Settings */}
          <SettingsSection title="Notifications" icon={Bell}>
            <SettingToggle
              icon={Bell}
              title="Push Notifications"
              description="Order updates and promotions"
              enabled={notifications.push}
              onChange={(value) => handleNotificationChange('push', value)}
            />
            <SettingToggle
              icon={Globe}
              title="Email Notifications"
              description="Weekly menu and offers"
              enabled={notifications.email}
              onChange={(value) => handleNotificationChange('email', value)}
            />
            <SettingToggle
              icon={Bell}
              title="SMS Alerts"
              description="Delivery notifications"
              enabled={notifications.sms}
              onChange={(value) => handleNotificationChange('sms', value)}
            />
          </SettingsSection>

        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500">
          <p className="text-sm">EatRite v1.0.0</p>
        </div>

      </div>
    </div>
  )
}

export default SettingsPage