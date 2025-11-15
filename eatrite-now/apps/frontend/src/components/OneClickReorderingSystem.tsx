import React, { useState, useEffect } from 'react';
import { 
  RotateCcw, 
  Clock, 
  ShoppingCart, 
  Star,
  Package, 
  Save,
  Zap,
  Target,
  Settings,
  Award
} from 'lucide-react';
import { FadeIn, StaggeredAnimation, Floating } from './AnimationComponents';

interface OrderHistoryItem {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  dietType: string;
  lastOrdered: Date;
  totalOrders: number;
  averageRating: number;
  calories: number;
  protein: number;
  tags: string[];
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'occasional';
  nextSuggestedOrder?: Date;
  isSubscription: boolean;
  customizations?: {
    portion: 'regular' | 'large' | 'small';
    modifications: string[];
  };
}

interface QuickOrderBundle {
  id: string;
  name: string;
  description: string;
  items: {
    item: OrderHistoryItem;
    quantity: number;
  }[];
  totalPrice: number;
  originalPrice: number;
  savings: number;
  frequency: string;
  popularity: number;
  lastUsed?: Date;
}

interface SmartRecommendation {
  id: string;
  type: 'replenishment' | 'complementary' | 'seasonal' | 'trending' | 'bundle';
  item: OrderHistoryItem;
  reason: string;
  confidence: number;
  urgency: 'high' | 'medium' | 'low';
  savings?: number;
  timeframe: string;
}

interface ReorderPreferences {
  autoReorder: boolean;
  reminderDays: number;
  preferredDeliveryDay: string;
  bundleRecommendations: boolean;
  dietaryRestrictions: string[];
  budgetLimit?: number;
  favoriteCategories: string[];
}

const generateOrderHistory = (): OrderHistoryItem[] => [
  {
    id: 'keto-power-bowl',
    name: 'Keto Power Bowl',
    image: '🥗',
    price: 14.99,
    category: 'Bowls',
    dietType: 'keto',
    lastOrdered: new Date(2024, 11, 18),
    totalOrders: 23,
    averageRating: 5.0,
    calories: 520,
    protein: 28,
    tags: ['High Protein', 'Low Carb', 'Favorite'],
    frequency: 'weekly',
    nextSuggestedOrder: new Date(2024, 11, 25),
    isSubscription: true,
    customizations: {
      portion: 'large',
      modifications: ['Extra Avocado', 'No Onions']
    }
  },
  {
    id: 'grilled-salmon-plate',
    name: 'Grilled Salmon Plate',
    image: '🐟',
    price: 18.99,
    category: 'Seafood',
    dietType: 'protein',
    lastOrdered: new Date(2024, 11, 15),
    totalOrders: 18,
    averageRating: 4.8,
    calories: 480,
    protein: 35,
    tags: ['High Protein', 'Omega-3', 'Heart Healthy'],
    frequency: 'biweekly',
    nextSuggestedOrder: new Date(2024, 11, 29),
    isSubscription: false
  },
  {
    id: 'chicken-teriyaki-bowl',
    name: 'Chicken Teriyaki Bowl',
    image: '🍗',
    price: 15.99,
    category: 'Bowls',
    dietType: 'balanced',
    lastOrdered: new Date(2024, 11, 12),
    totalOrders: 15,
    averageRating: 4.9,
    calories: 465,
    protein: 32,
    tags: ['Balanced', 'Asian Fusion', 'Customer Favorite'],
    frequency: 'weekly',
    nextSuggestedOrder: new Date(2024, 11, 26),
    isSubscription: false
  },
  {
    id: 'mediterranean-wrap',
    name: 'Mediterranean Wrap',
    image: '🫔',
    price: 11.99,
    category: 'Wraps',
    dietType: 'balanced',
    lastOrdered: new Date(2024, 11, 10),
    totalOrders: 8,
    averageRating: 4.5,
    calories: 380,
    protein: 22,
    tags: ['Mediterranean', 'Whole Grain', 'Vegetarian Option'],
    frequency: 'monthly',
    isSubscription: false
  },
  {
    id: 'vegan-burrito-bowl',
    name: 'Vegan Burrito Bowl',
    image: '🌯',
    price: 12.99,
    category: 'Bowls',
    dietType: 'vegan',
    lastOrdered: new Date(2024, 11, 8),
    totalOrders: 12,
    averageRating: 4.6,
    calories: 420,
    protein: 15,
    tags: ['Plant-Based', 'High Fiber', 'Sustainable'],
    frequency: 'weekly',
    nextSuggestedOrder: new Date(2024, 11, 22),
    isSubscription: false
  }
];

