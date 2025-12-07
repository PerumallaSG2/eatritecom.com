/**
 * Layout Components for EatRite Work – Cincinnati
 * 
 * Exports:
 * - PageLayout: Master layout wrapper (TopNav + Sidebar + Content)
 * - TopNav: Top navigation bar
 * - Sidebar: Role-based sidebar navigation
 * 
 * Usage:
 * ```tsx
 * import { PageLayout } from '@/components/layout';
 * 
 * <PageLayout role="employee">
 *   <YourPageContent />
 * </PageLayout>
 * ```
 */

export { default as PageLayout } from './PageLayout';
export { default as TopNav } from './TopNav';
export { default as Sidebar } from './Sidebar';

// Legacy export for backward compatibility
export { default as AppLayout } from './AppLayout';
