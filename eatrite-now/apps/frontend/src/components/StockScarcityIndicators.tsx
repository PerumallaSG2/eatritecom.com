import React, { useState, useEffect } from 'react'
import {
  AlertTriangle,
  Package,
  Eye,
  TrendingUp,
  ShoppingCart,
  Star,
  Flame,
  CheckCircle,
  AlertCircle,
  Info,
  Activity,
  Badge,
  Crown,
  Sparkles,
  Bell,
} from 'lucide-react'
import { FadeIn, StaggeredAnimation, Floating } from './AnimationComponents'

interface StockItem {
  id: string
  name: string
  image: string
  category: string
  price: number
  originalPrice?: number
  currentStock: number
  totalStock: number
  stockLevel: 'critical' | 'low' | 'medium' | 'high'
  lastRestocked: Date
  nextRestock?: Date
  demandTrend: 'surging' | 'increasing' | 'stable' | 'decreasing'
  popularityScore: number
  viewsLast24h: number
  addedToCartLast24h: number
  purchasesLast24h: number
  avgRating: number
  totalReviews: number
  tags: string[]
  isLimitedEdition: boolean
  isTrending: boolean
  isNewArrival: boolean
}

interface ScarcityAlert {
  id: string
  type:
    | 'low_stock'
    | 'high_demand'
    | 'last_chance'
    | 'selling_fast'
    | 'back_soon'
  severity: 'urgent' | 'warning' | 'info'
  message: string
  action: string
  timeframe: string
  itemId: string
}

interface PurchaseActivity {
  id: string
  customerName: string
  location: string
  item: string
  quantity: number
  timeAgo: string
  isVerified: boolean
}

const generateStockItems = (): StockItem[] => [
  {
    id: 'keto-power-bowl',
    name: 'Keto Power Bowl',
    image: '🥗',
    category: 'Bowls',
    price: 14.99,
    originalPrice: 16.99,
    currentStock: 3,
    totalStock: 100,
    stockLevel: 'critical',
    lastRestocked: new Date(2024, 11, 18),
    nextRestock: new Date(2024, 11, 25),
    demandTrend: 'surging',
    popularityScore: 98,
    viewsLast24h: 2847,
    addedToCartLast24h: 156,
    purchasesLast24h: 97,
    avgRating: 4.9,
    totalReviews: 1247,
    tags: ['Bestseller', 'High Protein', 'Keto Certified'],
    isLimitedEdition: false,
    isTrending: true,
    isNewArrival: false,
  },
  {
    id: 'premium-wagyu-bowl',
    name: 'Premium Wagyu Beef Bowl',
    image: '🥩',
    category: 'Premium',
    price: 28.99,
    currentStock: 7,
    totalStock: 25,
    stockLevel: 'low',
    lastRestocked: new Date(2024, 11, 20),
    demandTrend: 'increasing',
    popularityScore: 94,
    viewsLast24h: 1234,
    addedToCartLast24h: 89,
    purchasesLast24h: 18,
    avgRating: 4.8,
    totalReviews: 423,
    tags: ['Premium', 'Limited Edition', "Chef's Special"],
    isLimitedEdition: true,
    isTrending: true,
    isNewArrival: false,
  },
  {
    id: 'seasonal-pumpkin-soup',
    name: 'Seasonal Pumpkin Bisque',
    image: '🎃',
    category: 'Seasonal',
    price: 11.99,
    currentStock: 23,
    totalStock: 150,
    stockLevel: 'medium',
    lastRestocked: new Date(2024, 11, 19),
    nextRestock: new Date(2024, 11, 30),
    demandTrend: 'stable',
    popularityScore: 87,
    viewsLast24h: 892,
    addedToCartLast24h: 67,
    purchasesLast24h: 34,
    avgRating: 4.6,
    totalReviews: 312,
    tags: ['Seasonal', 'Limited Time', 'Comfort Food'],
    isLimitedEdition: false,
    isTrending: false,
    isNewArrival: false,
  },
  {
    id: 'new-mediterranean-wrap',
    name: 'Mediterranean Power Wrap',
    image: '🫔',
    category: 'Wraps',
    price: 13.99,
    currentStock: 45,
    totalStock: 80,
    stockLevel: 'medium',
    lastRestocked: new Date(2024, 11, 21),
    demandTrend: 'increasing',
    popularityScore: 91,
    viewsLast24h: 1567,
    addedToCartLast24h: 234,
    purchasesLast24h: 89,
    avgRating: 4.7,
    totalReviews: 156,
    tags: ['New Arrival', 'Mediterranean', 'Whole Grain'],
    isLimitedEdition: false,
    isTrending: true,
    isNewArrival: true,
  },
  {
    id: 'protein-salmon-plate',
    name: 'Wild Salmon Plate',
    image: '🐟',
    category: 'Seafood',
    price: 18.99,
    currentStock: 67,
    totalStock: 120,
    stockLevel: 'medium',
    lastRestocked: new Date(2024, 11, 17),
    nextRestock: new Date(2024, 11, 24),
    demandTrend: 'stable',
    popularityScore: 89,
    viewsLast24h: 743,
    addedToCartLast24h: 45,
    purchasesLast24h: 23,
    avgRating: 4.8,
    totalReviews: 892,
    tags: ['High Protein', 'Wild Caught', 'Heart Healthy'],
    isLimitedEdition: false,
    isTrending: false,
    isNewArrival: false,
  },
]

