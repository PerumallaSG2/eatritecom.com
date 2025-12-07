import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppLayout from '../components/layout/AppLayout';
import Loading from '../components/Loading';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EMPLOYEE ROLE PAGES
// Core question: "What should I do today?"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Lazy load employee pages
const EmployeeHome = lazy(() => import('../pages/employee/EmployeeHome'));
const EmployeeMeals = lazy(() => import('../pages/employee/EmployeeMeals'));
const EmployeeOrders = lazy(() => import('../pages/employee/EmployeeOrders'));
const EmployeeWellness = lazy(() => import('../pages/employee/EmployeeWellness'));
const EmployeeProfile = lazy(() => import('../pages/employee/EmployeeProfile'));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPANY ADMIN ROLE PAGES
// Core question: "Is this program worth the money?"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const AdminHome = lazy(() => import('../pages/admin/AdminHome'));
const AdminEmployees = lazy(() => import('../pages/admin/AdminEmployees'));
const AdminOrders = lazy(() => import('../pages/admin/AdminOrders'));
const AdminAnalytics = lazy(() => import('../pages/admin/AdminAnalytics'));
const AdminImpact = lazy(() => import('../pages/admin/AdminImpact'));
const AdminBilling = lazy(() => import('../pages/admin/AdminBilling'));
const AdminSettings = lazy(() => import('../pages/admin/AdminSettings'));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SUPER ADMIN ROLE PAGES
// Core question: "Is the platform healthy and growing?"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SuperAdminHome = lazy(() => import('../pages/super-admin/SuperAdminHome'));
const SuperAdminCompanies = lazy(() => import('../pages/super-admin/SuperAdminCompanies'));
const SuperAdminRevenue = lazy(() => import('../pages/super-admin/SuperAdminRevenue'));
const SuperAdminSystemHealth = lazy(() => import('../pages/super-admin/SuperAdminSystemHealth'));
const SuperAdminAudits = lazy(() => import('../pages/super-admin/SuperAdminAudits'));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEV TOOLS (DEV ONLY - Remove in production)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const UiStatePreview = lazy(() => import('../pages/dev/UiStatePreview'));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ROUTE GUARDS (Placeholder - will integrate with AuthContext)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: 'employee' | 'company_admin' | 'super_admin';
}

/**
 * Protected Route Wrapper
 * 
 * In production, this will:
 * 1. Check authentication status from AuthContext
 * 2. Verify user has correct role
 * 3. Redirect to login if not authenticated
 * 4. Show 403 if wrong role
 * 
 * For now: assumes authenticated with role from layout
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // TODO: Replace with real authentication check
  // const { user, isAuthenticated } = useAuth();
  // 
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }
  // 
  // if (user.role !== role) {
  //   return <Navigate to="/app/unauthorized" replace />;
  // }

  return <>{children}</>;
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APP ROUTES COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* ═══════════════════════════════════════════════════════════ */}
        {/* DEV TOOLS ROUTES (DEV ONLY - Remove in production)         */}
        {/* MUST BE FIRST to prevent redirect from catching /app/dev   */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <Route path="dev/ui-preview" element={<UiStatePreview />} />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ROOT APP REDIRECT                                           */}
        {/* ═══════════════════════════════════════════════════════════ */}
        
        {/* Redirect / to appropriate role home based on user */}
        <Route index element={<Navigate to="employee/home" replace />} />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* EMPLOYEE ROUTES                                             */}
        {/* User Type: Individual employees using meal benefits         */}
        {/* Entry Point: /app/employee/home                            */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <Route path="employee/*" element={
          <ProtectedRoute role="employee">
            <AppLayout role="employee">
              <Routes>
                <Route path="home" element={<EmployeeHome />} />
                <Route path="meals" element={<EmployeeMeals />} />
                <Route path="orders" element={<EmployeeOrders />} />
                <Route path="wellness" element={<EmployeeWellness />} />
                <Route path="profile" element={<EmployeeProfile />} />
                
                {/* Default redirect for /app/employee */}
                <Route path="" element={<Navigate to="home" replace />} />
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        } />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* COMPANY ADMIN ROUTES                                        */}
        {/* User Type: HR, Finance, Operations managing programs        */}
        {/* Entry Point: /app/admin/home                               */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <Route path="admin/*" element={
          <ProtectedRoute role="company_admin">
            <AppLayout role="company_admin">
              <Routes>
                <Route path="home" element={<AdminHome />} />
                <Route path="employees" element={<AdminEmployees />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="impact" element={<AdminImpact />} />
                <Route path="billing" element={<AdminBilling />} />
                <Route path="settings" element={<AdminSettings />} />
                
                {/* Default redirect for /app/admin */}
                <Route path="" element={<Navigate to="home" replace />} />
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        } />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SUPER ADMIN ROUTES                                          */}
        {/* User Type: EatRite platform operators                       */}
        {/* Entry Point: /app/super-admin/home                         */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <Route path="super-admin/*" element={
          <ProtectedRoute role="super_admin">
            <AppLayout role="super_admin">
              <Routes>
                <Route path="home" element={<SuperAdminHome />} />
                <Route path="companies" element={<SuperAdminCompanies />} />
                <Route path="revenue" element={<SuperAdminRevenue />} />
                <Route path="system-health" element={<SuperAdminSystemHealth />} />
                <Route path="audits" element={<SuperAdminAudits />} />
                
                {/* Default redirect for /app/super-admin */}
                <Route path="" element={<Navigate to="home" replace />} />
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        } />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* FALLBACK ROUTES                                             */}
        {/* ═══════════════════════════════════════════════════════════ */}

        {/* Catch-all for /app/* - redirect to employee home */}
        <Route path="*" element={<Navigate to="/app/employee/home" replace />} />
      </Routes>
    </Suspense>
  );
};