const generateQuickOrderBundles = (): QuickOrderBundle[] => [
  {
    id: 'weekly-keto-bundle',
    name: 'Your Weekly Keto Favorites',
    description: 'Based on your order history - perfect for your keto lifestyle',
    items: [
      { item: generateOrderHistory()[0], quantity: 3 },
      { item: generateOrderHistory()[1], quantity: 2 }
    ],
    totalPrice: 82.94,
    originalPrice: 92.94,
    savings: 10.00,
    frequency: 'Weekly',
    popularity: 94,
    lastUsed: new Date(2024, 11, 11)
  },
  {
    id: 'balanced-meal-prep',
    name: 'Balanced Meal Prep Pack',
    description: 'Your go-to combination for variety and nutrition',
    items: [
      { item: generateOrderHistory()[2], quantity: 2 },
      { item: generateOrderHistory()[3], quantity: 2 },
      { item: generateOrderHistory()[4], quantity: 1 }
    ],
    totalPrice: 68.94,
    originalPrice: 76.94,
    savings: 8.00,
    frequency: 'Biweekly',
    popularity: 87,
    lastUsed: new Date(2024, 10, 28)
  }
];

const generateSmartRecommendations = (): SmartRecommendation[] => [
  {
    id: 'rec-1',
    type: 'replenishment',
    item: generateOrderHistory()[0],
    reason: 'You typically reorder this every 7 days',
    confidence: 96,
    urgency: 'high',
    timeframe: 'Order by tomorrow for usual schedule'
  },
  {
    id: 'rec-2',
    type: 'complementary',
    item: generateOrderHistory()[1],
    reason: 'Pairs well with your Keto Power Bowl orders',
    confidence: 87,
    urgency: 'medium',
    savings: 3.00,
    timeframe: 'Perfect for this week\'s variety'
  },
  {
    id: 'rec-3',
    type: 'seasonal',
    item: generateOrderHistory()[4],
    reason: 'Vegan options trending 40% higher this season',
    confidence: 78,
    urgency: 'low',
    timeframe: 'Great for New Year goals'
  }
];

export const OneClickReorderingSystem: React.FC = () => {
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([]);
  const [quickBundles, setQuickBundles] = useState<QuickOrderBundle[]>([]);
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [preferences, setPreferences] = useState<ReorderPreferences>({
    autoReorder: false,
    reminderDays: 2,
    preferredDeliveryDay: 'Tuesday',
    bundleRecommendations: true,
    dietaryRestrictions: ['gluten-free'],
    budgetLimit: 150,
    favoriteCategories: ['Bowls', 'Seafood']
  });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showCustomization, setShowCustomization] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'frequency' | 'recent' | 'rating'>('frequency');

  useEffect(() => {
    setOrderHistory(generateOrderHistory());
    setQuickBundles(generateQuickOrderBundles());
    setRecommendations(generateSmartRecommendations());
  }, []);

  const quickReorder = (itemId: string, quantity: number = 1) => {
    const item = orderHistory.find(i => i.id === itemId);
    if (!item) return;

    // Simulate adding to cart
    console.log(`Quick reordered: ${quantity}x ${item.name}`);
    
    // Update last ordered date
    const updatedHistory = orderHistory.map(h => 
      h.id === itemId ? { ...h, lastOrdered: new Date() } : h
    );
    setOrderHistory(updatedHistory);
  };

  const reorderBundle = (bundleId: string) => {
    const bundle = quickBundles.find(b => b.id === bundleId);
    if (!bundle) return;

    console.log(`Reordered bundle: ${bundle.name}`);
    
    // Update last used date
    const updatedBundles = quickBundles.map(b => 
      b.id === bundleId ? { ...b, lastUsed: new Date() } : b
    );
    setQuickBundles(updatedBundles);
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const reorderSelected = () => {
    const selectedItemsData = orderHistory.filter(item => selectedItems.includes(item.id));
    console.log('Reordering selected items:', selectedItemsData);
    setSelectedItems([]);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysAgo = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'weekly': return 'bg-green-100 text-green-700';
      case 'biweekly': return 'bg-blue-100 text-blue-700';
      case 'monthly': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredHistory = orderHistory
    .filter(item => filterCategory === 'all' || item.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'frequency':
          const frequencyOrder = { weekly: 3, biweekly: 2, monthly: 1, occasional: 0 };
          return frequencyOrder[b.frequency] - frequencyOrder[a.frequency];
        case 'recent':
          return b.lastOrdered.getTime() - a.lastOrdered.getTime();
        case 'rating':
          return b.averageRating - a.averageRating;
        default:
          return 0;
      }
    });

  const categories = ['all', ...Array.from(new Set(orderHistory.map(item => item.category)))];
  const totalSelected = selectedItems.length;
  const selectedTotal = orderHistory
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
        <FadeIn>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <RotateCcw className="w-7 h-7" />
                <h2 className="text-2xl font-bold">One-Click Reordering System</h2>
                <Zap className="w-6 h-6" />
              </div>
              <p className="text-green-100">
                Smart reordering based on your purchase history and preferences
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {totalSelected > 0 && (
                <button
                  onClick={reorderSelected}
                  className="flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Reorder {totalSelected} Items (${selectedTotal.toFixed(2)})</span>
                </button>
              )}
              
              <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
                <span>Preferences</span>
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="p-6">
        {/* Quick Action Bundles */}
        <FadeIn delay={0.1}>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="w-5 h-5 text-green-600 mr-2" />
              Quick Order Bundles
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Smart Picks
              </span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StaggeredAnimation>
                {quickBundles.map((bundle) => (
                  <div key={bundle.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{bundle.name}</h4>
                        <p className="text-sm text-gray-600">{bundle.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">${bundle.totalPrice.toFixed(2)}</div>
                        <div className="text-sm text-gray-500 line-through">${bundle.originalPrice.toFixed(2)}</div>
                        <div className="text-sm text-green-600 font-semibold">Save ${bundle.savings.toFixed(2)}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {bundle.items.map((bundleItem, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                          <span className="text-lg">{bundleItem.item.image}</span>
                          <div className="flex-1">
                            <span className="font-medium text-gray-900">{bundleItem.item.name}</span>
                            <span className="text-sm text-gray-600 ml-2">x{bundleItem.quantity}</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            ${(bundleItem.item.price * bundleItem.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className={`px-2 py-1 rounded-full text-xs ${getFrequencyColor(bundle.frequency.toLowerCase())}`}>
                          {bundle.frequency}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 mr-1" />
                          {bundle.popularity}% match
                        </span>
                        {bundle.lastUsed && (
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 text-gray-500 mr-1" />
                            Last: {formatDate(bundle.lastUsed)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => reorderBundle(bundle.id)}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Reorder Bundle</span>
                    </button>
                  </div>
                ))}
              </StaggeredAnimation>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order History */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 text-blue-600 mr-2" />
                    Order History ({orderHistory.length} items)
                  </h3>
                  
                  <div className="flex items-center space-x-4">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                    
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="frequency">Most Frequent</option>
                      <option value="recent">Most Recent</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <StaggeredAnimation>
                    {filteredHistory.map((item) => {
                      const isSelected = selectedItems.includes(item.id);
                      const daysAgo = getDaysAgo(item.lastOrdered);
                      
                      return (
                        <div key={item.id} className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                          isSelected ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-4">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleItemSelection(item.id)}
                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                              />
                              
                              <span className="text-2xl">{item.image}</span>
                              
                              <div>
                                <h4 className="font-semibold text-gray-900 flex items-center">
                                  {item.name}
                                  {item.isSubscription && (
                                    <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                      Subscription
                                    </span>
                                  )}
                                </h4>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <span className="flex items-center">
                                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                                    {item.averageRating}
                                  </span>
                                  <span>{item.totalOrders} orders</span>
                                  <span>{item.calories} cal</span>
                                  <span>{item.protein}g protein</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">${item.price}</div>
                              <div className="text-sm text-gray-600">Last: {daysAgo} days ago</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${getFrequencyColor(item.frequency)}`}>
                                {item.frequency}
                              </span>
                              
                              {item.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                  {tag}
                                </span>
                              ))}
                              
                              {item.nextSuggestedOrder && (
                                <span className="text-xs text-green-600 font-semibold">
                                  Suggested: {formatDate(item.nextSuggestedOrder)}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {item.customizations && (
                                <button
                                  onClick={() => setShowCustomization(
                                    showCustomization === item.id ? null : item.id
                                  )}
                                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                  {showCustomization === item.id ? 'Hide' : 'Customize'}
                                </button>
                              )}
                              
                              <button
                                onClick={() => quickReorder(item.id)}
                                className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                <Zap className="w-3 h-3" />
                                <span>Reorder</span>
                              </button>
                            </div>
                          </div>
                          
                          {/* Customization Details */}
                          {showCustomization === item.id && item.customizations && (
                            <Floating>
                              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h5 className="font-semibold text-gray-900 mb-2">Your Customizations</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Portion Size:</span>
                                    <span className="font-semibold capitalize">{item.customizations.portion}</span>
                                  </div>
                                  {item.customizations.modifications.length > 0 && (
                                    <div>
                                      <span className="text-gray-600">Modifications:</span>
                                      <div className="mt-1 space-y-1">
                                        {item.customizations.modifications.map((mod, index) => (
                                          <div key={index} className="text-blue-700 text-xs">
                                            • {mod}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Floating>
                          )}
                        </div>
                      );
                    })}
                  </StaggeredAnimation>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar: Recommendations & Preferences */}
          <div className="space-y-6">
            {/* Smart Recommendations */}
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 text-purple-600 mr-2" />
                  Smart Recommendations
                </h3>
                
                <div className="space-y-3">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className={`p-3 rounded-lg border ${getUrgencyColor(rec.urgency)}`}>
                      <div className="flex items-start space-x-2 mb-2">
                        <span className="text-lg">{rec.item.image}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{rec.item.name}</h4>
                          <p className="text-xs mt-1">{rec.reason}</p>
                        </div>
                      </div>
                      
                      <div className="text-xs space-y-1 mb-3">
                        <div className="flex justify-between">
                          <span>Confidence:</span>
                          <span className="font-semibold">{rec.confidence}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Timeframe:</span>
                          <span className="font-semibold">{rec.timeframe}</span>
                        </div>
                        {rec.savings && (
                          <div className="flex justify-between">
                            <span>Savings:</span>
                            <span className="font-semibold text-green-600">${rec.savings.toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => quickReorder(rec.item.id)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Reorder Preferences */}
            <FadeIn delay={0.4}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Settings className="w-5 h-5 text-gray-600 mr-2" />
                  Reorder Preferences
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Auto Reorder</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.autoReorder}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          autoReorder: e.target.checked
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Reminder Days Before Usual Order
                    </label>
                    <select
                      value={preferences.reminderDays}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        reminderDays: parseInt(e.target.value)
                      }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value={1}>1 day</option>
                      <option value={2}>2 days</option>
                      <option value={3}>3 days</option>
                      <option value={7}>1 week</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Preferred Delivery Day
                    </label>
                    <select
                      value={preferences.preferredDeliveryDay}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        preferredDeliveryDay: e.target.value
                      }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Weekly Budget Limit
                    </label>
                    <input
                      type="number"
                      value={preferences.budgetLimit || ''}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        budgetLimit: parseInt(e.target.value) || undefined
                      }))}
                      placeholder="150"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Bundle Recommendations</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.bundleRecommendations}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          bundleRecommendations: e.target.checked
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Save Preferences</span>
                </button>
              </div>
            </FadeIn>

            {/* Quick Stats */}
            <FadeIn delay={0.5}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 text-yellow-600 mr-2" />
                  Your Stats
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Orders</span>
                    <span className="font-semibold text-gray-900">
                      {orderHistory.reduce((sum, item) => sum + item.totalOrders, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Favorite Category</span>
                    <span className="font-semibold text-gray-900">
                      {preferences.favoriteCategories[0] || 'Bowls'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Average Rating Given</span>
                    <span className="font-semibold text-gray-900 flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 mr-1" />
                      {(orderHistory.reduce((sum, item) => sum + item.averageRating, 0) / orderHistory.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Reorder Rate</span>
                    <span className="font-semibold text-green-600">87%</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneClickReorderingSystem;