import React, { useState, useEffect } from 'react'
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  Instagram,
  Twitter,
  Award,
  Verified,
  Quote,
} from 'lucide-react'
import { FadeIn, StaggeredAnimation } from './AnimationComponents'

interface Celebrity {
  id: string
  name: string
  profession: string
  avatar: string
  testimonial: string
  rating: number
  followers: string
  verified: boolean
  videoUrl?: string
  socialMedia: {
    instagram?: string
    twitter?: string
  }
  category: 'athlete' | 'actor' | 'entrepreneur' | 'influencer' | 'chef'
  achievements: string[]
}

const celebrities: Celebrity[] = [
  {
    id: '1',
    name: 'Tom Brady',
    profession: 'NFL Legend & 7x Super Bowl Champion',
    avatar: '🏈',
    testimonial:
      'Factor75 keeps me performing at my peak. The nutrition is exactly what my body needs for recovery and sustained energy.',
    rating: 5,
    followers: '12M',
    verified: true,
    videoUrl: 'https://example.com/brady-testimonial',
    socialMedia: {
      instagram: '@tombrady',
      twitter: '@TomBrady',
    },
    category: 'athlete',
    achievements: [
      '7x Super Bowl Champion',
      'TB12 Method Founder',
      'Longevity Expert',
    ],
  },
  {
    id: '2',
    name: 'Jennifer Aniston',
    profession: 'Emmy-Winning Actress & Wellness Advocate',
    avatar: '🎬',
    testimonial:
      "As someone who's always on set, Factor75 gives me the clean eating I need without the prep time. It's been a game-changer!",
    rating: 5,
    followers: '41M',
    verified: true,
    socialMedia: {
      instagram: '@jenniferaniston',
    },
    category: 'actor',
    achievements: ['Emmy Winner', 'Golden Globe Winner', 'Friends Star'],
  },
  {
    id: '3',
    name: 'Tim Ferriss',
    profession: 'Author & Biohacker',
    avatar: '📚',
    testimonial:
      "I've tested thousands of optimization strategies. Factor75's approach to nutrition science and convenience is unmatched.",
    rating: 5,
    followers: '2.1M',
    verified: true,
    socialMedia: {
      instagram: '@timferris',
      twitter: '@tferriss',
    },
    category: 'entrepreneur',
    achievements: ['4-Hour Workweek Author', 'Angel Investor', 'Podcast Host'],
  },
  {
    id: '4',
    name: 'Serena Williams',
    profession: '23x Grand Slam Tennis Champion',
    avatar: '🎾',
    testimonial:
      'Nutrition is crucial for athletic performance. Factor75 delivers restaurant-quality meals that fuel my training and recovery.',
    rating: 5,
    followers: '15M',
    verified: true,
    socialMedia: {
      instagram: '@serenawilliams',
      twitter: '@serenawilliams',
    },
    category: 'athlete',
    achievements: [
      '23x Grand Slam Champion',
      'Olympic Gold Medalist',
      'Tennis Legend',
    ],
  },
  {
    id: '5',
    name: 'Gordon Ramsay',
    profession: 'Michelin-Starred Chef & TV Personality',
    avatar: '👨‍🍳',
    testimonial:
      "The quality and flavor profiles in Factor75 meals are exceptional. It's restaurant-caliber food delivered to your door.",
    rating: 5,
    followers: '32M',
    verified: true,
    socialMedia: {
      instagram: '@gordongram',
      twitter: '@GordonRamsay',
    },
    category: 'chef',
    achievements: [
      'Michelin Star Chef',
      'TV Personality',
      'Restaurant Empire Owner',
    ],
  },
]

