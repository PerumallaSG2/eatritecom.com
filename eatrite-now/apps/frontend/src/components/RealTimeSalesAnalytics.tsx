import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  DollarSign, 
  Users, 
  ShoppingCart,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  Star,
  Download,
  RefreshCw,
  PieChart,
  LineChart,
  MousePointer,
  CreditCard
} from 'lucide-react';
import { FadeIn, StaggeredAnimation } from './AnimationComponents';

interface SalesMetric {
  id: string;
  title: string;
  value: number | string;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  target?: number;
  icon: React.ComponentType<any>;
  color: string;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly';
}

interface SalesData {
  timestamp: Date;
  revenue: number;
  orders: number;
  conversion: number;
  avgOrderValue: number;
  traffic: number;
  newCustomers: number;
}

interface ProductPerformance {
  id: string;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  growth: number;
  margin: number;
  inventory: number;
  rating: number;
  image: string;
}

interface ChannelPerformance {
  channel: string;
  revenue: number;
  orders: number;
  conversion: number;
  growth: number;
  cost: number;
  roi: number;
  color: string;
}

interface ConversionFunnel {
  stage: string;
  visitors: number;
  conversion: number;
  dropOff: number;
  revenue: number;
}

const generateSalesMetrics = (): SalesMetric[] => [
  {
    id: 'hourly-revenue',
    title: 'Hourly Revenue',
    value: 18750,
    unit: '$',
    change: 12.4,
    trend: 'up',
    target: 20000,
    icon: DollarSign,
    color: 'green',
    period: 'hourly'
  },
  {
    id: 'orders-today',
    title: 'Orders Today',
    value: 247,
    unit: '',
    change: 8.9,
    trend: 'up',
    target: 300,
    icon: ShoppingCart,
    color: 'blue',
    period: 'daily'
  },
  {
    id: 'conversion-rate',
    title: 'Conversion Rate',
    value: 3.8,
    unit: '%',
    change: -0.3,
    trend: 'down',
    target: 4.2,
    icon: Target,
    color: 'purple',
    period: 'daily'
  },
  {
    id: 'avg-order-value',
    title: 'Avg Order Value',
    value: 89.50,
    unit: '$',
    change: 5.2,
    trend: 'up',
    target: 95,
    icon: CreditCard,
    color: 'indigo',
    period: 'weekly'
  },
  {
    id: 'active-visitors',
    title: 'Active Visitors',
    value: 1248,
    unit: '',
    change: 15.7,
    trend: 'up',
    icon: Users,
    color: 'orange',
    period: 'hourly'
  },
  {
    id: 'cart-abandonment',
    title: 'Cart Abandonment',
    value: 68.4,
    unit: '%',
    change: -2.1,
    trend: 'up',
    target: 65,
    icon: MousePointer,
    color: 'red',
    period: 'daily'
  }
];

const generateHourlySalesData = (): SalesData[] => {
  const data: SalesData[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = timestamp.getHours();
    
    // Peak hours simulation (lunch 11-2, dinner 5-8)
    const isPeakHour = (hour >= 11 && hour <= 14) || (hour >= 17 && hour <= 20);
    const baseRevenue = isPeakHour ? 15000 : 8000;
    const baseOrders = isPeakHour ? 45 : 25;
    
    data.push({
      timestamp,
      revenue: baseRevenue + Math.random() * 5000,
      orders: baseOrders + Math.round(Math.random() * 15),
      conversion: 2.5 + Math.random() * 2,
      avgOrderValue: 75 + Math.random() * 30,
      traffic: 800 + Math.round(Math.random() * 400),
      newCustomers: 5 + Math.round(Math.random() * 10)
    });
  }
  
  return data;
};

