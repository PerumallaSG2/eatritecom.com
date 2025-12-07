import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string; // Optional - if not provided, item won't be clickable
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb Navigation Component
 * 
 * Displays hierarchical navigation path for better user orientation
 * 
 * @example
 * <Breadcrumb items={[
 *   { label: 'Home', path: '/app/employee/home' },
 *   { label: 'Dashboard' }
 * ]} />
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-neutral-400 mx-2" />
              )}
              
              {item.path && !isLast ? (
                <Link
                  to={item.path}
                  className="flex items-center gap-1.5 text-neutral-600 hover:text-primary-600 transition-colors font-inter font-medium"
                >
                  {isFirst && <Home className="w-4 h-4" />}
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`flex items-center gap-1.5 font-inter ${
                    isLast
                      ? 'text-neutral-900 font-semibold'
                      : 'text-neutral-600 font-medium'
                  }`}
                >
                  {isFirst && <Home className="w-4 h-4" />}
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
