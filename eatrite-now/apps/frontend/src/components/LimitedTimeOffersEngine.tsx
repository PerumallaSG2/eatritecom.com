import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Flame, 
  Star, 
  Gift,
  TrendingUp,
  AlertCircle,
  ShoppingCart,
  Eye,
  Users,
  Calendar,
  Award,
  Sparkles,
  CheckCircle,
  Save,
  Tag,
  Zap,
  Crown
} from 'lucide-react';
import { FadeIn, StaggeredAnimation, Floating } from './AnimationComponents';

interface LimitedOffer {
  id: string;
  title: string;
  description: string;
  type: 'flash_sale' | 'bundle_deal' | 'first_time' | 'loyalty_reward' | 'seasonal';
  originalPrice: number;
  salePrice: number;
  discountPercentage: number;
  startTime: Date;
  endTime: Date;
  timeRemaining: number;
  maxRedemptions: number;
  currentRedemptions: number;
  items: {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    quantity?: number;
  }[];
  urgencyFactors: {
    limitedQuantity: boolean;
    timeConstraint: boolean;
    exclusivity: boolean;
    popularDemand: boolean;
  };
  conditions: string[];
  image: string;
  category: string;
  popularityScore: number;
  conversionRate: number;
}

interface OfferMetrics {
  totalOffers: number;
  activeOffers: number;
  averageConversion: number;
  totalSavings: number;
  mostPopular: string;
  expiringToday: number;
}

interface CustomerBehavior {
  viewCount: number;
  cartAdditions: number;
  purchases: number;
  timeSpent: number;
  lastViewed: Date;
  interestLevel: 'high' | 'medium' | 'low';
}

const generateLimitedOffers = (): LimitedOffer[] => {
  const now = new Date();
  
  return [
    {
      id: 'flash-keto-bundle',
      title: 'Flash Sale: Keto Power Week',
      description: 'Complete keto meal plan for 7 days - everything you need to succeed',
      type: 'flash_sale',
      originalPrice: 127.95,
      salePrice: 89.95,
      discountPercentage: 30,
      startTime: new Date(now.getTime() - 2 * 60 * 60 * 1000), // Started 2 hours ago
      endTime: new Date(now.getTime() + 4 * 60 * 60 * 1000), // Ends in 4 hours
      timeRemaining: 4 * 60 * 60, // 4 hours in seconds
      maxRedemptions: 100,
      currentRedemptions: 73,
      items: [
        { id: 'keto-bowl-1', name: 'Keto Power Bowl', image: '🥗', price: 14.99, quantity: 3 },
        { id: 'salmon-plate', name: 'Grilled Salmon', image: '🐟', price: 18.99, quantity: 2 },
        { id: 'keto-dessert', name: 'Keto Chocolate Mousse', image: '🍫', price: 8.99, quantity: 2 },
        { id: 'keto-smoothie', name: 'Green Keto Smoothie', image: '🥤', price: 11.99, quantity: 7 }
      ],
      urgencyFactors: {
        limitedQuantity: true,
        timeConstraint: true,
        exclusivity: false,
        popularDemand: true
      },
      conditions: ['Minimum 7 items', 'Free delivery included', 'New customers get extra 5% off'],
      image: '🔥',
      category: 'Bundles',
      popularityScore: 94,
      conversionRate: 23.4
    },
    {
      id: 'new-customer-special',
      title: 'Welcome Deal: 50% Off First Order',
      description: 'Start your healthy journey with our best-selling meals at half price',
      type: 'first_time',
      originalPrice: 89.98,
      salePrice: 44.99,
      discountPercentage: 50,
      startTime: new Date(now.getTime() - 24 * 60 * 60 * 1000), // Started yesterday
      endTime: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // Ends in 3 days
      timeRemaining: 3 * 24 * 60 * 60, // 3 days in seconds
      maxRedemptions: 1000,
      currentRedemptions: 247,
      items: [
        { id: 'starter-pack-1', name: 'Protein Power Plate', image: '🍗', price: 15.99 },
        { id: 'starter-pack-2', name: 'Mediterranean Bowl', image: '🥙', price: 13.99 },
        { id: 'starter-pack-3', name: 'Vegan Delight', image: '🌿', price: 12.99 },
        { id: 'starter-pack-4', name: 'Asian Fusion Bowl', image: '🍜', price: 14.99 }
      ],
      urgencyFactors: {
        limitedQuantity: false,
        timeConstraint: true,
        exclusivity: true,
        popularDemand: false
      },
      conditions: ['First-time customers only', 'Minimum $40 order', 'Use code WELCOME50'],
      image: '🎉',
      category: 'Welcome',
      popularityScore: 87,
      conversionRate: 34.7
    },
    {
      id: 'loyalty-premium-weekend',
      title: 'VIP Weekend: Premium Selection 25% Off',
      description: 'Exclusive access to our chef\'s premium collection this weekend only',
      type: 'loyalty_reward',
      originalPrice: 159.96,
      salePrice: 119.97,
      discountPercentage: 25,
      startTime: new Date(now.getTime() - 6 * 60 * 60 * 1000), // Started 6 hours ago
      endTime: new Date(now.getTime() + 18 * 60 * 60 * 1000), // Ends in 18 hours
      timeRemaining: 18 * 60 * 60, // 18 hours in seconds
      maxRedemptions: 50,
      currentRedemptions: 31,
      items: [
        { id: 'premium-wagyu', name: 'Wagyu Beef Bowl', image: '🥩', price: 28.99 },
        { id: 'premium-lobster', name: 'Lobster Mac & Cheese', image: '🦞', price: 24.99 },
        { id: 'premium-truffle', name: 'Truffle Mushroom Risotto', image: '🍄', price: 22.99 },
        { id: 'premium-sashimi', name: 'Sashimi Grade Tuna', image: '🍣', price: 26.99 }
      ],
      urgencyFactors: {
        limitedQuantity: true,
        timeConstraint: true,
        exclusivity: true,
        popularDemand: true
      },
      conditions: ['VIP members only', 'Limited to 50 orders', 'Weekend delivery included'],
      image: '👑',
      category: 'Premium',
      popularityScore: 96,
      conversionRate: 41.2
    },
    {
      id: 'seasonal-winter-warmth',
      title: 'Winter Comfort: Hearty Meals 20% Off',
      description: 'Warm up with our selection of comfort foods perfect for cold weather',
      type: 'seasonal',
      originalPrice: 94.95,
      salePrice: 75.96,
      discountPercentage: 20,
      startTime: new Date(now.getTime() - 12 * 60 * 60 * 1000), // Started 12 hours ago
      endTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // Ends in 5 days
      timeRemaining: 5 * 24 * 60 * 60, // 5 days in seconds
      maxRedemptions: 200,
      currentRedemptions: 89,
      items: [
        { id: 'winter-soup', name: 'Hearty Chicken Soup', image: '🍲', price: 11.99 },
        { id: 'winter-stew', name: 'Beef Stew & Mash', image: '🥘', price: 16.99 },
        { id: 'winter-curry', name: 'Warming Coconut Curry', image: '🍛', price: 14.99 },
        { id: 'winter-chili', name: 'Spicy Turkey Chili', image: '🌶️', price: 13.99 }
      ],
      urgencyFactors: {
        limitedQuantity: false,
        timeConstraint: true,
        exclusivity: false,
        popularDemand: true
      },
      conditions: ['Perfect for cold weather', 'Free hot drink included', 'Reorder discount available'],
      image: '❄️',
      category: 'Seasonal',
      popularityScore: 78,
      conversionRate: 28.9
    }
  ];
};

const generateOfferMetrics = (offers: LimitedOffer[]): OfferMetrics => ({
  totalOffers: offers.length,
  activeOffers: offers.filter(o => o.timeRemaining > 0).length,
  averageConversion: offers.reduce((sum, o) => sum + o.conversionRate, 0) / offers.length,
  totalSavings: offers.reduce((sum, o) => sum + (o.originalPrice - o.salePrice), 0),
  mostPopular: offers.sort((a, b) => b.popularityScore - a.popularityScore)[0].title,
  expiringToday: offers.filter(o => o.timeRemaining <= 24 * 60 * 60).length
});

export const LimitedTimeOffersEngine: React.FC = () => {
  const [offers, setOffers] = useState<LimitedOffer[]>([]);
  const [metrics, setMetrics] = useState<OfferMetrics | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<LimitedOffer | null>(null);
  const [customerBehavior, setCustomerBehavior] = useState<CustomerBehavior>({
    viewCount: 0,
    cartAdditions: 0,
    purchases: 0,
    timeSpent: 0,
    lastViewed: new Date(),
    interestLevel: 'medium'
  });


  useEffect(() => {
    const generatedOffers = generateLimitedOffers();
    setOffers(generatedOffers);
    setMetrics(generateOfferMetrics(generatedOffers));
    setSelectedOffer(generatedOffers[0]);

    // Update time every second for countdown
    const timer = setInterval(() => {
      // Update time remaining for all offers
      setOffers(prevOffers => 
        prevOffers.map(offer => ({
          ...offer,
          timeRemaining: Math.max(0, Math.floor((offer.endTime.getTime() - new Date().getTime()) / 1000))
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeRemaining = (seconds: number): string => {
    if (seconds <= 0) return 'EXPIRED';
    
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = seconds % 60;
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else {
      return `${minutes}m ${secs}s`;
    }
  };

  const getUrgencyLevel = (offer: LimitedOffer): 'critical' | 'high' | 'medium' | 'low' => {
    const hoursRemaining = offer.timeRemaining / 3600;
    const redemptionPercentage = (offer.currentRedemptions / offer.maxRedemptions) * 100;
    
    if (hoursRemaining <= 2 || redemptionPercentage >= 90) return 'critical';
    if (hoursRemaining <= 6 || redemptionPercentage >= 75) return 'high';
    if (hoursRemaining <= 24 || redemptionPercentage >= 50) return 'medium';
    return 'low';
  };

  const getUrgencyColor = (urgency: string): string => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 border-red-300 text-red-700';
      case 'high': return 'bg-orange-100 border-orange-300 text-orange-700';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      case 'low': return 'bg-green-100 border-green-300 text-green-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const getOfferTypeIcon = (type: string) => {
    switch (type) {
      case 'flash_sale': return Flame;
      case 'bundle_deal': return Gift;
      case 'first_time': return Sparkles;
      case 'loyalty_reward': return Crown;
      case 'seasonal': return Calendar;
      default: return Tag;
    }
  };

  const claimOffer = (offerId: string) => {
    const offer = offers.find(o => o.id === offerId);
    if (!offer || offer.timeRemaining <= 0) return;

    // Update redemptions
    setOffers(prevOffers => 
      prevOffers.map(o => 
        o.id === offerId ? { ...o, currentRedemptions: o.currentRedemptions + 1 } : o
      )
    );

    // Track customer behavior
    setCustomerBehavior(prev => ({
      ...prev,
      cartAdditions: prev.cartAdditions + 1,
      purchases: prev.purchases + 1,
      interestLevel: 'high'
    }));

    console.log(`Claimed offer: ${offer.title}`);
  };

  const viewOffer = () => {
    setCustomerBehavior(prev => ({
      ...prev,
      viewCount: prev.viewCount + 1,
      lastViewed: new Date()
    }));
  };

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6">
        <FadeIn>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Flame className="w-7 h-7" />
                <h2 className="text-2xl font-bold">Limited-Time Offers</h2>
                <Zap className="w-6 h-6" />
              </div>
              <p className="text-red-100">
                Exclusive deals that won't last long - act fast to save big!
              </p>
            </div>
            
            {metrics && (
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold">{metrics.activeOffers}</div>
                  <div className="text-sm text-red-100">Active Offers</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold">{metrics.expiringToday}</div>
                  <div className="text-sm text-red-100">Ending Today</div>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>

      <div className="p-6">
        {/* Metrics Dashboard */}
        {metrics && (
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-red-500">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-gray-700">Avg Conversion</span>
                </div>
                <div className="text-2xl font-bold text-red-600">{metrics.averageConversion.toFixed(1)}%</div>
              </div>
              
              <div className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-green-500">
                <div className="flex items-center space-x-2 mb-2">
                  <Save className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-700">Total Savings</span>
                </div>
                <div className="text-2xl font-bold text-green-600">${metrics.totalSavings.toFixed(0)}</div>
              </div>
              
              <div className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-purple-500">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-700">Most Popular</span>
                </div>
                <div className="text-sm font-bold text-purple-600">{metrics.mostPopular.substring(0, 20)}...</div>
              </div>
              
              <div className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-blue-500">
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-700">Customer Views</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{customerBehavior.viewCount}</div>
              </div>
            </div>
          </FadeIn>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Offers List */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.2}>
              <div className="space-y-4">
                <StaggeredAnimation>
                  {offers.map((offer) => {
                    const urgency = getUrgencyLevel(offer);
                    const IconComponent = getOfferTypeIcon(offer.type);
                    const isExpired = offer.timeRemaining <= 0;
                    
                    return (
                      <div
                        key={offer.id}
                        onClick={() => {
                          setSelectedOffer(offer);
                          viewOffer();
                        }}
                        className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all cursor-pointer ${
                          selectedOffer?.id === offer.id 
                            ? 'border-red-300 shadow-xl' 
                            : 'border-transparent hover:border-red-200 hover:shadow-xl'
                        } ${isExpired ? 'opacity-60' : ''}`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <div className={`w-16 h-16 bg-gradient-to-r ${
                              offer.type === 'flash_sale' ? 'from-red-500 to-orange-500' :
                              offer.type === 'loyalty_reward' ? 'from-purple-500 to-pink-500' :
                              offer.type === 'first_time' ? 'from-green-500 to-emerald-500' :
                              offer.type === 'seasonal' ? 'from-blue-500 to-cyan-500' :
                              'from-gray-500 to-gray-600'
                            } rounded-2xl flex items-center justify-center text-white`}>
                              <IconComponent className="w-8 h-8" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{offer.title}</h3>
                                <span className="text-2xl">{offer.image}</span>
                              </div>
                              <p className="text-gray-600 mb-3">{offer.description}</p>
                              
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="flex items-center space-x-2">
                                  <span className="text-2xl font-bold text-red-600">${offer.salePrice.toFixed(2)}</span>
                                  <span className="text-lg text-gray-500 line-through">${offer.originalPrice.toFixed(2)}</span>
                                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-semibold">
                                    {offer.discountPercentage}% OFF
                                  </span>
                                </div>
                                
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <Users className="w-4 h-4" />
                                  <span>{offer.currentRedemptions}/{offer.maxRedemptions} claimed</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className={`px-3 py-2 rounded-lg border-2 ${getUrgencyColor(urgency)} mb-3`}>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span className="font-bold">
                                  {isExpired ? 'EXPIRED' : formatTimeRemaining(offer.timeRemaining)}
                                </span>
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-600">
                              <div className="flex items-center space-x-1 mb-1">
                                <TrendingUp className="w-3 h-3" />
                                <span>{offer.conversionRate}% conversion</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-500" />
                                <span>{offer.popularityScore}% popularity</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Claimed</span>
                            <span>{Math.round((offer.currentRedemptions / offer.maxRedemptions) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-1000 ${
                                (offer.currentRedemptions / offer.maxRedemptions) >= 0.9 ? 'bg-red-500' :
                                (offer.currentRedemptions / offer.maxRedemptions) >= 0.7 ? 'bg-orange-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${(offer.currentRedemptions / offer.maxRedemptions) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {/* Urgency Indicators */}
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {offer.urgencyFactors.limitedQuantity && (
                              <span className="flex items-center space-x-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                                <AlertCircle className="w-3 h-3" />
                                <span>Limited Stock</span>
                              </span>
                            )}
                            {offer.urgencyFactors.exclusivity && (
                              <span className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                <Crown className="w-3 h-3" />
                                <span>Exclusive</span>
                              </span>
                            )}
                            {offer.urgencyFactors.popularDemand && (
                              <span className="flex items-center space-x-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
                                <TrendingUp className="w-3 h-3" />
                                <span>High Demand</span>
                              </span>
                            )}
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              claimOffer(offer.id);
                            }}
                            disabled={isExpired || offer.currentRedemptions >= offer.maxRedemptions}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                              isExpired || offer.currentRedemptions >= offer.maxRedemptions
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700'
                            }`}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>{isExpired ? 'Expired' : 'Claim Now'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </StaggeredAnimation>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar: Selected Offer Details */}
          <div>
            {selectedOffer && (
              <FadeIn delay={0.3}>
                <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Gift className="w-5 h-5 text-red-600 mr-2" />
                    Offer Details
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Offer Info */}
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-bold text-red-700 mb-2">{selectedOffer.title}</h4>
                      <p className="text-sm text-red-600 mb-3">{selectedOffer.description}</p>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Original Price:</span>
                          <div className="font-semibold line-through">${selectedOffer.originalPrice.toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Sale Price:</span>
                          <div className="font-semibold text-red-600">${selectedOffer.salePrice.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Items Included */}
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Items Included</h5>
                      <div className="space-y-2">
                        {selectedOffer.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                            <span className="text-lg">{item.image}</span>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{item.name}</div>
                              {item.quantity && (
                                <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                              )}
                            </div>
                            <div className="text-sm font-semibold text-gray-700">${item.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Conditions */}
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h5>
                      <div className="space-y-1">
                        {selectedOffer.conditions.map((condition, index) => (
                          <div key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Countdown Timer */}
                    {selectedOffer.timeRemaining > 0 && (
                      <Floating>
                        <div className="p-4 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg border border-red-200">
                          <div className="text-center">
                            <div className="text-sm text-red-600 font-semibold mb-1">Time Remaining</div>
                            <div className="text-2xl font-bold text-red-700">
                              {formatTimeRemaining(selectedOffer.timeRemaining)}
                            </div>
                            <div className="text-xs text-red-600 mt-1">Don't miss out!</div>
                          </div>
                        </div>
                      </Floating>
                    )}
                    
                    {/* Action Button */}
                    <button
                      onClick={() => claimOffer(selectedOffer.id)}
                      disabled={selectedOffer.timeRemaining <= 0 || selectedOffer.currentRedemptions >= selectedOffer.maxRedemptions}
                      className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                        selectedOffer.timeRemaining <= 0 || selectedOffer.currentRedemptions >= selectedOffer.maxRedemptions
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700'
                      }`}
                    >
                      {selectedOffer.timeRemaining <= 0 ? 'Offer Expired' : 
                       selectedOffer.currentRedemptions >= selectedOffer.maxRedemptions ? 'Sold Out' :
                       'Claim This Offer'}
                    </button>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitedTimeOffersEngine;