import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Package, 
  TrendingDown, 
  TrendingUp, 
  Clock, 
  Bell, 
  Calendar, 
  BarChart3,
  Zap,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info,
  Settings,
  Minus
} from 'lucide-react';
import { FadeIn, StaggeredAnimation } from './AnimationComponents';

interface InventoryItem {
  id: string;
  name: string;
  image: string;
  category: string;
  currentStock: number;
  reorderPoint: number;
  averageDemand: number;
  stockDays: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  seasonality: 'high' | 'medium' | 'low';
  popularity: number;
  price: number;
  supplier: string;
  lastRestock: Date;
  nextDelivery?: Date;
  alertLevel: 'critical' | 'warning' | 'normal';
  predictedStockout?: Date;
  recommendedAction: string;
}

interface StockAlert {
  id: string;
  type: 'stockout' | 'low_stock' | 'overstock' | 'seasonal_spike' | 'supplier_delay';
  severity: 'critical' | 'warning' | 'info';
  item: InventoryItem;
  message: string;
  action: string;
  timeframe: string;
  impact: string;
  confidence: number;
  createdAt: Date;
}

interface DemandForecast {
  itemId: string;
  period: 'today' | 'week' | 'month';
  predictedDemand: number;
  confidenceInterval: [number, number];
  factors: {
    seasonal: number;
    trend: number;
    events: number;
    weather: number;
    marketing: number;
  };
  recommendations: string[];
}

interface SeasonalPattern {
  name: string;
  items: string[];
  peakMonth: string;
  demandIncrease: number;
  duration: string;
  color: string;
}

const generateInventoryItems = (): InventoryItem[] => [
  {
    id: 'keto-power-bowl',
    name: 'Keto Power Bowl',
    image: '🥗',
    category: 'Bowls',
    currentStock: 47,
    reorderPoint: 100,
    averageDemand: 85,
    stockDays: 3,
    trend: 'increasing',
    seasonality: 'high',
    popularity: 95,
    price: 14.99,
    supplier: 'Fresh Kitchen Co.',
    lastRestock: new Date(2024, 11, 15),
    alertLevel: 'critical',
    predictedStockout: new Date(2024, 11, 22),
    recommendedAction: 'Urgent reorder: 500 units needed'
  },
  {
    id: 'protein-salmon-plate',
    name: 'Grilled Salmon Plate',
    image: '🐟',
    category: 'Seafood',
    currentStock: 156,
    reorderPoint: 120,
    averageDemand: 62,
    stockDays: 7,
    trend: 'stable',
    seasonality: 'medium',
    popularity: 88,
    price: 18.99,
    supplier: 'Ocean Fresh Supply',
    lastRestock: new Date(2024, 11, 18),
    nextDelivery: new Date(2024, 11, 25),
    alertLevel: 'warning',
    recommendedAction: 'Monitor closely - approaching reorder point'
  },
  {
    id: 'vegan-burrito-bowl',
    name: 'Vegan Burrito Bowl',
    image: '🌯',
    category: 'Bowls',
    currentStock: 234,
    reorderPoint: 80,
    averageDemand: 45,
    stockDays: 14,
    trend: 'increasing',
    seasonality: 'high',
    popularity: 82,
    price: 12.99,
    supplier: 'Plant Power Foods',
    lastRestock: new Date(2024, 11, 12),
    alertLevel: 'normal',
    recommendedAction: 'Stock level healthy'
  },
  {
    id: 'chicken-teriyaki-bowl',
    name: 'Chicken Teriyaki Bowl',
    image: '🍗',
    category: 'Bowls',
    currentStock: 89,
    reorderPoint: 150,
    averageDemand: 127,
    stockDays: 4,
    trend: 'increasing',
    seasonality: 'medium',
    popularity: 97,
    price: 15.99,
    supplier: 'Asian Fusion Kitchen',
    lastRestock: new Date(2024, 11, 16),
    alertLevel: 'warning',
    predictedStockout: new Date(2024, 11, 24),
    recommendedAction: 'Reorder recommended within 48 hours'
  },
  {
    id: 'mediterranean-wrap',
    name: 'Mediterranean Wrap',
    image: '🫔',
    category: 'Wraps',
    currentStock: 312,
    reorderPoint: 100,
    averageDemand: 38,
    stockDays: 21,
    trend: 'stable',
    seasonality: 'low',
    popularity: 74,
    price: 11.99,
    supplier: 'Mediterranean Delights',
    lastRestock: new Date(2024, 11, 10),
    alertLevel: 'normal',
    recommendedAction: 'Overstocked - consider promotion'
  }
];

