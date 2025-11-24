import React, { useState } from 'react'
import { Button, Card, Container } from '../components/ui/CoreComponents'

// Types for corporate landing data
interface CaseStudy {
  id: string
  company: string
  logo: string
  industry: string
  employees: number
  results: {
    wellnessImprovement: number
    costSavings: number
    engagement: number
    productivity: number
  }
  quote: string
  executive: {
    name: string
    title: string
    avatar: string
  }
}

interface Benefit {
  id: string
  icon: string
  title: string
  description: string
  metric: string
}

interface PricingTier {
  id: string
  name: string
  price: number
  unit: string
  features: string[]
  recommended?: boolean
}

const CorporateLandingPage: React.FC = () => {
  const [roiInputs, setRoiInputs] = useState({
    employees: 100,
    currentCost: 15,
    absenteeism: 5,
  })

  // Mock data
  const benefits: Benefit[] = [
    {
      id: 'wellness',
      icon: '🏥',
      title: 'Employee Wellness',
      description:
        'Reduce healthcare costs and improve overall employee health with personalized nutrition programs',
      metric: '32% reduction in sick days',
    },
    {
      id: 'productivity',
      icon: '📈',
      title: 'Increased Productivity',
      description:
        'Better nutrition leads to higher energy levels and improved cognitive performance',
      metric: '18% boost in productivity',
    },
    {
      id: 'retention',
      icon: '🎯',
      title: 'Employee Retention',
      description:
        'Attract and retain top talent with comprehensive wellness benefits',
      metric: '23% improvement in retention',
    },
    {
      id: 'satisfaction',
      icon: '😊',
      title: 'Job Satisfaction',
      description: 'Show employees you care about their health and well-being',
      metric: '41% higher satisfaction scores',
    },
  ]

  const caseStudies: CaseStudy[] = [
    {
      id: 'techcorp',
      company: 'TechCorp Solutions',
      logo: '/api/placeholder/120/60',
      industry: 'Technology',
      employees: 500,
      results: {
        wellnessImprovement: 35,
        costSavings: 250000,
        engagement: 42,
        productivity: 18,
      },
      quote:
        "EatRite transformed our workplace wellness. Employee engagement is at an all-time high, and we've seen significant cost savings.",
      executive: {
        name: 'Sarah Johnson',
        title: 'Chief People Officer',
        avatar: '/api/placeholder/60/60',
      },
    },
    {
      id: 'financialgroup',
      company: 'Financial Group Inc',
      logo: '/api/placeholder/120/60',
      industry: 'Finance',
      employees: 800,
      results: {
        wellnessImprovement: 28,
        costSavings: 420000,
        engagement: 38,
        productivity: 22,
      },
      quote:
        "The ROI has been exceptional. Our employees love the convenience and quality of EatRite's corporate program.",
      executive: {
        name: 'Michael Chen',
        title: 'VP of Human Resources',
        avatar: '/api/placeholder/60/60',
      },
    },
  ]

  const pricingTiers: PricingTier[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 12,
      unit: 'per employee/month',
      features: [
        'Basic meal planning',
        'Employee portal access',
        'Monthly wellness reports',
        'Email support',
        'Basic customization',
      ],
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 18,
      unit: 'per employee/month',
      features: [
        'Advanced meal customization',
        'AI-powered recommendations',
        'Real-time analytics dashboard',
        'Dedicated account manager',
        'Custom branding',
        'Bulk ordering system',
        'Integration with HR systems',
      ],
      recommended: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 25,
      unit: 'per employee/month',
      features: [
        'Everything in Professional',
        'White-label solution',
        'Advanced analytics & reporting',
        'Custom integrations',
        'On-site nutrition consultations',
        'Priority support (24/7)',
        'Compliance reporting',
      ],
    },
  ]

  const calculateROI = () => {
    const { employees, currentCost, absenteeism } = roiInputs
    const eatriteMonthly = employees * 18 // Pro tier
    const currentMonthly = employees * currentCost
    const absenteeismSavings = employees * absenteeism * 200 * 0.32 // 32% reduction in sick days
    const productivityGains = (employees * 50000 * 0.18) / 12 // 18% productivity boost
    const totalSavings =
      absenteeismSavings + productivityGains - (eatriteMonthly - currentMonthly)
    const roi = ((totalSavings * 12) / (eatriteMonthly * 12)) * 100

    return {
      monthlySavings: totalSavings,
      annualSavings: totalSavings * 12,
      roi: roi,
    }
  }

  const roiResults = calculateROI()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-emerald-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 font-sans">
              Transform Your Workplace
              <span className="text-yellow-400"> Wellness</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Boost employee health, productivity, and satisfaction with our
              corporate nutrition program
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="gold"
                size="xl"
                className="text-lg px-8 py-4"
                onClick={() =>
                  document
                    .getElementById('pricing')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Get Started Today
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900"
                onClick={() =>
                  document
                    .getElementById('roi-calculator')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Calculate ROI
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Why Leading Companies Choose EatRite
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our corporate wellness program delivers measurable results that
              impact your bottom line
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map(benefit => (
              <Card
                key={benefit.id}
                variant="premium"
                className="text-center p-8 h-full"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                <div className="text-sm font-medium text-emerald-600">
                  {benefit.metric}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how companies like yours are transforming their workplace
              wellness
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map(study => (
              <Card key={study.id} variant="premium" className="p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={study.logo}
                    alt={study.company}
                    className="h-12 mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {study.company}
                    </h3>
                    <p className="text-gray-600">
                      {study.industry} • {study.employees.toLocaleString()}{' '}
                      employees
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 rounded-lg bg-emerald-50">
                    <div className="text-2xl font-bold text-emerald-600">
                      {study.results.wellnessImprovement}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Wellness Improvement
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-yellow-50">
                    <div className="text-2xl font-bold text-yellow-600">
                      ${(study.results.costSavings / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-gray-600">Annual Savings</div>
                  </div>
                </div>

                <blockquote className="text-lg italic text-gray-700 mb-4">
                  "{study.quote}"
                </blockquote>

                <div className="flex items-center">
                  <img
                    src={study.executive.avatar}
                    alt={study.executive.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      {study.executive.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {study.executive.title}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi-calculator" className="py-20 bg-gray-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Calculate Your ROI
              </h2>
              <p className="text-xl text-gray-600">
                See the potential impact on your organization
              </p>
            </div>

            <Card variant="premium" className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-gray-900">
                    Your Company Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Number of Employees
                      </label>
                      <input
                        type="number"
                        value={roiInputs.employees}
                        onChange={e =>
                          setRoiInputs({
                            ...roiInputs,
                            employees: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Current Food Benefit ($/employee/month)
                      </label>
                      <input
                        type="number"
                        value={roiInputs.currentCost}
                        onChange={e =>
                          setRoiInputs({
                            ...roiInputs,
                            currentCost: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Current Absenteeism Rate (%)
                      </label>
                      <input
                        type="number"
                        value={roiInputs.absenteeism}
                        onChange={e =>
                          setRoiInputs({
                            ...roiInputs,
                            absenteeism: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-6 text-gray-900">
                    Projected Results
                  </h3>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-emerald-50">
                      <div className="text-2xl font-bold text-emerald-600">
                        ${roiResults.monthlySavings.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        Monthly Savings
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-yellow-50">
                      <div className="text-2xl font-bold text-yellow-600">
                        ${roiResults.annualSavings.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        Annual Savings
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-green-50">
                      <div className="text-2xl font-bold text-green-600">
                        {roiResults.roi.toFixed(0)}%
                      </div>
                      <div className="text-sm text-gray-600">
                        Return on Investment
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() =>
                        document
                          .getElementById('pricing')
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }
                    >
                      Get Started with These Savings
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600">
              Flexible pricing options to fit your organization's needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingTiers.map(tier => (
              <Card
                key={tier.id}
                variant={tier.recommended ? 'premium' : 'subtle'}
                className={`p-8 text-center relative ${tier.recommended ? 'ring-2 ring-yellow-400' : ''}`}
              >
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium text-white bg-yellow-500">
                    Recommended
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  {tier.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-emerald-600">
                    ${tier.price}
                  </span>
                  <span className="text-gray-600 ml-2">{tier.unit}</span>
                </div>

                <ul className="space-y-3 mb-8 text-left">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.recommended ? 'gold' : 'primary'}
                  className="w-full"
                >
                  Choose {tier.name}
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-900">
        <Container>
          <div className="text-center text-white max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Workplace?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of companies that have already improved employee
              wellness and reduced costs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="xl" className="text-lg px-8 py-4">
                Schedule a Demo
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default CorporateLandingPage
