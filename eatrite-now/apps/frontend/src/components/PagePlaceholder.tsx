import React from 'react';
import { Package } from 'lucide-react';

interface PagePlaceholderProps {
  title: string;
  description: string;
  role?: 'employee' | 'company_admin' | 'super_admin';
}

/**
 * Temporary placeholder component for pages not yet built.
 * 
 * Uses professional B2B SaaS styling consistent with EatRite Work design system.
 * Will be replaced with actual page implementations.
 */
const PagePlaceholder: React.FC<PagePlaceholderProps> = ({ 
  title, 
  description,
  role = 'employee' 
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-12 text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
            <Package className="w-10 h-10 text-primary-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-dm-sans font-bold text-neutral-900 mb-3 tracking-tight">
          {title}
        </h1>

        {/* Description */}
        <p className="text-[15px] font-inter text-neutral-600 mb-8 max-w-md mx-auto leading-relaxed">
          {description}
        </p>

        {/* Role Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-50 border border-neutral-200">
          <span className="w-2 h-2 rounded-full bg-accent-500"></span>
          <span className="text-[13px] font-inter font-medium text-neutral-700 capitalize">
            {role.replace('_', ' ')} View
          </span>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 pt-8 border-t border-neutral-100">
          <p className="text-[13px] font-inter text-neutral-500">
            This page is part of the EatRite Work platform architecture.
            <br />
            Implementation coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PagePlaceholder;