const generateProductPerformance = (): ProductPerformance[] => [
  {
    id: 'keto-power-bowl',
    name: 'Keto Power Bowl',
    category: 'Keto',
    sales: 156,
    revenue: 2184,
    growth: 23.5,
    margin: 65,
    inventory: 89,
    rating: 4.9,
    image: '🥗'
  },
  {
    id: 'protein-plate',
    name: 'High Protein Plate',
    category: 'High Protein',
    sales: 134,
    revenue: 1876,
    growth: 18.2,
    margin: 62,
    inventory: 124,
    rating: 4.7,
    image: '🍖'
  },
  {
    id: 'mediterranean-salmon',
    name: 'Mediterranean Salmon',
    category: 'Heart Healthy',
    sales: 98,
    revenue: 1372,
    growth: 15.8,
    margin: 58,
    inventory: 67,
    rating: 4.8,
    image: '🐟'
  },
  {
    id: 'veggie-stir-fry',
    name: 'Veggie Stir-Fry',
    category: 'Plant-Based',
    sales: 87,
    revenue: 1044,
    growth: 45.2,
    margin: 70,
    inventory: 156,
    rating: 4.6,
    image: '🥬'
  }
];

const generateChannelPerformance = (): ChannelPerformance[] => [
  {
    channel: 'Direct Website',
    revenue: 124500,
    orders: 1456,
    conversion: 4.2,
    growth: 18.5,
    cost: 12450,
    roi: 900,
    color: 'blue'
  },
  {
    channel: 'Google Ads',
    revenue: 89200,
    orders: 1048,
    conversion: 3.8,
    growth: 22.1,
    cost: 15680,
    roi: 469,
    color: 'green'
  },
  {
    channel: 'Facebook/Instagram',
    revenue: 67800,
    orders: 798,
    conversion: 3.2,
    growth: 28.4,
    cost: 11220,
    roi: 504,
    color: 'purple'
  },
  {
    channel: 'Email Marketing',
    revenue: 45600,
    orders: 534,
    conversion: 5.8,
    growth: 12.7,
    cost: 2280,
    roi: 1900,
    color: 'orange'
  },
  {
    channel: 'Affiliate Partners',
    revenue: 32400,
    orders: 381,
    conversion: 2.9,
    growth: 35.2,
    cost: 9720,
    roi: 233,
    color: 'indigo'
  }
];

const generateConversionFunnel = (): ConversionFunnel[] => [
  {
    stage: 'Website Visitors',
    visitors: 12480,
    conversion: 100,
    dropOff: 0,
    revenue: 0
  },
  {
    stage: 'Product Views',
    visitors: 7488,
    conversion: 60,
    dropOff: 40,
    revenue: 0
  },
  {
    stage: 'Add to Cart',
    visitors: 2996,
    conversion: 24,
    dropOff: 36,
    revenue: 0
  },
  {
    stage: 'Checkout Started',
    visitors: 1498,
    conversion: 12,
    dropOff: 12,
    revenue: 0
  },
  {
    stage: 'Payment Info',
    visitors: 899,
    conversion: 7.2,
    dropOff: 4.8,
    revenue: 0
  },
  {
    stage: 'Order Completed',
    visitors: 474,
    conversion: 3.8,
    dropOff: 3.4,
    revenue: 42330
  }
];

