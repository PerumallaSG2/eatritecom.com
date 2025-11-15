import React, { useState } from 'react';
import { Plus, X, Zap, Activity, TrendingUp, Heart, Award, Star } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface Meal {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sodium?: number;
  price: number;
  image_url: string;
  dietary_tags?: string;
  is_popular?: boolean;
  rating?: number;
}

interface MealComparisonProps {
  availableMeals: Meal[];
  initialMeals?: Meal[];
  onAddToCart?: (meal: Meal) => void;
}

const MealComparison: React.FC<MealComparisonProps> = ({
  availableMeals,
  initialMeals = [],
  onAddToCart
}) => {
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>(initialMeals);
  const [showMealSelector, setShowMealSelector] = useState(false);

  const addMealToComparison = (meal: Meal) => {
    if (selectedMeals.length < 4 && !selectedMeals.find(m => m.id === meal.id)) {
      setSelectedMeals([...selectedMeals, meal]);
    }
    setShowMealSelector(false);
  };

  const removeMealFromComparison = (mealId: string) => {
    setSelectedMeals(selectedMeals.filter(meal => meal.id !== mealId));
  };

  const getComparisonValue = (value: number, values: number[], higher_is_better: boolean = true) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    if (min === max) return 'neutral';
    
    if (higher_is_better) {
      return value === max ? 'best' : value === min ? 'worst' : 'neutral';
    } else {
      return value === min ? 'best' : value === max ? 'worst' : 'neutral';
    }
  };

  const getValueColor = (comparison: string) => {
    switch (comparison) {
      case 'best': return 'text-green-600 bg-green-50';
      case 'worst': return 'text-red-600 bg-red-50';
      default: return 'text-gray-700 bg-gray-50';
    }
  };

  const nutritionMetrics = [
    { 
      key: 'calories', 
      label: 'Calories', 
      icon: <Zap className="w-4 h-4" />, 
      unit: '', 
      higherIsBetter: false 
    },
    { 
      key: 'protein', 
      label: 'Protein', 
      icon: <Activity className="w-4 h-4" />, 
      unit: 'g', 
      higherIsBetter: true 
    },
    { 
      key: 'carbs', 
      label: 'Carbs', 
      icon: <TrendingUp className="w-4 h-4" />, 
      unit: 'g', 
      higherIsBetter: false 
    },
    { 
      key: 'fat', 
      label: 'Fat', 
      icon: <Heart className="w-4 h-4" />, 
      unit: 'g', 
      higherIsBetter: false 
    }
  ];

  if (selectedMeals.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Compare Meals</h3>
          <p className="text-gray-600 mb-6">
            Select up to 4 meals to compare their nutrition facts, pricing, and ratings side by side.
          </p>
          <button
            onClick={() => setShowMealSelector(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Meals to Compare
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">Meal Comparison</h2>
            <p className="text-blue-100">Compare nutrition facts and features</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm bg-white/20 px-2 py-1 rounded">
              {selectedMeals.length}/4 meals
            </span>
            {selectedMeals.length < 4 && (
              <button
                onClick={() => setShowMealSelector(true)}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Meal Selector Modal */}
      {showMealSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Select Meal to Compare</h3>
              <button
                onClick={() => setShowMealSelector(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableMeals
                .filter(meal => !selectedMeals.find(m => m.id === meal.id))
                .slice(0, 12)
                .map(meal => (
                  <button
                    key={meal.id}
                    onClick={() => addMealToComparison(meal)}
                    className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <div className="aspect-w-16 aspect-h-9 mb-3">
                      <OptimizedImage
                        src={meal.image_url}
                        alt={meal.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{meal.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{meal.calories} cal • ${meal.price}</p>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-4 font-medium text-gray-700 min-w-[200px]">Meal</th>
              {selectedMeals.map(meal => (
                <th key={meal.id} className="text-center p-4 min-w-[200px] relative">
                  <button
                    onClick={() => removeMealFromComparison(meal.id)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="aspect-w-16 aspect-h-9 mb-3">
                    <OptimizedImage
                      src={meal.image_url}
                      alt={meal.name}
                      className="w-full h-32 object-cover rounded-lg mx-auto"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{meal.name}</h3>
                  <p className="text-sm text-gray-600">${meal.price}</p>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {/* Description */}
            <tr className="border-t border-gray-200">
              <td className="p-4 font-medium text-gray-700">Description</td>
              {selectedMeals.map(meal => (
                <td key={meal.id} className="p-4 text-center text-sm text-gray-600">
                  {meal.description}
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Rating</td>
              {selectedMeals.map(meal => (
                <td key={meal.id} className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {meal.rating?.toFixed(1) || '4.5'}
                    </span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Nutrition Metrics */}
            {nutritionMetrics.map((metric, index) => {
              const values = selectedMeals.map(meal => meal[metric.key as keyof Meal] as number);
              
              return (
                <tr key={metric.key} className={`border-t border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                  <td className="p-4 font-medium text-gray-700 flex items-center">
                    {metric.icon}
                    <span className="ml-2">{metric.label}</span>
                  </td>
                  {selectedMeals.map((meal) => {
                    const value = meal[metric.key as keyof Meal] as number;
                    const comparison = getComparisonValue(value, values, metric.higherIsBetter);
                    
                    return (
                      <td key={meal.id} className="p-4 text-center">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full font-medium ${getValueColor(comparison)}`}>
                          {value}{metric.unit}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {/* Dietary Tags */}
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Dietary Tags</td>
              {selectedMeals.map(meal => (
                <td key={meal.id} className="p-4 text-center">
                  <div className="flex flex-wrap justify-center gap-1">
                    {meal.dietary_tags?.split(',').slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    )) || <span className="text-gray-400 text-sm">None</span>}
                  </div>
                </td>
              ))}
            </tr>

            {/* Popular Badge */}
            <tr className="border-t border-gray-200">
              <td className="p-4 font-medium text-gray-700">Popular</td>
              {selectedMeals.map(meal => (
                <td key={meal.id} className="p-4 text-center">
                  {meal.is_popular ? (
                    <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Popular
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Action Buttons */}
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Action</td>
              {selectedMeals.map(meal => (
                <td key={meal.id} className="p-4 text-center">
                  <button
                    onClick={() => onAddToCart?.(meal)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Add to Cart
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealComparison;