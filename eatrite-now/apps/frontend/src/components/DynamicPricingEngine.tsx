import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  Clock, 
  Users, 
  Zap,
  Target,
  Star,
  AlertCircle,
  Gift,
  Crown,
  Timer,
  Percent,
  ShoppingCart
} from 'lucide-react';
import { FadeIn, StaggeredAnimation } from './AnimationComponents';

interface PricingTier {
  name: string;
  discount: number;
  minOrders: number;
  color: string;
}

interface DynamicPrice {
  basePrice: number;
  currentPrice: number;
  discount: number;
  discountType: 'loyalty' | 'volume' | 'time' | 'seasonal' | 'personalized' | 'inventory';
  timeRemaining?: number;
  loyaltyTier?: PricingTier;
  volumeDiscount?: number;
  personalizedSaving?: number;
}

interface PriceInfluencer {
  factor: string;
  impact: number; // positive or negative percentage
  description: string;
  icon: React.ComponentType<any>;
  active: boolean;
}

interface CustomerData {
  totalOrders: number;
  lifetimeValue: number;
  averageOrderValue: number;
  lastOrderDate: Date;
  loyaltyTier: string;
  preferredCategories: string[];
  orderHistory: Array<{
    date: Date;
    amount: number;
    items: number;
  }>;
}

const pricingTiers: PricingTier[] = [
  { name: 'Bronze', discount: 5, minOrders: 5, color: 'orange' },
  { name: 'Silver', discount: 10, minOrders: 15, color: 'gray' },
  { name: 'Gold', discount: 15, minOrders: 30, color: 'yellow' },
  { name: 'Platinum', discount: 20, minOrders: 50, color: 'purple' }
];

const generateCustomerData = (): CustomerData => ({
  totalOrders: 23,
  lifetimeValue: 1847.50,
  averageOrderValue: 80.33,
  lastOrderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  loyaltyTier: 'Silver',
  preferredCategories: ['Mediterranean', 'High-Protein', 'Keto'],
  orderHistory: generateOrderHistory()
});

function generateOrderHistory() {
  const history = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    history.push({
      date,
      amount: Math.random() * 100 + 50,
      items: Math.floor(Math.random() * 8) + 4
    });
  }
  return history;
}

const priceInfluencers: PriceInfluencer[] = [
  {
    factor: 'Loyalty Tier',
    impact: -10,
    description: 'Silver member discount',
    icon: Crown,
    active: true
  },
  {
    factor: 'Volume Discount',
    impact: -8,
    description: '8+ meals in cart',
    icon: Users,
    active: true
  },
  {
    factor: 'Peak Time',
    impact: +5,
    description: 'High demand period',
    icon: Clock,
    active: true
  },
  {
    factor: 'Personalized Offer',
    impact: -15,
    description: 'Based on your preferences',
    icon: Target,
    active: true
  },
  {
    factor: 'Inventory Level',
    impact: -12,
    description: 'Limited stock clearance',
    icon: AlertCircle,
    active: false
  },
  {
    factor: 'Seasonal Promo',
    impact: -7,
    description: 'Fall harvest special',
    icon: Gift,
    active: true
  }
];

const mealPrices = [
  {
    id: 'meal-1',
    name: 'Mediterranean Salmon Bowl',
    category: 'Mediterranean',
    basePrice: 18.99,
    image: '🐟'
  },
  {
    id: 'meal-2',
    name: 'Keto Power Plate',
    category: 'Keto',
    basePrice: 16.49,
    image: '🥑'
  },
  {
    id: 'meal-3',
    name: 'Protein Muscle Builder',
    category: 'High-Protein',
    basePrice: 17.99,
    image: '🥩'
  },
  {
    id: 'meal-4',
    name: 'Greek Chicken Bowl',
    category: 'Mediterranean',
    basePrice: 15.99,
    image: '🍗'
  }
];