const generateStockAlerts = (items: InventoryItem[]): StockAlert[] => [
  {
    id: 'alert-1',
    type: 'stockout',
    severity: 'critical',
    item: items.find(item => item.id === 'keto-power-bowl')!,
    message: 'Keto Power Bowl will stock out in 3 days',
    action: 'Place emergency order of 500 units',
    timeframe: 'Immediate action required',
    impact: 'High - Top selling item affects 15% of daily orders',
    confidence: 94,
    createdAt: new Date()
  },
  {
    id: 'alert-2',
    type: 'low_stock',
    severity: 'warning',
    item: items.find(item => item.id === 'chicken-teriyaki-bowl')!,
    message: 'Chicken Teriyaki Bowl below reorder point',
    action: 'Schedule reorder for next delivery cycle',
    timeframe: 'Within 48 hours',
    impact: 'Medium - Popular item with consistent demand',
    confidence: 87,
    createdAt: new Date()
  },
  {
    id: 'alert-3',
    type: 'seasonal_spike',
    severity: 'info',
    item: items.find(item => item.id === 'vegan-burrito-bowl')!,
    message: 'Vegan options trending up - New Year health resolutions',
    action: 'Increase stock by 40% for January',
    timeframe: 'Next 2 weeks',
    impact: 'Opportunity - Capitalize on seasonal demand',
    confidence: 78,
    createdAt: new Date()
  },
  {
    id: 'alert-4',
    type: 'overstock',
    severity: 'warning',
    item: items.find(item => item.id === 'mediterranean-wrap')!,
    message: 'Mediterranean Wrap overstocked - 21 days supply',
    action: 'Run promotion or reduce next order',
    timeframe: 'This week',
    impact: 'Cost - Excess inventory ties up capital',
    confidence: 91,
    createdAt: new Date()
  }
];

const generateDemandForecasts = (): DemandForecast[] => [
  {
    itemId: 'keto-power-bowl',
    period: 'week',
    predictedDemand: 634,
    confidenceInterval: [587, 681],
    factors: {
      seasonal: 15, // New Year health focus
      trend: 23,   // Growing keto popularity
      events: 8,   // Fitness challenges
      weather: -3, // Cold weather slight decrease
      marketing: 12 // Active keto campaign
    },
    recommendations: [
      'Increase social media promotion during peak lunch hours',
      'Consider keto bundle deals to maximize revenue',
      'Monitor competitor pricing - currently 8% below market'
    ]
  },
  {
    itemId: 'vegan-burrito-bowl',
    period: 'week',
    predictedDemand: 387,
    confidenceInterval: [342, 432],
    factors: {
      seasonal: 28, // Veganuary effect
      trend: 18,    // Plant-based growth
      events: 12,   // Sustainability campaigns
      weather: 5,   // Comfort food preference
      marketing: 8  // Limited vegan promotion
    },
    recommendations: [
      'Leverage Veganuary trend with targeted campaigns',
      'Partner with plant-based influencers',
      'Consider limited-time vegan dessert additions'
    ]
  }
];

const generateSeasonalPatterns = (): SeasonalPattern[] => [
  {
    name: 'New Year Health Wave',
    items: ['keto-power-bowl', 'vegan-burrito-bowl', 'protein-salmon-plate'],
    peakMonth: 'January',
    demandIncrease: 45,
    duration: '6-8 weeks',
    color: 'green'
  },
  {
    name: 'Summer Beach Body',
    items: ['protein-salmon-plate', 'keto-power-bowl'],
    peakMonth: 'May-June',
    demandIncrease: 38,
    duration: '10-12 weeks',
    color: 'orange'
  },
  {
    name: 'Holiday Comfort',
    items: ['chicken-teriyaki-bowl', 'mediterranean-wrap'],
    peakMonth: 'November-December',
    demandIncrease: 25,
    duration: '8 weeks',
    color: 'red'
  }
];

export const PredictiveInventoryAlerts: React.FC = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [forecasts, setForecasts] = useState<DemandForecast[]>([]);
  const [seasonalPatterns, setSeasonalPatterns] = useState<SeasonalPattern[]>([]);
  const [_selectedTimeframe, _setSelectedTimeframe] = useState<'today' | 'week' | 'month'>('week');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'stockDays' | 'demand' | 'popularity'>('stockDays');

  useEffect(() => {
    const items = generateInventoryItems();
    setInventoryItems(items);
    setAlerts(generateStockAlerts(items));
    setForecasts(generateDemandForecasts());
    setSeasonalPatterns(generateSeasonalPatterns());
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'stockout': return AlertTriangle;
      case 'low_stock': return AlertCircle;
      case 'overstock': return Package;
      case 'seasonal_spike': return TrendingUp;
      case 'supplier_delay': return Clock;
      default: return Info;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-700';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStockLevelColor = (alertLevel: string) => {
    switch (alertLevel) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredItems = inventoryItems.filter(item => 
    filterCategory === 'all' || item.category === filterCategory
  ).sort((a, b) => {
    switch (sortBy) {
      case 'stockDays': return a.stockDays - b.stockDays;
      case 'demand': return b.averageDemand - a.averageDemand;
      case 'popularity': return b.popularity - a.popularity;
      default: return 0;
    }
  });

  const categories = ['all', ...Array.from(new Set(inventoryItems.map(item => item.category)))];

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
        <FadeIn>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Package className="w-7 h-7" />
                <h2 className="text-2xl font-bold">Predictive Inventory Alerts</h2>
                <Zap className="w-6 h-6" />
              </div>
              <p className="text-orange-100">
                AI-powered stock forecasting and intelligent reorder recommendations
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">Auto-refresh: 5m</span>
              </div>
              
              <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
                <span>Configure Alerts</span>
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="p-6">
        {/* Critical Alerts Banner */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-red-100 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-700">Critical Items</span>
              </div>
              <div className="text-2xl font-bold text-red-700">
                {alerts.filter(a => a.severity === 'critical').length}
              </div>
              <div className="text-sm text-red-600">Immediate attention needed</div>
            </div>
            
            <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-700">Low Stock</span>
              </div>
              <div className="text-2xl font-bold text-yellow-700">
                {inventoryItems.filter(i => i.alertLevel === 'warning').length}
              </div>
              <div className="text-sm text-yellow-600">Below reorder point</div>
            </div>
            
            <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-700">Total SKUs</span>
              </div>
              <div className="text-2xl font-bold text-blue-700">{inventoryItems.length}</div>
              <div className="text-sm text-blue-600">Active products</div>
            </div>
            
            <div className="bg-green-100 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-700">Healthy Stock</span>
              </div>
              <div className="text-2xl font-bold text-green-700">
                {inventoryItems.filter(i => i.alertLevel === 'normal').length}
              </div>
              <div className="text-sm text-green-600">Optimal levels</div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Inventory List */}
          <div className="lg:col-span-2">
            {/* Filters and Controls */}
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Inventory Overview</h3>
                  
                  <div className="flex items-center space-x-4">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="stockDays">Stock Days (Low to High)</option>
                      <option value="demand">Demand (High to Low)</option>
                      <option value="popularity">Popularity (High to Low)</option>
                    </select>
                  </div>
                </div>
                
                {/* Inventory Items */}
                <div className="space-y-3">
                  <StaggeredAnimation>
                    {filteredItems.map((item) => (
                      <div key={item.id} className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                        item.alertLevel === 'critical' ? 'bg-red-50 border-red-200' :
                        item.alertLevel === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{item.image}</span>
                            <div>
                              <h4 className="font-semibold text-gray-900">{item.name}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="flex items-center space-x-1">
                                  <Package className="w-3 h-3" />
                                  <span>{item.currentStock} units</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{item.stockDays} days supply</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  {getTrendIcon(item.trend)}
                                  <span>{item.averageDemand}/day avg</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className={`w-2 h-2 rounded-full ${getStockLevelColor(item.alertLevel)}`}></span>
                              <span className="text-sm font-semibold capitalize text-gray-700">
                                {item.alertLevel}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Reorder at: {item.reorderPoint}
                            </div>
                          </div>
                        </div>
                        
                        {/* Stock Level Visualization */}
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Stock Level</span>
                            <span>{Math.round((item.currentStock / (item.reorderPoint * 2)) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-1000 ${getStockLevelColor(item.alertLevel)}`}
                              style={{ 
                                width: `${Math.min(100, (item.currentStock / (item.reorderPoint * 2)) * 100)}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        {/* Recommendation */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Info className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-700">{item.recommendedAction}</span>
                          </div>
                          
                          {item.predictedStockout && (
                            <div className="text-xs text-red-600 font-semibold">
                              Stockout: {formatDate(item.predictedStockout)}
                            </div>
                          )}
                        </div>
                        
                        {/* Additional Info */}
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>Supplier: {item.supplier}</span>
                            <span>Last Restock: {formatDate(item.lastRestock)}</span>
                            {item.nextDelivery && (
                              <span className="text-green-600">
                                Next: {formatDate(item.nextDelivery)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </StaggeredAnimation>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar: Alerts & Forecasts */}
          <div className="space-y-6">
            {/* Active Alerts */}
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Bell className="w-5 h-5 text-orange-600 mr-2" />
                  Active Alerts
                </h3>
                
                <div className="space-y-3">
                  {alerts.map((alert) => {
                    const AlertIcon = getAlertIcon(alert.type);
                    
                    return (
                      <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.severity)}`}>
                        <div className="flex items-start space-x-2 mb-2">
                          <AlertIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{alert.message}</h4>
                            <p className="text-xs mt-1">{alert.action}</p>
                          </div>
                        </div>
                        
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between">
                            <span>Timeframe:</span>
                            <span className="font-semibold">{alert.timeframe}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Impact:</span>
                            <span className="font-semibold">{alert.impact}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Confidence:</span>
                            <span className="font-semibold">{alert.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>

            {/* Demand Forecasts */}
            <FadeIn delay={0.4}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                  Demand Forecasts
                </h3>
                
                <div className="space-y-4">
                  {forecasts.map((forecast) => {
                    const item = inventoryItems.find(i => i.id === forecast.itemId);
                    if (!item) return null;
                    
                    return (
                      <div key={forecast.itemId} className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-xl">{item.image}</span>
                          <div>
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <div className="text-sm text-gray-600">
                              {forecast.period} forecast: {forecast.predictedDemand} units
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Range:</span>
                            <span className="font-semibold">
                              {forecast.confidenceInterval[0]} - {forecast.confidenceInterval[1]}
                            </span>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="text-xs text-gray-600 mb-1">Influencing Factors:</div>
                            {Object.entries(forecast.factors).map(([factor, impact]) => (
                              <div key={factor} className="flex justify-between text-xs">
                                <span className="capitalize">{factor.replace('_', ' ')}:</span>
                                <span className={`font-semibold ${
                                  impact > 0 ? 'text-green-600' : impact < 0 ? 'text-red-600' : 'text-gray-600'
                                }`}>
                                  {impact > 0 ? '+' : ''}{impact}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {forecast.recommendations.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-blue-200">
                            <div className="text-xs text-gray-600 mb-1">Recommendations:</div>
                            {forecast.recommendations.slice(0, 2).map((rec, index) => (
                              <div key={index} className="text-xs text-blue-700 mb-1">
                                • {rec}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>

            {/* Seasonal Patterns */}
            <FadeIn delay={0.5}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                  Seasonal Patterns
                </h3>
                
                <div className="space-y-3">
                  {seasonalPatterns.map((pattern) => (
                    <div key={pattern.name} className={`p-3 bg-${pattern.color}-50 border border-${pattern.color}-200 rounded-lg`}>
                      <h4 className={`font-semibold text-${pattern.color}-700 mb-1`}>
                        {pattern.name}
                      </h4>
                      <div className={`text-sm text-${pattern.color}-600 space-y-1`}>
                        <div className="flex justify-between">
                          <span>Peak:</span>
                          <span className="font-semibold">{pattern.peakMonth}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Increase:</span>
                          <span className="font-semibold">+{pattern.demandIncrease}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="font-semibold">{pattern.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveInventoryAlerts;