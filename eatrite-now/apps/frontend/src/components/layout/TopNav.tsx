import React from 'react';
import { Bell, Menu } from 'lucide-react';

interface TopNavProps {
  role: 'employee' | 'company_admin' | 'super_admin';
  onMenuClick: () => void;
}

/**
 * TopNav - Top navigation bar component
 * 
 * Displays:
 * - EatRite Work logo with Cincinnati branding
 * - Mobile hamburger menu button
 * - Notification bell (placeholder)
 * - User profile with avatar and role badge
 * 
 * This component is purely presentational.
 * 
 * TODO: Connect to real user context for name, email, avatar
 * TODO: Wire up notification system
 * TODO: Implement profile dropdown menu
 * TODO: Add logout functionality
 */
const TopNav: React.FC<TopNavProps> = ({ role, onMenuClick }) => {
  // TODO: Replace with real user data from context/auth
  const mockUser = {
    name: 'John Doe',
    initials: 'JD',
  };

  // Format role for display
  const roleLabel = role === 'company_admin' 
    ? 'Company Admin' 
    : role === 'super_admin'
    ? 'Super Admin'
    : 'Employee';

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
      {/* Left Section: Mobile Menu + Logo */}
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger Menu */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        {/* Logo + Cincinnati Branding */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-base">ER</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base font-bold text-gray-900 leading-none">EatRite Work</h1>
            <p className="text-xs text-gray-500 font-medium">Cincinnati</p>
          </div>
        </div>
      </div>

      {/* Right Section: Notifications + User Profile */}
      <div className="flex items-center gap-3">
        {/* Notifications - Placeholder */}
        <button 
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          {/* TODO: Show notification count dynamically */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile - Placeholder */}
        <button className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-none">
              {mockUser.name}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {roleLabel}
            </p>
          </div>
          <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-700 font-semibold text-sm">
              {mockUser.initials}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default TopNav;
