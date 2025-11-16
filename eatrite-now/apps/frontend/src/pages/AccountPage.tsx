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
  LogOut,
  ChevronRight,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Award,
  TrendingUp
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
    <div className="min-h-screen bg-[#F5EEDC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#0F2B1E] mb-3 font-playfair">Account Overview</h1>
            <p className="text-gray-600 max-w-2xl">
              Manage your subscription, track orders, and customize your EatRite experience
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Elegant Sidebar Navigation */}
          <FadeIn delay={0.1}>
            <div className="lg:col-span-1">
              <nav className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {tabItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as AccountTab)}
                    className={`w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-all duration-200 ${
                      activeTab === id
                        ? 'bg-[#F5F2E8] text-[#0F2B1E] border-r-2 border-[#D4B46A]'
                        : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activeTab === id ? 'bg-[#D4B46A]/20' : 'bg-gray-50'
                      }`}>
                        <Icon className={`w-4 h-4 ${activeTab === id ? 'text-[#D4B46A]' : 'text-gray-500'}`} />
                      </div>
                      <span className="font-medium">{label}</span>
                    </div>
                    {activeTab === id && (
                      <ChevronRight className="w-4 h-4 text-[#D4B46A]" />
                    )}
                  </button>
                ))}
                
                <div className="border-t border-gray-200">
                  <button className="w-full flex items-center space-x-3 px-6 py-4 text-left hover:bg-red-50 text-red-600 transition-colors duration-200">
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                      <LogOut className="w-4 h-4 text-red-500" />
                    </div>
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
      {/* Enhanced Profile Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-[#0F2B1E] to-[#1a4d33] rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-[#0F2B1E] mb-2 font-playfair">John Doe</h2>
              <div className="flex items-center text-gray-600 mb-2">
                <Mail className="w-4 h-4 mr-2" />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Member since December 2023</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#D4B46A]/20 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-[#D4B46A]" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Membership Status</div>
              <div className="font-semibold text-[#0F2B1E]">Premium Member</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-green-800">Active Plan</h3>
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-900 mb-1">6 Meals</p>
            <p className="text-sm text-green-600 font-medium">$162.00/week</p>
            <div className="mt-3 flex items-center text-xs text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              Next delivery: Wed, Jan 24
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-blue-800">Total Orders</h3>
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-900 mb-1">12</p>
            <p className="text-sm text-blue-600 font-medium">72 meals delivered</p>
            <div className="mt-3 flex items-center text-xs text-blue-700">
              <Calendar className="w-3 h-3 mr-1" />
              Last order: Jan 17, 2024
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#F5F2E8] to-[#F5EEDC] rounded-lg p-6 border border-[#D4B46A]/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#0F2B1E]">Rewards Earned</h3>
              <Gift className="w-5 h-5 text-[#D4B46A]" />
            </div>
            <p className="text-3xl font-bold text-[#0F2B1E] mb-1">$75</p>
            <p className="text-sm text-gray-600 font-medium">From 5 referrals</p>
            <div className="mt-3 flex items-center text-xs text-gray-600">
              <Award className="w-3 h-3 mr-1" />
              $25 credit available
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h3 className="text-xl font-semibold text-[#0F2B1E] mb-6 font-playfair">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="group flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:border-[#D4B46A] hover:bg-[#F5F2E8] transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-50 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">View Orders</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#D4B46A] transition-colors" />
          </button>
          <button className="group flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:border-[#D4B46A] hover:bg-[#F5F2E8] transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-50 group-hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-medium text-gray-900">Payment</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#D4B46A] transition-colors" />
          </button>
          <button className="group flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:border-[#D4B46A] hover:bg-[#F5F2E8] transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-50 group-hover:bg-purple-100 rounded-lg flex items-center justify-center transition-colors">
                <Gift className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-medium text-gray-900">Rewards</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#D4B46A] transition-colors" />
          </button>
          <button className="group flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:border-[#D4B46A] hover:bg-[#F5F2E8] transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-50 group-hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </div>
              <span className="font-medium text-gray-900">Settings</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#D4B46A] transition-colors" />
          </button>
        </div>
      </div>

      {/* Enhanced Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-[#0F2B1E] font-playfair">Recent Activity</h3>
          <button className="text-[#D4B46A] hover:text-[#b8986b] transition-colors text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-green-800">Order delivered successfully</p>
              <p className="text-sm text-green-600 mt-1">3 meals from Chef's Signature collection</p>
              <p className="text-xs text-green-500 mt-2">January 15, 2024 • 2:30 PM</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-blue-800">Payment method updated</p>
              <p className="text-sm text-blue-600 mt-1">Added new Visa card ending in 4242</p>
              <p className="text-xs text-blue-500 mt-2">January 12, 2024 • 11:45 AM</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-[#F5F2E8] rounded-lg border border-[#D4B46A]/30">
            <div className="w-10 h-10 bg-[#D4B46A]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Gift className="w-5 h-5 text-[#D4B46A]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-[#0F2B1E]">Referral reward earned: $15</p>
              <p className="text-sm text-gray-600 mt-1">Sarah M. joined using your referral link</p>
              <p className="text-xs text-gray-500 mt-2">January 10, 2024 • 4:20 PM</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Settings className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Dietary preferences updated</p>
              <p className="text-sm text-gray-600 mt-1">Added gluten-free to restrictions</p>
              <p className="text-xs text-gray-500 mt-2">January 8, 2024 • 9:15 AM</p>
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
      {/* Enhanced Personal Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-[#F5F2E8] rounded-lg flex items-center justify-center mr-4">
            <User className="w-5 h-5 text-[#D4B46A]" />
          </div>
          <h3 className="text-xl font-semibold text-[#0F2B1E] font-playfair">Personal Information</h3>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#0F2B1E] mb-2">First Name</label>
            <input
              type="text"
              defaultValue="John"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A] focus:border-[#D4B46A] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F2B1E] mb-2">Last Name</label>
            <input
              type="text"
              defaultValue="Doe"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A] focus:border-[#D4B46A] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F2B1E] mb-2">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A] focus:border-[#D4B46A] transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F2B1E] mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A] focus:border-[#D4B46A] transition-colors"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#0F2B1E] mb-2">Delivery Address</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-4" />
              <textarea
                defaultValue="123 Main Street, Apt 4B&#10;New York, NY 10001"
                rows={3}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A] focus:border-[#D4B46A] transition-colors resize-none"
              />
            </div>
          </div>
          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              className="bg-[#0F2B1E] hover:bg-[#1a4d33] text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Enhanced Notification Preferences */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-[#F5F2E8] rounded-lg flex items-center justify-center mr-4">
            <Bell className="w-5 h-5 text-[#D4B46A]" />
          </div>
          <h3 className="text-xl font-semibold text-[#0F2B1E] font-playfair">Communication Preferences</h3>
        </div>
        <div className="space-y-6">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-start justify-between py-4 border-b border-gray-100 last:border-0">
              <div className="flex-1">
                <h4 className="font-medium text-[#0F2B1E] capitalize mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {key === 'orderUpdates' && 'Receive real-time updates about your order status, delivery tracking, and meal preparation'}
                  {key === 'promotions' && 'Get notified about special offers, seasonal discounts, and exclusive member benefits'}
                  {key === 'newsletters' && 'Weekly curated content with new recipes, nutrition tips, and meal recommendations'}
                  {key === 'sms' && 'Urgent notifications via text message for delivery updates and account security'}
                </p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ml-6 ${
                  value ? 'bg-[#D4B46A]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
                    value ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Security Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-4">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-[#0F2B1E] font-playfair">Account Security</h3>
        </div>
        <div className="space-y-4">
          <button className="group flex items-center justify-between w-full p-6 border border-gray-200 rounded-lg hover:border-[#D4B46A] hover:bg-[#F5F2E8] transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-50 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-[#0F2B1E]">Change Password</h4>
                <p className="text-sm text-gray-600">Last updated 3 months ago</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#D4B46A] transition-colors" />
          </button>
          <button className="group flex items-center justify-between w-full p-6 border border-gray-200 rounded-lg hover:border-[#D4B46A] hover:bg-[#F5F2E8] transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-50 group-hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-[#0F2B1E]">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Add extra security to your account</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-[#D4B46A] font-medium">Setup</span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#D4B46A] transition-colors" />
            </div>
          </button>
        </div>
      </div>

      {/* Enhanced Help & Support */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-4">
            <HelpCircle className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-[#0F2B1E] font-playfair">Support & Resources</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="group flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:border-[#D4B46A] hover:bg-[#F5F2E8] transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-50 group-hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors">
                <HelpCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-medium text-[#0F2B1E]">Contact Support</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#D4B46A] transition-colors" />
          </button>
          <button className="group flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:border-[#D4B46A] hover:bg-[#F5F2E8] transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-50 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium text-[#0F2B1E]">FAQ</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#D4B46A] transition-colors" />
          </button>
          <button className="group flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:border-[#D4B46A] hover:bg-[#F5F2E8] transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-50 group-hover:bg-purple-100 rounded-lg flex items-center justify-center transition-colors">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-medium text-[#0F2B1E]">Privacy Policy</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#D4B46A] transition-colors" />
          </button>
          <button className="group flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:border-[#D4B46A] hover:bg-[#F5F2E8] transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-50 group-hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </div>
              <span className="font-medium text-[#0F2B1E]">Terms of Service</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#D4B46A] transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;