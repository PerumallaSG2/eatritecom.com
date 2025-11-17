import React, { useState } from 'react'
import { Star, ThumbsUp, MessageCircle, Award } from 'lucide-react'

interface Rating {
  id: string
  userId: string
  userName: string
  rating: number
  review?: string
  helpful: number
  createdAt: string
  verified: boolean
}

interface MealRatingsProps {
  mealId: string
  mealName: string
  initialRating?: number
  showReviews?: boolean
  compact?: boolean
  onRatingChange?: (rating: number) => void
}

const MealRatings: React.FC<MealRatingsProps> = ({
  initialRating = 0,
  showReviews = true,
  compact = false,
  onRatingChange,
}) => {
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [averageRating, setAverageRating] = useState(initialRating || 4.5)
  const [totalRatings, setTotalRatings] = useState(127) // Mock data
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewText, setReviewText] = useState('')
  const [ratings, setRatings] = useState<Rating[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Sarah M.',
      rating: 5,
      review:
        'Absolutely delicious! The flavors were perfectly balanced and the portion size was just right. Will definitely order again.',
      helpful: 8,
      createdAt: '2024-11-10T10:00:00Z',
      verified: true,
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Mike R.',
      rating: 4,
      review:
        'Great meal overall. The protein was cooked perfectly, though I would have liked a bit more seasoning on the vegetables.',
      helpful: 5,
      createdAt: '2024-11-08T14:30:00Z',
      verified: true,
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Jennifer L.',
      rating: 5,
      review:
        'This has become my go-to meal! Healthy, tasty, and so convenient. The nutrition balance is perfect for my fitness goals.',
      helpful: 12,
      createdAt: '2024-11-05T09:15:00Z',
      verified: true,
    },
  ])

  // Rating distribution for visualization
  const ratingDistribution: Record<number, number> = {
    5: 68,
    4: 32,
    3: 8,
    2: 2,
    1: 1,
  }

  const handleRatingClick = (rating: number) => {
    setUserRating(rating)
    setShowReviewForm(true)
    onRatingChange?.(rating)
  }

  const handleReviewSubmit = () => {
    if (userRating === 0) return

    const newReview: Rating = {
      id: `user-${Date.now()}`,
      userId: 'current-user',
      userName: 'You',
      rating: userRating,
      review: reviewText,
      helpful: 0,
      createdAt: new Date().toISOString(),
      verified: false,
    }

    setRatings(prev => [newReview, ...prev])

    // Update average rating
    const newTotal = totalRatings + 1
    const newAverage = (averageRating * totalRatings + userRating) / newTotal
    setAverageRating(newAverage)
    setTotalRatings(newTotal)

    setShowReviewForm(false)
    setReviewText('')
  }

  const renderStars = (
    rating: number,
    interactive: boolean = false,
    size: 'sm' | 'md' | 'lg' = 'md'
  ) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    }

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            disabled={!interactive}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => interactive && handleRatingClick(star)}
            className={`${sizeClasses[size]} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          >
            <Star
              className={`w-full h-full ${
                star <= (hoverRating || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              } ${interactive ? 'transition-colors' : ''}`}
            />
          </button>
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        {renderStars(averageRating)}
        <span className="text-sm font-medium text-gray-700">
          {averageRating.toFixed(1)}
        </span>
        <span className="text-xs text-gray-500">({totalRatings})</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overall Rating Summary */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Customer Reviews
            </h3>
            <div className="flex items-center space-x-3 mb-3">
              {renderStars(averageRating, false, 'lg')}
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">
                  {totalRatings} reviews
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(stars => {
                const percentage =
                  (ratingDistribution[stars] / totalRatings) * 100
                return (
                  <div key={stars} className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 w-8">{stars}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8">
                      {ratingDistribution[stars]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Rate This Meal */}
          <div className="text-center">
            <div className="mb-2 text-sm font-medium text-gray-700">
              Rate This Meal
            </div>
            {renderStars(userRating, true)}
            {userRating > 0 && (
              <div className="mt-2 text-xs text-green-600">
                Thanks for rating!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Write a Review</h4>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating: {renderStars(userRating)}
            </label>
          </div>
          <textarea
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            placeholder="Tell others about your experience with this meal..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            rows={4}
          />
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowReviewForm(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleReviewSubmit}
              disabled={userRating === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {showReviews && (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Recent Reviews
          </h4>

          {ratings.slice(0, 5).map(rating => (
            <div
              key={rating.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">
                      {rating.userName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {rating.userName}
                      </span>
                      {rating.verified && (
                        <div title="Verified Purchase">
                          <Award className="w-4 h-4 text-green-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {renderStars(rating.rating, false, 'sm')}
                      <span className="text-xs text-gray-500">
                        {formatDate(rating.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {rating.review && (
                <p className="text-gray-700 mb-3 leading-relaxed">
                  {rating.review}
                </p>
              )}

              <div className="flex items-center justify-between text-sm">
                <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({rating.helpful})</span>
                </button>

                {rating.userId === 'current-user' && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Your Review
                  </span>
                )}
              </div>
            </div>
          ))}

          {ratings.length > 5 && (
            <button className="w-full py-3 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
              View All {ratings.length} Reviews
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default MealRatings