const generateScarcityAlerts = (): ScarcityAlert[] => [
  {
    id: 'alert-1',
    type: 'last_chance',
    severity: 'urgent',
    message: 'Only 3 Keto Power Bowls left!',
    action: "Order now before they're gone",
    timeframe: 'Usually sells out within 2 hours',
    itemId: 'keto-power-bowl',
  },
  {
    id: 'alert-2',
    type: 'selling_fast',
    severity: 'warning',
    message: 'Premium Wagyu Bowl selling fast',
    action: '7 left in stock - high demand',
    timeframe: "Limited edition - won't be restocked",
    itemId: 'premium-wagyu-bowl',
  },
  {
    id: 'alert-3',
    type: 'high_demand',
    severity: 'info',
    message: 'Mediterranean Wrap gaining popularity',
    action: '89 people ordered in last 24h',
    timeframe: 'New arrival trending up',
    itemId: 'new-mediterranean-wrap',
  },
]

const generatePurchaseActivity = (): PurchaseActivity[] => [
  {
    id: 'purchase-1',
    customerName: 'Sarah M.',
    location: 'San Francisco',
    item: 'Keto Power Bowl',
    quantity: 2,
    timeAgo: '3 minutes ago',
    isVerified: true,
  },
  {
    id: 'purchase-2',
    customerName: 'Mike T.',
    location: 'Los Angeles',
    item: 'Premium Wagyu Bowl',
    quantity: 1,
    timeAgo: '7 minutes ago',
    isVerified: true,
  },
  {
    id: 'purchase-3',
    customerName: 'Lisa K.',
    location: 'Seattle',
    item: 'Mediterranean Wrap',
    quantity: 3,
    timeAgo: '12 minutes ago',
    isVerified: true,
  },
  {
    id: 'purchase-4',
    customerName: 'David R.',
    location: 'Portland',
    item: 'Keto Power Bowl',
    quantity: 1,
    timeAgo: '18 minutes ago',
    isVerified: true,
  },
  {
    id: 'purchase-5',
    customerName: 'Emma P.',
    location: 'Denver',
    item: 'Wild Salmon Plate',
    quantity: 2,
    timeAgo: '25 minutes ago',
    isVerified: true,
  },
]

export const StockScarcityIndicators: React.FC = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([])
  const [scarcityAlerts, setScarcityAlerts] = useState<ScarcityAlert[]>([])
  const [purchaseActivity, setPurchaseActivity] = useState<PurchaseActivity[]>(
    []
  )
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'stock' | 'demand' | 'popularity'>(
    'stock'
  )

  useEffect(() => {
    const items = generateStockItems()
    setStockItems(items)
    setScarcityAlerts(generateScarcityAlerts())
    setPurchaseActivity(generatePurchaseActivity())

    // Simulate real-time activity updates
    const activityTimer = setInterval(() => {
      setPurchaseActivity(prev => {
        const newActivity = {
          id: `purchase-${Date.now()}`,
          customerName: ['Alex S.', 'Jordan M.', 'Casey L.', 'Riley P.'][
            Math.floor(Math.random() * 4)
          ],
          location: ['New York', 'Chicago', 'Austin', 'Miami'][
            Math.floor(Math.random() * 4)
          ],
          item: items[Math.floor(Math.random() * items.length)].name,
          quantity: Math.floor(Math.random() * 3) + 1,
          timeAgo: 'Just now',
          isVerified: true,
        }
        return [newActivity, ...prev.slice(0, 9)]
      })
    }, 15000) // New activity every 15 seconds

    return () => clearInterval(activityTimer)
  }, [])

  const getStockLevelColor = (level: string): string => {
    switch (level) {
      case 'critical':
        return 'bg-red-500'
      case 'low':
        return 'bg-orange-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'high':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStockLevelText = (level: string): string => {
    switch (level) {
      case 'critical':
        return 'Critical'
      case 'low':
        return 'Low Stock'
      case 'medium':
        return 'In Stock'
      case 'high':
        return 'Well Stocked'
      default:
        return 'Unknown'
    }
  }

  const getDemandTrendIcon = (trend: string) => {
    switch (trend) {
      case 'surging':
        return <TrendingUp className="w-4 h-4 text-red-600" />
      case 'increasing':
        return <TrendingUp className="w-4 h-4 text-orange-600" />
      case 'stable':
        return <Activity className="w-4 h-4 text-blue-600" />
      case 'decreasing':
        return (
          <TrendingUp className="w-4 h-4 text-gray-600 transform rotate-180" />
        )
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getAlertSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'urgent':
        return 'bg-red-100 border-red-300 text-red-700'
      case 'warning':
        return 'bg-orange-100 border-orange-300 text-orange-700'
      case 'info':
        return 'bg-blue-100 border-blue-300 text-blue-700'
      default:
        return 'bg-gray-100 border-gray-300 text-gray-700'
    }
  }

  const filteredItems = stockItems
    .filter(
      item => selectedCategory === 'all' || item.category === selectedCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'stock':
          return a.currentStock / a.totalStock - b.currentStock / b.totalStock
        case 'demand':
          return b.purchasesLast24h - a.purchasesLast24h
        case 'popularity':
          return b.popularityScore - a.popularityScore
        default:
          return 0
      }
    })

  const categories = [
    'all',
    ...Array.from(new Set(stockItems.map(item => item.category))),
  ]

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-6">
        <FadeIn>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <AlertTriangle className="w-7 h-7" />
                <h2 className="text-2xl font-bold">
                  Stock Scarcity Indicators
                </h2>
                <Flame className="w-6 h-6" />
              </div>
              <p className="text-yellow-100">
                Real-time stock levels and demand insights to create purchase
                urgency
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold">
                  {
                    stockItems.filter(
                      item =>
                        item.stockLevel === 'critical' ||
                        item.stockLevel === 'low'
                    ).length
                  }
                </div>
                <div className="text-sm text-yellow-100">Low Stock Items</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold">
                  {
                    stockItems.filter(
                      item =>
                        item.demandTrend === 'surging' ||
                        item.demandTrend === 'increasing'
                    ).length
                  }
                </div>
                <div className="text-sm text-yellow-100">High Demand</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="p-6">
        {/* Scarcity Alerts Banner */}
        <FadeIn delay={0.1}>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="w-5 h-5 text-red-600 mr-2" />
              Live Scarcity Alerts
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StaggeredAnimation>
                {scarcityAlerts.map(alert => (
                  <Floating key={alert.id}>
                    <div
                      className={`p-4 rounded-lg border-2 ${getAlertSeverityColor(alert.severity)} animate-pulse`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        {alert.severity === 'urgent' && (
                          <AlertTriangle className="w-5 h-5" />
                        )}
                        {alert.severity === 'warning' && (
                          <AlertCircle className="w-5 h-5" />
                        )}
                        {alert.severity === 'info' && (
                          <Info className="w-5 h-5" />
                        )}
                        <span className="font-bold text-sm">
                          {alert.message}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{alert.action}</p>
                      <p className="text-xs">{alert.timeframe}</p>
                    </div>
                  </Floating>
                ))}
              </StaggeredAnimation>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Product Grid */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <FadeIn delay={0.2}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="stock">Stock Level (Low to High)</option>
                    <option value="demand">Demand (High to Low)</option>
                    <option value="popularity">Popularity (High to Low)</option>
                  </select>
                </div>

                <div className="text-sm text-gray-600">
                  Showing {filteredItems.length} items
                </div>
              </div>
            </FadeIn>

            {/* Product Grid */}
            <FadeIn delay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StaggeredAnimation>
                  {filteredItems.map(item => {
                    const stockPercentage =
                      (item.currentStock / item.totalStock) * 100

                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200"
                      >
                        {/* Item Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-3">
                            <span className="text-3xl">{item.image}</span>
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg flex items-center">
                                {item.name}
                                {item.isTrending && (
                                  <TrendingUp className="w-4 h-4 text-orange-500 ml-1" />
                                )}
                                {item.isNewArrival && (
                                  <Sparkles className="w-4 h-4 text-blue-500 ml-1" />
                                )}
                                {item.isLimitedEdition && (
                                  <Crown className="w-4 h-4 text-purple-500 ml-1" />
                                )}
                              </h4>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Star className="w-3 h-3 text-yellow-500" />
                                <span>
                                  {item.avgRating} ({item.totalReviews})
                                </span>
                                <span>•</span>
                                <span>{item.category}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="font-bold text-gray-900 text-lg">
                              ${item.price}
                            </div>
                            {item.originalPrice && (
                              <div className="text-sm text-gray-500 line-through">
                                ${item.originalPrice}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Stock Level Indicator */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Package className="w-4 h-4 text-gray-600" />
                              <span className="text-sm font-medium text-gray-700">
                                Stock Level
                              </span>
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                  item.stockLevel === 'critical'
                                    ? 'bg-red-100 text-red-700'
                                    : item.stockLevel === 'low'
                                      ? 'bg-orange-100 text-orange-700'
                                      : item.stockLevel === 'medium'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-green-100 text-green-700'
                                }`}
                              >
                                {getStockLevelText(item.stockLevel)}
                              </span>
                            </div>
                            <span className="text-sm font-semibold">
                              {item.currentStock}/{item.totalStock}
                            </span>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all duration-1000 ${getStockLevelColor(item.stockLevel)}`}
                              style={{ width: `${stockPercentage}%` }}
                            ></div>
                          </div>

                          {item.stockLevel === 'critical' && (
                            <div className="text-xs text-red-600 font-semibold mt-1 flex items-center">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Only {item.currentStock} left in stock!
                            </div>
                          )}
                        </div>

                        {/* Demand Metrics */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-center space-x-1 mb-1">
                              <Eye className="w-3 h-3 text-blue-600" />
                              <span className="text-xs text-gray-600">
                                Views
                              </span>
                            </div>
                            <div className="font-semibold text-blue-600">
                              {item.viewsLast24h.toLocaleString()}
                            </div>
                          </div>

                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-center space-x-1 mb-1">
                              <ShoppingCart className="w-3 h-3 text-orange-600" />
                              <span className="text-xs text-gray-600">
                                Added
                              </span>
                            </div>
                            <div className="font-semibold text-orange-600">
                              {item.addedToCartLast24h}
                            </div>
                          </div>

                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-center space-x-1 mb-1">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span className="text-xs text-gray-600">
                                Sold
                              </span>
                            </div>
                            <div className="font-semibold text-green-600">
                              {item.purchasesLast24h}
                            </div>
                          </div>
                        </div>

                        {/* Tags and Demand Trend */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex space-x-1">
                            {item.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center space-x-2">
                            {getDemandTrendIcon(item.demandTrend)}
                            <span className="text-xs font-semibold capitalize">
                              {item.demandTrend}
                            </span>
                          </div>
                        </div>

                        {/* Urgency Messages */}
                        {item.stockLevel === 'critical' && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center space-x-2 text-red-700">
                              <Flame className="w-4 h-4" />
                              <span className="font-semibold text-sm">
                                High Demand Alert!
                              </span>
                            </div>
                            <p className="text-xs text-red-600 mt-1">
                              This item is selling fast. Only{' '}
                              {item.currentStock} remaining.
                            </p>
                          </div>
                        )}

                        {item.demandTrend === 'surging' && (
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center space-x-2 text-orange-700">
                              <TrendingUp className="w-4 h-4" />
                              <span className="font-semibold text-sm">
                                Trending Now!
                              </span>
                            </div>
                            <p className="text-xs text-orange-600 mt-1">
                              {item.purchasesLast24h} people bought this in the
                              last 24 hours.
                            </p>
                          </div>
                        )}

                        {/* Action Button */}
                        <button
                          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                            item.stockLevel === 'critical'
                              ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700'
                              : 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:from-yellow-700 hover:to-orange-700'
                          }`}
                        >
                          {item.stockLevel === 'critical'
                            ? 'Order Now - Limited Stock!'
                            : 'Add to Cart'}
                        </button>
                      </div>
                    )
                  })}
                </StaggeredAnimation>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar: Live Activity Feed */}
          <div>
            <FadeIn delay={0.4}>
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Activity className="w-5 h-5 text-green-600 mr-2" />
                  Live Purchase Activity
                  <span className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></span>
                </h3>

                <div className="space-y-3">
                  {purchaseActivity.slice(0, 8).map(activity => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>

                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-semibold">
                            {activity.customerName}
                          </span>
                          {activity.isVerified && (
                            <Badge className="w-3 h-3 text-blue-500 inline ml-1" />
                          )}
                        </div>
                        <div className="text-xs text-gray-600">
                          {activity.location} • {activity.timeAgo}
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {activity.quantity}x {activity.item}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {purchaseActivity.filter(a =>
                        a.timeAgo.includes('minute')
                      ).length + 47}
                    </div>
                    <div className="text-sm text-gray-600">
                      Orders in last hour
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockScarcityIndicators
