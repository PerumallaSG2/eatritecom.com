import React, { useState } from 'react'

// UI Components
const Button: React.FC<{
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline'
  onClick?: () => void
}> = ({
  children,
  className = '',
  size = 'md',
  variant = 'solid',
  onClick,
}) => {
  const baseClass =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  const sizeClass = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  const variantClass =
    variant === 'outline'
      ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
      : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'

  return (
    <button
      className={`${baseClass} ${sizeClass[size]} ${variantClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div
    className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
  >
    {children}
  </div>
)

const Container: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
)

interface Testimonial {
  id: string
  type: 'employee' | 'corporate' | 'case_study' | 'executive'
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  title: string
  content: string
  date: Date
  verified: boolean
  featured: boolean
  metrics?: {
    weight_loss?: number
    energy_improvement?: number
    productivity_gain?: number
    cost_savings?: number
    engagement_rate?: number
  }
  tags: string[]
  video_url?: string
  before_after_images?: {
    before: string
    after: string
  }
}

interface CaseStudy {
  id: string
  title: string
  company: string
  industry: string
  employee_count: number
  duration: string
  challenge: string
  solution: string
  results: {
    roi_percentage: number
    engagement_increase: number
    health_improvement: number
    cost_reduction: number
  }
  testimonials: Testimonial[]
  images: string[]
  download_url: string
  featured: boolean
}

const TestimonialSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'testimonials'
    | 'case_studies'
    | 'reviews'
    | 'collection'
    | 'management'
  >('overview')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedRating, setSelectedRating] = useState('all')

  // Mock data for demonstration
  const [testimonials] = useState<Testimonial[]>([
    {
      id: '1',
      type: 'executive',
      name: 'Sarah Johnson',
      role: 'Chief People Officer',
      company: 'TechCorp Inc.',
      avatar: '/api/placeholder/100/100',
      rating: 5,
      title: 'Transformed Our Workplace Wellness Culture',
      content:
        'EatRite has completely revolutionized how our employees think about nutrition. We have seen a 40% increase in wellness program participation and measurable improvements in employee energy levels. The ROI has been exceptional.',
      date: new Date('2024-01-15'),
      verified: true,
      featured: true,
      metrics: {
        productivity_gain: 23,
        cost_savings: 150000,
        engagement_rate: 87,
      },
      tags: ['wellness', 'productivity', 'culture', 'ROI'],
    },
    {
      id: '2',
      type: 'employee',
      name: 'Michael Chen',
      role: 'Software Engineer',
      company: 'TechCorp Inc.',
      avatar: '/api/placeholder/100/100',
      rating: 5,
      title: 'Life-Changing Nutrition Program',
      content:
        'I lost 25 pounds in 4 months while gaining more energy than I have had in years. The convenience of having healthy meals delivered to my office removed all the barriers to eating well. My afternoon energy crashes are completely gone.',
      date: new Date('2024-01-10'),
      verified: true,
      featured: false,
      metrics: {
        weight_loss: 25,
        energy_improvement: 85,
      },
      tags: ['weight-loss', 'energy', 'convenience'],
      before_after_images: {
        before: '/api/placeholder/200/300',
        after: '/api/placeholder/200/300',
      },
    },
    {
      id: '3',
      type: 'corporate',
      name: 'David Rodriguez',
      role: 'HR Director',
      company: 'FinanceFirst Solutions',
      avatar: '/api/placeholder/100/100',
      rating: 5,
      title: 'Exceptional Employee Satisfaction Results',
      content:
        'Our employee satisfaction scores increased by 35% after implementing EatRite. The meal quality is outstanding, and the variety keeps everyone engaged. We have also seen reduced sick days and higher afternoon productivity.',
      date: new Date('2024-01-08'),
      verified: true,
      featured: true,
      metrics: {
        engagement_rate: 92,
        productivity_gain: 18,
        cost_savings: 75000,
      },
      tags: ['satisfaction', 'productivity', 'health', 'engagement'],
      video_url: 'https://example.com/testimonial-video',
    },
  ])

  const [caseStudies] = useState<CaseStudy[]>([
    {
      id: '1',
      title: 'Fortune 500 Tech Company Transformation',
      company: 'GlobalTech Innovations',
      industry: 'Technology',
      employee_count: 2500,
      duration: '12 months',
      challenge:
        'Low employee wellness engagement, high healthcare costs, afternoon productivity dips, poor eating habits during long work hours.',
      solution:
        'Comprehensive EatRite corporate program with personalized meal plans, on-site delivery, wellness challenges, and nutritional education workshops.',
      results: {
        roi_percentage: 340,
        engagement_increase: 67,
        health_improvement: 45,
        cost_reduction: 28,
      },
      testimonials: [testimonials[0], testimonials[2]],
      images: [
        '/api/placeholder/800/400',
        '/api/placeholder/800/400',
        '/api/placeholder/800/400',
      ],
      download_url: '/case-studies/globaltech-case-study.pdf',
      featured: true,
    },
    {
      id: '2',
      title: 'Manufacturing Company Wellness Revolution',
      company: 'SteelWorks Manufacturing',
      industry: 'Manufacturing',
      employee_count: 800,
      duration: '8 months',
      challenge:
        'High stress eating, limited healthy food options on-site, obesity-related health issues, low energy during shifts.',
      solution:
        'EatRite shift-based meal delivery, nutritional counseling, healthy snack programs, and group wellness challenges.',
      results: {
        roi_percentage: 280,
        engagement_increase: 52,
        health_improvement: 38,
        cost_reduction: 22,
      },
      testimonials: [testimonials[1]],
      images: ['/api/placeholder/800/400', '/api/placeholder/800/400'],
      download_url: '/case-studies/steelworks-case-study.pdf',
      featured: false,
    },
  ])

  const [reviews] = useState([
    { rating: 5, count: 1247, percentage: 78 },
    { rating: 4, count: 298, percentage: 19 },
    { rating: 3, count: 45, percentage: 3 },
    { rating: 2, count: 12, percentage: 1 },
    { rating: 1, count: 8, percentage: 0 },
  ])

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating * review.count, 0) /
    reviews.reduce((acc, review) => acc + review.count, 0)
  const totalReviews = reviews.reduce((acc, review) => acc + review.count, 0)

  const filteredTestimonials = testimonials.filter(testimonial => {
    if (filterCategory !== 'all' && testimonial.type !== filterCategory)
      return false
    if (
      selectedRating !== 'all' &&
      testimonial.rating < parseInt(selectedRating)
    )
      return false
    return true
  })

  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.date.getTime() - a.date.getTime()
      case 'oldest':
        return a.date.getTime() - b.date.getTime()
      case 'rating':
        return b.rating - a.rating
      case 'featured':
        return b.featured ? 1 : -1
      default:
        return 0
    }
  })

  const renderStars = (rating: number) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ⭐
        </span>
      ))}
    </div>
  )

  const tabs = [
    { key: 'overview', label: 'Overview', icon: '📊' },
    { key: 'testimonials', label: 'Testimonials', icon: '💬' },
    { key: 'case_studies', label: 'Case Studies', icon: '📋' },
    { key: 'reviews', label: 'Reviews', icon: '⭐' },
    { key: 'collection', label: 'Collection Tools', icon: '📝' },
    { key: 'management', label: 'Management', icon: '⚙️' },
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Testimonials
              </p>
              <p className="text-2xl font-bold text-green-600">
                {testimonials.length}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">💬</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Average Rating
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {averageRating.toFixed(1)}/5
              </p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 text-xl">⭐</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Featured Stories
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {testimonials.filter(t => t.featured).length}
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">🏆</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Case Studies</p>
              <p className="text-2xl font-bold text-blue-600">
                {caseStudies.length}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">📋</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Success Stories</h3>
          <div className="space-y-4">
            {testimonials
              .filter(t => t.featured)
              .slice(0, 3)
              .map(testimonial => (
                <div
                  key={testimonial.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{testimonial.name}</h4>
                        {testimonial.verified && (
                          <span className="text-green-600">✓</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {testimonial.role} at {testimonial.company}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(testimonial.rating)}
                        <span className="text-sm text-gray-500">
                          {testimonial.date.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
          <div className="space-y-3">
            {reviews.map(review => (
              <div key={review.rating} className="flex items-center gap-3">
                <span className="w-8 text-sm">{review.rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${review.percentage}%` }}
                  ></div>
                </div>
                <span className="w-12 text-sm text-gray-600">
                  {review.count}
                </span>
                <span className="w-10 text-xs text-gray-500">
                  {review.percentage}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Testimonial Impact Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">127%</p>
            <p className="text-sm text-gray-600">Avg Weight Loss Success</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">89%</p>
            <p className="text-sm text-gray-600">Employee Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">$2.4M</p>
            <p className="text-sm text-gray-600">Total Cost Savings</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">340%</p>
            <p className="text-sm text-gray-600">Average ROI</p>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderTestimonials = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Testimonials</h2>
        <div className="flex gap-3">
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="employee">Employee Stories</option>
            <option value="corporate">Corporate Reviews</option>
            <option value="executive">Executive Testimonials</option>
            <option value="case_study">Case Studies</option>
          </select>
          <select
            value={selectedRating}
            onChange={e => setSelectedRating(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating">Highest Rated</option>
            <option value="featured">Featured First</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedTestimonials.map(testimonial => (
          <Card key={testimonial.id} className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  {testimonial.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      ✓ Verified
                    </span>
                  )}
                  {testimonial.featured && (
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm">
                  {testimonial.role} at {testimonial.company}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {renderStars(testimonial.rating)}
                  <span className="text-sm text-gray-500">
                    {testimonial.date.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 mb-3">
              {testimonial.title}
            </h4>
            <p className="text-gray-700 mb-4">{testimonial.content}</p>

            {testimonial.metrics && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h5 className="font-medium text-gray-900 mb-2">
                  Impact Metrics
                </h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {testimonial.metrics.weight_loss && (
                    <div>
                      Weight Loss:{' '}
                      <span className="font-semibold text-green-600">
                        {testimonial.metrics.weight_loss} lbs
                      </span>
                    </div>
                  )}
                  {testimonial.metrics.energy_improvement && (
                    <div>
                      Energy:{' '}
                      <span className="font-semibold text-blue-600">
                        +{testimonial.metrics.energy_improvement}%
                      </span>
                    </div>
                  )}
                  {testimonial.metrics.productivity_gain && (
                    <div>
                      Productivity:{' '}
                      <span className="font-semibold text-purple-600">
                        +{testimonial.metrics.productivity_gain}%
                      </span>
                    </div>
                  )}
                  {testimonial.metrics.cost_savings && (
                    <div>
                      Savings:{' '}
                      <span className="font-semibold text-green-600">
                        ${testimonial.metrics.cost_savings.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {testimonial.before_after_images && (
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-2">Before</p>
                  <img
                    src={testimonial.before_after_images.before}
                    alt="Before"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-2">After</p>
                  <img
                    src={testimonial.before_after_images.after}
                    alt="After"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {testimonial.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderCaseStudies = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Corporate Success Case Studies</h2>

      {caseStudies.map(study => (
        <Card key={study.id} className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold mb-2">{study.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>
                  <strong>Company:</strong> {study.company}
                </span>
                <span>
                  <strong>Industry:</strong> {study.industry}
                </span>
                <span>
                  <strong>Employees:</strong>{' '}
                  {study.employee_count.toLocaleString()}
                </span>
                <span>
                  <strong>Duration:</strong> {study.duration}
                </span>
              </div>
            </div>
            {study.featured && (
              <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded">
                Featured
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
              <p className="text-gray-700 mb-4">{study.challenge}</p>

              <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
              <p className="text-gray-700">{study.solution}</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-4">
                Results Achieved
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {study.results.roi_percentage}%
                  </p>
                  <p className="text-sm text-green-800">ROI Increase</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {study.results.engagement_increase}%
                  </p>
                  <p className="text-sm text-blue-800">Engagement Up</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {study.results.health_improvement}%
                  </p>
                  <p className="text-sm text-purple-800">Health Improved</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {study.results.cost_reduction}%
                  </p>
                  <p className="text-sm text-orange-800">Cost Reduced</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {study.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Case study ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <Button variant="outline" size="sm">
                View Full Study
              </Button>
              <Button variant="outline" size="sm">
                Download PDF
              </Button>
            </div>
            <span className="text-sm text-gray-500">
              {study.testimonials.length} related testimonials
            </span>
          </div>
        </Card>
      ))}
    </div>
  )

  const renderReviews = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Review Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Rating Breakdown</h3>
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.rating} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm">{review.rating}</span>
                  <span className="text-yellow-400">★</span>
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-yellow-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${review.percentage}%` }}
                  ></div>
                </div>
                <div className="w-16 text-sm text-gray-600">
                  {review.count} ({review.percentage}%)
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {averageRating.toFixed(1)} / 5.0
                </p>
                <p className="text-sm text-gray-600">
                  {totalReviews} total reviews
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  {renderStars(Math.round(averageRating))}
                </div>
                <p className="text-sm text-gray-600 mt-1">Excellent rating</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Review Insights</h3>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-1">Most Praised</h4>
              <p className="text-sm text-green-800">
                Meal quality & convenience
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-1">Top Benefits</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Improved energy (87%)</li>
                <li>• Better nutrition (92%)</li>
                <li>• Time savings (78%)</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-1">
                Business Impact
              </h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Higher productivity</li>
                <li>• Reduced sick days</li>
                <li>• Better team morale</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )

  const renderCollection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Testimonial Collection Tools</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Email Campaign Templates
          </h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium mb-2">Post-Delivery Survey</h4>
              <p className="text-sm text-gray-600 mb-3">
                Automated email sent 2 days after meal delivery
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Preview
                </Button>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button size="sm">Send Test</Button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium mb-2">Monthly Success Check-in</h4>
              <p className="text-sm text-gray-600 mb-3">
                Follow-up for wellness progress updates
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Preview
                </Button>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button size="sm">Send Test</Button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium mb-2">
                Corporate Milestone Celebration
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Quarterly review for corporate clients
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Preview
                </Button>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button size="sm">Send Test</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Collection Forms</h3>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">
                💡 Smart Collection
              </h4>
              <p className="text-sm text-green-800 mb-3">
                AI-powered form that adapts questions based on user journey
                stage
              </p>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Configure
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incentive Programs
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>$5 Meal Credit</option>
                <option>Free Week of Meals</option>
                <option>Wellness Merchandise</option>
                <option>Priority Support</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Collection Timing
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm">After 1 week of service</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm">
                    After achieving health goals
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm">During renewal period</span>
                </label>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Collection Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">23%</p>
            <p className="text-sm text-gray-600">Response Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">147</p>
            <p className="text-sm text-gray-600">This Month</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">4.7/5</p>
            <p className="text-sm text-gray-600">Avg Quality Score</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">89%</p>
            <p className="text-sm text-gray-600">Publication Rate</p>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Testimonial Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Pending Approvals</h3>
          <div className="space-y-3">
            <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Jennifer Smith</span>
                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                  Pending
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-2">
                "Amazing transformation in just 2 months..."
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-xs"
                >
                  Approve
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  Decline
                </Button>
              </div>
            </div>

            <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Marcus Johnson</span>
                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                  Pending
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-2">
                "Our company productivity increased by..."
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-xs"
                >
                  Approve
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Content Guidelines</h3>
          <div className="space-y-3 text-sm">
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <h4 className="font-medium text-green-900 mb-1">
                ✓ Approved Content
              </h4>
              <ul className="text-green-800 space-y-1">
                <li>• Specific results with metrics</li>
                <li>• Professional photos</li>
                <li>• Verified company information</li>
                <li>• Authentic personal stories</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded p-3">
              <h4 className="font-medium text-red-900 mb-1">
                ✗ Content to Review
              </h4>
              <ul className="text-red-800 space-y-1">
                <li>• Unverified medical claims</li>
                <li>• Competitor mentions</li>
                <li>• Inappropriate language</li>
                <li>• Generic testimonials</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Publication Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auto-Publish Rules
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm">5-star reviews</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm">Verified customers only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm">Corporate testimonials</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Rotation
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>Weekly rotation</option>
                <option>Monthly rotation</option>
                <option>Manual selection</option>
              </select>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700">
              Update Settings
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Testimonial Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">
              Conversion Impact
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Homepage conversions</span>
                <span className="text-sm font-semibold text-green-600">
                  +34%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Trial signups</span>
                <span className="text-sm font-semibold text-blue-600">
                  +28%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Corporate inquiries</span>
                <span className="text-sm font-semibold text-purple-600">
                  +67%
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">
              Content Performance
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Avg. engagement</span>
                <span className="text-sm font-semibold">4.7 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Share rate</span>
                <span className="text-sm font-semibold">12.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Click-through</span>
                <span className="text-sm font-semibold">8.9%</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">
              Collection Sources
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Email campaigns</span>
                <span className="text-sm font-semibold">67%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">In-app prompts</span>
                <span className="text-sm font-semibold">23%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Direct submissions</span>
                <span className="text-sm font-semibold">10%</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Quality Metrics</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Avg. word count</span>
                <span className="text-sm font-semibold">127 words</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Photo inclusion</span>
                <span className="text-sm font-semibold">45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Verification rate</span>
                <span className="text-sm font-semibold">89%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )

  return (
    <Container className="py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Testimonial & Review System
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive customer success story collection, management, and
            showcase platform to build trust and drive corporate conversions
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-green-50 text-green-700 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'testimonials' && renderTestimonials()}
          {activeTab === 'case_studies' && renderCaseStudies()}
          {activeTab === 'reviews' && renderReviews()}
          {activeTab === 'collection' && renderCollection()}
          {activeTab === 'management' && renderManagement()}
        </div>
      </div>
    </Container>
  )
}

export default TestimonialSystem
