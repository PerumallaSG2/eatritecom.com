import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Target, 
  Activity, 
  Heart, 
  Weight, 
  Zap,
  Calendar,
  Award,
  BarChart3,
  LineChart,
  Eye,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { FadeIn, StaggeredAnimation } from './AnimationComponents';

interface ProgressMetric {
  id: string;
  name: string;
  currentValue: number;
  previousValue: number;
  targetValue: number;
  unit: string;
  category: 'health' | 'nutrition' | 'fitness' | 'habits';
  icon: React.ComponentType<any>;
  color: string;
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
  history: Array<{
    date: Date;
    value: number;
  }>;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  category: string;
  icon: React.ComponentType<any>;
  color: string;
  isCompleted: boolean;
  completedDate?: Date;
}

const generateProgressData = (): ProgressMetric[] => [
  {
    id: 'weight',
    name: 'Weight Loss',
    currentValue: 162,
    previousValue: 180,
    targetValue: 150,
    unit: 'lbs',
    category: 'health',
    icon: Weight,
    color: 'blue',
    trend: 'down',
    changePercentage: -10,
    history: generateTimeSeriesData(180, 162, 30)
  },
  {
    id: 'protein',
    name: 'Daily Protein',
    currentValue: 125,
    previousValue: 95,
    targetValue: 140,
    unit: 'g',
    category: 'nutrition',
    icon: Zap,
    color: 'green',
    trend: 'up',
    changePercentage: 32,
    history: generateTimeSeriesData(95, 125, 30)
  },
  {
    id: 'calories',
    name: 'Daily Calories',
    currentValue: 1850,
    previousValue: 2200,
    targetValue: 1800,
    unit: 'cal',
    category: 'nutrition',
    icon: Activity,
    color: 'orange',
    trend: 'down',
    changePercentage: -16,
    history: generateTimeSeriesData(2200, 1850, 30)
  },
  {
    id: 'energy',
    name: 'Energy Level',
    currentValue: 8.5,
    previousValue: 6.2,
    targetValue: 9.0,
    unit: '/10',
    category: 'health',
    icon: Heart,
    color: 'red',
    trend: 'up',
    changePercentage: 37,
    history: generateTimeSeriesData(6.2, 8.5, 30)
  },
  {
    id: 'meals',
    name: 'Healthy Meals',
    currentValue: 89,
    previousValue: 67,
    targetValue: 100,
    unit: '%',
    category: 'habits',
    icon: Target,
    color: 'purple',
    trend: 'up',
    changePercentage: 33,
    history: generateTimeSeriesData(67, 89, 30)
  }
];

const generateAchievements = (): Achievement[] => [
  {
    id: 'weight-milestone',
    title: 'First 10 Pounds',
    description: 'Lost your first 10 pounds',
    progress: 18,
    target: 10,
    category: 'Weight Loss',
    icon: Weight,
    color: 'blue',
    isCompleted: true,
    completedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'protein-hero',
    title: 'Protein Hero',
    description: 'Meet protein goals for 30 days',
    progress: 23,
    target: 30,
    category: 'Nutrition',
    icon: Zap,
    color: 'green',
    isCompleted: false
  },
  {
    id: 'energy-boost',
    title: 'Energy Booster',
    description: 'Maintain high energy for 2 weeks',
    progress: 14,
    target: 14,
    category: 'Wellness',
    icon: Heart,
    color: 'red',
    isCompleted: true,
    completedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'consistency-king',
    title: 'Consistency King',
    description: 'Eat healthy 90% of the time for a month',
    progress: 26,
    target: 30,
    category: 'Habits',
    icon: Target,
    color: 'purple',
    isCompleted: false
  }
];

function generateTimeSeriesData(start: number, end: number, days: number) {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const progress = (days - 1 - i) / (days - 1);
    const value = start + (end - start) * progress + (Math.random() - 0.5) * (end - start) * 0.1;
    
    data.push({
      date,
      value: Math.max(0, value)
    });
  }
  
  return data;
}