export const DynamicPricingEngine: React.FC = () => {
  const [customerData] = useState<CustomerData>(generateCustomerData());
  const [selectedMeal, setSelectedMeal] = useState(mealPrices[0]);
  const [dynamicPrice, setDynamicPrice] = useState<DynamicPrice | null>(null);
  const [cartQuantity, setCartQuantity] = useState(8);
  const [timeRemaining, setTimeRemaining] = useState(1847); // seconds
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  useEffect(() => {
    calculateDynamicPrice();
  }, [selectedMeal, cartQuantity, customerData]);

  useEffect(() => {
    // Countdown timer for time-sensitive offers
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateDynamicPrice = () => {
    let currentPrice = selectedMeal.basePrice;
    let totalDiscount = 0;
    
    // Loyalty discount
    const loyaltyTier = pricingTiers.find(t => t.name === customerData.loyaltyTier);
    if (loyaltyTier) {
      totalDiscount += loyaltyTier.discount;
    }
    
    // Volume discount
    const volumeDiscount = cartQuantity >= 8 ? 8 : cartQuantity >= 6 ? 5 : 0;
    totalDiscount += volumeDiscount;
    
    // Personalized discount based on category preference
    if (customerData.preferredCategories.includes(selectedMeal.category)) {
      totalDiscount += 15;
    }
    
    // Time-sensitive offer
    if (timeRemaining > 0) {
      totalDiscount += 7;
    }
    
    // Peak time adjustment
    const currentHour = new Date().getHours();
    if (currentHour >= 11 && currentHour <= 13) {
      totalDiscount -= 5; // Reduce discount during peak lunch
    }
    
    currentPrice = selectedMeal.basePrice * (1 - totalDiscount / 100);
    
    setDynamicPrice({
      basePrice: selectedMeal.basePrice,
      currentPrice: Math.max(currentPrice, selectedMeal.basePrice * 0.6), // Minimum 40% of base price
      discount: totalDiscount,
      discountType: 'personalized',
      timeRemaining,
      loyaltyTier,
      volumeDiscount,
      personalizedSaving: totalDiscount
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentTierProgress = () => {
    // const currentTier = pricingTiers.find(t => t.name === customerData.loyaltyTier);
    const nextTier = pricingTiers[pricingTiers.findIndex(t => t.name === customerData.loyaltyTier) + 1];
    
    if (!nextTier) return { progress: 100, ordersNeeded: 0 };
    
    const progress = (customerData.totalOrders / nextTier.minOrders) * 100;
    const ordersNeeded = Math.max(0, nextTier.minOrders - customerData.totalOrders);
    
    return { progress, ordersNeeded, nextTier };
  };

  const tierProgress = getCurrentTierProgress();

  if (!dynamicPrice) return null;

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8">
        <FadeIn>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <DollarSign className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Dynamic Pricing Engine</h2>
              <Zap className="w-8 h-8" />
            </div>
            <p className="text-green-100 text-lg">
              Personalized pricing based on your order history and preferences
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="p-8">
        {/* Customer Status */}
        <FadeIn delay={0.1}>
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">{customerData.loyaltyTier}</div>
                <div className="text-sm text-gray-600">Loyalty Tier</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">{customerData.totalOrders}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">${customerData.lifetimeValue.toFixed(0)}</div>
                <div className="text-sm text-gray-600">Lifetime Value</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">${customerData.averageOrderValue.toFixed(0)}</div>
                <div className="text-sm text-gray-600">Average Order</div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Meal Selection */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.2}>
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Select a Meal for Dynamic Pricing</h3>
              
              <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {mealPrices.map((meal) => (
                  <div
                    key={meal.id}
                    onClick={() => setSelectedMeal(meal)}
                    className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-all hover:shadow-xl ${
                      selectedMeal.id === meal.id ? 'ring-2 ring-green-500' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-3xl">{meal.image}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{meal.name}</h4>
                        <p className="text-sm text-gray-600">{meal.category}</p>
                      </div>
                      {customerData.preferredCategories.includes(meal.category) && (
                        <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                          Preferred
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          ${selectedMeal.id === meal.id ? dynamicPrice.currentPrice.toFixed(2) : meal.basePrice.toFixed(2)}
                        </div>
                        {selectedMeal.id === meal.id && dynamicPrice.discount > 0 && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 line-through">
                              ${meal.basePrice.toFixed(2)}
                            </span>
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                              -{dynamicPrice.discount.toFixed(0)}%
                            </span>
                          </div>
                        )}
                      </div>
                      <ShoppingCart className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                ))}
              </StaggeredAnimation>
            </FadeIn>

            {/* Volume Adjustment */}
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Cart Quantity (Volume Discounts Apply)</h4>
                
                <div className="flex items-center space-x-4 mb-4">
                  <button
                    onClick={() => setCartQuantity(Math.max(1, cartQuantity - 1))}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <div className="text-2xl font-bold text-gray-900 w-12 text-center">
                    {cartQuantity}
                  </div>
                  <button
                    onClick={() => setCartQuantity(cartQuantity + 1)}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {[6, 8, 12].map((qty) => (
                    <button
                      key={qty}
                      onClick={() => setCartQuantity(qty)}
                      className={`p-3 rounded-lg text-center transition-colors ${
                        cartQuantity === qty
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="font-semibold">{qty} meals</div>
                      <div className="text-xs">
                        {qty >= 8 ? '8% off' : qty >= 6 ? '5% off' : 'No discount'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Price Breakdown & Offers */}
          <div className="space-y-6">
            {/* Dynamic Price Display */}
            <FadeIn delay={0.4}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Price</h3>
                  <div className="text-4xl font-bold text-green-600">
                    ${dynamicPrice.currentPrice.toFixed(2)}
                  </div>
                  {dynamicPrice.discount > 0 && (
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <span className="text-lg text-gray-500 line-through">
                        ${dynamicPrice.basePrice.toFixed(2)}
                      </span>
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
                        Save {dynamicPrice.discount.toFixed(0)}%
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-4"
                >
                  {showPriceBreakdown ? 'Hide' : 'Show'} Price Breakdown
                </button>

                {showPriceBreakdown && (
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Base Price</span>
                      <span className="font-semibold">${dynamicPrice.basePrice.toFixed(2)}</span>
                    </div>
                    
                    {priceInfluencers.filter(p => p.active).map((influencer, index) => {
                      const IconComponent = influencer.icon;
                      return (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <div className="flex items-center space-x-2">
                            <IconComponent className={`w-4 h-4 ${
                              influencer.impact < 0 ? 'text-green-600' : 'text-red-600'
                            }`} />
                            <span className="text-gray-600">{influencer.factor}</span>
                          </div>
                          <span className={`font-semibold ${
                            influencer.impact < 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {influencer.impact > 0 ? '+' : ''}{influencer.impact}%
                          </span>
                        </div>
                      );
                    })}
                    
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                      <span>Final Price</span>
                      <span className="text-green-600">${dynamicPrice.currentPrice.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Time-Sensitive Offer */}
            {timeRemaining > 0 && (
              <FadeIn delay={0.5}>
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-6 shadow-lg">
                  <div className="text-center">
                    <Timer className="w-8 h-8 mx-auto mb-2" />
                    <h4 className="font-bold mb-2">Limited Time Offer!</h4>
                    <p className="text-sm mb-4">Extra 7% off expires in:</p>
                    <div className="text-2xl font-mono font-bold">
                      {formatTime(timeRemaining)}
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Loyalty Tier Progress */}
            <FadeIn delay={0.6}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Loyalty Tier Progress</h4>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Current: {customerData.loyaltyTier}</span>
                    {tierProgress.nextTier && (
                      <span className="text-gray-600">Next: {tierProgress.nextTier.name}</span>
                    )}
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(tierProgress.progress, 100)}%` }}
                    ></div>
                  </div>
                  
                  {tierProgress.nextTier && tierProgress.ordersNeeded > 0 && (
                    <p className="text-xs text-gray-600 mt-2">
                      {tierProgress.ordersNeeded} more orders to reach {tierProgress.nextTier.name} tier
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {pricingTiers.map((tier) => (
                    <div
                      key={tier.name}
                      className={`p-3 rounded-lg text-center ${
                        tier.name === customerData.loyaltyTier
                          ? `bg-${tier.color}-100 border-2 border-${tier.color}-300`
                          : 'bg-gray-50'
                      }`}
                    >
                      <div className={`font-semibold ${
                        tier.name === customerData.loyaltyTier ? `text-${tier.color}-700` : 'text-gray-600'
                      }`}>
                        {tier.name}
                      </div>
                      <div className="text-xs text-gray-600">{tier.discount}% off</div>
                      <div className="text-xs text-gray-500">{tier.minOrders}+ orders</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Personalization Insights */}
            <FadeIn delay={0.7}>
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Target className="w-5 h-5 text-blue-600 mr-2" />
                  Why These Prices?
                </h4>
                
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <Percent className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-gray-700">
                      You save more on Mediterranean meals (your favorite category)
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <TrendingDown className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-gray-700">
                      Volume discounts kick in at 6+ meals (you typically order 8)
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Crown className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <span className="text-gray-700">
                      Silver tier loyalty discount automatically applied
                    </span>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicPricingEngine;