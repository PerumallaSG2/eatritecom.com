import { useState } from 'react';
import { Star, Plus, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';


const MenuPage = () => {
  const { addToCart } = useCart();
  const [selectedWeek, setSelectedWeek] = useState('Nov 15-21');
  const [showMoreMeals, setShowMoreMeals] = useState(false);

  const weekOptions = ['Nov 15-21', 'Nov 22-28', 'Nov-Dec 29-05'];

  // Factor75-style meals data
  const factor75Meals = [
    {
      id: 'cajun-shrimp-grits',
      name: 'Cajun Shrimp & Grits',
      description: 'with Bell Peppers, Onions & Andouille Sausage',
      calories: 580,
      protein: 32,
      carbs: 45,
      fat: 28,
      dietary_tags: 'High Protein,Calorie Smart',
      price: 11.50,
      image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format',
      is_popular: true
    },
    {
      id: 'korean-beef-bulgogi',
      name: 'Korean Beef Bulgogi Bowl',
      description: 'with Jasmine Rice, Broccoli & Sesame Seeds',
      calories: 520,
      protein: 35,
      carbs: 42,
      fat: 21,
      dietary_tags: 'High Protein,Calorie Smart',
      price: 11.50,
      image_url: 'https://images.unsplash.com/photo-1598511726623-d2e9996892c0?w=400&h=300&fit=crop&auto=format',
      is_popular: false
    },
    {
      id: 'tuscan-chicken',
      name: 'Tuscan Chicken',
      description: 'with Sun-Dried Tomatoes, Spinach & Parmesan Risotto',
      calories: 590,
      protein: 38,
      carbs: 35,
      fat: 32,
      dietary_tags: 'High Protein',
      price: 11.50,
      image_url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop&auto=format',
      is_popular: false
    },
    {
      id: 'chimichurri-steak',
      name: 'Chimichurri Steak',
      description: 'with Roasted Sweet Potato & Green Beans',
      calories: 480,
      protein: 34,
      carbs: 28,
      fat: 25,
      dietary_tags: 'Keto,Low Carb,High Protein',
      price: 12.50,
      image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format',
      is_popular: true
    },
    {
      id: 'mediterranean-salmon',
      name: 'Mediterranean Salmon',
      description: 'with Lemon Herb Quinoa & Roasted Vegetables',
      calories: 510,
      protein: 36,
      carbs: 38,
      fat: 24,
      dietary_tags: 'High Protein,Calorie Smart',
      price: 12.50,
      image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&auto=format',
      is_popular: false
    },
    {
      id: 'buffalo-chicken-mac',
      name: 'Buffalo Chicken Mac & Cheese',
      description: 'with Cauliflower & Blue Cheese Crumbles',
      calories: 560,
      protein: 42,
      carbs: 32,
      fat: 28,
      dietary_tags: 'High Protein,Keto',
      price: 11.50,
      image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format',
      is_popular: false
    },
    {
      id: 'thai-basil-pork',
      name: 'Thai Basil Pork',
      description: 'with Jasmine Rice & Asian Vegetables',
      calories: 540,
      protein: 33,
      carbs: 45,
      fat: 24,
      dietary_tags: 'High Protein,Calorie Smart',
      price: 11.50,
      image_url: 'https://images.unsplash.com/photo-1559314809-0f31657def5e?w=400&h=300&fit=crop&auto=format',
      is_popular: false
    },
    {
      id: 'moroccan-chicken-tagine',
      name: 'Moroccan Chicken Tagine',
      description: 'with Couscous, Dried Fruit & Almonds',
      calories: 520,
      protein: 35,
      carbs: 48,
      fat: 19,
      dietary_tags: 'High Protein,Calorie Smart',
      price: 11.50,
      image_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop&auto=format',
      is_popular: false
    },
    {
      id: 'italian-sausage-peppers',
      name: 'Italian Sausage & Peppers',
      description: 'with Polenta & Fresh Herbs',
      calories: 590,
      protein: 28,
      carbs: 42,
      fat: 32,
      dietary_tags: 'High Protein',
      price: 11.50,
      image_url: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=300&fit=crop&auto=format',
      is_popular: false
    },
    {
      id: 'sesame-ginger-tofu',
      name: 'Sesame Ginger Tofu',
      description: 'with Brown Rice & Steamed Edamame',
      calories: 450,
      protein: 24,
      carbs: 52,
      fat: 18,
      dietary_tags: 'Vegan,Vegetarian,Calorie Smart',
      price: 10.50,
      image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&auto=format',
      is_popular: false
    },
    {
      id: 'bbq-brisket-bowl',
      name: 'BBQ Brisket Bowl',
      description: 'with Mashed Sweet Potato & Coleslaw',
      calories: 620,
      protein: 40,
      carbs: 35,
      fat: 35,
      dietary_tags: 'High Protein',
      price: 12.50,
      image_url: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop&auto=format',
      is_popular: true
    },
    {
      id: 'lemon-herb-cod',
      name: 'Lemon Herb Cod',
      description: 'with Garlic Mashed Cauliflower & Asparagus',
      calories: 380,
      protein: 32,
      carbs: 18,
      fat: 20,
      dietary_tags: 'Keto,Low Carb,High Protein,Calorie Smart',
      price: 12.50,
      image_url: 'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=400&h=300&fit=crop&auto=format',
      is_popular: false
    }
  ];

  // Factor75-style Add-ons
  const factor75AddOns = [
    {
      id: 'breakfast-bundle',
      name: 'Breakfast Bundle',
      description: 'Autumn Spiced Pancakes & Potato, Bacon, & Egg Skillet',
      subtitle: 'Breakfast In Under 2 Minutes | 4 Servings',
      tags: ['20g+ of protein'],
      discount: '15% OFF',
      price: 24.99,
      image_url: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 'protein-shake-bundle',
      name: 'Protein Shake Bundle',
      description: 'Cinnamon Horchata & Chocolate Banana Variety Pack',
      subtitle: 'Grab & Go Protein Shakes | 12 Shakes',
      tags: ['Vegan', 'Fiber Filled', 'High Protein'],
      discount: '15% OFF',
      price: 36.99,
      image_url: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 'juice-variety-pack',
      name: 'Juice Variety Pack',
      description: 'Spiced Apple Cherry & Signature Juice Bundle',
      subtitle: '4 Classic Flavors Plus a Fall Favorite | 8 Juices',
      tags: ['Contains Gluten', 'Vegan', 'Calorie Smart'],
      discount: '15% OFF',
      price: 24.99,
      image_url: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop&auto=format'
    }
  ];

  const readyMadeMeals = factor75Meals.slice(0, 6);
  const moreMeals = factor75Meals.slice(6, 12);

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'calorie smart': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'high protein': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'low carb': return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'keto': return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'vegan': return 'bg-green-50 text-green-700 border border-green-200';
      case 'vegetarian': return 'bg-green-50 text-green-700 border border-green-200';
      case 'fiber filled': return 'bg-orange-50 text-orange-700 border border-orange-200';
      case '20g+ of protein': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'contains gluten': return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      description: item.description || item.short_description,
      calories: item.calories || 500,
      protein: item.protein || 30,
      price: item.price || 11.00,
      image_url: item.image_url,
      dietary_tags: item.dietary_tags || ''
    });
    alert(`🎉 Added "${item.name}" to your plan!`);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'source-sans-pro, "Helvetica", "Arial", sans-serif' }}>
      <Navbar />

      {/* Hero Section - Factor75 Style */}
      <div style={{
        background: 'linear-gradient(135deg, #206B19 0%, #2d7a23 100%)',
        position: 'relative',
        overflow: 'hidden'
      }} className="text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{
            fontFamily: 'source-sans-pro, sans-serif',
            fontWeight: 700,
            lineHeight: '1.1'
          }}>
            The Healthiest Meals <br />You'll Crave
          </h1>
          <div className="mb-8">
            <p className="text-xl md:text-2xl mb-4 opacity-90" style={{ fontWeight: 400 }}>
              ✔ 100+ weekly options
            </p>
            <p className="text-lg opacity-80">
              Chef-prepared meals • Delivered fresh • Ready in minutes
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Sticker Section */}
      <div className="bg-gray-50 py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center space-x-8 text-center overflow-x-auto">
            <div className="flex items-center space-x-2 min-w-max">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M13.667 4.06 5.36 12.37 2 9.01l1.06-1.06 2.299 2.298L12.607 3l1.06 1.06Z"/>
              </svg>
              <span className="text-gray-700 font-medium">Delivered Fresh</span>
            </div>
            <div className="flex items-center space-x-2 min-w-max">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M13.667 4.06 5.36 12.37 2 9.01l1.06-1.06 2.299 2.298L12.607 3l1.06 1.06Z"/>
              </svg>
              <span className="text-gray-700 font-medium">Chef-prepared meals</span>
            </div>
            <div className="flex items-center space-x-2 min-w-max">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M13.667 4.06 5.36 12.37 2 9.01l1.06-1.06 2.299 2.298L12.607 3l1.06 1.06Z"/>
              </svg>
              <span className="text-gray-700 font-medium">Ready in minutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Week Selector */}
      <div className="bg-white py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden bg-white">
              {weekOptions.map((week) => (
                <button
                  key={week}
                  onClick={() => setSelectedWeek(week)}
                  className={`px-6 py-3 font-medium text-sm ${
                    selectedWeek === week
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  style={{ fontFamily: 'source-sans-pro, sans-serif' }}
                >
                  {week}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{
              fontFamily: 'source-sans-pro, sans-serif',
              fontWeight: 700
            }}>
              Enjoy 100 delicious, dietitian-approved weekly options
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto" style={{ fontWeight: 400 }}>
              Your fresh, never-frozen fully prepared meals arrive in an insulated, recyclable box. 
              No meal prep, no cleanup—simply heat and eat.
            </p>
          </div>

          {/* Meal Grid - Factor75 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
            {readyMadeMeals.map((meal) => (
              <div key={meal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" style={{ border: '1px solid #e5e7eb' }}>
                {/* Image Container */}
                <div className="relative">
                  <img 
                    src={meal.image_url}
                    alt={meal.name}
                    className="w-full h-48 object-cover"
                    style={{ maxWidth: '375px' }}
                    onError={(e) => {
                      const colors = ['#FF6B35', '#F7931E', '#FFD23F', '#06D6A0', '#118AB2'];
                      const randomColor = colors[Math.floor(Math.random() * colors.length)];
                      e.currentTarget.src = `https://via.placeholder.com/400x300/${randomColor.slice(1)}/FFFFFF?text=🍽️+Delicious+Meal`
                    }}
                  />
                  {meal.is_popular && (
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      POPULAR
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded px-2 py-1">
                    <span className="text-sm font-bold text-gray-900">${meal.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{
                    fontFamily: 'source-sans-pro, sans-serif',
                    fontWeight: 700,
                    fontSize: '1rem',
                    lineHeight: '1.5rem'
                  }}>
                    {meal.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4" style={{
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    lineHeight: '1.25rem'
                  }}>
                    {meal.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {meal.dietary_tags?.split(',').map((tag: string, index: number) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs" style={{ fontSize: '0.75rem' }}>
                        {tag.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Nutrition Info - Factor75 Style */}
                  <div className="grid grid-cols-3 gap-2 mb-4 p-2 bg-gray-50 rounded">
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-900">{meal.calories}</div>
                      <div className="text-xs text-gray-500">cal</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-900">{meal.protein}g</div>
                      <div className="text-xs text-gray-500">protein</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-900">{meal.carbs}g</div>
                      <div className="text-xs text-gray-500">carbs</div>
                    </div>
                  </div>

                  {/* Add Button - Factor75 Style */}
                  <button 
                    onClick={() => handleAddToCart(meal)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-colors duration-200"
                    style={{
                      fontFamily: 'source-sans-pro, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.875rem'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* More meals section */}
          {showMoreMeals && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {moreMeals.map((meal) => (
                <div key={meal.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 group">
                  <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                    <img
                      src={meal.image_url}
                      alt={meal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const colors = ['#FF6B35', '#F7931E', '#FFD23F', '#06D6A0', '#118AB2'];
                        const randomColor = colors[Math.floor(Math.random() * colors.length)];
                        e.currentTarget.src = `https://via.placeholder.com/400x300/${randomColor.slice(1)}/FFFFFF?text=🍽️+Delicious+Meal`
                      }}
                    />
                    {meal.is_popular && (
                      <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center shadow-md">
                        <Star className="w-3 h-3 mr-1.5 fill-current" />
                        POPULAR
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-2.5 py-1.5 rounded-full text-sm font-bold shadow-sm">
                      ${meal.price}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{meal.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{meal.description}</p>
                    
                    {/* Nutrition Info */}
                    <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                      <div className="bg-gray-50 rounded-lg py-2 px-1">
                        <div className="text-sm font-bold text-gray-900">{meal.calories}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Cal</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg py-2 px-1">
                        <div className="text-sm font-bold text-gray-900">{meal.protein}g</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Protein</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg py-2 px-1">
                        <div className="text-sm font-bold text-gray-900">{meal.carbs}g</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Carbs</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {meal.dietary_tags?.split(',').map((tag: string, index: number) => (
                        <span key={index} className={`px-2.5 py-1 text-xs font-medium rounded-full ${getTagColor(tag.trim())}`}>
                          {tag.trim()}
                        </span>
                      ))}
                    </div>

                    <button 
                      onClick={() => handleAddToCart(meal)}
                      className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-bold hover:bg-orange-600 transition-all duration-200 flex items-center justify-center text-sm shadow-sm hover:shadow-md"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      ADD TO PLAN
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <button
              onClick={() => setShowMoreMeals(!showMoreMeals)}
              className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-bold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 inline-flex items-center shadow-sm"
            >
              {showMoreMeals ? 'Show fewer meals' : 'Load more meals'}
              <ChevronDown className={`w-5 h-5 ml-2 transition-transform duration-200 ${showMoreMeals ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Add-ons</h2>
            <p className="text-lg text-gray-600">You're not limited to just the meals, you can add other goodies to your meals!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {factor75AddOns.map((addon) => (
              <div key={addon.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 group">
                <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                  <img
                    src={addon.image_url}
                    alt={addon.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const colors = ['#FF6B35', '#F7931E', '#FFD23F', '#06D6A0', '#118AB2'];
                      const randomColor = colors[Math.floor(Math.random() * colors.length)];
                      e.currentTarget.src = `https://via.placeholder.com/400x300/${randomColor.slice(1)}/FFFFFF?text=🥤+Add-On+Item`
                    }}
                  />
                  {addon.discount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                      {addon.discount}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-2.5 py-1.5 rounded-full text-sm font-bold shadow-sm">
                    ${addon.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{addon.name}</h3>
                  <p className="text-sm font-medium text-gray-700 mb-2">{addon.description}</p>
                  <p className="text-xs text-gray-500 mb-4">{addon.subtitle}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {addon.tags.map((tag, index) => (
                      <span key={index} className={`px-2.5 py-1 text-xs font-medium rounded-full ${getTagColor(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleAddToCart(addon)}
                    className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-bold hover:bg-orange-600 transition-all duration-200 flex items-center justify-center text-sm shadow-sm hover:shadow-md"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    ADD TO PLAN
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to get started?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Skip the planning, prep, and clean-up. Fresh, chef-prepared meals delivered weekly to help you eat well and live better.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button className="w-full sm:w-auto bg-orange-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl">
              Choose Your Plan
            </button>
            <button className="w-full sm:w-auto bg-white border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-xl font-bold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-lg">
              Take Our Quiz
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Plans starting at $11.50 per meal • Skip or cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
