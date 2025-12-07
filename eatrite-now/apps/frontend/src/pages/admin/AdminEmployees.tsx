import React, { useState } from 'react';
import { 
  Users,
  UserPlus,
  Mail,
  UserCheck,
  Search,
  Filter,
  Edit
} from 'lucide-react';

/**
 * COMPANY ADMIN EMPLOYEES PAGE - EatRite Work (Cincinnati)
 * 
 * Purpose: Provides company admins with a centralized roster to manage employee access, 
 * invite new users, and monitor participation status across the organization.
 * 
 * Primary Control: "Who has access to the meal program, and how do I add or remove employees?"
 * 
 * This page focuses on operational access management with clear status indicators
 * and straightforward invite workflows.
 * 
 * TODO: Connect to employee management API
 * TODO: Implement invite functionality
 * TODO: Add employee edit/remove actions
 * TODO: Wire up search and filtering
 * TODO: Implement pagination
 */

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  status: 'active' | 'invited' | 'inactive';
  role: string;
  joinDate: string;
}

const AdminEmployees: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'invited' | 'inactive'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Placeholder employee data
   * TODO: Replace with API data
   */
  const employees: Employee[] = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.j@cincymfg.com', department: 'Engineering', status: 'active', role: 'Employee', joinDate: 'Jan 15, 2025' },
    { id: '2', name: 'Michael Chen', email: 'michael.c@cincymfg.com', department: 'Engineering', status: 'active', role: 'Employee', joinDate: 'Jan 20, 2025' },
    { id: '3', name: 'Emily Rodriguez', email: 'emily.r@cincymfg.com', department: 'Operations', status: 'active', role: 'Employee', joinDate: 'Feb 1, 2025' },
    { id: '4', name: 'David Park', email: 'david.p@cincymfg.com', department: 'Sales', status: 'invited', role: 'Employee', joinDate: 'Nov 25, 2025' },
    { id: '5', name: 'Jessica Martinez', email: 'jessica.m@cincymfg.com', department: 'Operations', status: 'active', role: 'Employee', joinDate: 'Mar 10, 2025' },
    { id: '6', name: 'Robert Taylor', email: 'robert.t@cincymfg.com', department: 'Engineering', status: 'inactive', role: 'Employee', joinDate: 'Jan 5, 2025' },
    { id: '7', name: 'Amanda White', email: 'amanda.w@cincymfg.com', department: 'Sales', status: 'active', role: 'Employee', joinDate: 'Apr 12, 2025' },
    { id: '8', name: 'James Wilson', email: 'james.w@cincymfg.com', department: 'Operations', status: 'active', role: 'Employee', joinDate: 'Feb 20, 2025' },
    { id: '9', name: 'Linda Brown', email: 'linda.b@cincymfg.com', department: 'Engineering', status: 'invited', role: 'Employee', joinDate: 'Nov 28, 2025' },
    { id: '10', name: 'Christopher Lee', email: 'chris.l@cincymfg.com', department: 'Sales', status: 'active', role: 'Employee', joinDate: 'May 1, 2025' },
    { id: '11', name: 'Patricia Davis', email: 'patricia.d@cincymfg.com', department: 'Operations', status: 'active', role: 'Employee', joinDate: 'Mar 15, 2025' },
    { id: '12', name: 'Daniel Moore', email: 'daniel.m@cincymfg.com', department: 'Engineering', status: 'inactive', role: 'Employee', joinDate: 'Jan 10, 2025' }
  ];

  /**
   * Calculate stats
   */
  const stats = {
    total: employees.length,
    active: employees.filter(e => e.status === 'active').length,
    invited: employees.filter(e => e.status === 'invited').length,
    inactive: employees.filter(e => e.status === 'inactive').length
  };

  /**
   * Filter employees
   * TODO: Implement actual filtering logic
   */
  const filteredEmployees = employees.filter(emp => {
    if (activeFilter !== 'all' && emp.status !== activeFilter) return false;
    if (searchQuery && !emp.name.toLowerCase().includes(searchQuery.toLowerCase()) 
        && !emp.email.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  /**
   * Helper function to render status badge
   */
  const renderStatusBadge = (status: 'active' | 'invited' | 'inactive') => {
    const config = {
      active: {
        icon: UserCheck,
        label: 'Active',
        color: 'bg-green-100 text-green-700 border-green-200'
      },
      invited: {
        icon: Mail,
        label: 'Invited',
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200'
      },
      inactive: {
        icon: Users,
        label: 'Inactive',
        color: 'bg-gray-100 text-gray-700 border-gray-200'
      }
    };

    const { icon: Icon, label, color } = config[status];

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${color}`}>
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Section 1: Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-600 mt-2">
            Manage access and monitor participation across your team
          </p>
        </div>
        
        {/* Invite Employee Button */}
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm">
          <UserPlus className="w-5 h-5" />
          Invite Employee
        </button>
      </div>

      {/* Section 2: Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat 1: Total Employees */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Total Employees</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {stats.total}
          </p>
          <p className="text-sm text-gray-600">
            Enrolled in program
          </p>
        </div>

        {/* Stat 2: Active Users */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Active Users</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {stats.active}
          </p>
          <p className="text-sm text-gray-600">
            {Math.round((stats.active / stats.total) * 100)}% participation rate
          </p>
        </div>

        {/* Stat 3: Pending Invites */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Mail className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Pending Invites</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {stats.invited}
          </p>
          <p className="text-sm text-gray-600">
            Awaiting acceptance
          </p>
        </div>
      </div>

      {/* Section 3: Filters & Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
        </div>

        {/* Status Filters */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by Status</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active ({stats.active})
            </button>
            <button
              onClick={() => setActiveFilter('invited')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'invited'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Invited ({stats.invited})
            </button>
            <button
              onClick={() => setActiveFilter('inactive')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'inactive'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Inactive ({stats.inactive})
            </button>
          </div>
        </div>
      </div>

      {/* Section 4: Employee Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Employee Roster
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? 's' : ''} 
            {activeFilter !== 'all' && ` (filtered by ${activeFilter})`}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {employee.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">
                      {employee.email}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">
                      {employee.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderStatusBadge(employee.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">
                      {employee.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {employee.joinDate}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                      title="View/Edit Employee"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 5: Table Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredEmployees.length} of {stats.total} employees
          </p>
          <a
            href="#"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Need help managing employees? →
          </a>
        </div>
      </div>

      {/* Empty State (shown when filtered results are empty) */}
      {filteredEmployees.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No employees found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? `No results for "${searchQuery}". Try a different search term.`
              : `No ${activeFilter} employees to display.`
            }
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminEmployees;
