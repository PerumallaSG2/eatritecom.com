import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard, Gift, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isClearing, setIsClearing] = useState(false);

  if (!isOpen) return null;

  const handleClearCart = async () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
    }, 300);
  };

  const subtotal = totalPrice;
  const deliveryFee = items.length > 0 ? (subtotal > 50 ? 0 : 4.99) : 0;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + deliveryFee + tax;

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-[#0F2B1E]/80 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className={`inline-block align-bottom bg-gradient-to-b from-[#F5F2E8] to-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all duration-300 sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] px-6 pt-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-8 h-8 text-[#D4B46A]" />
                <div>
                  <h3 
                    className="text-2xl font-bold text-[#F5F2E8]"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Your Cart
                  </h3>
                  <p className="text-[#D4B46A] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {items.length} {items.length === 1 ? 'delicious meal' : 'delicious meals'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#F5F2E8] hover:bg-[#D4B46A]/20 transition-all duration-200 hover:scale-110"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Cart Content */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto bg-[#F5EEDC] rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-[#D4B46A]" />
                </div>
                <p 
                  className="text-xl font-semibold text-[#0F2B1E] mb-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Your cart is empty
                </p>
                <p className="text-[#0A2418]/60 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Discover our chef-crafted meals and start your culinary journey!
                </p>
                <button 
                  onClick={onClose}
                  className="bg-[#D4B46A] hover:bg-[#D4B46A]/90 text-[#0F2B1E] font-bold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`flex items-start space-x-4 p-5 bg-white rounded-xl shadow-lg border border-[#D4B46A]/20 hover:shadow-xl transition-all duration-300 ${isClearing ? 'opacity-50 scale-95' : ''}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 
                        className="font-bold text-[#0F2B1E] text-lg mb-1 truncate"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {item.name}
                      </h4>
                      <p 
                        className="text-sm text-[#0A2418]/70 mb-3 line-clamp-2"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span 
                          className="text-lg font-bold text-[#FF6B35]"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <div className="flex items-center space-x-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center bg-[#F5EEDC] rounded-full p-1">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="p-2 rounded-full bg-white shadow-sm hover:bg-[#D4B46A]/10 transition-all duration-200 hover:scale-110"
                            >
                              <Minus className="h-3 w-3 text-[#0F2B1E]" />
                            </button>
                            <span 
                              className="px-4 py-2 font-bold text-[#0F2B1E] min-w-[2rem] text-center"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 rounded-full bg-white shadow-sm hover:bg-[#D4B46A]/10 transition-all duration-200 hover:scale-110"
                            >
                              <Plus className="h-3 w-3 text-[#0F2B1E]" />
                            </button>
                          </div>
                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 rounded-full text-red-500 hover:bg-red-50 transition-all duration-200 hover:scale-110"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Order Summary */}
                <div className="bg-gradient-to-r from-[#F5EEDC] to-[#F5F2E8] rounded-xl p-6 mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#0F2B1E]" style={{ fontFamily: 'Inter, sans-serif' }}>Subtotal:</span>
                    <span className="font-bold text-[#0F2B1E]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#0F2B1E]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Delivery: {subtotal > 50 && <span className="text-xs text-green-600">(Free over $50!)</span>}
                    </span>
                    <span className={`font-bold ${deliveryFee === 0 ? 'text-green-600 line-through' : 'text-[#0F2B1E]'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#0F2B1E]" style={{ fontFamily: 'Inter, sans-serif' }}>Tax:</span>
                    <span className="font-bold text-[#0F2B1E]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-[#D4B46A]/30 pt-3">
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-xl font-bold text-[#0F2B1E]"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        Total:
                      </span>
                      <span 
                        className="text-2xl font-bold text-[#FF6B35]"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="bg-gradient-to-r from-[#F5EEDC] to-[#F5F2E8] px-6 py-4 border-t border-[#D4B46A]/30">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear your cart?')) {
                      handleClearCart();
                    }
                  }}
                  className="flex-1 bg-white hover:bg-gray-50 text-[#0F2B1E] font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 border border-[#D4B46A]/30 shadow-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => {
                    alert('🎉 Proceeding to secure checkout! (Feature coming soon)');
                  }}
                  className="flex-1 bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] hover:from-[#0A2418] hover:to-[#0F2B1E] text-[#F5F2E8] font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-3"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  <CreditCard className="w-5 h-5" />
                  Secure Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Promo Code Section */}
              <div className="mt-4 flex items-center gap-3">
                <Gift className="w-5 h-5 text-[#D4B46A]" />
                <input
                  type="text"
                  placeholder="Have a promo code?"
                  className="flex-1 px-4 py-2 border border-[#D4B46A]/30 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 text-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <button className="bg-[#D4B46A] hover:bg-[#D4B46A]/90 text-[#0F2B1E] font-semibold px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105">
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;