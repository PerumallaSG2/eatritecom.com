import { useState } from 'react'
import {
  Users,
  TrendingUp,
  Star,
  Shield,
  Heart,
  Check,
  Phone,
  Mail,
  Calendar,
  Download,
} from 'lucide-react'

const CorporatePartnerships = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all')

  const industries = [
    { id: 'all', name: 'All Industries', count: 150 },
    { id: 'technology', name: 'Technology', count: 45 },
    { id: 'healthcare', name: 'Healthcare', count: 32 },
    { id: 'finance', name: 'Finance', count: 28 },
  ]

  const partnershipTiers = [
    {
      id: 'starter',
      name: 'Starter Partnership',
      description: 'Perfect for small to medium companies',
      employeeRange: '25-100 employees',
      price: 'Starting at $15/employee/month',
      features: [
        'Weekly meal delivery options',
        'Basic nutrition tracking',
        'Employee wellness portal',
        'Monthly usage reports',
        'Email support',
      ],
      popular: false,
    },
    {
      id: 'growth',
      name: 'Growth Partnership',
      description: 'Ideal for growing organizations',
      employeeRange: '100-500 employees',
      price: 'Starting at $12/employee/month',
      features: [
        'Flexible meal delivery schedules',
        'Advanced nutrition analytics',
        'Dedicated account manager',
        'Custom wellness programs',
        'Priority support',
        'Quarterly business reviews',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise Partnership',
      description: 'Comprehensive solution for large corporations',
      employeeRange: '500+ employees',
      price: 'Custom pricing available',
      features: [
        'Fully customized meal programs',
        'Real-time health impact analytics',
        'Executive wellness dashboard',
        'On-site nutrition consultations',
        '24/7 dedicated support',
        'Custom integrations & APIs',
      ],
      popular: false,
    },
  ]

  const corporatePartners = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      logo: '🏢',
      industry: 'Technology',
      employees: '450',
      testimonial:
        'EatRite has transformed our workplace wellness culture. Employee satisfaction with our food benefits increased by 85%.',
      contactPerson: 'Sarah Johnson',
      role: 'VP of People Operations',
      metrics: {
        satisfaction: 94,
        participation: '87%',
      },
    },
    {
      id: 2,
      name: 'Green Energy Inc',
      logo: '🌿',
      industry: 'Clean Energy',
      employees: '280',
      testimonial:
        'The partnership with EatRite aligns perfectly with our sustainability values. Our employees love the variety and quality.',
      contactPerson: 'Michael Chen',
      role: 'Chief People Officer',
      metrics: {
        satisfaction: 91,
        participation: '92%',
      },
    },
    {
      id: 3,
      name: 'Healthcare Partners',
      logo: '🏥',
      industry: 'Healthcare',
      employees: '720',
      testimonial:
        'As healthcare professionals, we understand nutrition importance. EatRite delivers exactly what our staff needs.',
      contactPerson: 'Dr. Lisa Rodriguez',
      role: 'Chief Medical Officer',
      metrics: {
        satisfaction: 96,
        participation: '89%',
      },
    },
  ]

  const partnershipBenefits = [
    {
      icon: Users,
      title: 'Employee Satisfaction',
      description: 'Boost morale and retention with premium meal benefits',
      metrics: ['94% average satisfaction', '35% increase in retention'],
    },
    {
      icon: TrendingUp,
      title: 'Productivity Gains',
      description: 'Well-fed employees are more focused and productive',
      metrics: ['23% productivity increase', '50% less lunch absences'],
    },
    {
      icon: Shield,
      title: 'Cost Effectiveness',
      description: 'Reduce corporate food costs while improving quality',
      metrics: ['30% cost savings vs catering', 'Tax-deductible benefit'],
    },
    {
      icon: Heart,
      title: 'Health Impact',
      description: 'Support employee health and wellness goals',
      metrics: [
        '25% improvement in health metrics',
        'Reduced healthcare costs',
      ],
    },
  ]

  const filteredPartners =
    selectedIndustry === 'all'
      ? corporatePartners
      : corporatePartners.filter(partner =>
          partner.industry.toLowerCase().includes(selectedIndustry)
        )

  return (
    <div className="bg-[#F5EEDC]">
      {/* Enhanced Hero */}
      <section className="py-20 bg-gradient-to-br from-[#0F2B1E] to-[#1a4d33] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6 font-playfair">
            Corporate Partnership Program
          </h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
            Partner with EatRite to provide premium nutrition benefits that
            boost employee satisfaction, productivity, and wellness. Join 150+
            companies transforming their workplace culture.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4B46A] mb-2">150+</div>
              <div className="text-white/80 text-sm font-medium">
                Partner Companies
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4B46A] mb-2">45K+</div>
              <div className="text-white/80 text-sm font-medium">
                Employees Served
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4B46A] mb-2">94%</div>
              <div className="text-white/80 text-sm font-medium">
                Satisfaction Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4B46A] mb-2">
                $2.4M+
              </div>
              <div className="text-white/80 text-sm font-medium">
                Corporate Savings
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#D4B46A] hover:bg-[#b8986b] text-[#0F2B1E] font-semibold py-4 px-8 rounded-lg transition-colors duration-200">
              Get Partnership Details
            </button>
            <button className="border-2 border-white/30 hover:border-[#D4B46A] hover:bg-[#D4B46A] hover:text-[#0F2B1E] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200">
              Schedule a Call
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Partnership Tiers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-[#0F2B1E] mb-4 font-playfair">
              Choose Your Partnership Level
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Flexible solutions designed to match your company size and
              specific wellness objectives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipTiers.map(tier => (
              <div
                key={tier.id}
                className={`relative bg-white rounded-xl border p-8 hover:shadow-lg transition-all duration-200 ${
                  tier.popular
                    ? 'border-[#D4B46A] shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#D4B46A] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                      <Star className="w-3 h-3 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-[#0F2B1E] mb-2 font-playfair">
                    {tier.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {tier.description}
                  </p>
                  <div className="text-sm text-[#D4B46A] font-medium mb-4 bg-[#F5F2E8] px-3 py-1 rounded-full inline-block">
                    {tier.employeeRange}
                  </div>
                  <div className="text-2xl font-bold text-[#0F2B1E]">
                    {tier.price}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-50 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                    tier.popular
                      ? 'bg-[#0F2B1E] hover:bg-[#1a4d33] text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-[#0F2B1E] border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-semibold text-[#0F2B1E] font-playfair">
                Partner Success Stories
              </h2>
              <p className="text-gray-600 mt-2">
                Real results from companies just like yours
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {industries.map(industry => (
                <button
                  key={industry.id}
                  onClick={() => setSelectedIndustry(industry.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedIndustry === industry.id
                      ? 'bg-[#D4B46A] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {industry.name}
                  <span className="ml-2 text-xs opacity-75">
                    ({industry.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPartners.map(partner => (
              <div
                key={partner.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4 bg-gray-50 w-12 h-12 rounded-lg flex items-center justify-center">
                    {partner.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F2B1E]">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {partner.industry} • {partner.employees} employees
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
                    <div className="text-2xl font-bold text-green-700 mb-1">
                      {partner.metrics.satisfaction}%
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      Satisfaction
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                    <div className="text-2xl font-bold text-blue-700 mb-1">
                      {partner.metrics.participation}
                    </div>
                    <div className="text-xs text-blue-600 font-medium">
                      Participation
                    </div>
                  </div>
                </div>

                <blockquote className="text-sm text-gray-700 italic mb-6 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-[#D4B46A]">
                  "{partner.testimonial}"
                </blockquote>

                <div className="border-t border-gray-100 pt-4">
                  <div className="font-semibold text-[#0F2B1E]">
                    {partner.contactPerson}
                  </div>
                  <div className="text-sm text-gray-600">{partner.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Partnership Benefits */}
      <section className="py-20 bg-[#F5EEDC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-[#0F2B1E] mb-4 font-playfair">
              Why Companies Choose EatRite
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Measurable benefits that drive real business results and transform
              workplace culture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-200"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-[#0F2B1E] mb-3 font-playfair">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {benefit.description}
                </p>

                <div className="space-y-2">
                  {benefit.metrics.map((metric, metricIdx) => (
                    <div
                      key={metricIdx}
                      className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium border border-green-200"
                    >
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Get Started */}
      <section className="py-20 bg-gradient-to-br from-[#0F2B1E] to-[#1a4d33] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold mb-6 font-playfair">
            Ready to Transform Your Workplace?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join industry leaders who have enhanced their employee benefits with
            EatRite's premium nutrition solutions. Start your partnership
            journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-[#D4B46A] hover:bg-[#b8986b] text-[#0F2B1E] font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Schedule Partnership Call
            </button>
            <button className="border-2 border-white/30 hover:border-[#D4B46A] hover:bg-[#D4B46A] hover:text-[#0F2B1E] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Partnership Guide
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-[#D4B46A] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-[#0F2B1E]" />
              </div>
              <div className="font-semibold text-white mb-2">Call Us</div>
              <div className="text-white/80">1-800-EATRITE</div>
              <div className="text-sm text-white/60 mt-2">
                Mon-Fri 9AM-6PM EST
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-[#D4B46A] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-[#0F2B1E]" />
              </div>
              <div className="font-semibold text-white mb-2">Email Us</div>
              <div className="text-white/80">partnerships@eatrite.com</div>
              <div className="text-sm text-white/60 mt-2">
                24-hour response time
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-[#D4B46A] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-[#0F2B1E]" />
              </div>
              <div className="font-semibold text-white mb-2">Book Meeting</div>
              <div className="text-white/80">Available 24/7 online</div>
              <div className="text-sm text-white/60 mt-2">
                Instant confirmation
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CorporatePartnerships
