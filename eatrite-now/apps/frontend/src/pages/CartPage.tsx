import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { CheckCircle, MapPin, Truck, Clock } from 'lucide-react'

const CartPage = () => {
  const {
    items: cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart()
  const [zipCode, setZipCode] = useState('')
  const [isValidZip, setIsValidZip] = useState(false)

  const handleZipCheck = (zip: string) => {
    setZipCode(zip)
    // Simple zip validation - you can make this more sophisticated
    const isValid = zip.length === 5 && /^\d+$/.test(zip)
    setIsValidZip(isValid)
  }

  const flexibleMenuMeals = [
    {
      id: 1,
      name: 'Grilled Salmon',
      image: 'https://foodish-api.com/images/rice/rice1.jpg',
      category: 'High Protein',
    },
    {
      id: 2,
      name: 'Chicken Teriyaki',
      image: 'https://foodish-api.com/images/biryani/biryani2.jpg',
      category: 'Balanced',
    },
    {
      id: 3,
      name: 'Beef Bowl',
      image: 'https://foodish-api.com/images/pasta/pasta3.jpg',
      category: 'Keto',
    },
    {
      id: 4,
      name: 'Veggie Curry',
      image: 'https://foodish-api.com/images/curry/curry4.jpg',
      category: 'Plant-Based',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-green-600">Select Plan</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">2</span>
                </div>
                <span className="font-medium text-gray-400">Register</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <span className="font-medium text-gray-400">Address</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">💳</span>
                </div>
                <span className="font-medium text-gray-400">Payment</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">🍽️</span>
                </div>
                <span className="font-medium text-gray-400">Pick Meals</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Delivery Area Check */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Let's check if we deliver to your area
            </h1>
            <p className="text-gray-600 mb-8">Please enter your zip code</p>

            <div className="relative max-w-md mx-auto mb-8">
              <input
                type="text"
                placeholder="45220"
                value={zipCode}
                onChange={e => handleZipCheck(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg text-lg text-center focus:border-green-500 focus:outline-none"
                maxLength={5}
              />
              {isValidZip && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              )}
            </div>

            {/* Decorative meal containers */}
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="flex gap-4">
                {/* Left side meals */}
                <div className="bg-black rounded-lg p-3 shadow-lg transform -rotate-12">
                  <img
                    src="https://foodish-api.com/images/biryani/biryani5.jpg"
                    alt="Meal container"
                    className="w-20 h-16 object-cover rounded"
                  />
                </div>
                <div className="bg-black rounded-lg p-3 shadow-lg transform rotate-6">
                  <img
                    src="https://foodish-api.com/images/pasta/pasta6.jpg"
                    alt="Meal container"
                    className="w-20 h-16 object-cover rounded"
                  />
                </div>
                <div className="bg-black rounded-lg p-3 shadow-lg transform -rotate-6">
                  <img
                    src="https://foodish-api.com/images/rice/rice7.jpg"
                    alt="Meal container"
                    className="w-20 h-16 object-cover rounded"
                  />
                </div>
              </div>

              <div className="mx-8">
                {/* Factor shipping box */}
                <div className="bg-gray-800 rounded-lg p-4 shadow-xl transform rotate-12">
                  <div className="text-white text-xs font-bold text-center">
                    EATRITE
                  </div>
                  <div className="text-white text-xs text-center mt-1">
                    FRESH MEALS
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {/* Right side meals */}
                <div className="bg-black rounded-lg p-3 shadow-lg transform rotate-12">
                  <img
                    src="https://foodish-api.com/images/burger/burger8.jpg"
                    alt="Meal container"
                    className="w-20 h-16 object-cover rounded"
                  />
                </div>
                <div className="bg-black rounded-lg p-3 shadow-lg transform -rotate-3">
                  <img
                    src="https://foodish-api.com/images/curry/curry9.jpg"
                    alt="Meal container"
                    className="w-20 h-16 object-cover rounded"
                  />
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="bg-black hover:bg-gray-800 text-white font-bold px-12 py-4 rounded-lg text-lg transition-colors duration-300 inline-block"
            >
              Continue
            </Link>
          </div>
        </div>

        {/* Flexible Menu Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            A flexible menu every week
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Simply select meals after checkout or{' '}
            <Link
              to="/menu"
              className="text-green-600 underline hover:text-green-700"
            >
              view our complete weekly menus
            </Link>
          </p>
        </div>

        {/* Sample Menu Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {flexibleMenuMeals.map(meal => (
            <div
              key={meal.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 mb-1">
                  {meal.category}
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{meal.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Current Cart Summary */}
        {cart.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Your Current Selection
            </h3>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-200 pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(0, item.quantity - 1)
                          )
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="text-lg font-bold">
                Total: ${totalPrice.toFixed(2)} ({totalItems} items)
              </div>
              <Link
                to="/checkout"
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg transition-colors duration-300"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}

        {/* Empty cart state */}
        {cart.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Clock className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Start by selecting some delicious meals from our menu
            </p>
            <Link
              to="/menu"
              className="bg-black hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-lg transition-colors duration-300"
            >
              Browse Menu
            </Link>
          </div>
        )}

        {/* Delivery Info */}
        <div className="bg-green-50 rounded-xl p-6 mt-8">
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-800 font-medium">
                Free delivery on orders $75+
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-800 font-medium">
                Delivered fresh, never frozen
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-800 font-medium">
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
