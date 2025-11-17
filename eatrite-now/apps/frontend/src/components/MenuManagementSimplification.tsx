import React, { useState } from 'react'

// UI Components
const Button: React.FC<{
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline'
  onClick?: () => void
}> = ({
  children,
  className = '',
  size = 'md',
  variant = 'solid',
  onClick,
}) => {
  const baseClass =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  const sizeClass = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  const variantClass =
    variant === 'outline'
      ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
      : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'

  return (
    <button
      className={`${baseClass} ${sizeClass[size]} ${variantClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div
    className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
  >
    {children}
  </div>
)

const Container: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
)

interface MealItem {
  id: string
  name: string
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  price: number
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
  dietary: string[]
  image: string
  description: string
  preparationTime: number
  ingredients: string[]
  allergens: string[]
  popularity: number
  availability: boolean
}

interface MenuPlan {
  id: string
  name: string
  startDate: Date
  endDate: Date
  meals: MealItem[]
  budget: number
  employeeCount: number
  status: 'draft' | 'active' | 'completed'
}

interface Department {
  id: string
  name: string
  employeeCount: number
  budget: number
  dietaryPreferences: string[]
}

const MenuManagementSimplification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'planning'
    | 'budget'
    | 'preferences'
    | 'scheduling'
    | 'analytics'
  >('overview')
  const [selectedWeek, setSelectedWeek] = useState('current')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [draggedMeal, setDraggedMeal] = useState<MealItem | null>(null)

  // Mock data for demonstration
  const [availableMeals] = useState<MealItem[]>([
    {
      id: '1',
      name: 'Mediterranean Power Bowl',
      category: 'lunch',
      price: 14.99,
      nutrition: { calories: 425, protein: 28, carbs: 42, fat: 18, fiber: 8 },
      dietary: ['vegetarian', 'gluten-free', 'high-protein'],
      image: '/api/placeholder/300/200',
      description:
        'Fresh quinoa bowl with grilled vegetables, hummus, and tahini dressing',
      preparationTime: 15,
      ingredients: [
        'quinoa',
        'chickpeas',
        'cucumber',
        'tomatoes',
        'olives',
        'feta',
      ],
      allergens: ['dairy'],
      popularity: 92,
      availability: true,
    },
    {
      id: '2',
      name: 'Protein-Packed Smoothie Bowl',
      category: 'breakfast',
      price: 11.99,
      nutrition: { calories: 320, protein: 25, carbs: 35, fat: 12, fiber: 9 },
      dietary: ['vegan', 'gluten-free', 'high-protein'],
      image: '/api/placeholder/300/200',
      description:
        'Acai smoothie bowl topped with granola, berries, and protein powder',
      preparationTime: 8,
      ingredients: ['acai', 'banana', 'protein powder', 'granola', 'berries'],
      allergens: ['nuts'],
      popularity: 87,
      availability: true,
    },
    {
      id: '3',
      name: 'Lean Turkey & Avocado Wrap',
      category: 'lunch',
      price: 13.49,
      nutrition: { calories: 385, protein: 32, carbs: 28, fat: 16, fiber: 6 },
      dietary: ['high-protein', 'dairy-free'],
      image: '/api/placeholder/300/200',
      description:
        'Whole wheat wrap with lean turkey, avocado, spinach, and herb spread',
      preparationTime: 10,
      ingredients: [
        'turkey',
        'avocado',
        'spinach',
        'tomato',
        'whole wheat tortilla',
      ],
      allergens: ['gluten'],
      popularity: 89,
      availability: true,
    },
  ])

  const [menuPlans] = useState<MenuPlan[]>([
    {
      id: '1',
      name: 'Week of Jan 15-19',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-19'),
      meals: availableMeals,
      budget: 15000,
      employeeCount: 250,
      status: 'active',
    },
  ])

  const [departments] = useState<Department[]>([
    {
      id: '1',
      name: 'Engineering',
      employeeCount: 85,
      budget: 5100,
      dietaryPreferences: ['vegetarian', 'gluten-free'],
    },
    {
      id: '2',
      name: 'Marketing',
      employeeCount: 45,
      budget: 2700,
      dietaryPreferences: ['vegan', 'keto'],
    },
    {
      id: '3',
      name: 'Sales',
      employeeCount: 60,
      budget: 3600,
      dietaryPreferences: ['high-protein', 'dairy-free'],
    },
    {
      id: '4',
      name: 'HR',
      employeeCount: 25,
      budget: 1500,
      dietaryPreferences: ['vegetarian'],
    },
    {
      id: '5',
      name: 'Finance',
      employeeCount: 35,
      budget: 2100,
      dietaryPreferences: ['gluten-free', 'low-carb'],
    },
  ])

  const [weeklySchedule, setWeeklySchedule] = useState<
    Record<string, MealItem[]>
  >({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  })

  const handleDragStart = (meal: MealItem) => {
    setDraggedMeal(meal)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, day: string) => {
    e.preventDefault()
    if (draggedMeal) {
      setWeeklySchedule(prev => ({
        ...prev,
        [day]: [...prev[day], draggedMeal],
      }))
      setDraggedMeal(null)
    }
  }

  const removeMealFromSchedule = (day: string, mealId: string) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: prev[day].filter(meal => meal.id !== mealId),
    }))
  }

  const calculateBudgetUsage = () => {
    const totalCost = Object.values(weeklySchedule)
      .flat()
      .reduce((sum, meal) => sum + meal.price, 0)
    const currentPlan = menuPlans.find(plan => plan.status === 'active')
    return currentPlan ? (totalCost / currentPlan.budget) * 100 : 0
  }

  const calculateNutritionAverages = () => {
    const allMeals = Object.values(weeklySchedule).flat()
    if (allMeals.length === 0)
      return { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }

    const totals = allMeals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.nutrition.calories,
        protein: acc.protein + meal.nutrition.protein,
        carbs: acc.carbs + meal.nutrition.carbs,
        fat: acc.fat + meal.nutrition.fat,
        fiber: acc.fiber + meal.nutrition.fiber,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    )

    return {
      calories: Math.round(totals.calories / allMeals.length),
      protein: Math.round(totals.protein / allMeals.length),
      carbs: Math.round(totals.carbs / allMeals.length),
      fat: Math.round(totals.fat / allMeals.length),
      fiber: Math.round(totals.fiber / allMeals.length),
    }
  }

  const tabs = [
    { key: 'overview', label: 'Overview', icon: '📊' },
    { key: 'planning', label: 'Menu Planning', icon: '📅' },
    { key: 'budget', label: 'Budget Management', icon: '💰' },
    { key: 'preferences', label: 'Preferences', icon: '⚙️' },
    { key: 'scheduling', label: 'Auto-Schedule', icon: '🤖' },
    { key: 'analytics', label: 'Analytics', icon: '📈' },
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Menu Plans
              </p>
              <p className="text-2xl font-bold text-green-600">3</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">📋</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Weekly Budget Usage
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {calculateBudgetUsage().toFixed(1)}%
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">💰</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Available Meals
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {availableMeals.length}
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">🍽️</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-orange-600">
                {departments.length}
              </p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-xl">🏢</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Current Week Nutrition Overview
          </h3>
          <div className="space-y-4">
            {Object.entries(calculateNutritionAverages()).map(
              ([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="capitalize text-gray-600">{key}</span>
                  <span className="font-semibold">
                    {value}
                    {key === 'calories' ? ' cal' : 'g'}
                  </span>
                </div>
              )
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Department Budget Allocation
          </h3>
          <div className="space-y-3">
            {departments.map(dept => (
              <div key={dept.id} className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{dept.name}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({dept.employeeCount} employees)
                  </span>
                </div>
                <span className="font-semibold text-green-600">
                  ${dept.budget.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )

  const renderMenuPlanning = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold">Weekly Menu Planning</h2>
        <div className="flex gap-3">
          <select
            value={selectedWeek}
            onChange={e => setSelectedWeek(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="current">Current Week</option>
            <option value="next">Next Week</option>
            <option value="future">Future Weeks</option>
          </select>
          <Button className="bg-green-600 hover:bg-green-700">
            Save Menu Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Meals */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Available Meals</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {availableMeals.map(meal => (
              <div
                key={meal.id}
                draggable
                onDragStart={() => handleDragStart(meal)}
                className="p-3 border border-gray-200 rounded-lg cursor-move hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {meal.name}
                    </h4>
                    <p className="text-xs text-gray-500">${meal.price}</p>
                    <div className="flex gap-1 mt-1">
                      {meal.dietary.slice(0, 2).map(diet => (
                        <span
                          key={diet}
                          className="text-xs bg-green-100 text-green-800 px-1 rounded"
                        >
                          {diet}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Schedule */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {Object.entries(weeklySchedule).map(([day, meals]) => (
                <div
                  key={day}
                  className="border border-gray-200 rounded-lg p-3 min-h-[200px]"
                  onDragOver={handleDragOver}
                  onDrop={e => handleDrop(e, day)}
                >
                  <h4 className="font-medium text-center mb-3 text-gray-700">
                    {day}
                  </h4>
                  <div className="space-y-2">
                    {meals.map((meal, index) => (
                      <div
                        key={`${meal.id}-${index}`}
                        className="bg-white border border-gray-200 rounded p-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium truncate">
                            {meal.name}
                          </span>
                          <button
                            onClick={() => removeMealFromSchedule(day, meal.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                        <div className="text-gray-500">${meal.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderBudgetManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Budget Management</h2>
        <select
          value={selectedDepartment}
          onChange={e => setSelectedDepartment(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Departments</option>
          {departments.map(dept => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(dept => (
          <Card key={dept.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{dept.name}</h3>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {dept.employeeCount} employees
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Budget</span>
                <span className="font-semibold text-green-600">
                  ${dept.budget.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Per Employee</span>
                <span className="font-semibold">
                  ${(dept.budget / dept.employeeCount).toFixed(0)}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min((dept.budget / 6000) * 100, 100)}%`,
                  }}
                ></div>
              </div>

              <div className="flex flex-wrap gap-1">
                {dept.dietaryPreferences.map(pref => (
                  <span
                    key={pref}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Budget Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              $
              {departments
                .reduce((sum, dept) => sum + dept.budget, 0)
                .toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Budget</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {calculateBudgetUsage().toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600">Budget Used</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              $
              {(
                departments.reduce((sum, dept) => sum + dept.budget, 0) /
                departments.reduce((sum, dept) => sum + dept.employeeCount, 0)
              ).toFixed(0)}
            </p>
            <p className="text-sm text-gray-600">Avg Per Employee</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              $
              {(
                departments.reduce((sum, dept) => sum + dept.budget, 0) * 0.15
              ).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Estimated Savings</p>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderPreferences = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dietary Preferences & Restrictions</h2>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Global Preferences</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            'vegetarian',
            'vegan',
            'gluten-free',
            'dairy-free',
            'keto',
            'low-carb',
            'high-protein',
            'nut-free',
          ].map(pref => (
            <label key={pref} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="capitalize">{pref.replace('-', ' ')}</span>
            </label>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Department Preferences</h3>
          <div className="space-y-4">
            {departments.map(dept => (
              <div
                key={dept.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{dept.name}</h4>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dept.dietaryPreferences.map(pref => (
                    <span
                      key={pref}
                      className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded"
                    >
                      {pref.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Nutritional Guidelines</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Calories per Meal
              </label>
              <input
                type="range"
                min="200"
                max="800"
                defaultValue="400"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>200 cal</span>
                <span>400 cal</span>
                <span>800 cal</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Protein (g)
              </label>
              <input
                type="number"
                defaultValue="20"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Sodium (mg)
              </label>
              <input
                type="number"
                defaultValue="800"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700">
              Update Guidelines
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )

  const renderAutoScheduling = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Automated Menu Scheduling</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Auto-Schedule Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schedule Frequency
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>Weekly</option>
                <option>Bi-weekly</option>
                <option>Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Optimization Priority
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>Cost Efficiency</option>
                <option>Nutritional Balance</option>
                <option>Employee Preferences</option>
                <option>Variety & Rotation</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="avoid-repeats"
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label htmlFor="avoid-repeats" className="text-sm">
                Avoid meal repeats within 2 weeks
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="seasonal"
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label htmlFor="seasonal" className="text-sm">
                Consider seasonal availability
              </label>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700">
              Generate Auto-Schedule
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">
                💡 Smart Suggestion
              </h4>
              <p className="text-sm text-blue-800">
                Based on previous orders, consider adding more plant-based
                options on Mondays for 23% higher engagement.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">
                💰 Cost Optimization
              </h4>
              <p className="text-sm text-green-800">
                Switching to seasonal vegetables this week could save $340 while
                maintaining nutritional targets.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">
                🍎 Nutrition Tip
              </h4>
              <p className="text-sm text-purple-800">
                Current menu averages 425 calories per meal. Consider adding
                lighter options for better variety.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-medium text-orange-900 mb-2">📈 Trending</h4>
              <p className="text-sm text-orange-800">
                Mediterranean bowls have 92% satisfaction rate. Consider
                featuring them more prominently.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Schedule Preview</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Day</th>
                <th className="px-4 py-2 text-left">Breakfast</th>
                <th className="px-4 py-2 text-left">Lunch</th>
                <th className="px-4 py-2 text-left">Dinner</th>
                <th className="px-4 py-2 text-left">Daily Cost</th>
              </tr>
            </thead>
            <tbody>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
                day => (
                  <tr key={day} className="border-t">
                    <td className="px-4 py-2 font-medium">{day}</td>
                    <td className="px-4 py-2">Auto-generated</td>
                    <td className="px-4 py-2">Auto-generated</td>
                    <td className="px-4 py-2">Auto-generated</td>
                    <td className="px-4 py-2 text-green-600 font-medium">
                      $2,450
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Menu Analytics & Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg Meal Rating
              </p>
              <p className="text-2xl font-bold text-green-600">4.7/5</p>
            </div>
            <span className="text-2xl">⭐</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Most Popular</p>
              <p className="text-2xl font-bold text-blue-600">92%</p>
            </div>
            <span className="text-2xl">🏆</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Cost Efficiency
              </p>
              <p className="text-2xl font-bold text-purple-600">18%</p>
            </div>
            <span className="text-2xl">💰</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Nutrition Score
              </p>
              <p className="text-2xl font-bold text-orange-600">A+</p>
            </div>
            <span className="text-2xl">🍎</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Performing Meals</h3>
          <div className="space-y-4">
            {availableMeals.map(meal => (
              <div key={meal.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium">{meal.name}</p>
                    <p className="text-sm text-gray-500">{meal.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">
                    {meal.popularity}%
                  </p>
                  <p className="text-sm text-gray-500">${meal.price}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Department Preferences</h3>
          <div className="space-y-4">
            {departments.map(dept => (
              <div
                key={dept.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{dept.name}</h4>
                  <span className="text-sm text-gray-500">
                    {dept.employeeCount} employees
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dept.dietaryPreferences.map(pref => (
                    <span
                      key={pref}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                    >
                      {pref.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Weekly Performance Trends
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Order Volume</h4>
            <div className="space-y-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                <div key={day} className="flex items-center gap-2">
                  <span className="w-8 text-sm">{day}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${75 + index * 5}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {75 + index * 5}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Satisfaction</h4>
            <div className="space-y-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                <div key={day} className="flex items-center gap-2">
                  <span className="w-8 text-sm">{day}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${85 + index * 3}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {4.2 + index * 0.1}/5
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Cost per Meal</h4>
            <div className="space-y-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                <div key={day} className="flex items-center gap-2">
                  <span className="w-8 text-sm">{day}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${60 + index * 8}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">
                    ${(12.5 + index * 0.75).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )

  return (
    <Container className="py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Menu Management System
          </h1>
          <p className="text-lg text-gray-600">
            Streamlined menu planning, budget management, and automated
            scheduling for corporate wellness programs
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-green-50 text-green-700 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'planning' && renderMenuPlanning()}
          {activeTab === 'budget' && renderBudgetManagement()}
          {activeTab === 'preferences' && renderPreferences()}
          {activeTab === 'scheduling' && renderAutoScheduling()}
          {activeTab === 'analytics' && renderAnalytics()}
        </div>
      </div>
    </Container>
  )
}

export default MenuManagementSimplification
