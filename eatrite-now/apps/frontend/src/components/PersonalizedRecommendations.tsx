import React, { useState, useEffect } from 'react';
import { Heart, Star, ChefHat, Target, TrendingUp } from 'lucide-react';
import { useUserPreferences } from '../context/UserPreferencesContext';
import OptimizedImage from './OptimizedImage';

interface PersonalizedRecommendationsProps {
  meals: any[];
  onAddToCart: (meal: any) => void;
  onToggleFavorite: (mealId: string) => void;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({
  meals,
  onAddToCart,
  onToggleFavorite
}) => {
  const { 
    preferences, 
    getPersonalizedRecommendations,
    addFavoriteMeal,
    removeFavoriteMeal,
    hasProfile
  } = useUserPreferences();
  
  const [recommendedMeals, setRecommendedMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (meals.length > 0 && hasProfile) {
      setLoading(true);
      // Simulate loading for better UX
      setTimeout(() => {
        const recommended = getPersonalizedRecommendations(meals).slice(0, 8);
        setRecommendedMeals(recommended);
        setLoading(false);
      }, 500);
    } else {
      setRecommendedMeals(meals.slice(0, 8));
      setLoading(false);
    }
  }, [meals, preferences, hasProfile, getPersonalizedRecommendations]);

  const handleFavoriteToggle = (mealId: string) => {
    const isFavorite = preferences?.favoriteMeals.includes(mealId);
    
    if (isFavorite) {
      removeFavoriteMeal(mealId);
    } else {
      addFavoriteMeal(mealId);
    }
    
    onToggleFavorite(mealId);
  };

  const getRecommendationReason = (meal: any) => {
    if (!preferences) return null;

    const { dietaryProfile } = preferences;
    const mealTags = meal.dietary_tags?.toLowerCase() || '';
    
    // Check if it matches dietary restrictions
    const matchingRestrictions = dietaryProfile.restrictions.filter(restriction =>
      mealTags.includes(restriction.toLowerCase())
    );

    if (matchingRestrictions.length > 0) {
      return {
        icon: <Target className="w-4 h-4" />,
        text: `Matches your ${matchingRestrictions[0]} preference`,
        color: 'text-green-600 bg-green-50'
      };
    }

    // Check calorie alignment
    const calorieMatch = Math.abs(meal.calories - dietaryProfile.calorieGoal) < 100;
    if (calorieMatch) {
      return {
        icon: <TrendingUp className="w-4 h-4" />,
        text: `Perfect for your calorie goal`,
        color: 'text-blue-600 bg-blue-50'
      };
    }

    // Check protein alignment
    const proteinMatch = meal.protein >= dietaryProfile.proteinGoal * 0.2; // 20% of daily goal
    if (proteinMatch) {
      return {
        icon: <ChefHat className="w-4 h-4" />,
        text: `High protein for your goals`,
        color: 'text-purple-600 bg-purple-50'
      };
    }

    return {
      icon: <Star className="w-4 h-4" />,
      text: `Popular choice`,
      color: 'text-orange-600 bg-orange-50'
    };
  };

  if (!hasProfile) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 text-center">
        <div className="max-w-md mx-auto">
          <Heart className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Get Personalized Recommendations</h3>
          <p className="text-gray-600 mb-4">
            Complete your dietary profile to see meals tailored just for you.
          </p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Set Up Profile
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
            <p className="text-gray-600">Based on your dietary preferences</p>
          </div>
          <div className="animate-pulse bg-gray-200 h-6 w-20 rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Recommended for You, {preferences?.name}
          </h2>
          <p className="text-gray-600">Personalized based on your dietary profile</p>
        </div>
        <div className="flex items-center text-green-600">
          <Target className="w-5 h-5 mr-2" />
          <span className="font-medium">{recommendedMeals.length} matches</span>
        </div>
      </div>

      {/* Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedMeals.map((meal, index) => {
          const isFavorite = preferences?.favoriteMeals.includes(meal.id) || false;
          const reason = getRecommendationReason(meal);
          
          return (
            <div 
              key={meal.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative"
            >
              {/* Recommendation Badge */}
              {index < 3 && (
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    #{index + 1} Pick
                  </div>
                </div>
              )}

              {/* Favorite Button */}
              <button
                onClick={() => handleFavoriteToggle(meal.id)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
              >
                <Heart 
                  className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                />
              </button>

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <OptimizedImage
                  src={meal.image_url}
                  alt={meal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={300}
                  height={225}
                />
                
                {/* Overlay with reason */}
                {reason && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className={`flex items-center px-3 py-2 rounded-full text-xs font-medium ${reason.color} backdrop-blur-sm`}>
                      {reason.icon}
                      <span className="ml-2">{reason.text}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-gray-900 line-clamp-2">{meal.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{meal.description}</p>
                </div>

                {/* Nutrition Info */}
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{meal.calories} cal</span>
                  <span>{meal.protein}g protein</span>
                  <span>{meal.carbs}g carbs</span>
                </div>

                {/* Tags */}
                {meal.dietary_tags && (
                  <div className="flex flex-wrap gap-1">
                    {meal.dietary_tags.split(',').slice(0, 2).map((tag: string, tagIndex: number) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price and Add Button */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-lg font-bold text-gray-900">${meal.price}</span>
                  <button
                    onClick={() => onAddToCart(meal)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More */}
      {recommendedMeals.length >= 8 && (
        <div className="text-center">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-colors">
            Show More Recommendations
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalizedRecommendations;