import React, { useState, useEffect } from 'react';
import { 
  Target, 
  TrendingUp, 
  Heart, 
  Calendar, 
  CheckCircle,
  AlertTriangle,
  Star,
  Zap,
  Weight,
  Award,
  Plus,
  Edit3,
  Trash2,
  BarChart3
} from 'lucide-react';
import { FadeIn, StaggeredAnimation } from './AnimationComponents';

interface HealthGoal {
  id: string;
  title: string;
  description: string;
  category: 'weight' | 'nutrition' | 'fitness' | 'wellness' | 'habits';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'on-track' | 'behind' | 'completed' | 'at-risk';
  icon: React.ComponentType<any>;
  color: string;
  milestones: Array<{
    value: number;
    date: Date;
    achieved: boolean;
  }>;
  recommendations: string[];
  relatedMeals: string[];
}

interface ProgressEntry {
  date: Date;
  value: number;
  notes?: string;
}

interface GoalInsight {
  type: 'progress' | 'recommendation' | 'milestone' | 'warning';
  title: string;
  description: string;
  actionable: boolean;
  goalId: string;
}

const generateHealthGoals = (): HealthGoal[] => [
  {
    id: 'weight-loss',
    title: 'Lose 15 Pounds',
    description: 'Reach target weight of 150 lbs through healthy eating and portion control',
    category: 'weight',
    targetValue: 150,
    currentValue: 162,
    unit: 'lbs',
    deadline: new Date(2025, 11, 31), // End of year
    priority: 'high',
    status: 'on-track',
    icon: Weight,
    color: 'blue',
    milestones: [
      { value: 165, date: new Date(2025, 9, 15), achieved: true },
      { value: 160, date: new Date(2025, 10, 15), achieved: true },
      { value: 155, date: new Date(2025, 11, 1), achieved: false },
      { value: 150, date: new Date(2025, 11, 31), achieved: false }
    ],
    recommendations: [
      'Maintain 1,800 calorie daily limit',
      'Choose high-protein, low-carb meals',
      'Track progress weekly'
    ],
    relatedMeals: ['Keto Power Bowl', 'Mediterranean Salmon', 'Protein Plate']
  },
  {
    id: 'protein-intake',
    title: 'Daily Protein Goal',
    description: 'Consume 140g of protein daily to support muscle building and recovery',
    category: 'nutrition',
    targetValue: 140,
    currentValue: 125,
    unit: 'g',
    deadline: new Date(2025, 11, 30),
    priority: 'high',
    status: 'behind',
    icon: Zap,
    color: 'green',
    milestones: [
      { value: 120, date: new Date(2025, 10, 1), achieved: true },
      { value: 130, date: new Date(2025, 10, 15), achieved: false },
      { value: 140, date: new Date(2025, 11, 1), achieved: false }
    ],
    recommendations: [
      'Add protein-rich snacks between meals',
      'Choose meals with 35g+ protein',
      'Consider protein supplements'
    ],
    relatedMeals: ['Protein Power Plate', 'Muscle Builder Bowl', 'High-Protein Stir-Fry']
  },
  {
    id: 'energy-level',
    title: 'Energy Level Improvement',
    description: 'Maintain consistent energy levels throughout the day (8+ out of 10)',
    category: 'wellness',
    targetValue: 8,
    currentValue: 7.2,
    unit: '/10',
    deadline: new Date(2025, 11, 15),
    priority: 'medium',
    status: 'on-track',
    icon: Heart,
    color: 'red',
    milestones: [
      { value: 6.5, date: new Date(2025, 9, 30), achieved: true },
      { value: 7.5, date: new Date(2025, 10, 30), achieved: false },
      { value: 8.0, date: new Date(2025, 11, 15), achieved: false }
    ],
    recommendations: [
      'Eat balanced meals every 4 hours',
      'Reduce sugar intake',
      'Include complex carbohydrates'
    ],
    relatedMeals: ['Energy Bowl', 'Balanced Plate', 'Sustained Energy Meal']
  },
  {
    id: 'meal-consistency',
    title: 'Healthy Meal Consistency',
    description: 'Eat healthy meals 90% of the time over 30 days',
    category: 'habits',
    targetValue: 90,
    currentValue: 78,
    unit: '%',
    deadline: new Date(2025, 11, 14),
    priority: 'medium',
    status: 'at-risk',
    icon: Target,
    color: 'purple',
    milestones: [
      { value: 70, date: new Date(2025, 10, 14), achieved: true },
      { value: 80, date: new Date(2025, 10, 28), achieved: false },
      { value: 90, date: new Date(2025, 11, 14), achieved: false }
    ],
    recommendations: [
      'Plan meals in advance',
      'Keep healthy snacks available',
      'Track daily meal choices'
    ],
    relatedMeals: ['All Factor75 meals', 'Meal prep options', 'Quick healthy choices']
  }
];

const generateGoalInsights = (_goals: HealthGoal[]): GoalInsight[] => [
  {
    type: 'progress',
    title: 'Weight Loss on Track',
    description: 'You\'re losing weight at a healthy pace of 1-2 lbs per week. Great job!',
    actionable: false,
    goalId: 'weight-loss'
  },
  {
    type: 'warning',
    title: 'Protein Intake Behind Target',
    description: 'You\'re 15g below your daily protein goal. Consider adding a protein-rich snack.',
    actionable: true,
    goalId: 'protein-intake'
  },
  {
    type: 'recommendation',
    title: 'Meal Consistency at Risk',
    description: 'You\'ve had 3 non-Factor75 meals this week. Consider meal prep to stay on track.',
    actionable: true,
    goalId: 'meal-consistency'
  },
  {
    type: 'milestone',
    title: 'Energy Goal Almost Reached',
    description: 'You\'re 0.8 points away from your energy level target. Keep up the good work!',
    actionable: false,
    goalId: 'energy-level'
  }
];

export const PersonalizedHealthGoals: React.FC = () => {
  const [healthGoals, _setHealthGoals] = useState<HealthGoal[]>(generateHealthGoals());
  const [insights, setInsights] = useState<GoalInsight[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<HealthGoal>(healthGoals[0]);
  const [_showAddGoal, _setShowAddGoal] = useState(false);
  const [_progressData, _setProgressData] = useState<Record<string, ProgressEntry[]>>({});

  useEffect(() => {
    const goalInsights = generateGoalInsights(healthGoals);
    setInsights(goalInsights);
    
    // Generate progress data for each goal
    const progress: Record<string, ProgressEntry[]> = {};
    healthGoals.forEach(goal => {
      progress[goal.id] = generateProgressHistory(goal);
    });
    _setProgressData(progress);
  }, [healthGoals]);

  const generateProgressHistory = (goal: HealthGoal): ProgressEntry[] => {
    const history: ProgressEntry[] = [];
    const startDate = new Date(2025, 9, 1); // October 1st
    const endDate = new Date();
    const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i <= daysDiff; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      // Generate realistic progress
      const progressRatio = i / daysDiff;
      const targetProgress = goal.targetValue - goal.currentValue;
      const currentProgress = progressRatio * targetProgress;
      const value = goal.currentValue + currentProgress + (Math.random() - 0.5) * 2;
      
      history.push({
        date,
        value: Math.max(0, value)
      });
    }
    
    return history;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'on-track': return 'text-blue-600 bg-blue-100';
      case 'behind': return 'text-yellow-600 bg-yellow-100';
      case 'at-risk': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressPercentage = (goal: HealthGoal) => {
    // const totalChange = Math.abs(goal.targetValue - goal.currentValue);
    const startValue = goal.category === 'weight' ? 175 : 
                     goal.category === 'nutrition' ? 80 :
                     goal.category === 'wellness' ? 5.5 : 60;
    
    const currentProgress = Math.abs(goal.currentValue - startValue);
    const targetProgress = Math.abs(goal.targetValue - startValue);
    
    return Math.min((currentProgress / targetProgress) * 100, 100);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'progress': return TrendingUp;
      case 'recommendation': return Target;
      case 'milestone': return Award;
      case 'warning': return AlertTriangle;
      default: return Star;
    }
  };

  const getDaysRemaining = (deadline: Date) => {
    const today = new Date();
    const timeDiff = deadline.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
        <FadeIn>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Target className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Personalized Health Goals</h2>
              <Heart className="w-8 h-8" />
            </div>
            <p className="text-indigo-100 text-lg">
              Track your progress and achieve your wellness objectives
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="p-8">
        {/* Goals Overview */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-2xl font-bold text-indigo-600">
                {healthGoals.filter(g => g.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed Goals</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-2xl font-bold text-green-600">
                {healthGoals.filter(g => g.status === 'on-track').length}
              </div>
              <div className="text-sm text-gray-600">On Track</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {healthGoals.filter(g => g.status === 'behind' || g.status === 'at-risk').length}
              </div>
              <div className="text-sm text-gray-600">Need Attention</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(healthGoals.reduce((sum, g) => sum + getProgressPercentage(g), 0) / healthGoals.length)}%
              </div>
              <div className="text-sm text-gray-600">Avg Progress</div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Goals List */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.2}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Your Health Goals</h3>
                <button
                  onClick={() => _setShowAddGoal(true)}
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Goal</span>
                </button>
              </div>
              
              <StaggeredAnimation className="space-y-6">
                {healthGoals.map((goal) => {
                  const IconComponent = goal.icon;
                  const progressPercentage = getProgressPercentage(goal);
                  const daysRemaining = getDaysRemaining(goal.deadline);
                  
                  return (
                    <div
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal)}
                      className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-all hover:shadow-xl ${
                        selectedGoal.id === goal.id ? 'ring-2 ring-indigo-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-${goal.color}-100 rounded-xl flex items-center justify-center`}>
                            <IconComponent className={`w-6 h-6 text-${goal.color}-600`} />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-gray-900">{goal.title}</h4>
                            <p className="text-gray-600 text-sm">{goal.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(goal.priority)}`}>
                            {goal.priority} priority
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(goal.status)}`}>
                            {goal.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            Current: {goal.currentValue}{goal.unit} → Target: {goal.targetValue}{goal.unit}
                          </span>
                          <span className={`text-sm font-bold text-${goal.color}-600`}>
                            {Math.round(progressPercentage)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`bg-${goal.color}-500 h-3 rounded-full transition-all duration-1000`}
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {daysRemaining > 0 ? `${daysRemaining} days left` : 'Deadline passed'}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>{goal.milestones.filter(m => m.achieved).length}/{goal.milestones.length} milestones</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-800">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </StaggeredAnimation>
            </FadeIn>
          </div>

          {/* Goal Details & Insights */}
          <div className="space-y-6">
            {/* Selected Goal Details */}
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                  <BarChart3 className="w-5 h-5 text-indigo-600 mr-2" />
                  {selectedGoal.title} Progress
                </h3>
                
                {/* Progress Chart Placeholder */}
                <div className="h-32 bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-gray-500 text-sm">Progress Chart</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Value</span>
                    <span className="font-semibold">{selectedGoal.currentValue}{selectedGoal.unit}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Target Value</span>
                    <span className="font-semibold">{selectedGoal.targetValue}{selectedGoal.unit}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className={`font-semibold text-${selectedGoal.color}-600`}>
                      {Math.round(getProgressPercentage(selectedGoal))}%
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Milestones */}
            <FadeIn delay={0.4}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Milestones</h3>
                
                <div className="space-y-3">
                  {selectedGoal.milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        milestone.achieved ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        milestone.achieved ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {milestone.achieved ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className={`font-semibold ${
                          milestone.achieved ? 'text-green-700' : 'text-gray-700'
                        }`}>
                          {milestone.value}{selectedGoal.unit}
                        </div>
                        <div className="text-xs text-gray-500">
                          {milestone.date.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Recommendations */}
            <FadeIn delay={0.5}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Recommendations</h3>
                
                <ul className="space-y-3">
                  {selectedGoal.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span className="text-sm text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Recommended Meals</h4>
                  <div className="space-y-1">
                    {selectedGoal.relatedMeals.map((meal, index) => (
                      <div key={index} className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer">
                        • {meal}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* AI Insights */}
            <FadeIn delay={0.6}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">AI Insights</h3>
                
                <div className="space-y-4">
                  {insights.slice(0, 3).map((insight, index) => {
                    const IconComponent = getInsightIcon(insight.type);
                    return (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <IconComponent className={`w-5 h-5 mt-0.5 ${
                            insight.type === 'warning' ? 'text-red-500' :
                            insight.type === 'progress' ? 'text-green-500' :
                            insight.type === 'milestone' ? 'text-yellow-500' : 'text-blue-500'
                          }`} />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                            {insight.actionable && (
                              <button className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold">
                                Take Action →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedHealthGoals;