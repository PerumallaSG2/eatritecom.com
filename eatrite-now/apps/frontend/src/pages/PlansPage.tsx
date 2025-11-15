import { useState } from 'react'
import { Star, ChevronRight, Clock, Zap, Heart } from 'lucide-react'

const PlansPage = () => {
  const [selectedWeek, setSelectedWeek] = useState('Nov 15-21')
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([])

  const weekOptions = ['Nov 15-21', 'Nov 22-28', 'Nov-Dec 29-05']

  const mealCategories = [
    {
      id: 'calorie-smart',
      name: 'Calorie Smart',
      description: '~550kcal or less per serving',
      icon: '🥗',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'keto',
      name: 'Keto',
      description: 'Deliciously low carb, high fat meals',
      icon: '🥑',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      id: 'vegan-veggie',
      name: 'Vegan + Veggie',
      description: 'Meat-free meals that make veggies the hero',
      icon: '🌱',
      color: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
    },
    {
      id: 'protein-plus',
      name: 'Protein +',
      description: 'Meals with extra protein to keep your strength up',
      icon: '💪',
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
    },
    {
      id: 'chefs-choice',
      name: "Chef's Choice",
      description: 'Widest variety of clean, chef-crafted meals',
      icon: '👨‍🍳',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'snacks-desserts',
      name: 'Snacks & Desserts',
      description: 'Satisfy your sweet tooth & cravings',
      icon: '🍰',
      color: 'bg-pink-50 border-pink-200 hover:bg-pink-100'
    },
    {
      id: 'shakes-smoothies',
      name: 'Shakes & Smoothies',
      description: "To have while you're on-the-go",
      icon: '🥤',
      color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
    },
    {
      id: 'extra-proteins',
      name: 'Extra Proteins',
      description: 'Add extra proteins to your meal',
      icon: '🥩',
      color: 'bg-red-50 border-red-200 hover:bg-red-100'
    }
  ]

  const dietaryPreferences = [
    { id: 'calorie-smart', name: 'Calorie smart', icon: '🥗' },
    { id: 'everything', name: 'I eat everything', icon: '🍽️' },
    { id: 'keto', name: 'Keto', icon: '🥑' },
    { id: 'high-protein', name: 'High protein', icon: '💪' },
    { id: 'low-carb', name: 'Low carb', icon: '🚫🍞' },
    { id: 'glp1-support', name: 'Glp-1 support', icon: '💊' },
    { id: 'fiber-filled', name: 'Fiber filled', icon: '🌾' },
    { id: 'flexitarian', name: 'Flexitarian', icon: '🌿' }
  ]

  const weeklyMenus = [
    {
      id: 'chefs-choice',
      name: "Chef's Choice Weekly Menu",
      description: 'Expertly curated meals by chefs for a diverse and flavorful dining experience',
      color: 'bg-gradient-to-r from-blue-600 to-blue-700'
    },
    {
      id: 'keto',
      name: 'Keto Weekly Menu',
      description: 'Low-carb, high-fat meals to support ketosis and fat burning',
      color: 'bg-gradient-to-r from-purple-600 to-purple-700'
    },
    {
      id: 'calorie-smart',
      name: 'Calorie Smart Weekly Menu',
      description: "Portion-controlled meals with ~550kcal or less per serving that don't sacrifice flavor",
      color: 'bg-gradient-to-r from-green-600 to-green-700'
    },
    {
      id: 'high-protein',
      name: 'High Protein Weekly Menu',
      description: 'Protein-rich dishes for muscle growth and active lifestyles',
      color: 'bg-gradient-to-r from-orange-600 to-orange-700'
    },
    {
      id: 'carb-conscious',
      name: 'Carb Conscious Menu',
      description: 'Carb-conscious dishes to fuel your goals while keeping Carbs low',
      color: 'bg-gradient-to-r from-indigo-600 to-indigo-700'
    },
    {
      id: 'glp1-balance',
      name: 'GLP-1 Balance Menu',
      description: 'Designed for portion control and calorie-friendly nutrition',
      color: 'bg-gradient-to-r from-teal-600 to-teal-700'
    },
    {
      id: 'flexitarian',
      name: 'Flexitarian Weekly Menu',
      description: 'Flexible options for picky eaters, packed with nutrients and flavor',
      color: 'bg-gradient-to-r from-pink-600 to-pink-700'
    },
    {
      id: 'fiber-filled',
      name: 'Fiber Filled Weekly Menu',
      description: 'A delicious way to enjoy more fiber in every bite.',
      color: 'bg-gradient-to-r from-emerald-600 to-emerald-700'
    }
  ]

  const whyFactorBenefits = [
    {
      title: 'MORE TASTINESS',
      description: 'Choose from a wide variety of menu of 100+ dietitian-designed meals and add-on options each week.',
      icon: <Star className="h-8 w-8 text-orange-500" />
    },
    {
      title: 'MORE FLEXIBILITY',
      description: 'We make life on the go even easier—change your delivery date, skip a week, or cancel anytime.',
      icon: <Clock className="h-8 w-8 text-blue-500" />
    },
    {
      title: 'MORE CONVENIENCE',
      description: 'Simply heat and eat our meals in two minutes—no shopping or cooking required!',
      icon: <Zap className="h-8 w-8 text-green-500" />
    },
    {
      title: 'MORE NUTRITION',
      description: 'Enjoy dietitian-designed meals packed with premium, nutritional quality.',
      icon: <Heart className="h-8 w-8 text-red-500" />
    }
  ]

  const togglePreference = (preferenceId: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preferenceId)
        ? prev.filter(id => id !== preferenceId)
        : [...prev, preferenceId]
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Factor Menus & Meal Plans
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
              Explore Factor's diverse menus and personalized meal plans tailored to your preferences, 
              providing a delightful culinary experience with convenience and flexibility.
            </p>
            <button className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors">
              Get 50% Off + Free Breakfast for 1 Year
            </button>
          </div>
        </div>
      </div>

      {/* Meal Plans Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Check out our meal plans!
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-4xl mx-auto">
            Choose from a menu of 100+ dietitian-designed meals and add-on options every week, 
            tailored to fit your lifestyle—Chef's Choice, Keto, Calorie-Smart, Vegan + Veggie, 
            and High Protein. And don't forget to treat yourself to our wide variety of add-ons, 
            such as smoothies, juices, guilt-free desserts, and more!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mealCategories.map((category) => (
              <div
                key={category.id}
                className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${category.color}`}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{category.name}</h3>
                <p className="text-gray-700">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dietary Preferences Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What kind of meals do you like?
            </h2>
            <p className="text-lg text-gray-600">
              Select from the categories below. You can always change them later!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {dietaryPreferences.map((preference) => (
              <button
                key={preference.id}
                onClick={() => togglePreference(preference.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedPreferences.includes(preference.id)
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{preference.icon}</div>
                <div className="font-medium">{preference.name}</div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Get 50% off + free breakfast for 1 year & view plans
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Menus Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Check out our weekly menus!
          </h2>

          {/* Week Selector */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
              {weekOptions.map((week) => (
                <button
                  key={week}
                  onClick={() => setSelectedWeek(week)}
                  className={`px-6 py-2 font-medium ${
                    selectedWeek === week
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {week}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Cards */}
          <div className="space-y-8">
            {weeklyMenus.map((menu) => (
              <div
                key={menu.id}
                className="rounded-xl overflow-hidden shadow-lg bg-white"
              >
                <div className={`${menu.color} text-white p-6`}>
                  <h3 className="text-2xl font-bold mb-2">{menu.name}</h3>
                  <p className="text-lg opacity-90">{menu.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm">Week of {selectedWeek}</span>
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Next week's {menu.name.toLowerCase().replace('weekly menu', '').replace('menu', '')} recipes
                  </p>
                  <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                    View Full Menu →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Load more
            </button>
          </div>
        </div>
      </div>

      {/* Why Factor Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            WHY FACTOR?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyFactorBenefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Learn More About Factor Menus and Plans
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center">
            Discover answers to all your questions about delivery options, pricing, and the current week's menu offerings at Factor. Get all the information you need regarding meals and plans FAQs.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                How do I select meals from the Factor menu?
              </h3>
              <p className="text-gray-600">
                Once you complete your purchase, you'll gain access to a menu consisting of 100+ dietitian-designed meals and add-on options each week. Regardless of your preferences, you can easily choose and combine recipes to suit your taste.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Will the Factor meals accommodate my diet based on the plans?
              </h3>
              <p className="text-gray-600">
                Absolutely! Factor has options for everyone, including low carb, vegan & vegetarian, high protein, meals under 550 calories, and more. You can conveniently preview the menu for the upcoming week to ensure it aligns with your specific dietary needs and plans.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Can I modify my plan or meal preferences?
              </h3>
              <p className="text-gray-600">
                Certainly. We understand that life is unpredictable. If you require more or fewer meals or desire different options on a weekly basis, simply adjust your meal quantity and menu preferences in your account settings and plans.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                How can I access ingredient and nutritional information?
              </h3>
              <p className="text-gray-600">
                Each recipe on our menu includes FDA nutritional information. To view this information for any meal of interest, click on the thumbnail image, and the meal details, including ingredients and nutritional facts, will appear on the screen.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Will I be locked into a contract?
              </h3>
              <p className="text-gray-600">
                Never. At Factor, we prioritize flexibility. You have the freedom to skip a week, pause your subscription, or cancel your account at any time within your account settings and plans. Just remember to do so before the weekly cutoff to halt your next order.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors">
              Get 50% Off + Free Breakfast for 1 Year
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlansPage