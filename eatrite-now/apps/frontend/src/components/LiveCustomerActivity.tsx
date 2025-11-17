import React, { useState, useEffect } from 'react'
import {
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  MapPin,
  Utensils,
  Star,
  Award,
  Heart,
  ThumbsUp,
} from 'lucide-react'
import { FadeIn } from './AnimationComponents'

interface CustomerActivity {
  id: string
  type: 'order' | 'review' | 'milestone' | 'referral' | 'subscription'
  customer: {
    name: string
    location: string
    avatar: string
    isVerified: boolean
  }
  activity: string
  details: string
  timestamp: Date
  rating?: number
  mealCount?: number
  savings?: number
  icon: React.ComponentType<any>
  color: string
}

const generateRecentActivities = (): CustomerActivity[] => {
  const activities: CustomerActivity[] = [
    {
      id: '1',
      type: 'order',
      customer: {
        name: 'Sarah M.',
        location: 'New York, NY',
        avatar: '👩‍💼',
        isVerified: true,
      },
      activity: 'Ordered the Mediterranean Bundle',
      details: '12 meals for family meal prep',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      icon: Utensils,
      color: 'blue',
    },
    {
      id: '2',
      type: 'review',
      customer: {
        name: 'Mike R.',
        location: 'Los Angeles, CA',
        avatar: '👨‍🏋️',
        isVerified: true,
      },
      activity: 'Rated Keto Power Bowl',
      details: '"Perfect macros for my training!"',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      rating: 5,
      icon: Star,
      color: 'yellow',
    },
    {
      id: '3',
      type: 'milestone',
      customer: {
        name: 'Jessica L.',
        location: 'Austin, TX',
        avatar: '👩‍⚕️',
        isVerified: true,
      },
      activity: 'Reached 50 meal milestone',
      details: 'Lost 15 lbs and feels amazing!',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      mealCount: 50,
      icon: Award,
      color: 'purple',
    },
    {
      id: '4',
      type: 'subscription',
      customer: {
        name: 'David K.',
        location: 'Chicago, IL',
        avatar: '👨‍💻',
        isVerified: true,
      },
      activity: 'Started Premium Plan',
      details: 'Upgraded for family of 4',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      icon: CheckCircle,
      color: 'green',
    },
    {
      id: '5',
      type: 'referral',
      customer: {
        name: 'Emily C.',
        location: 'Seattle, WA',
        avatar: '👩‍🎨',
        isVerified: true,
      },
      activity: 'Referred 3 friends',
      details: 'Earned $75 in credits',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      savings: 75,
      icon: Heart,
      color: 'pink',
    },
    {
      id: '6',
      type: 'order',
      customer: {
        name: 'Carlos M.',
        location: 'Miami, FL',
        avatar: '👨‍🍳',
        isVerified: true,
      },
      activity: 'Reordered Paleo Favorites',
      details: '8 meals for the week',
      timestamp: new Date(Date.now() - 18 * 60 * 1000),
      icon: Utensils,
      color: 'blue',
    },
    {
      id: '7',
      type: 'review',
      customer: {
        name: 'Amanda P.',
        location: 'Denver, CO',
        avatar: '👩‍🏫',
        isVerified: true,
      },
      activity: 'Left 5-star review',
      details: '"Kids actually love these healthy meals!"',
      timestamp: new Date(Date.now() - 22 * 60 * 1000),
      rating: 5,
      icon: ThumbsUp,
      color: 'green',
    },
  ]

  return activities
}

export const LiveCustomerActivity: React.FC = () => {
  const [_activities, _setActivities] = useState<CustomerActivity[]>([])
  const [visibleActivities, setVisibleActivities] = useState<
    CustomerActivity[]
  >([])

  useEffect(() => {
    const initialActivities = generateRecentActivities()
    _setActivities(initialActivities)
    setVisibleActivities(initialActivities.slice(0, 4))

    // Simulate new activity every 10 seconds
    const interval = setInterval(() => {
      const newActivity: CustomerActivity = {
        id: Date.now().toString(),
        type: 'order',
        customer: {
          name: 'New Customer',
          location: 'Nationwide',
          avatar: '🎉',
          isVerified: true,
        },
        activity: 'Just placed an order',
        details: 'Fresh meal delivery',
        timestamp: new Date(),
        icon: Utensils,
        color: 'blue',
      }

      _setActivities((prev: CustomerActivity[]) => [newActivity, ...prev])
      setVisibleActivities(prev => [newActivity, ...prev.slice(0, 3)])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

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

  const getActivityIcon = (activity: CustomerActivity) => {
    const IconComponent = activity.icon
    return (
      <div
        className={`w-10 h-10 rounded-full bg-${activity.color}-100 flex items-center justify-center flex-shrink-0`}
      >
        <IconComponent className={`w-5 h-5 text-${activity.color}-600`} />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Users className="w-8 h-8" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-xl font-bold">Live Customer Activity</h3>
            <p className="text-blue-100">
              Real customers, real results, happening now
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Activity Stats */}
        <FadeIn>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">247</div>
              <div className="text-sm text-gray-600">Orders Today</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">4.9</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">89%</div>
              <div className="text-sm text-gray-600">Reorder Rate</div>
            </div>
          </div>
        </FadeIn>

        {/* Live Activity Feed */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {visibleActivities.map(activity => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {getActivityIcon(activity)}

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-900">
                    {activity.customer.name}
                  </span>
                  {activity.customer.isVerified && (
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  )}
                  <span className="text-2xl">{activity.customer.avatar}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                  <MapPin className="w-3 h-3" />
                  <span>{activity.customer.location}</span>
                  <Clock className="w-3 h-3 ml-2" />
                  <span>{getTimeAgo(activity.timestamp)}</span>
                </div>

                <p className="text-gray-800 font-medium mb-1">
                  {activity.activity}
                </p>

                <p className="text-sm text-gray-600">{activity.details}</p>

                {/* Rating Display */}
                {activity.rating && (
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < activity.rating!
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Meal Count Badge */}
                {activity.mealCount && (
                  <div className="inline-flex items-center mt-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                    <Award className="w-3 h-3 mr-1" />
                    {activity.mealCount} meals completed
                  </div>
                )}

                {/* Savings Badge */}
                {activity.savings && (
                  <div className="inline-flex items-center mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    💰 ${activity.savings} earned
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Trending Metrics */}
        <FadeIn delay={0.3}>
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Trending Now</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Most Popular: </span>
                <span className="font-semibold text-blue-600">
                  Keto Power Bowl
                </span>
              </div>
              <div>
                <span className="text-gray-600">Top Location: </span>
                <span className="font-semibold text-green-600">California</span>
              </div>
              <div>
                <span className="text-gray-600">Peak Time: </span>
                <span className="font-semibold text-purple-600">
                  Sunday 6PM
                </span>
              </div>
              <div>
                <span className="text-gray-600">Avg Order: </span>
                <span className="font-semibold text-orange-600">8.3 meals</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Live Indicators */}
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live updates</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>{Math.floor(Math.random() * 500 + 200)} people viewing</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveCustomerActivity
