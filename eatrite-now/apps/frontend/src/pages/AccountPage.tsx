import React, { useState } from 'react';
import { 
  User, 
  Package, 
  CreditCard, 
  Gift, 
  Settings, 
  Bell,
  Shield,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { FadeIn } from '../components/AnimationComponents';
import SubscriptionManagement from '../components/SubscriptionManagement';
import PaymentMethods from '../components/PaymentMethods';
import OrderTracking from '../components/OrderTracking';
import PromoCodes from '../components/PromoCodes';

type AccountTab = 'profile' | 'subscription' | 'orders' | 'payment' | 'promos' | 'settings';

export const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AccountTab>('profile');

  const tabItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'subscription', label: 'Subscription', icon: Package },
    { id: 'orders', label: 'Order Tracking', icon: Package },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'promos', label: 'Promo Codes', icon: Gift },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'subscription':
        return <SubscriptionManagement />;
      case 'orders':
        return <OrderTracking />;
      case 'payment':
        return <PaymentMethods />;
      case 'promos':
        return <PromoCodes />;
      case 'settings':
        return <AccountSettings />;
      default:
        return <ProfileOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
            <p className="text-gray-600">Manage your profile, orders, and preferences</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <FadeIn delay={0.1}>
            <div className="lg:col-span-1">
              <nav className="bg-white rounded-lg shadow-md overflow-hidden">
                {tabItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as AccountTab)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      activeTab === id
                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                        : 'text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
                
                <div className="border-t border-gray-200">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 text-red-600 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </nav>
            </div>
          </FadeIn>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <FadeIn delay={0.2} key={activeTab}>
              {renderTabContent()}
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Overview Component
const ProfileOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
            <p className="text-sm text-gray-500">Member since December 2023</p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-800">Active Subscription</h3>
            <p className="text-2xl font-bold text-green-900">6 Meals</p>
            <p className="text-sm text-green-600">$162.00/week</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800">Total Orders</h3>
            <p className="text-2xl font-bold text-blue-900">12</p>
            <p className="text-sm text-blue-600">72 meals delivered</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800">Rewards Earned</h3>
            <p className="text-2xl font-bold text-purple-900">$75</p>
            <p className="text-sm text-purple-600">From 5 referrals</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Package className="w-6 h-6 text-blue-600" />
            <span className="font-medium text-gray-900">View Orders</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CreditCard className="w-6 h-6 text-green-600" />
            <span className="font-medium text-gray-900">Payment Methods</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Gift className="w-6 h-6 text-purple-600" />
            <span className="font-medium text-gray-900">Promo Codes</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="w-6 h-6 text-gray-600" />
            <span className="font-medium text-gray-900">Settings</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-900">Order delivered successfully</p>
              <p className="text-sm text-gray-500">January 15, 2024</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-900">Payment method updated</p>
              <p className="text-sm text-gray-500">January 12, 2024</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-900">Referral reward earned: $15</p>
              <p className="text-sm text-gray-500">January 10, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Account Settings Component
const AccountSettings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletters: true,
    sms: false
  });

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              defaultValue="John"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              defaultValue="Doe"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Bell className="w-5 h-5" />
          <span>Notification Preferences</span>
        </h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-sm text-gray-500">
                  {key === 'orderUpdates' && 'Get notified about order status changes'}
                  {key === 'promotions' && 'Receive promotional offers and discounts'}
                  {key === 'newsletters' && 'Weekly newsletters and meal recommendations'}
                  {key === 'sms' && 'SMS notifications for urgent updates'}
                </p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Security</span>
        </h3>
        <div className="space-y-4">
          <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Change Password</h4>
              <p className="text-sm text-gray-500">Update your account password</p>
            </div>
            <span className="text-blue-600">→</span>
          </button>
          <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <span className="text-blue-600">Setup</span>
          </button>
        </div>
      </div>

      {/* Help & Support */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <HelpCircle className="w-5 h-5" />
          <span>Help & Support</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <span className="font-medium text-gray-900">Contact Support</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <span className="font-medium text-gray-900">FAQ</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <span className="font-medium text-gray-900">Privacy Policy</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <span className="font-medium text-gray-900">Terms of Service</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;