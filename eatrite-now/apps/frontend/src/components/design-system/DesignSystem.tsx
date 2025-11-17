import React, { useState } from 'react'

// Premium Design System Components
const DesignSystemShowcase: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    'colors' | 'typography' | 'components' | 'layouts'
  >('colors')

  // Design System Colors
  const colors = {
    backgrounds: {
      'Pure White': '#FFFFFF',
      'Soft Off-White': '#F9FAFB',
    },
    accents: {
      'Deep Green': '#0B4F3C',
      'Lux Gold': '#D4A857',
    },
    neutrals: {
      'Headline Black': '#111827',
      'Dark Grey': '#4B5563',
      'Muted Grey': '#6B7280',
      'Light Grey Border': '#D1D5DB',
    },
    wellness: {
      'Soft Green': '#34D399',
      Emerald: '#10B981',
    },
  }

  // Premium Components
  const PremiumButton: React.FC<{
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    className?: string
  }> = ({ children, variant = 'primary', size = 'md', className = '' }) => {
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
      >
        {children}
      </button>
    )
  }

  const PremiumCard: React.FC<{
    children: React.ReactNode
    className?: string
    hover?: boolean
  }> = ({ children, className = '', hover = false }) => {
    return (
      <div
        className={`
        bg-white rounded-2xl shadow-sm border border-[#F9FAFB] p-6
        ${hover ? 'hover:shadow-lg transition-shadow duration-200' : ''}
        ${className}
      `}
      >
        {children}
      </div>
    )
  }

  const PremiumInput: React.FC<{
    placeholder?: string
    type?: string
    label?: string
    className?: string
  }> = ({ placeholder, type = 'text', label, className = '' }) => {
    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-medium text-[#4B5563] mb-2">
            {label}
          </label>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-[#D1D5DB] rounded-xl 
                   focus:ring-2 focus:ring-[#0B4F3C] focus:border-transparent
                   text-[#111827] placeholder-[#6B7280] transition-colors"
        />
      </div>
    )
  }

  const MetricCard: React.FC<{
    title: string
    value: string
    change?: string
    icon: string
    color?: 'green' | 'gold' | 'neutral'
  }> = ({ title, value, change, icon, color = 'green' }) => {
    const colorClasses = {
      green: 'bg-[#34D399]/10 text-[#0B4F3C]',
      gold: 'bg-[#D4A857]/10 text-[#D4A857]',
      neutral: 'bg-[#F9FAFB] text-[#4B5563]',
    }

    return (
      <PremiumCard className="text-center">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${colorClasses[color]}`}
        >
          <span className="text-xl">{icon}</span>
        </div>
        <h3 className="text-2xl font-bold text-[#111827] mb-1">{value}</h3>
        <p className="text-sm text-[#6B7280] mb-1">{title}</p>
        {change && (
          <p className="text-xs text-[#34D399] font-medium">{change}</p>
        )}
      </PremiumCard>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Navigation */}
      <nav className="bg-white border-b border-[#F9FAFB] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#0B4F3C] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <h1 className="text-xl font-bold text-[#111827]">
                EatRite Design System
              </h1>
            </div>

            <div className="flex space-x-6">
              {['colors', 'typography', 'components', 'layouts'].map(
                section => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section as any)}
                    className={`text-sm font-medium capitalize transition-colors ${
                      activeSection === section
                        ? 'text-[#0B4F3C]'
                        : 'text-[#6B7280] hover:text-[#4B5563]'
                    }`}
                  >
                    {section}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Colors Section */}
        {activeSection === 'colors' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-[#111827] mb-8">
                Color Palette
              </h2>
              <p className="text-lg text-[#6B7280] mb-12 max-w-3xl">
                Our premium color system emphasizes trust, wellness, and
                sophistication. Each color is carefully selected to communicate
                luxury health and corporate intelligence.
              </p>
            </div>

            {Object.entries(colors).map(([category, colorSet]) => (
              <div key={category}>
                <h3 className="text-xl font-semibold text-[#111827] mb-6 capitalize">
                  {category.replace('_', ' ')}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {Object.entries(colorSet).map(([name, hex]) => (
                    <PremiumCard key={name} className="text-center">
                      <div
                        className="w-full h-20 rounded-xl mb-4 border border-[#F9FAFB]"
                        style={{ backgroundColor: hex }}
                      />
                      <h4 className="font-medium text-[#111827] mb-1">
                        {name}
                      </h4>
                      <p className="text-sm text-[#6B7280] font-mono">{hex}</p>
                    </PremiumCard>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Typography Section */}
        {activeSection === 'typography' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-[#111827] mb-8">
                Typography
              </h2>
              <p className="text-lg text-[#6B7280] mb-12 max-w-3xl">
                Clean, modern typography using Inter for maximum readability and
                premium feel. Tight letter spacing and optimized line heights
                create a sophisticated hierarchy.
              </p>
            </div>

            <PremiumCard>
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-[#111827] mb-2">
                    Headline 1 - 32px Bold
                  </h1>
                  <p className="text-sm text-[#6B7280]">
                    Used for page titles and hero headlines
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#111827] mb-2">
                    Headline 2 - 24px Bold
                  </h2>
                  <p className="text-sm text-[#6B7280]">
                    Section headers and card titles
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#111827] mb-2">
                    Headline 3 - 20px Semibold
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    Subsection titles and component headers
                  </p>
                </div>

                <div>
                  <p className="text-lg text-[#4B5563] mb-2">
                    Body Large - 18px Regular
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    Primary body text for descriptions and content
                  </p>
                </div>

                <div>
                  <p className="text-base text-[#4B5563] mb-2">
                    Body Regular - 16px Regular
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    Standard body text and form inputs
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-[#6B7280] mb-2">
                    Label - 14px Medium
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    Form labels, captions, and small text
                  </p>
                </div>
              </div>
            </PremiumCard>
          </div>
        )}

        {/* Components Section */}
        {activeSection === 'components' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-[#111827] mb-8">
                Premium Components
              </h2>
              <p className="text-lg text-[#6B7280] mb-12 max-w-3xl">
                Consistent, minimal components that emphasize content and
                maintain the luxury aesthetic. Every interaction feels smooth
                and intentional.
              </p>
            </div>

            {/* Buttons */}
            <div>
              <h3 className="text-xl font-semibold text-[#111827] mb-6">
                Buttons
              </h3>
              <PremiumCard>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <PremiumButton variant="primary" size="lg">
                      Primary Large
                    </PremiumButton>
                    <PremiumButton variant="secondary" size="lg">
                      Secondary Large
                    </PremiumButton>
                    <PremiumButton variant="outline" size="lg">
                      Outline Large
                    </PremiumButton>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <PremiumButton variant="primary">
                      Primary Medium
                    </PremiumButton>
                    <PremiumButton variant="secondary">
                      Secondary Medium
                    </PremiumButton>
                    <PremiumButton variant="outline">
                      Outline Medium
                    </PremiumButton>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <PremiumButton variant="primary" size="sm">
                      Primary Small
                    </PremiumButton>
                    <PremiumButton variant="secondary" size="sm">
                      Secondary Small
                    </PremiumButton>
                    <PremiumButton variant="outline" size="sm">
                      Outline Small
                    </PremiumButton>
                  </div>
                </div>
              </PremiumCard>
            </div>

            {/* Inputs */}
            <div>
              <h3 className="text-xl font-semibold text-[#111827] mb-6">
                Form Inputs
              </h3>
              <PremiumCard>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PremiumInput
                    label="Email Address"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <PremiumInput
                    label="Full Name"
                    placeholder="Enter your name"
                  />
                  <PremiumInput label="Company" placeholder="Company name" />
                  <PremiumInput
                    label="Phone Number"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                  />
                </div>
              </PremiumCard>
            </div>

            {/* Cards */}
            <div>
              <h3 className="text-xl font-semibold text-[#111827] mb-6">
                Cards & Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="Wellness Score"
                  value="87%"
                  change="+12% this week"
                  icon="🎯"
                  color="green"
                />
                <MetricCard
                  title="Meals Delivered"
                  value="2,340"
                  change="+15% this month"
                  icon="🍽️"
                  color="gold"
                />
                <MetricCard
                  title="Active Users"
                  value="892"
                  change="+8% this week"
                  icon="👥"
                  color="neutral"
                />
                <MetricCard
                  title="Satisfaction"
                  value="4.9"
                  change="98% positive"
                  icon="⭐"
                  color="green"
                />
              </div>
            </div>

            {/* Meal Cards */}
            <div>
              <h3 className="text-xl font-semibold text-[#111827] mb-6">
                Meal Cards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Mediterranean Bowl',
                    calories: 420,
                    protein: 28,
                    image: '🥗',
                  },
                  {
                    name: 'Grilled Salmon',
                    calories: 380,
                    protein: 35,
                    image: '🐟',
                  },
                  {
                    name: 'Quinoa Power Bowl',
                    calories: 450,
                    protein: 24,
                    image: '🥙',
                  },
                ].map((meal, index) => (
                  <PremiumCard
                    key={index}
                    hover={true}
                    className="overflow-hidden p-0"
                  >
                    <div className="h-48 bg-gradient-to-br from-[#F9FAFB] to-[#34D399]/10 flex items-center justify-center text-6xl">
                      {meal.image}
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-[#111827] mb-2">
                        {meal.name}
                      </h4>
                      <div className="flex items-center justify-between text-sm text-[#6B7280] mb-4">
                        <span>{meal.calories} cal</span>
                        <span>{meal.protein}g protein</span>
                      </div>
                      <PremiumButton
                        variant="primary"
                        size="sm"
                        className="w-full"
                      >
                        Add to Plan
                      </PremiumButton>
                    </div>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Layouts Section */}
        {activeSection === 'layouts' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-[#111827] mb-8">
                Layout System
              </h2>
              <p className="text-lg text-[#6B7280] mb-12 max-w-3xl">
                Spacious, breathable layouts with consistent spacing and grid
                systems. Every element has room to breathe, creating a premium,
                uncluttered experience.
              </p>
            </div>

            {/* Spacing System */}
            <div>
              <h3 className="text-xl font-semibold text-[#111827] mb-6">
                Spacing System
              </h3>
              <PremiumCard>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-[#34D399] rounded"></div>
                    <span className="text-[#4B5563]">6px - Micro spacing</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-6 bg-[#34D399] rounded"></div>
                    <span className="text-[#4B5563]">12px - Small spacing</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-6 bg-[#34D399] rounded"></div>
                    <span className="text-[#4B5563]">16px - Base spacing</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-6 bg-[#34D399] rounded"></div>
                    <span className="text-[#4B5563]">
                      24px - Section spacing
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-6 bg-[#34D399] rounded"></div>
                    <span className="text-[#4B5563]">32px - Large spacing</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-40 h-6 bg-[#34D399] rounded"></div>
                    <span className="text-[#4B5563]">
                      40px - Extra large spacing
                    </span>
                  </div>
                </div>
              </PremiumCard>
            </div>

            {/* Grid Examples */}
            <div>
              <h3 className="text-xl font-semibold text-[#111827] mb-6">
                Grid Layouts
              </h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-medium text-[#111827] mb-4">
                    2-Column Grid
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PremiumCard className="h-32 bg-gradient-to-br from-[#0B4F3C]/5 to-[#34D399]/5">
                      <div></div>
                    </PremiumCard>
                    <PremiumCard className="h-32 bg-gradient-to-br from-[#D4A857]/5 to-[#0B4F3C]/5">
                      <div></div>
                    </PremiumCard>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-[#111827] mb-4">
                    3-Column Grid
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <PremiumCard className="h-24 bg-gradient-to-br from-[#34D399]/10 to-[#10B981]/10">
                      <div></div>
                    </PremiumCard>
                    <PremiumCard className="h-24 bg-gradient-to-br from-[#0B4F3C]/10 to-[#34D399]/10">
                      <div></div>
                    </PremiumCard>
                    <PremiumCard className="h-24 bg-gradient-to-br from-[#D4A857]/10 to-[#0B4F3C]/10">
                      <div></div>
                    </PremiumCard>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-[#111827] mb-4">
                    4-Column Metrics Grid
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <PremiumCard className="h-20 bg-gradient-to-br from-[#F9FAFB] to-[#34D399]/5">
                      <div></div>
                    </PremiumCard>
                    <PremiumCard className="h-20 bg-gradient-to-br from-[#F9FAFB] to-[#0B4F3C]/5">
                      <div></div>
                    </PremiumCard>
                    <PremiumCard className="h-20 bg-gradient-to-br from-[#F9FAFB] to-[#D4A857]/5">
                      <div></div>
                    </PremiumCard>
                    <PremiumCard className="h-20 bg-gradient-to-br from-[#F9FAFB] to-[#10B981]/5">
                      <div></div>
                    </PremiumCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DesignSystemShowcase
