import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Heart, 
  Zap, 
  Target, 
  TrendingUp, 
  Star,
  Shield,
  Crown,
  Flame,
  Trophy,
  CheckCircle,
  Calendar,
  Activity,
  Leaf,
  Moon,
  Sun
} from 'lucide-react';
import { FadeIn, StaggeredAnimation } from './AnimationComponents';

interface HealthBadge {
  id: string;
  name: string;
  description: string;
  category: 'nutrition' | 'fitness' | 'wellness' | 'consistency' | 'achievement';
  icon: React.ComponentType<any>;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isEarned: boolean;
  earnedDate?: Date;
  progress: number;
  maxProgress: number;
  reward: string;
  requirements: string[];
}

interface HealthMetrics {
  mealsEaten: number;
  caloriesTracked: number;
  proteinGoalsMet: number;
  sugarReduced: number;
  energyLevelImproved: number;
  sleepQualityImproved: number;
  workoutDays: number;
  streakDays: number;
}

const generateHealthBadges = (metrics: HealthMetrics): HealthBadge[] => [
  // Nutrition Badges
  {
    id: 'protein-hero',
    name: 'Protein Hero',
    description: 'Meet your daily protein goals for 30 days',
    category: 'nutrition',
    icon: Zap,
    color: 'blue',
    rarity: 'rare',
    isEarned: metrics.proteinGoalsMet >= 30,
    earnedDate: metrics.proteinGoalsMet >= 30 ? new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) : undefined,
    progress: Math.min(metrics.proteinGoalsMet, 30),
    maxProgress: 30,
    reward: '20% off protein-rich meals',
    requirements: ['Track daily protein intake', 'Meet 25g minimum daily', 'Maintain for 30 consecutive days']
  },
  {
    id: 'sugar-slayer',
    name: 'Sugar Slayer',
    description: 'Reduce sugar intake by 75% compared to baseline',
    category: 'nutrition',
    icon: Shield,
    color: 'green',
    rarity: 'epic',
    isEarned: metrics.sugarReduced >= 75,
    earnedDate: metrics.sugarReduced >= 75 ? new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) : undefined,
    progress: Math.min(metrics.sugarReduced, 75),
    maxProgress: 75,
    reward: 'Custom low-sugar meal plan',
    requirements: ['Track sugar consumption', 'Use Factor75 low-sugar options', 'Maintain reduction for 2 weeks']
  },
  {
    id: 'clean-eater',
    name: 'Clean Eater',
    description: 'Choose only organic, clean-label meals for 14 days',
    category: 'nutrition',
    icon: Leaf,
    color: 'emerald',
    rarity: 'rare',
    isEarned: metrics.mealsEaten >= 50,
    earnedDate: metrics.mealsEaten >= 50 ? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) : undefined,
    progress: Math.min(metrics.mealsEaten, 50),
    maxProgress: 50,
    reward: 'Exclusive clean-label collection',
    requirements: ['Select only clean-label options', 'No processed ingredients', '14 consecutive days']
  },

  // Fitness Badges
  {
    id: 'energy-booster',
    name: 'Energy Booster',
    description: 'Report increased energy levels for 21 days',
    category: 'fitness',
    icon: Sun,
    color: 'yellow',
    rarity: 'common',
    isEarned: metrics.energyLevelImproved >= 21,
    earnedDate: metrics.energyLevelImproved >= 21 ? new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) : undefined,
    progress: Math.min(metrics.energyLevelImproved, 21),
    maxProgress: 21,
    reward: 'Energy-boosting meal recommendations',
    requirements: ['Daily energy level tracking', 'Report improvement', 'Consistent for 21 days']
  },
  {
    id: 'workout-warrior',
    name: 'Workout Warrior',
    description: 'Fuel your workouts with Factor75 meals for 30 days',
    category: 'fitness',
    icon: Trophy,
    color: 'red',
    rarity: 'epic',
    isEarned: metrics.workoutDays >= 30,
    earnedDate: metrics.workoutDays >= 30 ? new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) : undefined,
    progress: Math.min(metrics.workoutDays, 30),
    maxProgress: 30,
    reward: 'Pre/post-workout meal bundle',
    requirements: ['Track workout days', 'Eat Factor75 within 2 hours of workout', '30-day commitment']
  },

  // Wellness Badges
  {
    id: 'sleep-optimizer',
    name: 'Sleep Optimizer',
    description: 'Improve sleep quality through better nutrition',
    category: 'wellness',
    icon: Moon,
    color: 'purple',
    rarity: 'rare',
    isEarned: metrics.sleepQualityImproved >= 15,
    earnedDate: metrics.sleepQualityImproved >= 15 ? new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) : undefined,
    progress: Math.min(metrics.sleepQualityImproved, 15),
    maxProgress: 15,
    reward: 'Sleep-supporting evening meals',
    requirements: ['Track sleep quality', 'Choose sleep-friendly meals', 'Show improvement trend']
  },
  {
    id: 'mindful-eater',
    name: 'Mindful Eater',
    description: 'Practice mindful eating habits for 2 weeks',
    category: 'wellness',
    icon: Heart,
    color: 'pink',
    rarity: 'common',
    isEarned: false,
    progress: 8,
    maxProgress: 14,
    reward: 'Mindful eating guide + meditation app access',
    requirements: ['Eat without distractions', 'Rate meal satisfaction', 'Complete mindfulness check-ins']
  },

  // Consistency Badges
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: 'Maintain a 30-day healthy eating streak',
    category: 'consistency',
    icon: Flame,
    color: 'orange',
    rarity: 'legendary',
    isEarned: metrics.streakDays >= 30,
    earnedDate: metrics.streakDays >= 30 ? new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) : undefined,
    progress: Math.min(metrics.streakDays, 30),
    maxProgress: 30,
    reward: 'VIP status + personal nutrition coach session',
    requirements: ['Daily Factor75 meal', 'No cheat days', '30 consecutive days']
  },
  {
    id: 'habit-builder',
    name: 'Habit Builder',
    description: 'Form consistent healthy eating patterns',
    category: 'consistency',
    icon: Target,
    color: 'indigo',
    rarity: 'rare',
    isEarned: false,
    progress: 18,
    maxProgress: 21,
    reward: 'Habit tracking toolkit',
    requirements: ['Track eating times', 'Consistent meal schedules', '21-day pattern']
  },

  // Achievement Badges
  {
    id: 'transformation-champion',
    name: 'Transformation Champion',
    description: 'Complete your health transformation journey',
    category: 'achievement',
    icon: Crown,
    color: 'gold',
    rarity: 'legendary',
    isEarned: false,
    progress: 75,
    maxProgress: 100,
    reward: 'Hall of Fame + $100 credit + personal chef consultation',
    requirements: ['Achieve all health goals', 'Complete 90-day program', 'Share transformation story']
  },
  {
    id: 'calorie-tracker',
    name: 'Calorie Tracker',
    description: 'Successfully track calories for 60 days',
    category: 'achievement',
    icon: Activity,
    color: 'teal',
    rarity: 'common',
    isEarned: metrics.caloriesTracked >= 60,
    earnedDate: metrics.caloriesTracked >= 60 ? new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) : undefined,
    progress: Math.min(metrics.caloriesTracked, 60),
    maxProgress: 60,
    reward: 'Advanced nutrition analytics',
    requirements: ['Daily calorie logging', 'Accurate portion tracking', '60-day consistency']
  }
];

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-yellow-600'
};

