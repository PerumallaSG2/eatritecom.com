import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Package, 
  BarChart3, 
  Users, 
  CreditCard, 
  Settings, 
  Building2, 
  DollarSign, 
  ChefHat,
  Menu,
  Bell,
  ChevronLeft,
  TrendingUp,
  LucideIcon
} from 'lucide-react';
import EatRiteLogo from '../EatRiteLogo';

interface AppLayoutProps {
  children: React.ReactNode;
  role: 'employee' | 'company_admin' | 'super_admin';
}

interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Role-based navigation items
  const getNavItems = (): NavItem[] => {
    if (role === 'employee') {
      return [
        { label: 'Meal Portal', path: '/app/employee/home', icon: LayoutDashboard },
        { label: 'Available Meals', path: '/app/employee/meals', icon: UtensilsCrossed },
        { label: 'Order History', path: '/app/employee/orders', icon: Package },
        { label: 'Wellness', path: '/app/employee/wellness', icon: TrendingUp },
        { label: 'Profile', path: '/app/employee/profile', icon: Users },
      ];
    }

    if (role === 'company_admin') {
      return [
        { label: 'Program Dashboard', path: '/app/admin/home', icon: LayoutDashboard },
        { label: 'Financial Impact', path: '/app/admin/impact', icon: TrendingUp },
        { label: 'Analytics', path: '/app/admin/analytics', icon: BarChart3 },
        { label: 'Employee Management', path: '/app/admin/employees', icon: Users },
        { label: 'Orders', path: '/app/admin/orders', icon: Package },
        { label: 'Billing & Invoices', path: '/app/admin/billing', icon: CreditCard },
        { label: 'Settings', path: '/app/admin/settings', icon: Settings },
      ];
    }

    // super_admin
    return [
      { label: 'System Overview', path: '/app/super-admin/home', icon: LayoutDashboard },
      { label: 'Companies', path: '/app/super-admin/companies', icon: Building2 },
      { label: 'Revenue', path: '/app/super-admin/revenue', icon: DollarSign },
      { label: 'System Health', path: '/app/super-admin/system-health', icon: Settings },
      { label: 'Audit Logs', path: '/app/super-admin/audits', icon: ChefHat },
    ];
  };

  const navItems = getNavItems();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-neutral-200 transition-all duration-300 flex flex-col shadow-sm`}
      >
        {/* Logo */}
        <div className="h-16 border-b border-neutral-100 flex items-center justify-center px-4">
          {sidebarOpen ? (
            <div className="flex items-center gap-2.5">
              <EatRiteLogo className="h-8 w-8" />
              <div className="flex flex-col">
                <span className="text-base font-dm-sans font-bold text-primary-900 tracking-tight leading-none">
                  EatRite
                </span>
                <span className="text-[10px] font-inter font-medium text-neutral-500 tracking-wide uppercase">
                  Work
                </span>
              </div>
            </div>
          ) : (
            <EatRiteLogo className="h-8 w-8" />
          )}
        </div>

        {/* Navigation */}
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
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }
                `}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-primary-600' : ''}`} />
                {sidebarOpen && (
                  <span className="text-[13px] font-inter tracking-wide">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="h-14 border-t border-neutral-100 flex items-center justify-center gap-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 text-sm font-medium font-inter transition-all"
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs tracking-wide">Collapse</span>
            </>
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-dm-sans font-bold text-neutral-900 tracking-tight">
              {navItems.find((item) => isActive(item.path))?.label || 'Dashboard'}
            </h1>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {/* Role Switcher - DEV MODE */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
              <span className="text-xs font-semibold text-amber-700">VIEW AS:</span>
              <select
                value={role}
                onChange={(e) => {
                  const newRole = e.target.value as 'employee' | 'company_admin' | 'super_admin';
                  if (newRole === 'employee') navigate('/app/employee/home');
                  else if (newRole === 'company_admin') navigate('/app/admin/home');
                  else navigate('/app/super-admin/home');
                }}
                className="text-xs font-medium text-amber-900 bg-transparent border-none focus:outline-none cursor-pointer"
              >
                <option value="employee">Employee</option>
                <option value="company_admin">Company Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>

            {/* Notifications */}
            <button className="p-2.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 transition-colors relative group">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full ring-2 ring-white" />
            </button>

            {/* User Avatar & Dropdown */}
            <button
              onClick={() => {
                if (role === 'employee') navigate('/app/employee/profile');
                else if (role === 'company_admin') navigate('/app/admin/settings');
                else navigate('/app/super-admin/home');
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <div className="text-[13px] font-semibold font-inter text-neutral-900 leading-none mb-1">
                    John Doe
                  </div>
                  <div className="text-[11px] text-neutral-500 font-inter capitalize tracking-wide">
                    {role.replace('_', ' ')}
                  </div>
                </div>
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-bold font-dm-sans shadow-sm">
                  JD
                </div>
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-neutral-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
