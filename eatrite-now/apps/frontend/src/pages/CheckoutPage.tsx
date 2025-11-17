import React, { useState } from 'react'
import { ArrowLeft, CreditCard, Lock, MapPin, User, Shield } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import AddressAutocompleteSimple from '../components/AddressAutocompleteSimple'

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  })

  const subtotal = totalPrice
  const deliveryFee = subtotal > 50 ? 0 : 4.99
  const tax = subtotal * 0.08
  const finalTotal = subtotal + deliveryFee + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddressChange = (address: string) => {
    setFormData(prev => ({
      ...prev,
      address,
    }))
  }

  const handleAddressSelect = (components: any) => {
    setFormData(prev => ({
      ...prev,
      address: `${components.streetNumber} ${components.route}`.trim(),
      city: components.city,
      state: components.state,
      zipCode: components.zipCode,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Prepare order data
      const orderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image_url: item.image_url,
          description: item.description,
        })),
        subtotal,
        deliveryFee,
        tax,
        totalAmount: finalTotal,
        cardName: formData.cardName,
      }

      // Save order to backend
      const response = await fetch('http://localhost:4005/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error('Failed to save order')
      }

      const result = await response.json()
      console.log('Order saved successfully:', result)

      // Simulate payment processing delay
      setTimeout(() => {
        setIsProcessing(false)
        setOrderComplete(true)
        clearCart()
      }, 1500)
    } catch (error) {
      console.error('Error processing order:', error)
      setIsProcessing(false)
      alert('There was an error processing your order. Please try again.')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F2E8] to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto bg-[#F5EEDC] rounded-full flex items-center justify-center mb-6">
            <CreditCard className="w-10 h-10 text-[#D4B46A]" />
          </div>
          <h2
            className="text-2xl font-bold text-[#0F2B1E] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Your Cart is Empty
          </h2>
          <p
            className="text-[#0A2418]/60 mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Add some delicious meals to your cart before checkout.
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] text-[#F5F2E8] px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </button>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F2E8] to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-green-600" />
          </div>
          <h2
            className="text-3xl font-bold text-[#0F2B1E] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Order Confirmed!
          </h2>
          <p
            className="text-[#0A2418]/60 mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Thank you for your order. You'll receive a confirmation email
            shortly with tracking details.
          </p>
          <div className="bg-[#F5EEDC] rounded-lg p-4 mb-6">
            <p className="text-sm text-[#0A2418]/80">
              Order #EAT-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <p className="text-lg font-semibold text-[#0F2B1E]">
              Total: {formatPrice(finalTotal)}
            </p>
          </div>
          <button
            onClick={() => navigate('/menu')}
            className="bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] text-[#F5F2E8] px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F2E8] to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/menu')}
            className="p-2 rounded-full hover:bg-[#F5EEDC] transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#0F2B1E]" />
          </button>
          <h1
            className="text-3xl font-bold text-[#0F2B1E]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Secure Checkout
          </h1>
          <div className="flex items-center gap-2 ml-auto text-sm text-[#0A2418]/60">
            <Lock className="w-4 h-4" />
            <span>SSL Secured</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D4B46A]/20">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-6 h-6 text-[#D4B46A]" />
                  <h3
                    className="text-xl font-semibold text-[#0F2B1E]"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Contact Information
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0A2418] mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0A2418] mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0A2418] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0A2418] mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D4B46A]/20">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-[#D4B46A]" />
                  <h3
                    className="text-xl font-semibold text-[#0F2B1E]"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Delivery Address
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0A2418] mb-2">
                      Street Address
                    </label>
                    <AddressAutocompleteSimple
                      value={formData.address}
                      onChange={handleAddressChange}
                      onAddressSelect={handleAddressSelect}
                      placeholder="Start typing your address..."
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0A2418] mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0A2418] mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0A2418] mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D4B46A]/20">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-[#D4B46A]" />
                  <h3
                    className="text-xl font-semibold text-[#0F2B1E]"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Payment Information
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0A2418] mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0A2418] mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0A2418] mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0A2418] mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] text-[#F5F2E8] font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 ${
                  isProcessing
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:shadow-xl hover:scale-105'
                }`}
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#F5F2E8]"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-6 h-6" />
                    Complete Order - {formatPrice(finalTotal)}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D4B46A]/20 h-fit">
            <h3
              className="text-xl font-semibold text-[#0F2B1E] mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Order Summary
            </h3>

            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#0F2B1E] text-sm">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#0A2418]/60">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#0F2B1E]">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#D4B46A]/30 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#0A2418]/60">Subtotal:</span>
                <span className="text-[#0F2B1E]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#0A2418]/60">Delivery:</span>
                <span className="text-[#0F2B1E]">
                  {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#0A2418]/60">Tax:</span>
                <span className="text-[#0F2B1E]">{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-[#D4B46A]/30 pt-2 mt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-[#0F2B1E]">Total:</span>
                  <span className="text-[#0F2B1E]">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>
            </div>

            {deliveryFee === 0 && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700 font-medium">
                  🎉 Free delivery on orders over $50!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