const rarityBorders = {
  common: 'border-gray-400',
  rare: 'border-blue-400',
  epic: 'border-purple-400',
  legendary: 'border-yellow-400'
};

export const HealthAchievementBadges: React.FC = () => {
  const [healthMetrics] = useState<HealthMetrics>({
    mealsEaten: 67,
    caloriesTracked: 75,
    proteinGoalsMet: 45,
    sugarReduced: 82,
    energyLevelImproved: 28,
    sleepQualityImproved: 19,
    workoutDays: 35,
    streakDays: 33
  });

  const [badges, setBadges] = useState<HealthBadge[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [animatedProgress, setAnimatedProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const generatedBadges = generateHealthBadges(healthMetrics);
    setBadges(generatedBadges);
    
    // Animate progress
    setTimeout(() => {
      generatedBadges.forEach((badge) => {
        setAnimatedProgress(prev => ({
          ...prev,
          [badge.id]: badge.progress
        }));
      });
    }, 300);
  }, [healthMetrics]);

  const filteredBadges = badges.filter(badge => {
    const categoryMatch = selectedCategory === 'all' || badge.category === selectedCategory;
    const rarityMatch = selectedRarity === 'all' || badge.rarity === selectedRarity;
    return categoryMatch && rarityMatch;
  });

  const earnedBadges = badges.filter(b => b.isEarned);
  const totalBadges = badges.length;
  const completionRate = Math.round((earnedBadges.length / totalBadges) * 100);

  const getProgressPercentage = (badge: HealthBadge) => {
    const animated = animatedProgress[badge.id] || 0;
    return (animated / badge.maxProgress) * 100;
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'wellness', label: 'Wellness' },
    { value: 'consistency', label: 'Consistency' },
    { value: 'achievement', label: 'Achievement' }
  ];

  const rarities = [
    { value: 'all', label: 'All Rarities' },
    { value: 'common', label: 'Common' },
    { value: 'rare', label: 'Rare' },
    { value: 'epic', label: 'Epic' },
    { value: 'legendary', label: 'Legendary' }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
        <FadeIn>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Award className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Health Achievement Badges</h2>
              <Trophy className="w-8 h-8" />
            </div>
            <p className="text-indigo-100 text-lg">
              Unlock badges as you reach health and wellness milestones
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="p-8">
        {/* Stats Overview */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-indigo-600">{earnedBadges.length}</div>
              <div className="text-sm text-gray-600">Badges Earned</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-purple-600">{completionRate}%</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-green-600">{earnedBadges.filter(b => b.rarity === 'legendary').length}</div>
              <div className="text-sm text-gray-600">Legendary Badges</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-orange-600">{healthMetrics.streakDays}</div>
              <div className="text-sm text-gray-600">Current Streak</div>
            </div>
          </div>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rarity</label>
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {rarities.map((rarity) => (
                  <option key={rarity.value} value={rarity.value}>
                    {rarity.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </FadeIn>

        {/* Badges Grid */}
        <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredBadges.map((badge) => {
            const IconComponent = badge.icon;
            const progressPercentage = getProgressPercentage(badge);
            const isEarned = badge.isEarned;
            
            return (
              <div
                key={badge.id}
                className={`relative bg-white rounded-2xl p-6 shadow-lg border-4 transition-all hover:shadow-xl ${
                  isEarned
                    ? `${rarityBorders[badge.rarity]} bg-gradient-to-br from-white to-gray-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Rarity Indicator */}
                <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br ${rarityColors[badge.rarity]} rounded-full flex items-center justify-center`}>
                  {isEarned ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <Star className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Badge Icon */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${rarityColors[badge.rarity]} flex items-center justify-center ${
                  !isEarned ? 'grayscale opacity-50' : ''
                }`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Badge Info */}
                <div className="text-center mb-4">
                  <h3 className={`font-bold text-lg ${isEarned ? 'text-gray-900' : 'text-gray-500'}`}>
                    {badge.name}
                  </h3>
                  <p className={`text-sm ${isEarned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {badge.description}
                  </p>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-2 capitalize ${
                    isEarned 
                      ? `bg-${badge.color}-100 text-${badge.color}-700`
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {badge.rarity}
                  </span>
                </div>

                {/* Progress Bar */}
                {!isEarned && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-600">
                        Progress: {badge.progress} / {badge.maxProgress}
                      </span>
                      <span className="text-xs font-bold text-gray-700">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${rarityColors[badge.rarity]} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Earned Date */}
                {isEarned && badge.earnedDate && (
                  <div className="flex items-center justify-center space-x-2 text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">
                      Earned {badge.earnedDate.toLocaleDateString()}
                    </span>
                  </div>
                )}

                {/* Reward */}
                <div className={`p-3 rounded-lg text-center ${
                  isEarned 
                    ? `bg-${badge.color}-50 border border-${badge.color}-200`
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className="flex items-center justify-center space-x-2">
                    <Trophy className={`w-4 h-4 ${isEarned ? `text-${badge.color}-600` : 'text-gray-400'}`} />
                    <span className={`text-sm font-semibold ${isEarned ? `text-${badge.color}-700` : 'text-gray-500'}`}>
                      {badge.reward}
                    </span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mt-4">
                  <h5 className="text-xs font-semibold text-gray-600 mb-2">Requirements:</h5>
                  <ul className="space-y-1">
                    {badge.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                          isEarned ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                        <span className={`text-xs ${isEarned ? 'text-gray-700' : 'text-gray-500'}`}>
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </StaggeredAnimation>

        {/* Upcoming Challenges */}
        <FadeIn delay={0.4}>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Upcoming Challenges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Weight Loss Challenge</h4>
                <p className="text-sm text-gray-600">Lose 5 lbs in 30 days</p>
                <span className="text-xs text-blue-600 font-semibold">Starts Monday</span>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Heart Health Month</h4>
                <p className="text-sm text-gray-600">30 days of heart-healthy meals</p>
                <span className="text-xs text-red-600 font-semibold">February</span>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Plant Power Challenge</h4>
                <p className="text-sm text-gray-600">Increase vegetable intake by 50%</p>
                <span className="text-xs text-green-600 font-semibold">Join anytime</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default HealthAchievementBadges;