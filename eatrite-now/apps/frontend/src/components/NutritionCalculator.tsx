import React, { useState, useEffect } from 'react';
import { Calculator, Target, TrendingUp, Activity, Zap, Heart } from 'lucide-react';

interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

interface NutritionCalculatorProps {
  selectedMeals?: any[];
  onGoalsChange?: (goals: NutritionGoals) => void;
}

const NutritionCalculator: React.FC<NutritionCalculatorProps> = ({
  selectedMeals = [],
  onGoalsChange
}) => {
  const [personalInfo, setPersonalInfo] = useState({
    age: 30,
    weight: 150, // lbs
    height: 68, // inches
    gender: 'male' as 'male' | 'female',
    activityLevel: 'moderate' as 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active',
    goal: 'maintain' as 'lose' | 'maintain' | 'gain'
  });

  const [calculatedGoals, setCalculatedGoals] = useState<NutritionGoals>({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 67,
    fiber: 25
  });

  const [currentIntake, setCurrentIntake] = useState<NutritionGoals>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0
  });

  // Activity level multipliers for BMR
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    'very-active': 1.9
  };

  // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
  const calculateBMR = () => {
    const { weight, height, age, gender } = personalInfo;
    
    // Convert to metric
    const weightKg = weight * 0.453592;
    const heightCm = height * 2.54;
    
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
    
    return Math.round(bmr * activityMultipliers[personalInfo.activityLevel]);
  };

  // Calculate nutrition goals based on personal info
  useEffect(() => {
    const baseCals = calculateBMR();
    let targetCals = baseCals;
    
    // Adjust for goals
    switch (personalInfo.goal) {
      case 'lose':
        targetCals = baseCals - 500; // 1lb per week deficit
        break;
      case 'gain':
        targetCals = baseCals + 500; // 1lb per week surplus
        break;
      default:
        targetCals = baseCals;
    }

    const protein = Math.round(personalInfo.weight * 0.8); // 0.8g per lb
    const fat = Math.round((targetCals * 0.3) / 9); // 30% of calories
    const carbs = Math.round((targetCals - (protein * 4) - (fat * 9)) / 4);
    const fiber = Math.round(targetCals / 80); // ~14g per 1000 cals

    const newGoals = {
      calories: targetCals,
      protein,
      carbs,
      fat,
      fiber
    };

    setCalculatedGoals(newGoals);
    onGoalsChange?.(newGoals);
  }, [personalInfo, onGoalsChange]);

  // Calculate current intake from selected meals
  useEffect(() => {
    const totals = selectedMeals.reduce((acc, meal) => ({
      calories: acc.calories + (meal.calories || 0),
      protein: acc.protein + (meal.protein || 0),
      carbs: acc.carbs + (meal.carbs || 0),
      fat: acc.fat + (meal.fat || 0),
      fiber: acc.fiber + (meal.fiber || 8) // Estimate if not provided
    }), {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0
    });

    setCurrentIntake(totals);
  }, [selectedMeals]);

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage < 80) return 'bg-red-500';
    if (percentage < 100) return 'bg-yellow-500';
    if (percentage < 120) return 'bg-green-500';
    return 'bg-orange-500';
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Calculator className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-bold text-gray-900">Nutrition Calculator</h2>
      </div>

      {/* Personal Information Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            min="18"
            max="100"
            value={personalInfo.age}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, age: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label>
          <input
            type="number"
            min="80"
            max="400"
            value={personalInfo.weight}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, weight: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height (inches)</label>
          <input
            type="number"
            min="48"
            max="84"
            value={personalInfo.height}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, height: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            value={personalInfo.gender}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
          <select
            value={personalInfo.activityLevel}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, activityLevel: e.target.value as any }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Light Exercise</option>
            <option value="moderate">Moderate Exercise</option>
            <option value="active">Active</option>
            <option value="very-active">Very Active</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
          <select
            value={personalInfo.goal}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, goal: e.target.value as any }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <Target className="w-5 h-5 mr-2 text-green-600" />
          Daily Progress
          {selectedMeals.length > 0 && (
            <span className="ml-2 text-sm text-gray-500">
              ({selectedMeals.length} meals selected)
            </span>
          )}
        </h3>

        {/* Calories */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Zap className="w-4 h-4 text-orange-500 mr-2" />
              <span className="font-medium">Calories</span>
            </div>
            <span className="text-sm text-gray-600">
              {currentIntake.calories} / {calculatedGoals.calories}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(currentIntake.calories, calculatedGoals.calories)}`}
              style={{ width: `${getProgressPercentage(currentIntake.calories, calculatedGoals.calories)}%` }}
            />
          </div>
        </div>

        {/* Protein */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Activity className="w-4 h-4 text-blue-500 mr-2" />
              <span className="font-medium">Protein</span>
            </div>
            <span className="text-sm text-gray-600">
              {currentIntake.protein}g / {calculatedGoals.protein}g
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(currentIntake.protein, calculatedGoals.protein)}`}
              style={{ width: `${getProgressPercentage(currentIntake.protein, calculatedGoals.protein)}%` }}
            />
          </div>
        </div>

        {/* Carbs */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
              <span className="font-medium">Carbohydrates</span>
            </div>
            <span className="text-sm text-gray-600">
              {currentIntake.carbs}g / {calculatedGoals.carbs}g
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(currentIntake.carbs, calculatedGoals.carbs)}`}
              style={{ width: `${getProgressPercentage(currentIntake.carbs, calculatedGoals.carbs)}%` }}
            />
          </div>
        </div>

        {/* Fat */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Heart className="w-4 h-4 text-purple-500 mr-2" />
              <span className="font-medium">Fat</span>
            </div>
            <span className="text-sm text-gray-600">
              {currentIntake.fat}g / {calculatedGoals.fat}g
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(currentIntake.fat, calculatedGoals.fat)}`}
              style={{ width: `${getProgressPercentage(currentIntake.fat, calculatedGoals.fat)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-xl font-bold text-orange-600">
            {Math.round(getProgressPercentage(currentIntake.calories, calculatedGoals.calories))}%
          </div>
          <div className="text-xs text-gray-600">Calories</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">
            {Math.round(getProgressPercentage(currentIntake.protein, calculatedGoals.protein))}%
          </div>
          <div className="text-xs text-gray-600">Protein</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-xl font-bold text-green-600">
            {Math.round(getProgressPercentage(currentIntake.carbs, calculatedGoals.carbs))}%
          </div>
          <div className="text-xs text-gray-600">Carbs</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-xl font-bold text-purple-600">
            {Math.round(getProgressPercentage(currentIntake.fat, calculatedGoals.fat))}%
          </div>
          <div className="text-xs text-gray-600">Fat</div>
        </div>
      </div>

      {selectedMeals.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Calculator className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>Add meals to your cart to see nutrition progress</p>
        </div>
      )}
    </div>
  );
};

export default NutritionCalculator;