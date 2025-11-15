import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const MobileCartBar: React.FC = () => {
  const { items, totalItems, totalPrice, updateQuantity } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Show bar when items are added to cart
  useEffect(() => {
    setIsVisible(totalItems > 0);
  }, [totalItems]);

  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  if (!isVisible || !isMobile || totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-green-600 shadow-2xl z-40 transform transition-transform duration-300">
      {/* Quick Items Preview - Swipeable */}
      <div className="px-4 py-2 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-3 pb-2">
          {items.map((item) => (
            <div 
              key={item.id}
              className={`flex-shrink-0 flex items-center space-x-2 p-2 rounded-lg border transition-all duration-200 ${
                selectedItems.includes(item.id) 
                  ? 'border-green-600 bg-green-50' 
                  : 'border-gray-200 bg-white'
              }`}
              onClick={() => toggleItemSelection(item.id)}
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-10 h-10 object-cover rounded-md"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/40x40/206B19/FFFFFF?text=🍽️`;
                }}
              />
              <div className="min-w-0">
                <div className="text-xs font-semibold text-gray-900 truncate w-20">
                  {item.name}
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(item.id, item.quantity - 1);
                    }}
                    className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <Minus className="w-3 h-3 text-gray-600" />
                  </button>
                  <span className="text-xs font-bold min-w-[1rem] text-center">{item.quantity}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(item.id, item.quantity + 1);
                    }}
                    className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <Plus className="w-3 h-3 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Action Bar */}
      <div className="px-4 py-3 bg-green-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-700 rounded-full">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">
                {totalItems} item{totalItems !== 1 ? 's' : ''}
              </div>
              <div className="text-xs text-green-100">
                Swipe up for details
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold">{formatPrice(totalPrice)}</div>
            <div className="text-xs text-green-100">Total</div>
          </div>

          <button
            className="bg-white text-green-600 px-6 py-2 rounded-full font-bold text-sm hover:bg-green-50 transition-colors active:scale-95 transform"
            style={{ fontFamily: 'source-sans-pro, sans-serif' }}
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Swipe Indicator */}
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default MobileCartBar;