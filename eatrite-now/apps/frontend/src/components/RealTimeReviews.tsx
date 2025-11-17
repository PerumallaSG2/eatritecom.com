import React, { useState, useEffect } from 'react'
import {
  Star,
  MessageCircle,
  ThumbsUp,
  Camera,
  MapPin,
  Clock,
  Verified,
  TrendingUp,
  Filter,
  RefreshCw,
} from 'lucide-react'
import { FadeIn, StaggeredAnimation } from './AnimationComponents'

interface Review {
  id: string
  customer: {
    name: string
    avatar: string
    location: string
    verified: boolean
    totalOrders: number
  }
  rating: number
  title: string
  content: string
  mealName: string
  mealImage?: string
  timestamp: Date
  helpful: number
  images: string[]
  tags: string[]
  response?: {
    from: string
    content: string
    timestamp: Date
  }
}

const generateReviews = (): Review[] => {
  return [
    {
      id: '1',
      customer: {
        name: 'Emma Rodriguez',
        avatar: '👩‍💼',
        location: 'Austin, TX',
        verified: true,
        totalOrders: 47,
      },
      rating: 5,
      title: 'Game-changer for busy professionals!',
      content:
        'As a working mom, Factor75 has been a lifesaver. The Mediterranean Salmon was restaurant-quality, and my kids actually asked for seconds. The convenience is unmatched!',
      mealName: 'Mediterranean Salmon',
      mealImage: '🐟',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      helpful: 23,
      images: ['salmon1.jpg', 'salmon2.jpg'],
      tags: ['family-friendly', 'convenient', 'restaurant-quality'],
    },
    {
      id: '2',
      customer: {
        name: 'Marcus Johnson',
        avatar: '👨‍🏋️',
        location: 'Denver, CO',
        verified: true,
        totalOrders: 89,
      },
      rating: 5,
      title: 'Perfect for my fitness goals',
      content:
        'The macros are spot-on for my training. Lost 12 lbs in 6 weeks while gaining muscle. The Keto Power Bowl is my go-to post-workout meal.',
      mealName: 'Keto Power Bowl',
      mealImage: '🥗',
      timestamp: new Date(Date.now() - 32 * 60 * 1000),
      helpful: 41,
      images: ['keto1.jpg'],
      tags: ['fitness', 'keto', 'muscle-gain', 'weight-loss'],
      response: {
        from: 'Factor75 Nutrition Team',
        content:
          "Amazing results, Marcus! We're thrilled to be part of your fitness journey. Keep up the great work!",
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
      },
    },
    {
      id: '3',
      customer: {
        name: 'Sarah Chen',
        avatar: '👩‍⚕️',
        location: 'San Francisco, CA',
        verified: true,
        totalOrders: 156,
      },
      rating: 5,
      title: 'Exceeded expectations every time',
      content:
        "I've been ordering for over a year now. The quality is consistent, ingredients are fresh, and the variety keeps meals exciting. Worth every penny!",
      mealName: 'Paleo Chicken Harvest Bowl',
      mealImage: '🍗',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      helpful: 67,
      images: ['paleo1.jpg', 'paleo2.jpg', 'paleo3.jpg'],
      tags: [
        'loyal-customer',
        'consistent-quality',
        'paleo',
        'fresh-ingredients',
      ],
    },
    {
      id: '4',
      customer: {
        name: 'Jake Williams',
        avatar: '👨‍🍳',
        location: 'Nashville, TN',
        verified: true,
        totalOrders: 23,
      },
      rating: 4,
      title: 'Great flavors, minor packaging issue',
      content:
        'The Tex-Mex Bowl was delicious with perfect spice levels. One container arrived slightly damaged but customer service was quick to resolve it.',
      mealName: 'Tex-Mex Bowl',
      mealImage: '🌮',
      timestamp: new Date(Date.now() - 67 * 60 * 1000),
      helpful: 15,
      images: ['texmex1.jpg'],
      tags: ['great-flavors', 'customer-service', 'tex-mex'],
    },
    {
      id: '5',
      customer: {
        name: 'Lisa Park',
        avatar: '👩‍🎨',
        location: 'Seattle, WA',
        verified: true,
        totalOrders: 78,
      },
      rating: 5,
      title: 'Vegetarian options are amazing!',
      content:
        'Finally found a meal service that takes vegetarian seriously. The Mushroom & Quinoa Bowl is packed with flavor and keeps me full for hours.',
      mealName: 'Mushroom & Quinoa Bowl',
      mealImage: '🍄',
      timestamp: new Date(Date.now() - 89 * 60 * 1000),
      helpful: 34,
      images: ['mushroom1.jpg', 'mushroom2.jpg'],
      tags: ['vegetarian', 'quinoa', 'mushroom', 'filling'],
    },
    {
      id: '6',
      customer: {
        name: 'Robert Davis',
        avatar: '👨‍💻',
        location: 'Chicago, IL',
        verified: true,
        totalOrders: 112,
      },
      rating: 5,
      title: 'Remote work game-changer',
      content:
        'Working from home made me lazy with meals. Factor75 ensures I eat well without spending time cooking. The BBQ Pork is incredible!',
      mealName: 'BBQ Pork with Sweet Potato',
      mealImage: '🍖',
      timestamp: new Date(Date.now() - 112 * 60 * 1000),
      helpful: 28,
      images: ['bbq1.jpg'],
      tags: ['remote-work', 'convenient', 'bbq', 'sweet-potato'],
    },
  ]
}

const filterOptions = [
  { label: 'All Reviews', value: 'all' },
  { label: '5 Stars', value: '5' },
  { label: '4 Stars', value: '4' },
  { label: 'Verified Only', value: 'verified' },
  { label: 'With Photos', value: 'photos' },
  { label: 'Recent', value: 'recent' },
]

export const RealTimeReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([])
  const [filter, setFilter] = useState('all')
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const initialReviews = generateReviews()
    setReviews(initialReviews)
    setDisplayedReviews(initialReviews)

    // Simulate new reviews coming in
    const interval = setInterval(() => {
      const newReview: Review = {
        id: Date.now().toString(),
        customer: {
          name: 'New Customer',
          avatar: '😊',
          location: 'Nationwide',
          verified: true,
          totalOrders: Math.floor(Math.random() * 50) + 1,
        },
        rating: Math.random() > 0.2 ? 5 : 4,
        title: 'Just tried Factor75!',
        content:
          'Really impressed with the quality and taste. Will definitely order again!',
        mealName: 'Featured Meal',
        timestamp: new Date(),
        helpful: Math.floor(Math.random() * 10),
        images: [],
        tags: ['new-customer', 'impressed'],
      }

      setReviews(prev => [newReview, ...prev.slice(0, 9)])
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    applyFilter()
  }, [filter, reviews])

  const applyFilter = () => {
    let filtered = reviews

    switch (filter) {
      case '5':
        filtered = reviews.filter(review => review.rating === 5)
        break
      case '4':
        filtered = reviews.filter(review => review.rating === 4)
        break
      case 'verified':
        filtered = reviews.filter(review => review.customer.verified)
        break
      case 'photos':
        filtered = reviews.filter(review => review.images.length > 0)
        break
      case 'recent':
        filtered = reviews
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
          .slice(0, 5)
        break
      default:
        filtered = reviews
    }

    setDisplayedReviews(filtered)
  }

  const refreshReviews = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      const newReviews = generateReviews()
      setReviews(newReviews)
      setIsRefreshing(false)
    }, 1000)
  }

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - timestamp.getTime()) / 1000 / 60)

    if (diff < 1) return 'Just now'
    if (diff < 60) return `${diff}m ago`
    const hours = Math.floor(diff / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
        <FadeIn>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">
                  Real-Time Customer Reviews
                </h2>
                <p className="text-green-100">
                  Live feedback from verified customers
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">4.8</div>
              <div className="flex items-center">{renderStars(5)}</div>
              <div className="text-sm text-green-100">12,847 reviews</div>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="p-6">
        {/* Controls */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={refreshReviews}
              disabled={isRefreshing}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </FadeIn>

        {/* Review Stats */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">4.8</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">94%</div>
              <div className="text-sm text-gray-600">Would Recommend</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">87%</div>
              <div className="text-sm text-gray-600">Repeat Customers</div>
            </div>
          </div>
        </FadeIn>

        {/* Reviews List */}
        <div className="space-y-6 max-h-96 overflow-y-auto">
          <StaggeredAnimation>
            {displayedReviews.map(review => (
              <div
                key={review.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{review.customer.avatar}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">
                          {review.customer.name}
                        </h4>
                        {review.customer.verified && (
                          <Verified className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{review.customer.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{getTimeAgo(review.timestamp)}</span>
                        </div>
                        <span>{review.customer.totalOrders} orders</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {renderStars(review.rating)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {review.mealName} {review.mealImage}
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-900 mb-2">
                    {review.title}
                  </h5>
                  <p className="text-gray-700">{review.content}</p>
                </div>

                {/* Review Images */}
                {review.images.length > 0 && (
                  <div className="flex items-center space-x-2 mb-4">
                    <Camera className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {review.images.length} photo
                      {review.images.length > 1 ? 's' : ''} attached
                    </span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {review.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Review Actions */}
                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">Helpful ({review.helpful})</span>
                  </button>

                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4" />
                    <span>Trending review</span>
                  </div>
                </div>

                {/* Company Response */}
                {review.response && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          F75
                        </span>
                      </div>
                      <span className="font-semibold text-green-800">
                        {review.response.from}
                      </span>
                      <span className="text-sm text-gray-500">
                        {getTimeAgo(review.response.timestamp)}
                      </span>
                    </div>
                    <p className="text-green-700">{review.response.content}</p>
                  </div>
                )}
              </div>
            ))}
          </StaggeredAnimation>
        </div>

        {/* Live Indicator */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live reviews • Updated every 15 seconds</span>
        </div>
      </div>
    </div>
  )
}

export default RealTimeReviews
