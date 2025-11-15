import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Calendar, 
  TrendingUp, 
  Heart,
  Scale,
  Zap,
  Quote
} from 'lucide-react';
import { FadeIn } from './AnimationComponents';

interface Transformation {
  id: string;
  name: string;
  age: number;
  location: string;
  beforeImage: string;
  afterImage: string;
  timeframe: string;
  weightLoss?: number;
  stats: {
    energyIncrease: number;
    workoutFrequency: string;
    favoriteMeals: string[];
  };
  testimonial: string;
  achievements: string[];
  rating: number;
}

const transformations: Transformation[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 34,
    location: 'Austin, TX',
    beforeImage: 'https://images.unsplash.com/photo-1494790108755-2616c88ca48d?w=300&h=400&fit=crop&crop=face',
    afterImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face',
    timeframe: '6 months',
    weightLoss: 32,
    stats: {
      energyIncrease: 85,
      workoutFrequency: '5x per week',
      favoriteMeals: ['Grilled Chicken & Vegetables', 'Salmon with Quinoa', 'Turkey Meatballs']
    },
    testimonial: "Factor75 completely changed my relationship with food. Having healthy, delicious meals ready to go eliminated my stress around meal planning and helped me stay consistent with my health goals.",
    achievements: ['Lost 32 lbs', 'Improved sleep quality', 'Increased energy levels', 'Completed first 5K'],
    rating: 5
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    age: 42,
    location: 'Denver, CO',
    beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face',
    afterImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face',
    timeframe: '4 months',
    weightLoss: 28,
    stats: {
      energyIncrease: 70,
      workoutFrequency: '4x per week',
      favoriteMeals: ['Grass-Fed Beef Sirloin', 'Pork Tenderloin', 'Cod Fish & Rice']
    },
    testimonial: "As a busy executive, Factor75 gave me back hours of my week while helping me achieve the best shape of my life. The convenience factor is unmatched.",
    achievements: ['Lost 28 lbs', 'Gained lean muscle', 'Improved focus at work', 'Better family time'],
    rating: 5
  },
  {
    id: '3',
    name: 'Emily Chen',
    age: 28,
    location: 'Seattle, WA',
    beforeImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop&crop=face',
    afterImage: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=400&fit=crop&crop=face',
    timeframe: '5 months',
    weightLoss: 24,
    stats: {
      energyIncrease: 90,
      workoutFrequency: '6x per week',
      favoriteMeals: ['Shrimp Scampi', 'Vegetarian Bowl', 'Chicken Caesar Bowl']
    },
    testimonial: "Factor75 helped me break my cycle of takeout and processed foods. The variety and quality of meals made healthy eating enjoyable, not a chore.",
    achievements: ['Lost 24 lbs', 'Ran first marathon', 'Improved skin clarity', 'Better mood stability'],
    rating: 5
  }
];

export const TransformationGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % transformations.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const nextTransformation = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
    setIsAutoPlaying(false);
  };

  const prevTransformation = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
    setIsAutoPlaying(false);
  };

  const currentTransformation = transformations[currentIndex];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl overflow-hidden shadow-2xl">
      <FadeIn>
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Real Customer Transformations</h2>
            <p className="text-purple-100 text-lg">
              See how Factor75 has helped thousands achieve their health goals
            </p>
          </div>
        </div>
      </FadeIn>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Before/After Images */}
          <FadeIn delay={0.1}>
            <div className="space-y-6">
              {/* Image Comparison */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <img
                      src={currentTransformation.beforeImage}
                      alt={`${currentTransformation.name} before`}
                      className="w-full h-80 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Before
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={currentTransformation.afterImage}
                      alt={`${currentTransformation.name} after`}
                      className="w-full h-80 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      After
                    </div>
                  </div>
                </div>
                
                {/* Transformation Arrow */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg">
                  <ChevronRight className="w-6 h-6 text-green-500" />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 text-center shadow-md">
                  <Scale className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {currentTransformation.weightLoss}lbs
                  </div>
                  <div className="text-sm text-gray-600">Weight Loss</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-md">
                  <Calendar className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {currentTransformation.timeframe}
                  </div>
                  <div className="text-sm text-gray-600">Timeframe</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-md">
                  <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    +{currentTransformation.stats.energyIncrease}%
                  </div>
                  <div className="text-sm text-gray-600">Energy</div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Transformation Story */}
          <FadeIn delay={0.2}>
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {currentTransformation.name}
                    </h3>
                    <p className="text-gray-600">
                      Age {currentTransformation.age} • {currentTransformation.location}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < currentTransformation.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-6 h-6 text-purple-300" />
                  <p className="text-gray-700 italic pl-4 mb-4">
                    "{currentTransformation.testimonial}"
                  </p>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {currentTransformation.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Favorite Meals */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>Favorite Factor75 Meals</span>
                </h4>
                <div className="space-y-2">
                  {currentTransformation.stats.favoriteMeals.map((meal, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <span className="text-sm text-gray-700">{meal}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <strong>Workout Frequency:</strong> {currentTransformation.stats.workoutFrequency}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6 text-center">
                <h4 className="font-bold text-lg mb-2">Ready to Start Your Transformation?</h4>
                <p className="text-green-100 mb-4">Join thousands who've achieved their goals with Factor75</p>
                <button className="bg-white text-green-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  Get Started Today
                </button>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Navigation */}
        <FadeIn delay={0.3}>
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTransformation}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {transformations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-purple-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTransformation}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </FadeIn>

        {/* Statistics Summary */}
        <FadeIn delay={0.4}>
          <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
            <h4 className="font-semibold text-gray-900 text-center mb-6">
              Factor75 Transformation Results
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-1">10,000+</div>
                <div className="text-sm text-gray-600">Successful Transformations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-1">28 lbs</div>
                <div className="text-sm text-gray-600">Average Weight Loss</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-1">4.5 months</div>
                <div className="text-sm text-gray-600">Average Timeframe</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600 mb-1">78%</div>
                <div className="text-sm text-gray-600">Energy Increase</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default TransformationGallery;