/**
 * Public Layout
 * For unauthenticated pages (login, marketing)
 */

import React from 'react'

interface PublicLayoutProps {
  children: React.ReactNode
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-semibold text-gray-900">
                EatRite
              </span>
              <span className="ml-3 text-sm text-gray-500">
                Corporate Wellness Platform
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>

      {/* Simple footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} EatRite. Enterprise Meal Operations Platform.</p>
            <p className="mt-2">
              <a href="/terms" className="text-gray-600 hover:text-gray-900">Terms</a>
              {' · '}
              <a href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy</a>
              {' · '}
              <a href="/support" className="text-gray-600 hover:text-gray-900">Support</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
