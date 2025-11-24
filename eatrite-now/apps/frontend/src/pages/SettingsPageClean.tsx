import { useState } from 'react'
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Globe, 
  Palette,
  ChevronRight
} from 'lucide-react'

const SettingsPage = () => {
  // Simple state management
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false
  })

  // Simple handlers
  const toggleNotification = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  const goToProfile = () => window.location.href = '/profile'
  const goToPrivacy = () => window.location.href = '/privacy'
  const goToSecurity = () => window.location.href = '/security'

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Simple Header */}
        <div className="flex items-center mb-6">
          <SettingsIcon className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-gray-600">Manage your preferences</p>
          </div>
        </div>

        {/* Settings Cards */}
        <div className="space-y-4">
          
          {/* Account Settings */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="font-semibold mb-3 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Account
            </h2>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer" onClick={goToProfile}>
                <span>Profile Settings</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer" onClick={goToPrivacy}>
                <span>Privacy Settings</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer" onClick={goToSecurity}>
                <span>Security</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="font-semibold mb-3 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-500">Order updates</p>
                </div>
                <button
                  onClick={() => toggleNotification('push')}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    notifications.push ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications.push ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Weekly menu updates</p>
                </div>
                <button
                  onClick={() => toggleNotification('email')}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications.email ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Alerts</p>
                  <p className="text-sm text-gray-500">Delivery notifications</p>
                </div>
                <button
                  onClick={() => toggleNotification('sms')}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    notifications.sms ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications.sms ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="font-semibold mb-3 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Appearance
            </h2>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-gray-500">Light or dark mode</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Switch Theme
              </button>
            </div>
          </div>

        </div>

        {/* Simple Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          EatRite v1.0.0
        </div>

      </div>
    </div>
  )
}

export default SettingsPage