import React, { useState } from 'react';
import { User, Settings, Heart, Target, Bell, Edit3, Award, Calendar, TrendingUp, Shield, Mail, Smartphone } from 'lucide-react';
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
    <div className="min-h-screen bg-[#F5EEDC] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Enhanced Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0F2B1E] to-[#1a4d33] rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-[#0F2B1E] mb-2 font-playfair">
                  {preferences.name}
                </h1>
                <p className="text-gray-600 mb-2">{preferences.email}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  Member since January 2024
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowSetup(true)}
              className="flex items-center px-6 py-3 bg-[#0F2B1E] hover:bg-[#1a4d33] text-white rounded-lg transition-colors duration-200 font-medium"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F2B1E] mb-1">
                {preferences.mealPlanPreferences.mealsPerWeek * 4}
              </div>
              <div className="text-sm text-gray-600">Meals This Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#D4B46A] mb-1">
                {preferences.favoriteMeals.length}
              </div>
              <div className="text-sm text-gray-600">Favorite Meals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                8.4
              </div>
              <div className="text-sm text-gray-600">Health Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FF6B35] mb-1">
                12
              </div>
              <div className="text-sm text-gray-600">Week Streak</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Dietary Preferences */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#F5F2E8] rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-5 h-5 text-[#D4B46A]" />
                </div>
                <h2 className="text-xl font-semibold text-[#0F2B1E] font-playfair">Dietary Profile</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-[#0F2B1E] mb-3">Dietary Restrictions</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences.dietaryProfile.restrictions.length > 0 ? 
                      preferences.dietaryProfile.restrictions.map(restriction => (
                        <span key={restriction} className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                          {restriction}
                        </span>
                      )) : 
                      <span className="text-gray-500 text-sm italic">No restrictions specified</span>
                    }
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-[#0F2B1E] mb-3">Food Allergies</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences.dietaryProfile.allergies.length > 0 ? 
                      preferences.dietaryProfile.allergies.map(allergy => (
                        <span key={allergy} className="px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200 flex items-center">
                          <Shield className="w-3 h-3 mr-1" />
                          {allergy}
                        </span>
                      )) : 
                      <span className="text-gray-500 text-sm italic">No allergies specified</span>
                    }
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-[#0F2B1E] mb-3">Health Goals</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences.dietaryProfile.goals.length > 0 ? 
                      preferences.dietaryProfile.goals.map(goal => (
                        <span key={goal} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {goal}
                        </span>
                      )) : 
                      <span className="text-gray-500 text-sm italic">No goals specified</span>
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Nutrition Goals */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#0F2B1E] font-playfair">Nutrition Targets</h2>
                <button className="text-[#D4B46A] hover:text-[#b8986b] transition-colors text-sm font-medium">
                  Adjust Goals
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {preferences.dietaryProfile.calorieGoal}
                  </div>
                  <div className="text-sm text-green-700 font-medium">Daily Calories</div>
                  <div className="mt-3 w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="text-xs text-green-600 mt-1">75% of goal today</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {preferences.dietaryProfile.proteinGoal}g
                  </div>
                  <div className="text-sm text-blue-700 font-medium">Daily Protein</div>
                  <div className="mt-3 w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <div className="text-xs text-blue-600 mt-1">90% of goal today</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600 mb-2 capitalize">
                    {preferences.dietaryProfile.carbPreference}
                  </div>
                  <div className="text-sm text-purple-700 font-medium">Carb Preference</div>
                  <div className="mt-3">
                    <Award className="w-6 h-6 text-purple-500 mx-auto" />
                  </div>
                  <div className="text-xs text-purple-600 mt-1">On track</div>
                </div>
              </div>
            </div>

            {/* Recent Activity & Achievements */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#0F2B1E] font-playfair">Recent Activity</h2>
                <button className="text-[#D4B46A] hover:text-[#b8986b] transition-colors text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-green-800">12-Week Streak Achievement!</div>
                    <div className="text-sm text-green-600">Congratulations on your consistency</div>
                  </div>
                  <div className="text-xs text-green-500">2 days ago</div>
                </div>

                <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-blue-800">New Favorite Added</div>
                    <div className="text-sm text-blue-600">Moroccan-Spiced Salmon Bowl</div>
                  </div>
                  <div className="text-xs text-blue-500">5 days ago</div>
                </div>

                <div className="flex items-center p-4 bg-[#F5F2E8] rounded-lg border border-[#D4B46A]/20">
                  <div className="w-10 h-10 bg-[#D4B46A]/20 rounded-full flex items-center justify-center mr-4">
                    <TrendingUp className="w-5 h-5 text-[#D4B46A]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-[#0F2B1E]">Health Score Improved</div>
                    <div className="text-sm text-gray-600">From 8.1 to 8.4 this week</div>
                  </div>
                  <div className="text-xs text-gray-500">1 week ago</div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Meal Plan */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#F5F2E8] rounded-lg flex items-center justify-center mr-3">
                    <Settings className="w-4 h-4 text-[#D4B46A]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#0F2B1E] font-playfair">Current Plan</h2>
                </div>
                <button className="text-[#D4B46A] hover:text-[#b8986b] transition-colors text-sm font-medium">
                  Modify
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Meals per week</span>
                  <span className="font-semibold text-[#0F2B1E]">{preferences.mealPlanPreferences.mealsPerWeek}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-100">
                  <span className="text-gray-600">Delivery day</span>
                  <span className="font-semibold text-[#0F2B1E]">{preferences.mealPlanPreferences.deliveryDay}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-100">
                  <span className="text-gray-600">Portion size</span>
                  <span className="font-semibold text-[#0F2B1E] capitalize">{preferences.mealPlanPreferences.portion}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-100">
                  <span className="text-gray-600">Variety level</span>
                  <span className="font-semibold text-[#0F2B1E] capitalize">{preferences.mealPlanPreferences.variety}</span>
                </div>
              </div>

              {/* Next Delivery */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Next Delivery</div>
                <div className="text-lg font-semibold text-[#0F2B1E]">Wednesday, Jan 24</div>
                <div className="text-sm text-gray-500">3 meals arriving</div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-[#F5F2E8] rounded-lg flex items-center justify-center mr-3">
                  <Bell className="w-4 h-4 text-[#D4B46A]" />
                </div>
                <h2 className="text-lg font-semibold text-[#0F2B1E] font-playfair">Preferences</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">Email notifications</span>
                  </div>
                  <div className={`w-11 h-6 rounded-full ${preferences.notifications.email ? 'bg-[#D4B46A]' : 'bg-gray-300'} flex items-center transition-colors cursor-pointer`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${preferences.notifications.email ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Smartphone className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">Push notifications</span>
                  </div>
                  <div className={`w-11 h-6 rounded-full ${preferences.notifications.push ? 'bg-[#D4B46A]' : 'bg-gray-300'} flex items-center transition-colors cursor-pointer`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${preferences.notifications.push ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Bell className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">SMS updates</span>
                  </div>
                  <div className={`w-11 h-6 rounded-full ${preferences.notifications.sms ? 'bg-[#D4B46A]' : 'bg-gray-300'} flex items-center transition-colors cursor-pointer`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${preferences.notifications.sms ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Favorite Meals */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center mr-3">
                    <Heart className="w-4 h-4 text-red-500" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#0F2B1E] font-playfair">Favorites</h2>
                </div>
                <button className="text-[#D4B46A] hover:text-[#b8986b] transition-colors text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="text-center py-6">
                <div className="text-3xl font-bold text-[#0F2B1E] mb-2">
                  {preferences.favoriteMeals.length}
                </div>
                <div className="text-gray-600 mb-4">Saved Meals</div>
                
                {preferences.favoriteMeals.length > 0 ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Most recent:</div>
                    <div className="font-medium text-[#0F2B1E]">Mediterranean Bowl</div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 italic">
                    Start adding meals you love to see them here
                  </div>
                )}
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="bg-gradient-to-br from-[#F5F2E8] to-[#F5EEDC] rounded-xl p-6 border border-[#D4B46A]/30">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4B46A] to-[#b8986b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-[#0F2B1E] mb-2 font-playfair">Wellness Champion</h3>
                <div className="text-sm text-gray-600 mb-4">
                  Complete profile with consistent healthy choices
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Profile Status</span>
                    <span className="text-[#D4B46A] font-medium">Complete</span>
                  </div>
                  <div className="w-full bg-[#D4B46A]/20 rounded-full h-2">
                    <div className="bg-[#D4B46A] h-2 rounded-full" style={{ width: '100%' }} />
                  </div>
                  <p className="text-xs text-gray-600 mt-3">
                    Your profile is optimized for the best meal recommendations
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;