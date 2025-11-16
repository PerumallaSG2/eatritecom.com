import { useState, useEffect } from 'react';
import { Star, Plus, Heart, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import MealFilters from '../components/MealFilters';
import { MealCardSkeleton } from '../components/Loading';

interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  image_url: string; // Required by CartContext
  rating: number;
  reviewCount: number;
  category: string;
  cookTime: string;
  servingSize: string;
  tags: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isNew?: boolean;
  isPopular?: boolean;
  isPremium?: boolean;
  allergens: string[];
  nutritionalScore: number;
}

const meals: Meal[] = [
  {
    id: 1,
    name: "Grass-Fed Beef Taco Bowl",
    description: "Seasoned grass-fed beef with fresh pico de gallo, black beans, cilantro lime rice, and avocado crema. A perfect blend of protein and flavor.",
    price: 16.99,
    image: "/api/placeholder/400/300",
    image_url: "/api/placeholder/400/300",
    rating: 4.8,
    reviewCount: 234,
    category: "Beef",
    cookTime: "25 mins",
    servingSize: "1 serving",
    tags: ["High Protein", "Gluten-Free", "Keto-Friendly"],
    calories: 480,
    protein: 32,
    carbs: 28,
    fat: 22,
    fiber: 8,
    difficulty: 'Medium',
    isPopular: true,
    allergens: [],
    nutritionalScore: 92
  },
  {
    id: 2,
    name: "Wild-Caught Salmon Teriyaki",
    description: "Pan-seared wild Alaskan salmon glazed with house-made teriyaki, served with jasmine rice and steamed broccoli.",
    price: 19.99,
    image: "/api/placeholder/400/300",
    image_url: "/api/placeholder/400/300",
    rating: 4.9,
    reviewCount: 187,
    category: "Fish",
    cookTime: "20 mins",
    servingSize: "1 serving",
    tags: ["High Protein", "Omega-3", "Heart Healthy"],
    calories: 420,
    protein: 35,
    carbs: 32,
    fat: 18,
    fiber: 4,
    difficulty: 'Easy',
    isPremium: true,
    allergens: ['Fish', 'Soy'],
    nutritionalScore: 95
  },
  {
    id: 3,
    name: "Free-Range Chicken Harvest Bowl",
    description: "Herb-crusted free-range chicken breast with roasted sweet potatoes, Brussels sprouts, and quinoa pilaf.",
    price: 14.99,
    image: "/api/placeholder/400/300",
    image_url: "/api/placeholder/400/300",
    rating: 4.7,
    reviewCount: 312,
    category: "Chicken",
    cookTime: "22 mins",
    servingSize: "1 serving",
    tags: ["High Protein", "Paleo", "Whole30"],
    calories: 390,
    protein: 30,
    carbs: 35,
    fat: 12,
    fiber: 7,
    difficulty: 'Medium',
    isPopular: true,
    allergens: [],
    nutritionalScore: 88
  },
  {
    id: 4,
    name: "Plant-Based Power Bowl",
    description: "Quinoa, roasted seasonal vegetables, chickpeas, hemp seeds, and creamy tahini dressing with microgreens.",
    price: 13.99,
    image: "/api/placeholder/400/300",
    image_url: "/api/placeholder/400/300",
    rating: 4.6,
    reviewCount: 156,
    category: "Vegetarian",
    cookTime: "15 mins",
    servingSize: "1 serving",
    tags: ["Vegan", "High Fiber", "Plant Protein"],
    calories: 350,
    protein: 18,
    carbs: 42,
    fat: 15,
    fiber: 12,
    difficulty: 'Easy',
    isNew: true,
    allergens: ['Sesame'],
    nutritionalScore: 90
  },
  {
    id: 5,
    name: "Mediterranean Coastal Wrap",
    description: "Grilled vegetables, hummus, feta cheese, and fresh herbs wrapped in a whole wheat tortilla with tzatziki.",
    price: 12.99,
    image: "/api/placeholder/400/300",
    image_url: "/api/placeholder/400/300",
    rating: 4.5,
    reviewCount: 89,
    category: "Vegetarian",
    cookTime: "12 mins",
    servingSize: "1 serving",
    tags: ["Vegetarian", "Mediterranean", "Fresh"],
    calories: 320,
    protein: 15,
    carbs: 38,
    fat: 14,
    fiber: 6,
    difficulty: 'Easy',
    allergens: ['Dairy', 'Gluten'],
    nutritionalScore: 85
  },
  {
    id: 6,
    name: "Turkey & Avocado Superfood Salad",
    description: "Sliced organic turkey breast with avocado, mixed supergreens, pumpkin seeds, and pomegranate vinaigrette.",
    price: 15.99,
    image: "/api/placeholder/400/300",
    image_url: "/api/placeholder/400/300",
    rating: 4.8,
    reviewCount: 203,
    category: "Salad",
    cookTime: "8 mins",
    servingSize: "1 serving",
    tags: ["Low Carb", "High Protein", "Superfood"],
    calories: 280,
    protein: 25,
    carbs: 12,
    fat: 18,
    fiber: 9,
    difficulty: 'Easy',
    isPremium: true,
    allergens: [],
    nutritionalScore: 94
  },
  {
    id: 7,
    name: "Spicy Shrimp & Cauliflower Rice",
    description: "Cajun-spiced jumbo shrimp served over seasoned cauliflower rice with bell peppers and fresh cilantro.",
    price: 17.99,
    image: "/api/placeholder/400/300",
    image_url: "/api/placeholder/400/300",
    rating: 4.7,
    reviewCount: 145,
    category: "Seafood",
    cookTime: "18 mins",
    servingSize: "1 serving",
    tags: ["Low Carb", "High Protein", "Spicy", "Keto"],
    calories: 310,
    protein: 28,
    carbs: 8,
    fat: 16,
    fiber: 5,
    difficulty: 'Medium',
    isNew: true,
    allergens: ['Shellfish'],
    nutritionalScore: 91
  },
  {
    id: 8,
    name: "Mushroom & Truffle Risotto",
    description: "Creamy arborio rice with wild mushrooms, truffle oil, parmesan, and fresh thyme. A luxury comfort meal.",
    price: 18.99,
    image: "/api/placeholder/400/300",
    image_url: "/api/placeholder/400/300",
    rating: 4.6,
    reviewCount: 98,
    category: "Vegetarian",
    cookTime: "30 mins",
    servingSize: "1 serving",
    tags: ["Vegetarian", "Comfort Food", "Gourmet"],
    calories: 420,
    protein: 12,
    carbs: 52,
    fat: 18,
    fiber: 3,
    difficulty: 'Hard',
    isPremium: true,
    allergens: ['Dairy', 'Gluten'],
    nutritionalScore: 78
  }
];

export default function MenuPage() {
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>(meals);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filters: any) => {
    let filtered = [...meals];

    // Search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(meal =>
        meal.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        meal.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        meal.tags.some(tag => tag.toLowerCase().includes(filters.searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(meal => meal.category === filters.category);
    }

    // Dietary filters
    if (filters.dietary.length > 0) {
      filtered = filtered.filter(meal =>
        filters.dietary.some((diet: string) => 
          meal.tags.some(tag => tag.toLowerCase().includes(diet.toLowerCase()))
        )
      );
    }

    // Price range filter
    filtered = filtered.filter(meal => 
      meal.price >= filters.priceRange[0] && meal.price <= filters.priceRange[1]
    );

    // Calorie range filter
    if (filters.calorieRange[0] > 0 || filters.calorieRange[1] < 1000) {
      filtered = filtered.filter(meal =>
        meal.calories >= filters.calorieRange[0] && meal.calories <= filters.calorieRange[1]
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'calories-low':
          return a.calories - b.calories;
        case 'calories-high':
          return b.calories - a.calories;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return b.rating - a.rating;
      }
    });

    setFilteredMeals(filtered);
  };

  const toggleFavorite = (mealId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(mealId)) {
        newFavorites.delete(mealId);
        showToast('info', 'Removed from favorites', 'Item has been removed from your favorites list.');
      } else {
        newFavorites.add(mealId);
        showToast('success', 'Added to favorites', 'Item has been added to your favorites list.');
      }
      return newFavorites;
    });
  };

  const handleAddToCart = (meal: Meal) => {
    const cartItem = {
      id: meal.id.toString(),
      name: meal.name,
      description: meal.description,
      calories: meal.calories,
      protein: meal.protein,
      price: meal.price,
      image_url: meal.image_url,
      dietary_tags: meal.tags.join(', ')
    };
    addToCart(cartItem);
    showToast('success', 'Added to cart', `${meal.name} has been added to your cart.`);
  };



  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F2B1E] font-playfair mb-6">
            Our Menu
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Thoughtfully prepared meals using premium ingredients, 
            crafted to nourish your body and delight your taste buds.
          </p>
          <div className="flex items-center justify-center gap-12 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FF6B35] rounded-full"></div>
              <span>Fresh Ingredients</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#D4B46A] rounded-full"></div>
              <span>Chef Prepared</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#0F2B1E] rounded-full"></div>
              <span>Delivered Fresh</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <MealFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-[#0F2B1E]">{filteredMeals.length}</span> meals
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Updated daily with fresh options</span>
            </div>
          </div>
        </div>

        {/* Meal Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <MealCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMeals.map((meal) => (
              <div
                key={meal.id}
                className="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle Badges */}
                  <div className="absolute top-3 left-3">
                    {meal.isNew && (
                      <span className="bg-[#FF6B35] text-white px-2 py-1 rounded-md text-xs font-medium">
                        New
                      </span>
                    )}
                    {meal.isPopular && !meal.isNew && (
                      <span className="bg-[#D4B46A] text-white px-2 py-1 rounded-md text-xs font-medium">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Subtle Actions */}
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => toggleFavorite(meal.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-200 ${
                        favorites.has(meal.id)
                          ? 'bg-red-500/90 text-white'
                          : 'bg-white/80 text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${favorites.has(meal.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Clean Price Display */}
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-white/95 backdrop-blur-sm text-[#0F2B1E] px-3 py-1 rounded-lg font-semibold">
                      ${meal.price}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{meal.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#0F2B1E] mb-2 font-playfair">
                    {meal.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                    {meal.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {meal.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded-md font-medium border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Clean Nutrition Info */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600 border-t pt-4">
                    <div className="text-center">
                      <div className="font-semibold text-[#0F2B1E]">{meal.calories}</div>
                      <div className="text-xs">Calories</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-[#0F2B1E]">{meal.protein}g</div>
                      <div className="text-xs">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-[#0F2B1E]">{meal.cookTime}</div>
                      <div className="text-xs">Prep Time</div>
                    </div>
                  </div>

                  {/* Simple Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(meal)}
                    className="w-full bg-[#0F2B1E] hover:bg-[#1a4d33] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredMeals.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-3xl font-bold text-[#0F2B1E] mb-4 font-playfair">
              No meals found
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              We couldn't find any meals matching your criteria. Try adjusting your filters or search terms.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#0F2B1E] text-white px-8 py-3 rounded-xl hover:bg-[#1a4d33] transition-colors duration-300 font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Simple CTA Section */}
        {!isLoading && filteredMeals.length > 0 && (
          <div className="mt-16 bg-[#F5F2E8] rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-[#0F2B1E] mb-3 font-playfair">Need Help Choosing?</h2>
            <p className="text-gray-600 mb-6">
              Our nutrition team can help create a personalized meal plan for your goals
            </p>
            <button className="bg-[#0F2B1E] hover:bg-[#1a4d33] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200">
              Get Personalized Plan
            </button>
          </div>
        )}
      </div>

    </div>
  );
}