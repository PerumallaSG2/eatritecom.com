import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  Package, 
  Heart, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  Plus,
  ArrowRight,
  ChefHat
} from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';

const EmployeeDashboard: React.FC = () => {
  // Mock data - replace with React Query hooks later
  const user = {
    firstName: 'John',
    wellnessScore: 78,
  };

  const todayOrders = [
    {
      id: '1',
      mealName: 'Mediterranean Quinoa Bowl',
      deliveryTime: '12:30 PM',
      calories: 450,
      status: 'confirmed',
    },
  ];

  const quickActions = [
    { 
      label: 'Browse Meals', 
      description: 'Explore our curated menu',
      icon: UtensilsCrossed, 
      path: '/app/menu', 
      gradient: 'from-primary-500 to-primary-600' 
    },
    { 
      label: 'Track Orders', 
      description: 'View delivery status',
      icon: Package, 
      path: '/app/orders', 
      gradient: 'from-accent-500 to-accent-600' 
    },
    { 
      label: 'Wellness Hub', 
      description: 'Your health insights',
      icon: Heart, 
      path: '/app/wellness', 
      gradient: 'from-primary-700 to-primary-800' 
    },
  ];

  const timeOfDay = new Date().getHours();
  const greeting = timeOfDay < 12 ? 'Good morning' : timeOfDay < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <AppLayout role="employee">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl p-8 shadow-sm border border-neutral-200">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-dm-sans font-bold text-neutral-900 tracking-tight mb-2">
                {greeting}, {user.firstName}
              </h1>
              <p className="text-neutral-600 font-inter text-[15px] leading-relaxed">
                Your daily nutrition and wellness overview
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-accent-50 rounded-lg border border-accent-100">
              <TrendingUp className="w-4 h-4 text-accent-600" />
              <span className="text-sm font-semibold font-inter text-accent-700">
                {user.wellnessScore} Score
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.path}
                to={action.path}
                className="group relative bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 hover:shadow-lg hover:border-neutral-300 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-dm-sans font-bold text-neutral-900 mb-1 tracking-tight">
                    {action.label}
                  </h3>
                  <p className="text-sm text-neutral-600 font-inter flex items-center gap-2">
                    {action.description}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-dm-sans font-bold text-neutral-900 tracking-tight">
                  Today's Orders
                </h2>
                <p className="text-sm text-neutral-500 font-inter mt-0.5">
                  Your scheduled meals for today
                </p>
              </div>
              <Link
                to="/app/orders"
                className="text-sm text-primary-600 hover:text-primary-700 font-semibold font-inter flex items-center gap-1 hover:gap-2 transition-all"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {todayOrders.length > 0 ? (
              <div className="space-y-3">
                {todayOrders.map((order) => (
                  <div
                    key={order.id}
                    className="group flex items-center justify-between p-5 rounded-xl bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 hover:border-primary-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <ChefHat className="w-7 h-7 text-primary-700" />
                      </div>
                      <div>
                        <h4 className="font-bold font-inter text-neutral-900 text-[15px] mb-1">
                          {order.mealName}
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-neutral-500 font-inter">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {order.deliveryTime}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-neutral-300" />
                          <span>{order.calories} cal</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1.5 rounded-lg bg-accent-50 text-accent-700 text-xs font-bold font-inter flex items-center gap-1.5 border border-accent-100">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Confirmed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gradient-to-br from-neutral-50 to-white rounded-xl border-2 border-dashed border-neutral-200">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center">
                  <UtensilsCrossed className="w-8 h-8 text-neutral-400" />
                </div>
                <p className="text-neutral-600 mb-5 font-inter font-medium">No orders scheduled yet</p>
                <Link
                  to="/app/menu"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold font-inter hover:from-primary-600 hover:to-primary-700 transition-all shadow-sm hover:shadow-md"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  Browse Menu
                </Link>
              </div>
            )}
          </div>

          {/* Wellness Score */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
            <div className="mb-6">
              <h2 className="text-xl font-dm-sans font-bold text-neutral-900 tracking-tight">
                Wellness Score
              </h2>
              <p className="text-sm text-neutral-500 font-inter mt-0.5">
                Your health metrics
              </p>
            </div>
            
            {/* Score Circle */}
            <div className="relative w-36 h-36 mx-auto mb-6">
              <svg className="transform -rotate-90 w-36 h-36">
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="#f3f4f6"
                  strokeWidth="14"
                  fill="none"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="url(#gradient)"
                  strokeWidth="14"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 64}`}
                  strokeDashoffset={`${2 * Math.PI * 64 * (1 - user.wellnessScore / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#23B676" />
                    <stop offset="100%" stopColor="#1F8AAE" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold font-dm-sans text-neutral-900 leading-none">
                  {user.wellnessScore}
                </span>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-accent-500" />
                  <span className="text-xs font-semibold text-accent-600 font-inter">+5 this week</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 font-inter">Nutrition Goals</span>
                <span className="font-bold text-neutral-900 font-inter">87%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 font-inter">Meal Consistency</span>
                <span className="font-bold text-neutral-900 font-inter">92%</span>
              </div>
            </div>

            <Link
              to="/app/wellness"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-neutral-900 text-white rounded-xl font-semibold font-inter hover:bg-neutral-800 transition-all shadow-sm"
            >
              View Full Report
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Recommended Meals */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
          <div className="mb-6">
            <h2 className="text-xl font-dm-sans font-bold text-neutral-900 tracking-tight">
              Recommended for You
            </h2>
            <p className="text-sm text-neutral-500 font-inter mt-0.5">
              Personalized meal suggestions based on your preferences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'Grilled Salmon Bowl', cal: 520, protein: 42 },
              { name: 'Chicken Caesar Wrap', cal: 380, protein: 35 },
              { name: 'Vegan Buddha Bowl', cal: 410, protein: 18 },
            ].map((meal, i) => (
              <div 
                key={i} 
                className="group border border-neutral-200 rounded-xl p-5 hover:shadow-lg hover:border-neutral-300 transition-all duration-300"
              >
                <div className="w-full h-40 bg-gradient-to-br from-primary-100 via-accent-50 to-primary-50 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative">
                  <ChefHat className="w-16 h-16 text-primary-600 opacity-40" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-white rounded-lg shadow-sm">
                    <span className="text-xs font-bold text-neutral-900 font-inter">{meal.cal} cal</span>
                  </div>
                </div>
                <h4 className="font-bold font-inter text-neutral-900 mb-2 text-[15px]">
                  {meal.name}
                </h4>
                <p className="text-sm text-neutral-600 font-inter mb-4">
                  {meal.protein}g protein • High nutrition
                </p>
                <button className="w-full px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold font-inter hover:from-primary-600 hover:to-primary-700 transition-all shadow-sm flex items-center justify-center gap-2 group-hover:gap-3">
                  <Plus className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EmployeeDashboard;