export const ProgressVisualization: React.FC = () => {
  const [progressData] = useState<ProgressMetric[]>(generateProgressData());
  const [achievements] = useState<Achievement[]>(generateAchievements());
  const [selectedMetric, setSelectedMetric] = useState<ProgressMetric>(progressData[0]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  useEffect(() => {
    // Animate progress values
    progressData.forEach((metric) => {
      setTimeout(() => {
        setAnimatedValues(prev => ({
          ...prev,
          [metric.id]: metric.currentValue
        }));
      }, 300);
    });
  }, [progressData]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string, isPositive: boolean) => {
    if (trend === 'stable') return 'text-gray-600';
    const isGood = (trend === 'up' && isPositive) || (trend === 'down' && !isPositive);
    return isGood ? 'text-green-600' : 'text-red-600';
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const completedAchievements = achievements.filter(a => a.isCompleted).length;
  const totalProgress = Math.round(
    achievements.reduce((sum, a) => sum + Math.min((a.progress / a.target) * 100, 100), 0) / achievements.length
  );

  // const categories = ['all', 'health', 'nutrition', 'fitness', 'habits'];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
        <FadeIn>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <BarChart3 className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Progress Visualization</h2>
              <LineChart className="w-8 h-8" />
            </div>
            <p className="text-blue-100 text-lg">
              Track your journey with detailed insights and analytics
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="p-8">
        {/* Overview Stats */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{completedAchievements}</div>
              <div className="text-sm text-gray-600">Goals Achieved</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{totalProgress}%</div>
              <div className="text-sm text-gray-600">Overall Progress</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {progressData.filter(m => m.trend === 'up').length}
              </div>
              <div className="text-sm text-gray-600">Improving Metrics</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">42</div>
              <div className="text-sm text-gray-600">Days Tracking</div>
            </div>
          </div>
        </FadeIn>

        {/* Progress Metrics Grid */}
        <FadeIn delay={0.2}>
          <h3 className="text-xl font-semibold mb-6 text-gray-900">Key Metrics</h3>
          <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {progressData.map((metric) => {
              const IconComponent = metric.icon;
              const animatedValue = animatedValues[metric.id] || 0;
              const progressPercentage = getProgressPercentage(animatedValue, metric.targetValue);
              const isPositiveTrend = ['protein', 'energy', 'meals'].includes(metric.id);
              
              return (
                <div
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric)}
                  className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-all hover:shadow-xl ${
                    selectedMetric.id === metric.id ? `ring-2 ring-${metric.color}-500` : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 bg-${metric.color}-100 rounded-xl flex items-center justify-center`}>
                      <IconComponent className={`w-5 h-5 text-${metric.color}-600`} />
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-sm font-semibold ${getTrendColor(metric.trend, isPositiveTrend)}`}>
                        {Math.abs(metric.changePercentage)}%
                      </span>
                    </div>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-2">{metric.name}</h4>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline space-x-2 mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {animatedValue.toFixed(metric.unit === '/10' ? 1 : 0)}
                      </span>
                      <span className="text-sm text-gray-600">{metric.unit}</span>
                      <span className="text-xs text-gray-500">
                        / {metric.targetValue}{metric.unit}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className={`bg-${metric.color}-500 h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Previous: {metric.previousValue}{metric.unit}</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                  </div>

                  <div className={`p-2 bg-${metric.color}-50 rounded-lg text-center`}>
                    <span className={`text-xs font-semibold text-${metric.color}-700 capitalize`}>
                      {metric.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </StaggeredAnimation>
        </FadeIn>

        {/* Detailed Chart View */}
        <FadeIn delay={0.3}>
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <LineChart className="w-6 h-6 text-blue-600 mr-2" />
                {selectedMetric.name} Trend
              </h3>
              <div className="flex space-x-2">
                {(['7d', '30d', '90d'] as const).map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedTimeframe === timeframe
                        ? `bg-${selectedMetric.color}-600 text-white`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>

            {/* Simplified Chart Visualization */}
            <div className="relative h-64 bg-gray-50 rounded-lg p-4">
              <div className="absolute inset-4">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 50}
                      x2="400"
                      y2={i * 50}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Data line */}
                  <polyline
                    fill="none"
                    stroke={selectedMetric.color === 'blue' ? '#3b82f6' : 
                           selectedMetric.color === 'green' ? '#10b981' :
                           selectedMetric.color === 'orange' ? '#f59e0b' :
                           selectedMetric.color === 'red' ? '#ef4444' : '#8b5cf6'}
                    strokeWidth="3"
                    points={selectedMetric.history
                      .slice(-parseInt(selectedTimeframe))
                      .map((point, index, array) => {
                        const x = (index / (array.length - 1)) * 400;
                        const minVal = Math.min(...array.map(p => p.value));
                        const maxVal = Math.max(...array.map(p => p.value));
                        const y = 200 - ((point.value - minVal) / (maxVal - minVal)) * 180;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />
                  
                  {/* Data points */}
                  {selectedMetric.history
                    .slice(-parseInt(selectedTimeframe))
                    .map((point, index, array) => {
                      const x = (index / (array.length - 1)) * 400;
                      const minVal = Math.min(...array.map(p => p.value));
                      const maxVal = Math.max(...array.map(p => p.value));
                      const y = 200 - ((point.value - minVal) / (maxVal - minVal)) * 180;
                      
                      return (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="4"
                          fill={selectedMetric.color === 'blue' ? '#3b82f6' : 
                                selectedMetric.color === 'green' ? '#10b981' :
                                selectedMetric.color === 'orange' ? '#f59e0b' :
                                selectedMetric.color === 'red' ? '#ef4444' : '#8b5cf6'}
                        />
                      );
                    })}
                </svg>
              </div>
              
              {/* Chart labels */}
              <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs text-gray-500">
                <span>
                  {selectedMetric.history.slice(-parseInt(selectedTimeframe))[0]?.date.toLocaleDateString()}
                </span>
                <span>Today</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Achievement Progress */}
        <FadeIn delay={0.4}>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 flex items-center">
              <Award className="w-6 h-6 text-yellow-600 mr-2" />
              Achievement Progress
            </h3>
            
            <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                const progressPercentage = Math.min((achievement.progress / achievement.target) * 100, 100);
                
                return (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      achievement.isCompleted
                        ? `bg-${achievement.color}-50 border-${achievement.color}-200`
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        achievement.isCompleted
                          ? `bg-${achievement.color}-100`
                          : 'bg-gray-100'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${
                          achievement.isCompleted
                            ? `text-${achievement.color}-600`
                            : 'text-gray-400'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className={`font-bold ${
                          achievement.isCompleted ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm ${
                          achievement.isCompleted ? 'text-gray-700' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          achievement.isCompleted
                            ? `bg-${achievement.color}-100 text-${achievement.color}-700`
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {achievement.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {achievement.progress} / {achievement.target}
                        </span>
                        <span className={`text-sm font-bold ${
                          achievement.isCompleted ? `text-${achievement.color}-600` : 'text-gray-600'
                        }`}>
                          {Math.round(progressPercentage)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`${
                            achievement.isCompleted 
                              ? `bg-${achievement.color}-500` 
                              : 'bg-gray-400'
                          } h-3 rounded-full transition-all duration-1000`}
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {achievement.isCompleted && achievement.completedDate && (
                      <div className="text-xs text-gray-500 flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>Completed {achievement.completedDate.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </StaggeredAnimation>
          </div>
        </FadeIn>

        {/* Insights & Recommendations */}
        <FadeIn delay={0.5}>
          <div className="mt-8 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              📊 Your Progress Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 text-center">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Strongest Improvement</h4>
                <p className="text-sm text-gray-600">
                  Protein intake increased by 32% - keep up the great work!
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Next Goal</h4>
                <p className="text-sm text-gray-600">
                  You're 7 days away from completing "Consistency King"
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Recommended Focus</h4>
                <p className="text-sm text-gray-600">
                  Maintain current calorie levels to reach your weight goal
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default ProgressVisualization;