export const RealTimeSalesAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<SalesMetric[]>([]);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [productPerformance, setProductPerformance] = useState<ProductPerformance[]>([]);
  const [channelPerformance, setChannelPerformance] = useState<ChannelPerformance[]>([]);
  const [conversionFunnel, setConversionFunnel] = useState<ConversionFunnel[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'hour' | 'day' | 'week' | 'month'>('day');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    setMetrics(generateSalesMetrics());
    setSalesData(generateHourlySalesData());
    setProductPerformance(generateProductPerformance());
    setChannelPerformance(generateChannelPerformance());
    setConversionFunnel(generateConversionFunnel());
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // Simulate real-time updates
      setMetrics(generateSalesMetrics());
      setSalesData(generateHourlySalesData());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') {
      return <ArrowUpRight className={`w-4 h-4 ${change > 0 ? 'text-green-500' : 'text-red-500'}`} />;
    } else if (trend === 'down') {
      return <ArrowDownRight className={`w-4 h-4 ${change < 0 ? 'text-red-500' : 'text-green-500'}`} />;
    }
    return <Activity className="w-4 h-4 text-blue-500" />;
  };

  const getTotalRevenue = () => {
    return salesData.reduce((sum, data) => sum + data.revenue, 0);
  };

  const getTotalOrders = () => {
    return salesData.reduce((sum, data) => sum + data.orders, 0);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
        <FadeIn>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-8 h-8" />
                <h2 className="text-3xl font-bold">Real-Time Sales Analytics</h2>
                <Activity className="w-8 h-8 animate-pulse" />
              </div>
              <p className="text-blue-100 text-lg">
                Live sales performance and conversion analytics
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="hour">Last Hour</option>
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center space-x-2 border border-white/20 px-4 py-2 rounded-lg transition-colors ${
                  autoRefresh ? 'bg-green-600 hover:bg-green-700' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                <span>{autoRefresh ? 'Live' : 'Paused'}</span>
              </button>
              
              <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-blue-200">
            Last updated: {lastUpdated.toLocaleTimeString()} • Auto-refresh: {autoRefresh ? 'ON' : 'OFF'}
          </div>
        </FadeIn>
      </div>

      <div className="p-8">
        {/* Key Metrics Grid */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StaggeredAnimation>
              {metrics.map((metric) => {
                const IconComponent = metric.icon;
                const progressPercentage = metric.target ? (Number(metric.value) / metric.target) * 100 : 0;
                
                return (
                  <div key={metric.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-${metric.color}-100 rounded-xl flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 text-${metric.color}-600`} />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(metric.trend, metric.change)}
                        <span className={`text-sm font-semibold ${
                          metric.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change > 0 ? '+' : ''}{metric.change}%
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {metric.unit === '$' ? formatCurrency(Number(metric.value)) : 
                       typeof metric.value === 'number' ? formatNumber(metric.value) : metric.value}
                      {metric.unit !== '$' && metric.unit}
                    </div>
                    
                    {metric.target && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Target</span>
                          <span>{metric.unit === '$' ? formatCurrency(metric.target) : `${metric.target}${metric.unit}`}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-${metric.color}-500 h-2 rounded-full transition-all duration-1000`}
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {Math.round(progressPercentage)}% of target
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{metric.period} data</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>live</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </StaggeredAnimation>
          </div>
        </FadeIn>

        {/* Sales Trend & Conversion Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Trend Chart */}
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <LineChart className="w-5 h-5 text-blue-600 mr-2" />
                  24-Hour Sales Trend
                </h3>
                <div className="text-sm text-gray-500">
                  Total: {formatCurrency(getTotalRevenue())} • {getTotalOrders()} orders
                </div>
              </div>
              
              {/* Simplified Chart Representation */}
              <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-lg mb-4 flex items-end justify-between px-2 py-4">
                {salesData.slice(-12).map((data, index) => {
                  const maxRevenue = Math.max(...salesData.map(d => d.revenue));
                  const height = (data.revenue / maxRevenue) * 200;
                  
                  return (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div
                        className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg w-8 transition-all hover:from-blue-600 hover:to-blue-400"
                        style={{ height: `${height}px` }}
                        title={`${data.timestamp.getHours()}:00 - ${formatCurrency(data.revenue)}`}
                      ></div>
                      <div className="text-xs text-gray-500">
                        {data.timestamp.getHours()}:00
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{formatCurrency(getTotalRevenue())}</div>
                  <div className="text-sm text-gray-600">Revenue</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{getTotalOrders()}</div>
                  <div className="text-sm text-gray-600">Orders</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(getTotalRevenue() / getTotalOrders())}
                  </div>
                  <div className="text-sm text-gray-600">AOV</div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Conversion Funnel */}
          <FadeIn delay={0.3}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Target className="w-5 h-5 text-purple-600 mr-2" />
                Conversion Funnel
              </h3>
              
              <div className="space-y-4">
                {conversionFunnel.map((stage, index) => {
                  const isLast = index === conversionFunnel.length - 1;
                  const width = stage.conversion;
                  
                  return (
                    <div key={stage.stage} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{stage.stage}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-gray-700">
                            {formatNumber(stage.visitors)}
                          </span>
                          <span className="text-xs text-gray-500">({stage.conversion}%)</span>
                        </div>
                      </div>
                      
                      <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className={`h-full rounded-lg transition-all duration-1000 ${
                            isLast ? 'bg-gradient-to-r from-green-500 to-green-400' :
                            'bg-gradient-to-r from-blue-500 to-purple-500'
                          }`}
                          style={{ width: `${width}%` }}
                        ></div>
                        
                        {stage.dropOff > 0 && (
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-red-600 font-semibold">
                            -{stage.dropOff}%
                          </div>
                        )}
                      </div>
                      
                      {isLast && stage.revenue > 0 && (
                        <div className="mt-2 text-sm text-green-600 font-semibold">
                          Revenue: {formatCurrency(stage.revenue)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">3.8%</div>
                  <div className="text-sm text-gray-700">Overall Conversion Rate</div>
                  <div className="text-xs text-gray-600 mt-1">Above industry average (2.9%)</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Product Performance & Channel Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performing Products */}
          <FadeIn delay={0.4}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Star className="w-5 h-5 text-yellow-600 mr-2" />
                Top Performing Products
              </h3>
              
              <div className="space-y-4">
                {productPerformance.map((product, _index) => (
                  <div key={product.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{product.image}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{product.name}</h4>
                          <span className="text-sm text-gray-600">{product.category}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{formatCurrency(product.revenue)}</div>
                        <div className="text-sm text-gray-600">{product.sales} sold</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Growth</div>
                        <div className={`font-semibold ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          +{product.growth}%
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Margin</div>
                        <div className="font-semibold">{product.margin}%</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Stock</div>
                        <div className={`font-semibold ${product.inventory < 50 ? 'text-red-600' : 'text-green-600'}`}>
                          {product.inventory}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Rating</div>
                        <div className="font-semibold text-yellow-600">★{product.rating}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Marketing Channel Performance */}
          <FadeIn delay={0.5}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <PieChart className="w-5 h-5 text-indigo-600 mr-2" />
                Marketing Channel Performance
              </h3>
              
              <div className="space-y-4">
                {channelPerformance.map((channel, _index) => (
                  <div key={channel.channel} className={`p-4 bg-${channel.color}-50 rounded-lg border border-${channel.color}-100`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{channel.channel}</h4>
                      <div className="text-right">
                        <div className={`font-semibold text-${channel.color}-600`}>
                          {formatCurrency(channel.revenue)}
                        </div>
                        <div className="text-sm text-gray-600">{channel.orders} orders</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3 text-sm">
                      <div>
                        <div className="text-gray-600">Conv Rate</div>
                        <div className="font-semibold">{channel.conversion}%</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Growth</div>
                        <div className="font-semibold text-green-600">+{channel.growth}%</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Cost</div>
                        <div className="font-semibold">{formatCurrency(channel.cost)}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">ROI</div>
                        <div className={`font-semibold ${channel.roi > 200 ? 'text-green-600' : 'text-yellow-600'}`}>
                          {channel.roi}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">
                    {formatCurrency(channelPerformance.reduce((sum, c) => sum + c.revenue, 0))}
                  </div>
                  <div className="text-sm text-gray-700">Total Channel Revenue</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {channelPerformance.reduce((sum, c) => sum + c.orders, 0)} total orders
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default RealTimeSalesAnalytics;