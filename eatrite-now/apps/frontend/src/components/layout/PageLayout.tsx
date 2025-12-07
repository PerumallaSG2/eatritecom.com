import React, { useState } from 'react';
import TopNav from './TopNav';
import Sidebar from './Sidebar';

interface PageLayoutProps {
  children: React.ReactNode;
  role: 'employee' | 'company_admin' | 'super_admin';
}

/**
 * PageLayout - Master layout component for EatRite Work (Cincinnati)
 * 
 * Provides consistent structure across all authenticated pages:
 * - Top navigation bar with branding and user info
 * - Role-based sidebar navigation
 * - Main scrollable content area
 * 
 * This is a structural component only - no business logic or data fetching.
 * 
 * TODO: Wire up authentication context to get real user data
 * TODO: Add loading states during role verification
 * TODO: Handle unauthorized access redirects
 */
const PageLayout: React.FC<PageLayoutProps> = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left Sidebar - Fixed, role-aware navigation */}
      <Sidebar 
        role={role} 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar - Fixed */}
        <TopNav 
          role={role}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        />

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
