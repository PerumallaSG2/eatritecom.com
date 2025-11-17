import React, { useState, useEffect } from 'react'

// Premium Landing Page Hero
const PremiumLandingHero: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Premium Components
  const PremiumButton: React.FC<{
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg' | 'xl'
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
        'bg-[#0B4F3C] text-white hover:bg-[#083d2f] shadow-lg hover:shadow-xl focus:ring-[#0B4F3C]',
      secondary:
        'bg-[#34D399] text-white hover:bg-[#10B981] shadow-lg hover:shadow-xl focus:ring-[#34D399]',
      outline:
        'border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#0B4F3C] focus:ring-white',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-full',
      md: 'px-8 py-3 text-base rounded-xl',
      lg: 'px-10 py-4 text-lg rounded-xl',
      xl: 'px-12 py-5 text-xl rounded-2xl',
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

  // Data
  const testimonials = [
    {
      text: 'EatRite transformed our office culture. Our team feels more energized and productive than ever.',
      author: 'Sarah Chen',
      title: 'Head of Operations, TechCorp',
      company: '500+ employees',
    },
    {
      text: "The personalized meal recommendations are spot-on. It's like having a nutritionist in my pocket.",
      author: 'Marcus Johnson',
      title: 'Software Engineer',
      company: 'Microsoft',
    },
    {
      text: "We've seen a 40% reduction in sick days since implementing EatRite's corporate wellness program.",
      author: 'Dr. Emily Rodriguez',
      title: 'Chief Medical Officer',
      company: 'HealthFirst',
    },
  ]

  const stats = [
    { number: '50K+', label: 'Happy Employees', icon: '😊' },
    { number: '200+', label: 'Partner Companies', icon: '🏢' },
    { number: '2M+', label: 'Meals Delivered', icon: '🍽️' },
    { number: '98%', label: 'Satisfaction Rate', icon: '⭐' },
  ]

  const features = [
    {
      icon: '🧬',
      title: 'AI-Powered Nutrition',
      description:
        'Personalized meal recommendations based on your health goals, preferences, and dietary needs.',
    },
    {
      icon: '📊',
      title: 'Real-Time Analytics',
      description:
        'Track your wellness journey with comprehensive health metrics and progress insights.',
    },
    {
      icon: '🏢',
      title: 'Corporate Wellness',
      description:
        'Boost employee health and productivity with our enterprise-grade wellness platform.',
    },
    {
      icon: '🚀',
      title: 'Instant Delivery',
      description:
        'Fresh, chef-prepared meals delivered to your office or home within 30 minutes.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B4F3C] via-[#0B4F3C] to-[#083d2f] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#34D399] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4A857] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between p-6 lg:p-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-white to-[#F9FAFB] rounded-xl flex items-center justify-center">
            <span className="text-[#0B4F3C] font-bold text-xl">E</span>
          </div>
          <span className="text-2xl font-bold text-white">EatRite</span>
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          <a
            href="#features"
            className="text-white/80 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-white/80 hover:text-white transition-colors"
          >
            Pricing
          </a>
          <a
            href="#corporate"
            className="text-white/80 hover:text-white transition-colors"
          >
            For Business
          </a>
          <a
            href="#about"
            className="text-white/80 hover:text-white transition-colors"
          >
            About
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <PremiumButton
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Sign In
          </PremiumButton>
          <PremiumButton variant="secondary" size="sm">
            Get Started
          </PremiumButton>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-[#34D399] rounded-full animate-pulse"></span>
              <span className="text-white/90 text-sm font-medium">
                Trusted by 200+ companies worldwide
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Fuel Your
                <span className="block text-transparent bg-gradient-to-r from-[#34D399] to-[#D4A857] bg-clip-text">
                  Best Work
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-white/80 leading-relaxed max-w-xl">
                AI-powered nutrition that adapts to your lifestyle. Fresh,
                personalized meals delivered to boost your energy, health, and
                productivity.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <PremiumButton
                variant="secondary"
                size="xl"
                className="text-lg font-semibold"
              >
                🚀 Start Your Journey
              </PremiumButton>
              <PremiumButton
                variant="outline"
                size="xl"
                className="text-lg font-semibold"
              >
                📹 Watch Demo
              </PremiumButton>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-white/60">
              <div className="flex items-center space-x-2">
                <span className="text-lg">✨</span>
                <span className="text-sm">No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">🔒</span>
                <span className="text-sm">HIPAA compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">⚡</span>
                <span className="text-sm">30-min delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            {/* Main Hero Image/Mockup */}
            <div className="relative">
              {/* Phone Mockup */}
              <div className="relative z-10 mx-auto w-80 h-[640px] bg-gradient-to-br from-white to-[#F9FAFB] rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-[#F9FAFB] rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="bg-white px-8 py-3 flex justify-between items-center text-sm">
                    <span className="font-medium">9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-[#0B4F3C] rounded-full"></div>
                      <div className="w-1 h-1 bg-[#0B4F3C] rounded-full"></div>
                      <div className="w-1 h-1 bg-[#0B4F3C] rounded-full"></div>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-[#111827]">
                          Good morning, Alex! 👋
                        </h3>
                        <p className="text-sm text-[#6B7280]">
                          Your wellness score: 92%
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0B4F3C] to-[#34D399] rounded-xl"></div>
                    </div>

                    {/* Meal Cards */}
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F9FAFB]">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg"></div>
                          <div>
                            <h4 className="font-medium text-[#111827] text-sm">
                              Mediterranean Bowl
                            </h4>
                            <p className="text-xs text-[#6B7280]">
                              420 cal • 18g protein
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex text-xs text-[#D4A857]">
                            ★★★★★
                          </div>
                          <button className="bg-[#0B4F3C] text-white px-3 py-1 rounded-lg text-xs">
                            Order
                          </button>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F9FAFB]">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg"></div>
                          <div>
                            <h4 className="font-medium text-[#111827] text-sm">
                              Power Smoothie
                            </h4>
                            <p className="text-xs text-[#6B7280]">
                              320 cal • 24g protein
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex text-xs text-[#D4A857]">
                            ★★★★★
                          </div>
                          <button className="bg-[#34D399] text-white px-3 py-1 rounded-lg text-xs">
                            Order
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Weekly Progress */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F9FAFB]">
                      <h4 className="font-medium text-[#111827] text-sm mb-3">
                        This Week's Progress
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#6B7280]">
                            Nutrition Goals
                          </span>
                          <span className="text-[#0B4F3C] font-medium">
                            85%
                          </span>
                        </div>
                        <div className="w-full bg-[#F9FAFB] rounded-full h-1.5">
                          <div
                            className="bg-[#0B4F3C] h-1.5 rounded-full"
                            style={{ width: '85%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-[#34D399]/20 backdrop-blur-sm rounded-2xl border border-white/30 flex items-center justify-center animate-float">
                <span className="text-2xl">🥗</span>
              </div>

              <div className="absolute top-20 -right-6 w-14 h-14 bg-[#D4A857]/20 backdrop-blur-sm rounded-xl border border-white/30 flex items-center justify-center animate-bounce">
                <span className="text-xl">💪</span>
              </div>

              <div className="absolute -bottom-4 -left-12 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 flex items-center justify-center animate-pulse">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`mt-24 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div
          className={`mt-24 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 lg:p-12">
            <div className="text-center max-w-4xl mx-auto">
              <div className="text-6xl mb-6 opacity-50">"</div>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8">
                {testimonials[currentTestimonial].text}
              </p>
              <div className="space-y-2">
                <div className="text-lg font-semibold text-white">
                  {testimonials[currentTestimonial].author}
                </div>
                <div className="text-white/60">
                  {testimonials[currentTestimonial].title}
                </div>
                <div className="text-sm text-[#34D399]">
                  {testimonials[currentTestimonial].company}
                </div>
              </div>

              {/* Testimonial Indicators */}
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentTestimonial
                        ? 'bg-[#34D399]'
                        : 'bg-white/30'
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div
          className={`mt-24 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Powered by Intelligence
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our AI-driven platform learns your preferences, tracks your
              progress, and adapts to help you achieve your health goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div
          className={`mt-24 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="bg-gradient-to-r from-[#34D399]/20 to-[#D4A857]/20 backdrop-blur-sm border border-white/30 rounded-3xl p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to transform your team's wellness?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join leading companies who've already boosted productivity and
              employee satisfaction with EatRite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PremiumButton
                variant="secondary"
                size="xl"
                className="text-lg font-semibold"
              >
                🚀 Start Free Trial
              </PremiumButton>
              <PremiumButton
                variant="outline"
                size="xl"
                className="text-lg font-semibold"
              >
                📞 Book Demo
              </PremiumButton>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default PremiumLandingHero
