import React, { useState } from 'react';
import { User, Settings, Heart, Target, Bell, Edit3 } from 'lucide-react';
import { useUserPreferences } from '../context/UserPreferencesContext';
import DietaryProfileSetup from '../components/DietaryProfileSetup';

const ProfilePage: React.FC = () => {
  const { preferences, hasProfile } = useUserPreferences();
  const [showSetup, setShowSetup] = useState(!hasProfile);

  if (showSetup || !hasProfile) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <DietaryProfileSetup 
            onComplete={() => setShowSetup(false)}
          />
        </div>
      </div>
    );
  }

  if (!preferences) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{preferences.name}</h1>
                <p className="text-gray-600">{preferences.email}</p>
              </div>
            </div>
            <button
              onClick={() => setShowSetup(true)}
              className="flex items-center px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Dietary Profile */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Dietary Preferences */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Target className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Dietary Preferences</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Dietary Restrictions</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences.dietaryProfile.restrictions.length > 0 ? 
                      preferences.dietaryProfile.restrictions.map(restriction => (
                        <span key={restriction} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {restriction}
                        </span>
                      )) : 
                      <span className="text-gray-500 text-sm">No restrictions specified</span>
                    }
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Food Allergies</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences.dietaryProfile.allergies.length > 0 ? 
                      preferences.dietaryProfile.allergies.map(allergy => (
                        <span key={allergy} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                          {allergy}
                        </span>
                      )) : 
                      <span className="text-gray-500 text-sm">No allergies specified</span>
                    }
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Health Goals</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences.dietaryProfile.goals.length > 0 ? 
                      preferences.dietaryProfile.goals.map(goal => (
                        <span key={goal} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {goal}
                        </span>
                      )) : 
                      <span className="text-gray-500 text-sm">No goals specified</span>
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Nutrition Goals */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Nutrition Goals</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {preferences.dietaryProfile.calorieGoal}
                  </div>
                  <div className="text-sm text-gray-600">Daily Calories</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {preferences.dietaryProfile.proteinGoal}g
                  </div>
                  <div className="text-sm text-gray-600">Daily Protein</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 capitalize">
                    {preferences.dietaryProfile.carbPreference}
                  </div>
                  <div className="text-sm text-gray-600">Carb Preference</div>
                </div>
              </div>
            </div>

            {/* Favorites */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Heart className="w-5 h-5 text-red-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Favorite Meals</h2>
              </div>
              <div className="text-gray-600">
                {preferences.favoriteMeals.length > 0 ? 
                  `${preferences.favoriteMeals.length} meals saved` :
                  "No favorite meals yet"
                }
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Meal Plan */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Settings className="w-5 h-5 text-gray-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Meal Plan</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Meals per week</span>
                  <span className="font-medium">{preferences.mealPlanPreferences.mealsPerWeek}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery day</span>
                  <span className="font-medium">{preferences.mealPlanPreferences.deliveryDay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Portion size</span>
                  <span className="font-medium capitalize">{preferences.mealPlanPreferences.portion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Variety</span>
                  <span className="font-medium capitalize">{preferences.mealPlanPreferences.variety}</span>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Bell className="w-5 h-5 text-gray-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email notifications</span>
                  <div className={`w-10 h-5 rounded-full ${preferences.notifications.email ? 'bg-green-500' : 'bg-gray-300'} flex items-center transition-colors`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${preferences.notifications.email ? 'translate-x-5' : 'translate-x-1'}`} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Push notifications</span>
                  <div className={`w-10 h-5 rounded-full ${preferences.notifications.push ? 'bg-green-500' : 'bg-gray-300'} flex items-center transition-colors`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${preferences.notifications.push ? 'translate-x-5' : 'translate-x-1'}`} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">SMS notifications</span>
                  <div className={`w-10 h-5 rounded-full ${preferences.notifications.sms ? 'bg-green-500' : 'bg-gray-300'} flex items-center transition-colors`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${preferences.notifications.sms ? 'translate-x-5' : 'translate-x-1'}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Stats */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Profile Completion</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Profile setup</span>
                  <span className="text-green-600">100%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }} />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Great! Your profile is complete and ready for personalized recommendations.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;