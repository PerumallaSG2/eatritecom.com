import React, { useState } from 'react'

// TypeScript Interfaces
interface ColorItem {
  name: string
  value: string
  description: string
}

interface TypographySample {
  name: string
  class: string
  sample: string
}

interface NavigationSection {
  key: string
  label: string
  icon: string
}

// Premium Design System Showcase
const DesignSystemShowcase: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('colors')

  // Premium Components
  const PremiumCard: React.FC<{
    children: React.ReactNode
    className?: string
    hover?: boolean
  }> = ({ children, className = '', hover = false }) => {
    return (
      <div
        className={`
          bg-white rounded-2xl shadow-sm border border-[#F9FAFB] p-6
          ${hover ? 'hover:shadow-lg transition-all duration-200 cursor-pointer' : ''}
          ${className}
        `}
      >
        {children}
      </div>
    )
  }

  const PremiumButton: React.FC<{
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    className?: string
    onClick?: () => void
  }> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
  }) => {
    const baseClass =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variants = {
      primary:
        'bg-[#0B4F3C] text-white hover:bg-[#083d2f] shadow-sm hover:shadow-md focus:ring-[#0B4F3C]',
      secondary:
        'bg-[#34D399] text-white hover:bg-[#10B981] shadow-sm hover:shadow-md focus:ring-[#34D399]',
      outline:
        'border border-[#D1D5DB] bg-white text-[#4B5563] hover:bg-[#F9FAFB] hover:border-[#6B7280] focus:ring-[#D1D5DB]',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-full',
      md: 'px-6 py-3 text-base rounded-xl',
      lg: 'px-8 py-4 text-lg rounded-xl',
    }

    return (
      <button
        className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  // Color palette
  const colorPalette: Record<string, ColorItem[]> = {
    primary: [
      { name: 'Pure White', value: '#FFFFFF', description: 'Main background' },
      {
        name: 'Soft Off-White',
        value: '#F9FAFB',
        description: 'Subtle backgrounds',
      },
      {
        name: 'Deep Green',
        value: '#0B4F3C',
        description: 'Primary brand color',
      },
      {
        name: 'Lux Gold',
        value: '#D4A857',
        description: 'Accent & highlights',
      },
    ],
    wellness: [
      {
        name: 'Success Green',
        value: '#34D399',
        description: 'Success states',
      },
      { name: 'Energy Green', value: '#10B981', description: 'Active states' },
      { name: 'Fresh Mint', value: '#6EE7B7', description: 'Light accents' },
      { name: 'Nature Dark', value: '#065F46', description: 'Dark green' },
    ],
    neutrals: [
      { name: 'Charcoal', value: '#111827', description: 'Primary text' },
      { name: 'Slate', value: '#4B5563', description: 'Secondary text' },
      { name: 'Gray', value: '#6B7280', description: 'Muted text' },
      {
        name: 'Light Gray',
        value: '#D1D5DB',
        description: 'Borders & dividers',
      },
      { name: 'Whisper', value: '#E5E7EB', description: 'Subtle borders' },
    ],
  }

  // Typography samples
  const typographySamples: TypographySample[] = [
    {
      name: 'Heading 1',
      class: 'text-5xl font-bold',
      sample: 'Premium Wellness Platform',
    },
    {
      name: 'Heading 2',
      class: 'text-4xl font-bold',
      sample: 'Transform Your Health Journey',
    },
    {
      name: 'Heading 3',
      class: 'text-3xl font-bold',
      sample: 'Personalized Nutrition',
    },
    {
      name: 'Heading 4',
      class: 'text-2xl font-bold',
      sample: 'Daily Wellness Tracking',
    },
    {
      name: 'Heading 5',
      class: 'text-xl font-bold',
      sample: 'Meal Recommendations',
    },
    {
      name: 'Heading 6',
      class: 'text-lg font-bold',
      sample: 'Nutrition Analytics',
    },
    {
      name: 'Body Large',
      class: 'text-lg',
      sample:
        'Discover meals tailored to your taste preferences and health goals.',
    },
    {
      name: 'Body Regular',
      class: 'text-base',
      sample:
        'Our AI-powered platform learns from your choices to recommend the perfect meals.',
    },
    {
      name: 'Body Small',
      class: 'text-sm',
      sample:
        'Track your wellness journey with comprehensive health metrics and insights.',
    },
    {
      name: 'Caption',
      class: 'text-xs text-[#6B7280]',
      sample: 'Last updated 2 hours ago',
    },
  ]

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#F9FAFB] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0B4F3C] to-[#34D399] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#111827]">
                  EatRite Design System
                </h1>
                <p className="text-sm text-[#6B7280]">
                  Premium wellness platform components
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <PremiumButton variant="outline" size="sm">
                📋 Export Tokens
              </PremiumButton>
              <PremiumButton variant="primary" size="sm">
                🎨 Figma Library
              </PremiumButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="flex space-x-2 mb-8">
          {(
            [
              { key: 'colors', label: 'Color Palette', icon: '🎨' },
              { key: 'typography', label: 'Typography', icon: '📝' },
              { key: 'components', label: 'Components', icon: '🧱' },
              { key: 'layouts', label: 'Layouts', icon: '📐' },
            ] as NavigationSection[]
          ).map(section => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                activeSection === section.key
                  ? 'bg-[#0B4F3C] text-white shadow-md'
                  : 'bg-white text-[#6B7280] hover:text-[#4B5563] hover:bg-[#F9FAFB] border border-[#E5E7EB]'
              }`}
            >
              <span>{section.icon}</span>
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </div>

        {/* Colors Section */}
        {activeSection === 'colors' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#111827] mb-2">
                Color Palette
              </h2>
              <p className="text-lg text-[#6B7280] mb-8">
                Our premium color system designed for wellness, trust, and
                modern aesthetics.
              </p>
            </div>

            {Object.entries(colorPalette).map(([category, colors]) => (
              <PremiumCard key={category} className="p-8">
                <h3 className="text-xl font-bold text-[#111827] mb-6 capitalize">
                  {category} Colors
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {colors.map((color, index) => (
                    <div key={index} className="space-y-3">
                      <div
                        className="w-full h-24 rounded-xl border border-[#E5E7EB] shadow-sm"
                        style={{ backgroundColor: color.value }}
                      ></div>
                      <div>
                        <h4 className="font-medium text-[#111827]">
                          {color.name}
                        </h4>
                        <p className="text-sm text-[#6B7280] font-mono">
                          {color.value}
                        </p>
                        <p className="text-xs text-[#6B7280] mt-1">
                          {color.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </PremiumCard>
            ))}
          </div>
        )}

        {/* Typography Section */}
        {activeSection === 'typography' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#111827] mb-2">
                Typography
              </h2>
              <p className="text-lg text-[#6B7280] mb-8">
                Inter font family with carefully crafted hierarchy for optimal
                readability and brand consistency.
              </p>
            </div>

            <PremiumCard className="p-8">
              <div className="space-y-8">
                {typographySamples.map((type, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-6 py-4 border-b border-[#F9FAFB] last:border-0"
                  >
                    <div className="min-w-32">
                      <p className="text-sm font-medium text-[#6B7280]">
                        {type.name}
                      </p>
                      <p className="text-xs text-[#6B7280] font-mono mt-1">
                        {type.class.replace('text-[#6B7280]', 'text-gray-500')}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className={`${type.class} text-[#111827]`}>
                        {type.sample}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </PremiumCard>

            <PremiumCard className="p-8">
              <h3 className="text-xl font-bold text-[#111827] mb-6">
                Font Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-[#111827] mb-2">
                    Primary Font
                  </h4>
                  <p
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: 'Inter' }}
                  >
                    Inter
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    Modern, highly legible sans-serif optimized for digital
                    interfaces
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-[#111827] mb-2">
                    Font Weights
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p className="font-normal">Regular (400)</p>
                    <p className="font-medium">Medium (500)</p>
                    <p className="font-semibold">Semibold (600)</p>
                    <p className="font-bold">Bold (700)</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-[#111827] mb-2">
                    Line Heights
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>Headings: 1.2x</p>
                    <p>Body: 1.5x</p>
                    <p>Captions: 1.4x</p>
                  </div>
                </div>
              </div>
            </PremiumCard>
          </div>
        )}

        {/* Components Section */}
        {activeSection === 'components' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#111827] mb-2">
                Components
              </h2>
              <p className="text-lg text-[#6B7280] mb-8">
                Premium UI components with consistent styling and interaction
                patterns.
              </p>
            </div>

            {/* Buttons */}
            <PremiumCard className="p-8">
              <h3 className="text-xl font-bold text-[#111827] mb-6">Buttons</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-[#111827] mb-3">
                    Primary Buttons
                  </h4>
                  <div className="flex flex-wrap items-center space-x-4">
                    <PremiumButton variant="primary" size="sm">
                      Small Button
                    </PremiumButton>
                    <PremiumButton variant="primary" size="md">
                      Medium Button
                    </PremiumButton>
                    <PremiumButton variant="primary" size="lg">
                      Large Button
                    </PremiumButton>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-[#111827] mb-3">
                    Secondary Buttons
                  </h4>
                  <div className="flex flex-wrap items-center space-x-4">
                    <PremiumButton variant="secondary" size="sm">
                      Small Button
                    </PremiumButton>
                    <PremiumButton variant="secondary" size="md">
                      Medium Button
                    </PremiumButton>
                    <PremiumButton variant="secondary" size="lg">
                      Large Button
                    </PremiumButton>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-[#111827] mb-3">
                    Outline Buttons
                  </h4>
                  <div className="flex flex-wrap items-center space-x-4">
                    <PremiumButton variant="outline" size="sm">
                      Small Button
                    </PremiumButton>
                    <PremiumButton variant="outline" size="md">
                      Medium Button
                    </PremiumButton>
                    <PremiumButton variant="outline" size="lg">
                      Large Button
                    </PremiumButton>
                  </div>
                </div>
              </div>
            </PremiumCard>

            {/* Cards */}
            <PremiumCard className="p-8">
              <h3 className="text-xl font-bold text-[#111827] mb-6">Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PremiumCard className="text-center">
                  <div className="w-12 h-12 bg-[#0B4F3C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#0B4F3C] text-xl">🍽️</span>
                  </div>
                  <h4 className="font-medium text-[#111827] mb-2">
                    Meal Tracking
                  </h4>
                  <p className="text-sm text-[#6B7280]">
                    Track your daily nutrition and meal preferences
                  </p>
                </PremiumCard>

                <PremiumCard hover className="text-center">
                  <div className="w-12 h-12 bg-[#34D399]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#34D399] text-xl">📊</span>
                  </div>
                  <h4 className="font-medium text-[#111827] mb-2">Analytics</h4>
                  <p className="text-sm text-[#6B7280]">
                    Detailed insights into your wellness journey
                  </p>
                </PremiumCard>

                <PremiumCard className="text-center">
                  <div className="w-12 h-12 bg-[#D4A857]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#D4A857] text-xl">⚡</span>
                  </div>
                  <h4 className="font-medium text-[#111827] mb-2">
                    Quick Orders
                  </h4>
                  <p className="text-sm text-[#6B7280]">
                    Fast meal ordering with saved preferences
                  </p>
                </PremiumCard>
              </div>
            </PremiumCard>

            {/* Form Elements */}
            <PremiumCard className="p-8">
              <h3 className="text-xl font-bold text-[#111827] mb-6">
                Form Elements
              </h3>
              <div className="space-y-6 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-[#D1D5DB] rounded-xl focus:ring-2 focus:ring-[#0B4F3C] focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Meal Preferences
                  </label>
                  <select className="w-full px-4 py-3 border border-[#D1D5DB] rounded-xl focus:ring-2 focus:ring-[#0B4F3C] focus:border-transparent transition-all duration-200">
                    <option>Vegetarian</option>
                    <option>Vegan</option>
                    <option>Omnivore</option>
                    <option>Keto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    placeholder="Any dietary restrictions or preferences?"
                    rows={3}
                    className="w-full px-4 py-3 border border-[#D1D5DB] rounded-xl focus:ring-2 focus:ring-[#0B4F3C] focus:border-transparent transition-all duration-200 resize-none"
                  ></textarea>
                </div>
              </div>
            </PremiumCard>
          </div>
        )}

        {/* Layouts Section */}
        {activeSection === 'layouts' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#111827] mb-2">
                Layout System
              </h2>
              <p className="text-lg text-[#6B7280] mb-8">
                Consistent spacing, grid systems, and layout patterns for
                premium user experiences.
              </p>
            </div>

            {/* Spacing System */}
            <PremiumCard className="p-8">
              <h3 className="text-xl font-bold text-[#111827] mb-6">
                Spacing System
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'XS', value: '6px', class: 'w-1.5 h-4' },
                  { name: 'SM', value: '12px', class: 'w-3 h-4' },
                  { name: 'MD', value: '16px', class: 'w-4 h-4' },
                  { name: 'LG', value: '24px', class: 'w-6 h-4' },
                  { name: 'XL', value: '32px', class: 'w-8 h-4' },
                  { name: '2XL', value: '40px', class: 'w-10 h-4' },
                ].map(spacing => (
                  <div
                    key={spacing.name}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 text-sm font-medium text-[#6B7280]">
                      {spacing.name}
                    </div>
                    <div
                      className={`${spacing.class} bg-[#0B4F3C] rounded`}
                    ></div>
                    <div className="text-sm text-[#6B7280]">
                      {spacing.value}
                    </div>
                  </div>
                ))}
              </div>
            </PremiumCard>

            {/* Grid System */}
            <PremiumCard className="p-8">
              <h3 className="text-xl font-bold text-[#111827] mb-6">
                Grid System
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-12 gap-4">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className="h-8 bg-[#0B4F3C]/10 rounded flex items-center justify-center text-xs font-medium text-[#0B4F3C]"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="h-20 bg-[#34D399]/10 rounded-xl flex items-center justify-center text-sm font-medium text-[#34D399]">
                    1/3 Column
                  </div>
                  <div className="h-20 bg-[#34D399]/10 rounded-xl flex items-center justify-center text-sm font-medium text-[#34D399]">
                    1/3 Column
                  </div>
                  <div className="h-20 bg-[#34D399]/10 rounded-xl flex items-center justify-center text-sm font-medium text-[#34D399]">
                    1/3 Column
                  </div>
                </div>
              </div>
            </PremiumCard>

            {/* Border Radius */}
            <PremiumCard className="p-8">
              <h3 className="text-xl font-bold text-[#111827] mb-6">
                Border Radius
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: 'Small', value: '8px', class: 'rounded-lg' },
                  { name: 'Medium', value: '12px', class: 'rounded-xl' },
                  { name: 'Large', value: '16px', class: 'rounded-2xl' },
                  { name: 'Extra Large', value: '20px', class: 'rounded-3xl' },
                ].map(radius => (
                  <div key={radius.name} className="text-center">
                    <div
                      className={`w-20 h-20 bg-[#0B4F3C]/10 ${radius.class} mx-auto mb-3`}
                    ></div>
                    <p className="text-sm font-medium text-[#111827]">
                      {radius.name}
                    </p>
                    <p className="text-xs text-[#6B7280]">{radius.value}</p>
                  </div>
                ))}
              </div>
            </PremiumCard>
          </div>
        )}
      </div>
    </div>
  )
}

export default DesignSystemShowcase
