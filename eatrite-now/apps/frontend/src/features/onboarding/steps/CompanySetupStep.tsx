/**
 * Step 1: Company Setup
 * Company profile: name, industry, employee count
 */

import React, { useState } from 'react';
import { useUpdateCompanyProfile } from '../services';
import { INDUSTRY_OPTIONS, type CompanyProfileData } from '../types';

interface CompanySetupStepProps {
  companyId: string;
  onComplete: () => void;
}

export function CompanySetupStep({ companyId, onComplete }: CompanySetupStepProps) {
  const [formData, setFormData] = useState<CompanyProfileData>({
    name: '',
    industry: '',
    employeeCount: 0,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CompanyProfileData, string>>>({});

  const updateProfile = useUpdateCompanyProfile();

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CompanyProfileData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }

    if (!formData.industry) {
      newErrors.industry = 'Please select an industry';
    }

    if (!formData.employeeCount || formData.employeeCount < 1) {
      newErrors.employeeCount = 'Employee count must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await updateProfile.mutateAsync({
        companyId,
        profile: formData,
      });

      onComplete();
    } catch (error) {
      console.error('Failed to update company profile:', error);
      setErrors({ name: error instanceof Error ? error.message : 'Failed to save' });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Setup</h2>
      <p className="text-sm text-gray-600 mb-8">
        This information is used for billing and reporting.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Acme Corporation"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            id="industry"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.industry ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select industry...</option>
            {INDUSTRY_OPTIONS.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          {errors.industry && (
            <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
          )}
        </div>

        {/* Employee Count */}
        <div>
          <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Employees <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="employeeCount"
            value={formData.employeeCount || ''}
            onChange={(e) => setFormData({ ...formData, employeeCount: parseInt(e.target.value) || 0 })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.employeeCount ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., 150"
            min="1"
          />
          {errors.employeeCount && (
            <p className="mt-1 text-sm text-red-600">{errors.employeeCount}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={updateProfile.isPending}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {updateProfile.isPending ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}