export const CelebrityEndorsements: React.FC = () => {
  const [currentCelebrity, setCurrentCelebrity] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCelebrity(prev => (prev + 1) % celebrities.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextCelebrity = () => {
    setCurrentCelebrity(prev => (prev + 1) % celebrities.length)
  }

  const prevCelebrity = () => {
    setCurrentCelebrity(
      prev => (prev - 1 + celebrities.length) % celebrities.length
    )
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      athlete: 'text-red-600 bg-red-50',
      actor: 'text-purple-600 bg-purple-50',
      entrepreneur: 'text-blue-600 bg-blue-50',
      influencer: 'text-pink-600 bg-pink-50',
      chef: 'text-orange-600 bg-orange-50',
    }
    return colors[category as keyof typeof colors] || 'text-gray-600 bg-gray-50'
  }

  const celebrity = celebrities[currentCelebrity]

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative p-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Award className="w-8 h-8 text-yellow-400" />
              <h2 className="text-3xl font-bold">Celebrity Endorsements</h2>
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-gray-300 text-lg">
              Trusted by world-class performers and industry leaders
            </p>
          </div>
        </FadeIn>

        {/* Main Celebrity Spotlight */}
        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-6">
          <FadeIn key={celebrity.id}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Celebrity Info */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                  <div className="text-6xl">{celebrity.avatar}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-2xl font-bold">{celebrity.name}</h3>
                      {celebrity.verified && (
                        <Verified className="w-6 h-6 text-blue-400" />
                      )}
                    </div>
                    <p className="text-gray-300">{celebrity.profession}</p>
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${getCategoryColor(celebrity.category)}`}
                    >
                      {celebrity.category.charAt(0).toUpperCase() +
                        celebrity.category.slice(1)}
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                  {celebrity.socialMedia.instagram && (
                    <div className="flex items-center space-x-2 text-pink-400">
                      <Instagram className="w-5 h-5" />
                      <span className="text-sm">
                        {celebrity.followers} followers
                      </span>
                    </div>
                  )}
                  {celebrity.socialMedia.twitter && (
                    <div className="flex items-center space-x-2 text-blue-400">
                      <Twitter className="w-5 h-5" />
                      <span className="text-sm">
                        @{celebrity.name.replace(' ', '').toLowerCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <StaggeredAnimation className="space-y-2">
                    {celebrity.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </StaggeredAnimation>
                </div>
              </div>

              {/* Testimonial */}
              <div className="relative">
                <Quote className="w-12 h-12 text-blue-400 opacity-20 absolute -top-2 -left-2" />
                <blockquote className="text-xl italic text-gray-100 mb-6 relative z-10">
                  "{celebrity.testimonial}"
                </blockquote>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < celebrity.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-300">({celebrity.rating}/5)</span>
                </div>

                {/* Video Testimonial Button */}
                {celebrity.videoUrl && (
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    <span>Watch Video Testimonial</span>
                  </button>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
            <button
              onClick={prevCelebrity}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
            <button
              onClick={nextCelebrity}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Celebrity Thumbnails */}
        <FadeIn delay={0.2}>
          <div className="flex justify-center space-x-4 mb-6">
            {celebrities.map((celeb, index) => (
              <button
                key={celeb.id}
                onClick={() => setCurrentCelebrity(index)}
                className={`relative p-3 rounded-full transition-all ${
                  index === currentCelebrity
                    ? 'bg-white/20 scale-110'
                    : 'bg-white/10 hover:bg-white/15'
                }`}
              >
                <span className="text-2xl">{celeb.avatar}</span>
                {celeb.verified && (
                  <Verified className="absolute -top-1 -right-1 w-4 h-4 text-blue-400" />
                )}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Stats Bar */}
        <FadeIn delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {celebrities.length}
              </div>
              <div className="text-sm text-gray-300">Celebrity Partners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">100M+</div>
              <div className="text-sm text-gray-300">Combined Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">4.9</div>
              <div className="text-sm text-gray-300">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">95%</div>
              <div className="text-sm text-gray-300">Would Recommend</div>
            </div>
          </div>
        </FadeIn>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            {celebrities.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentCelebrity ? 'bg-white w-8' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CelebrityEndorsements
