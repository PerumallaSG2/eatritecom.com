import React, { useState, useEffect } from 'react'
import { ShoppingCart, Plus, Minus, Check, Info, Download } from 'lucide-react'

interface Meal {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  dietaryTags: string[]
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}

interface BulkOrderItem {
  mealId: string
  meal: Meal
  quantity: number
  employeeRequests: number
  notes?: string
}

interface CompanyInfo {
  id: string
  name: string
  tier: string
  employeeCount: number
  bulkDiscount: number
}

interface BulkOrderingProps {
  companyInfo: CompanyInfo
  onOrderComplete?: (orderId: string) => void
}

const CorporateBulkOrdering: React.FC<BulkOrderingProps> = ({
  companyInfo,
  onOrderComplete,
}) => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [bulkOrder, setBulkOrder] = useState<BulkOrderItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Mock meal data
  const mockMeals: Meal[] = [
    {
      id: 'meal_1',
      name: 'Grilled Chicken & Quinoa Bowl',
      description:
        'Herb-marinated chicken breast with quinoa, roasted vegetables, and tahini dressing',
      price: 14.99,
      imageUrl: '/api/placeholder/300/200',
      category: 'Protein Bowls',
      dietaryTags: ['High Protein', 'Gluten Free'],
      nutrition: { calories: 450, protein: 35, carbs: 40, fat: 18 },
    },
    {
      id: 'meal_2',
      name: 'Mediterranean Salmon',
      description:
        'Pan-seared salmon with lemon herbs, quinoa tabbouleh, and roasted vegetables',
      price: 17.99,
      imageUrl: '/api/placeholder/300/200',
      category: 'Seafood',
      dietaryTags: ['High Protein', 'Omega-3', 'Gluten Free'],
      nutrition: { calories: 520, protein: 42, carbs: 35, fat: 24 },
    },
    {
      id: 'meal_3',
      name: 'Plant-Based Buddha Bowl',
      description:
        'Roasted chickpeas, quinoa, avocado, and seasonal vegetables with turmeric tahini',
      price: 13.99,
      imageUrl: '/api/placeholder/300/200',
      category: 'Plant-Based',
      dietaryTags: ['Vegan', 'High Fiber', 'Gluten Free'],
      nutrition: { calories: 380, protein: 18, carbs: 52, fat: 14 },
    },
  ]

  useEffect(() => {
    setMeals(mockMeals)
  }, [])

  const categories = [
    'All',
    ...Array.from(new Set(meals.map(meal => meal.category))),
  ]

  const filteredMeals = meals.filter(meal => {
    const matchesCategory =
      selectedCategory === 'All' || meal.category === selectedCategory
    const matchesSearch =
      meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToBulkOrder = (meal: Meal, quantity: number = 10) => {
    setBulkOrder(prev => {
      const existing = prev.find(item => item.mealId === meal.id)
      if (existing) {
        return prev.map(item =>
          item.mealId === meal.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [
          ...prev,
          {
            mealId: meal.id,
            meal,
            quantity,
            employeeRequests: Math.floor(Math.random() * 15) + 5, // Mock employee requests
          },
        ]
      }
    })
  }

  const updateBulkOrderQuantity = (mealId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setBulkOrder(prev => prev.filter(item => item.mealId !== mealId))
    } else {
      setBulkOrder(prev =>
        prev.map(item =>
          item.mealId === mealId ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const totalItems = bulkOrder.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = bulkOrder.reduce(
    (sum, item) => sum + item.meal.price * item.quantity,
    0
  )
  const discount = subtotal * (companyInfo.bulkDiscount / 100)
  const total = subtotal - discount

  const handlePlaceOrder = async () => {
    if (!deliveryDate || bulkOrder.length === 0) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/corporate/bulk-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: companyInfo.id,
          items: bulkOrder,
          deliveryDate,
          specialInstructions,
          subtotal,
          discount,
          total,
        }),
      })

      if (response.ok) {
        const order = await response.json()
        setOrderPlaced(true)
        onOrderComplete?.(order.id)
      }
    } catch (error) {
      console.error('Error placing bulk order:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateOrderSummary = () => {
    const summaryData = {
      companyName: companyInfo.name,
      orderDate: new Date().toLocaleDateString(),
      deliveryDate: deliveryDate,
      items: bulkOrder,
      subtotal,
      discount,
      total,
      totalItems,
    }

    const blob = new Blob([JSON.stringify(summaryData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bulk-order-summary-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (orderPlaced) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-xl p-8 shadow-lg border border-green-200 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2
            className="text-2xl font-bold text-[#0F2B1E] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Bulk Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your bulk order for {totalItems} meals has been submitted. You'll
            receive confirmation and tracking details shortly.
          </p>
          <button
            onClick={() => setOrderPlaced(false)}
            className="bg-[#D4B46A] hover:bg-[#B8935A] text-[#0F2B1E] font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Place Another Order
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-3xl font-bold text-[#0F2B1E]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Corporate Bulk Ordering
            </h1>
            <p className="text-gray-600 mt-2">
              Order meals for your team with {companyInfo.bulkDiscount}% bulk
              discount
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Company</div>
            <div className="font-bold text-[#0F2B1E]">{companyInfo.name}</div>
            <div className="text-sm text-[#D4B46A]">
              {companyInfo.tier} • {companyInfo.employeeCount} employees
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meal Selection */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <div className="bg-white rounded-xl p-4 shadow-lg border border-[#D4B46A]/20">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search meals..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Meal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMeals.map(meal => {
              const inBulkOrder = bulkOrder.find(
                item => item.mealId === meal.id
              )

              return (
                <div
                  key={meal.id}
                  className="bg-white rounded-xl shadow-lg border border-[#D4B46A]/20 overflow-hidden"
                >
                  <img
                    src={meal.imageUrl}
                    alt={meal.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-[#0F2B1E]">{meal.name}</h3>
                      <div className="text-right">
                        <div className="font-bold text-[#0F2B1E]">
                          ${meal.price}
                        </div>
                        <div className="text-xs text-gray-500">per meal</div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-3">
                      {meal.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {meal.dietaryTags.map(tag => (
                        <span
                          key={tag}
                          className="bg-[#F5EEDC] text-[#0F2B1E] text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs text-gray-500 mb-3">
                      {meal.nutrition.calories} cal • {meal.nutrition.protein}g
                      protein
                    </div>

                    {inBulkOrder ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateBulkOrderQuantity(
                                meal.id,
                                inBulkOrder.quantity - 10
                              )
                            }
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-[#0F2B1E] min-w-[3rem] text-center">
                            {inBulkOrder.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateBulkOrderQuantity(
                                meal.id,
                                inBulkOrder.quantity + 10
                              )
                            }
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-sm text-green-600 font-medium">
                          Added to order
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToBulkOrder(meal)}
                        className="w-full bg-[#D4B46A] hover:bg-[#B8935A] text-[#0F2B1E] font-bold py-2 px-4 rounded-lg transition-colors"
                      >
                        Add 10 meals
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20 sticky top-6">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="w-5 h-5 text-[#D4B46A]" />
              <h3 className="font-bold text-[#0F2B1E]">Bulk Order Summary</h3>
            </div>

            {bulkOrder.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No items in bulk order
              </p>
            ) : (
              <div className="space-y-4">
                {bulkOrder.map(item => (
                  <div
                    key={item.mealId}
                    className="flex items-center gap-3 p-3 bg-[#F5EEDC] rounded-lg"
                  >
                    <img
                      src={item.meal.imageUrl}
                      alt={item.meal.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[#0F2B1E] text-sm">
                        {item.meal.name}
                      </h4>
                      <div className="text-xs text-gray-600">
                        {item.quantity} meals × ${item.meal.price}
                      </div>
                      <div className="text-xs text-[#D4B46A]">
                        {item.employeeRequests} employee requests
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#0F2B1E] text-sm">
                        ${(item.meal.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t border-[#D4B46A]/30 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Items:</span>
                    <span className="font-medium">{totalItems} meals</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Bulk Discount ({companyInfo.bulkDiscount}%):</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#0F2B1E] border-t border-[#D4B46A]/30 pt-2">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0F2B1E] mb-2">
                      Delivery Date
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={e => setDeliveryDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0F2B1E] mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      value={specialInstructions}
                      onChange={e => setSpecialInstructions(e.target.value)}
                      rows={3}
                      placeholder="Delivery instructions, dietary notes, etc."
                      className="w-full px-3 py-2 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={generateOrderSummary}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={
                        loading || !deliveryDate || bulkOrder.length === 0
                      }
                      className="flex-1 bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] hover:from-[#0A2418] hover:to-[#0F2B1E] text-[#F5F2E8] font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Placing...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bulk Ordering Info */}
          <div className="bg-[#F5EEDC] rounded-xl p-4 border border-[#D4B46A]/20">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-[#D4B46A] mt-0.5" />
              <div className="text-sm">
                <h4 className="font-medium text-[#0F2B1E] mb-1">
                  Bulk Ordering Benefits
                </h4>
                <ul className="text-gray-600 space-y-1 text-xs">
                  <li>• {companyInfo.bulkDiscount}% discount on all orders</li>
                  <li>• Free delivery for orders over 50 meals</li>
                  <li>• Priority scheduling for large orders</li>
                  <li>• Employee meal preferences tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CorporateBulkOrdering
