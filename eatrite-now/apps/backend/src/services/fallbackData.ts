/**
 * Fallback Data Service
 * Provides mock data when database is not available
 */

export const fallbackMeals = [
  {
    id: 1,
    name: "Avocado Toast Deluxe",
    description: "Creamy avocado on artisan sourdough with poached egg",
    price: 12.99,
    category_name: "Breakfast",
    chef_name: "Chef Maria",
    preparation_time: 15,
    difficulty_level: "Easy",
    meal_type: "Breakfast",
    cuisine_type: "Modern",
    is_vegetarian: true,
    is_vegan: false,
    is_gluten_free: false,
    calories: 420,
    protein: 18.5,
    carbohydrates: 35.2,
    fat: 22.1,
    ingredients: "Sourdough bread, avocado, free-range egg, cherry tomatoes, microgreens, olive oil",
    image_url: "/api/placeholder/400/300",
    is_available: true
  },
  {
    id: 2,
    name: "Protein Power Bowl",
    description: "Greek yogurt with berries, granola, and almond butter",
    price: 9.99,
    category_name: "Breakfast",
    chef_name: "Chef David",
    preparation_time: 5,
    difficulty_level: "Easy",
    meal_type: "Breakfast",
    cuisine_type: "Health",
    is_vegetarian: true,
    is_vegan: false,
    is_gluten_free: true,
    calories: 380,
    protein: 25.0,
    carbohydrates: 40.5,
    fat: 15.2,
    ingredients: "Greek yogurt, mixed berries, granola, almond butter, chia seeds, honey",
    image_url: "/api/placeholder/400/300",
    is_available: true
  },
  {
    id: 3,
    name: "Grilled Salmon Salad",
    description: "Fresh Atlantic salmon over mixed greens with quinoa",
    price: 18.99,
    category_name: "Lunch",
    chef_name: "Chef Sarah",
    preparation_time: 25,
    difficulty_level: "Medium",
    meal_type: "Lunch",
    cuisine_type: "Mediterranean",
    is_vegetarian: false,
    is_vegan: false,
    is_gluten_free: true,
    calories: 520,
    protein: 35.8,
    carbohydrates: 25.4,
    fat: 28.2,
    ingredients: "Atlantic salmon, mixed greens, quinoa, cucumber, cherry tomatoes, lemon vinaigrette",
    image_url: "/api/placeholder/400/300",
    is_available: true
  },
  {
    id: 4,
    name: "Buddha Bowl Supreme",
    description: "Nutrient-packed bowl with roasted vegetables and tahini",
    price: 15.99,
    category_name: "Lunch",
    chef_name: "Chef Alex",
    preparation_time: 30,
    difficulty_level: "Medium",
    meal_type: "Lunch",
    cuisine_type: "Vegan",
    is_vegetarian: true,
    is_vegan: true,
    is_gluten_free: true,
    calories: 480,
    protein: 18.2,
    carbohydrates: 55.8,
    fat: 20.1,
    ingredients: "Roasted sweet potato, chickpeas, kale, quinoa, tahini dressing, pumpkin seeds",
    image_url: "/api/placeholder/400/300",
    is_available: true
  },
  {
    id: 5,
    name: "Herb-Crusted Chicken",
    description: "Organic chicken breast with roasted vegetables",
    price: 22.99,
    category_name: "Dinner",
    chef_name: "Chef Michael",
    preparation_time: 35,
    difficulty_level: "Medium",
    meal_type: "Dinner",
    cuisine_type: "American",
    is_vegetarian: false,
    is_vegan: false,
    is_gluten_free: true,
    calories: 580,
    protein: 42.5,
    carbohydrates: 35.2,
    fat: 22.8,
    ingredients: "Organic chicken breast, herb crust, roasted vegetables, sweet potato mash",
    image_url: "/api/placeholder/400/300",
    is_available: true
  }
];

export const fallbackCategories = [
  {
    id: 1,
    name: "Breakfast",
    description: "Nutritious morning meals to start your day right",
    image_url: "/api/placeholder/400/300",
    meal_count: 2,
    is_active: true
  },
  {
    id: 2,
    name: "Lunch", 
    description: "Balanced midday meals for sustained energy",
    image_url: "/api/placeholder/400/300",
    meal_count: 2,
    is_active: true
  },
  {
    id: 3,
    name: "Dinner",
    description: "Satisfying evening meals for optimal recovery", 
    image_url: "/api/placeholder/400/300",
    meal_count: 1,
    is_active: true
  },
  {
    id: 4,
    name: "Snacks",
    description: "Healthy snacks to keep you energized",
    image_url: "/api/placeholder/400/300", 
    meal_count: 0,
    is_active: true
  }
];

export const fallbackPlans = [
  {
    id: 1,
    name: "Basic Plan",
    description: "Perfect for beginners looking to start their health journey",
    price: 299.99,
    duration_days: 30,
    meals_per_week: 10,
    calories_per_day: 1800,
    features: ["10 meals per week", "Basic nutrition tracking", "Email support"],
    is_popular: false,
    is_active: true
  },
  {
    id: 2,
    name: "Premium Plan", 
    description: "Our most popular choice for serious health enthusiasts",
    price: 499.99,
    duration_days: 30,
    meals_per_week: 16,
    calories_per_day: 2000,
    features: ["16 meals per week", "Advanced nutrition tracking", "Priority support", "Custom meal plans"],
    is_popular: true,
    is_active: true
  },
  {
    id: 3,
    name: "Elite Plan",
    description: "Ultimate nutrition experience with personalized coaching",
    price: 799.99,
    duration_days: 30, 
    meals_per_week: 21,
    calories_per_day: 2200,
    features: ["21 meals per week", "1-on-1 nutrition coaching", "Priority delivery", "Custom recipes"],
    is_popular: false,
    is_active: true
  }
];

export class FallbackDataService {
  static getMeals(filters?: any) {
    let meals = [...fallbackMeals];
    
    if (filters?.category) {
      meals = meals.filter(meal => 
        meal.category_name.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      meals = meals.filter(meal =>
        meal.name.toLowerCase().includes(searchTerm) ||
        meal.description.toLowerCase().includes(searchTerm) ||
        meal.ingredients.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters?.limit) {
      meals = meals.slice(0, filters.limit);
    }
    
    return {
      success: true,
      data: meals,
      total: meals.length,
      fallback: true
    };
  }
  
  static getMealById(id: number) {
    const meal = fallbackMeals.find(m => m.id === id);
    return meal ? {
      success: true,
      data: meal,
      fallback: true
    } : {
      success: false,
      message: 'Meal not found'
    };
  }
  
  static getCategories() {
    return {
      success: true,
      data: fallbackCategories,
      fallback: true
    };
  }
  
  static getPlans() {
    return {
      success: true,
      data: fallbackPlans,
      fallback: true
    };
  }
  
  static getPlanById(id: number) {
    const plan = fallbackPlans.find(p => p.id === id);
    return plan ? {
      success: true,
      data: plan,
      fallback: true
    } : {
      success: false,
      message: 'Plan not found'
    };
  }
}