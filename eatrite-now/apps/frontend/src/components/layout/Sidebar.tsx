import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Package,
  Heart,
  User,
  Users,
  ShoppingCart,
  BarChart3,
  CreditCard,
  Settings,
  Building2,
  DollarSign,
  Activity,
  FileText,
  ChevronLeft,
  Menu,
} from 'lucide-react';

interface SidebarProps {
  role: 'employee' | 'company_admin' | 'super_admin';
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Sidebar - Role-based navigation sidebar
 * 
 * Renders different navigation items based on user role:
 * - Employee: Home, Meals, Orders, Wellness, Profile
 * - Company Admin: Overview, Employees, Orders, Analytics, Billing, Settings
 * - Super Admin: Overview, Companies, Revenue, System Health, Audit Logs
 * 
 * Features:
 * - Collapsible sidebar (full width <-> icon only)
 * - Active route highlighting
 * - Mobile responsive
 * - Cincinnati branding
 * 
 * This component handles navigation structure only.
 * 
 * TODO: Add permission checks per route
 * TODO: Add route loading states
 * TODO: Show badge counts (e.g., unread orders)
 */
const Sidebar: React.FC<SidebarProps> = ({ role, isOpen, onToggle }) => {
  const location = useLocation();

  /**
   * Get navigation items based on user role
   * Navigation structure defined in Step 1
   */
  const getNavItems = (): NavItem[] => {
    // EMPLOYEE ROLE - Personal meal management
    if (role === 'employee') {
      return [
        { label: 'Home', path: '/app/employee/home', icon: LayoutDashboard },
        { label: 'Meals', path: '/app/employee/meals', icon: UtensilsCrossed },
        { label: 'Orders', path: '/app/employee/orders', icon: Package },
        { label: 'Wellness', path: '/app/employee/wellness', icon: Heart },
        { label: 'Profile', path: '/app/employee/profile', icon: User },
      ];
    }

    // COMPANY ADMIN ROLE - Company program management
    if (role === 'company_admin') {
      return [
        { label: 'Overview', path: '/app/admin/home', icon: LayoutDashboard },
        { label: 'Employees', path: '/app/admin/employees', icon: Users },
        { label: 'Orders', path: '/app/admin/orders', icon: ShoppingCart },
        { label: 'Analytics', path: '/app/admin/analytics', icon: BarChart3 },
        { label: 'Billing', path: '/app/admin/billing', icon: CreditCard },
        { label: 'Settings', path: '/app/admin/settings', icon: Settings },
      ];
    }

    // SUPER ADMIN ROLE - Platform operations
    return [
      { label: 'Overview', path: '/app/super-admin/home', icon: LayoutDashboard },
      { label: 'Companies', path: '/app/super-admin/companies', icon: Building2 },
      { label: 'Revenue', path: '/app/super-admin/revenue', icon: DollarSign },
      { label: 'System Health', path: '/app/super-admin/system-health', icon: Activity },
      { label: 'Audit Logs', path: '/app/super-admin/audits', icon: FileText },
    ];
  };

  const navItems = getNavItems();
  const isActive = (path: string) => location.pathname === path;

  // Format role for display
  const roleLabel = role === 'company_admin' 
    ? 'Company Admin' 
    : role === 'super_admin'
    ? 'Super Admin'
    : 'Employee';

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-0 lg:w-20'
      } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out overflow-hidden flex flex-col shadow-sm`}
    >
      {/* Sidebar Header - Logo */}
      <div className="h-16 border-b border-gray-100 flex items-center justify-center px-4 flex-shrink-0">
        {isOpen ? (
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base">ER</span>
            </div>
            <div>
              <p className="text-base font-bold text-gray-900 leading-none">EatRite Work</p>
              <p className="text-xs text-gray-500 font-medium">Cincinnati</p>
            </div>
          </div>
        ) : (
          <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-base">ER</span>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${
                  active
                    ? 'bg-primary-50 text-primary-700 font-semibold shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
              title={item.label}
            >
              <Icon 
                className={`w-5 h-5 flex-shrink-0 ${active ? 'text-primary-600' : ''}`} 
              />
              {isOpen && (
                <span className="text-sm font-medium truncate">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer - Role Badge + Collapse Toggle */}
      <div className="flex-shrink-0 border-t border-gray-100">
        {/* Role Badge - Only show when expanded */}
        {isOpen && (
          <div className="p-4">
            <div className="px-3 py-2 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Signed in as</p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">
                {roleLabel}
              </p>
            </div>
          </div>
        )}

        {/* Collapse Toggle Button */}
        <button
          onClick={onToggle}
          className="w-full h-12 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-gray-600 hover:text-gray-900"
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs font-medium">Collapse</span>
            </>
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
