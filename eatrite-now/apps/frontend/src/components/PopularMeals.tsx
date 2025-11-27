import React, { useState } from 'react'
import {
  ShoppingCart,
  Star,
  Clock,
  Flame,
  Award,
  Heart,
  Eye,
} from 'lucide-react'

const PopularMeals: React.FC = () => {
  const [hoveredMeal, setHoveredMeal] = useState<number | null>(null)
  const [likedMeals, setLikedMeals] = useState<Set<number>>(new Set())

  const meals = [
    {
      id: 1,
      name: 'Cajun Shrimp & Grits',
      image: 'cajun-shrimp-grits',
      subtitle: 'Pick from 50+ weekly options.',
      nutrition: '550 cal • 32g protein',
      description:
        'Succulent seasoned shrimp over creamy cheese grits with fresh herbs',
      price: 14.95,
      rating: 4.8,
      reviews: 1247,
      prepTime: '3 mins',
      dietaryTags: ['Gluten-Free', 'High-Protein'],
      spiceLevel: 3,
      chef: 'Chef Maria Rodriguez',
    },
    {
      id: 2,
      name: 'Korean Beef Bulgogi Bowl',
      image: 'korean-beef-bulgogi',
      subtitle: 'Freshly cooked by chefs every morning.',
      nutrition: '520 cal • 35g protein',
      description:
        'Tender marinated beef strips over jasmine rice with spinach and carrots',
      price: 16.95,
      rating: 4.9,
      reviews: 2103,
      prepTime: '2 mins',
      dietaryTags: ['Dairy-Free', 'High-Protein'],
      spiceLevel: 2,
      chef: 'Chef Kim Park',
    },
    {
      id: 3,
      name: 'Tuscan Chicken',
      image: 'tuscan-chicken',
      subtitle: 'Arrives chilled & ready to heat.',
      nutrition: '580 cal • 38g protein',
      description:
        'Herb-crusted chicken breast over creamy risotto with fresh spinach',
      price: 15.95,
      rating: 4.7,
      reviews: 892,
      prepTime: '4 mins',
      dietaryTags: ['Keto-Friendly', 'High-Protein'],
      spiceLevel: 1,
      chef: 'Chef Antonio Rossi',
    },
  ]

  const handleLike = (mealId: number) => {
    const newLiked = new Set(likedMeals)

    if (newLiked.has(mealId)) {
      newLiked.delete(mealId)
    } else {
      newLiked.add(mealId)
    }
    setLikedMeals(newLiked)
  }

  const handleAddToCart = (meal: (typeof meals)[0]) => {
    // Simulate adding to cart
    console.log(`Added ${meal.name} to cart`)
  }

  const getMealImage = (mealType: string, mealName: string) => {
    const imageUrls = {
      'cajun-shrimp-grits':
        'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&w=600&h=400&fit=crop&auto=format&q=80', // Seafood/shrimp dish
      'korean-beef-bulgogi':
        'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&w=600&h=400&fit=crop&auto=format&q=80', // Asian beef stir fry bowl
      'tuscan-chicken':
        'https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&w=600&h=400&fit=crop&auto=format&q=80', // Italian-style chicken
    }

    const imageUrl = imageUrls[mealType as keyof typeof imageUrls]
    
    // Fallback images if primary image fails
    const fallbackImages = [
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=400&fit=crop&auto=format&q=80',
    ]

    return (
      <div className="w-full h-64 rounded-t-2xl overflow-hidden relative group/image">
        <img
          src={imageUrl}
          alt={mealName}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          loading="lazy"
          onError={(e) => {
            // Use fallback image if primary fails
            const fallbackIndex = Object.keys(imageUrls).indexOf(mealType)
            const fallbackUrl = fallbackImages[fallbackIndex] || fallbackImages[0]
            ;(e.target as HTMLImageElement).src = fallbackUrl
          }}
        />
        {/* Dynamic overlay that responds to hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500"></div>

        {/* Subtle shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
      </div>
    )
  }

  return (
    <section className="bg-[#F5EEDC] py-20">
      <div className="max-w-8xl mx-auto px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-5xl lg:text-6xl font-bold text-[#0F2B1E] mb-6 tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Popular Meals
          </h2>
          <p
            className="text-xl lg:text-2xl text-[#0A2418]/80 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Chef-crafted favorites that our customers can't get enough of
          </p>
        </div>

        {/* Meal Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {meals.map(meal => (
            <div
              key={meal.id}
              className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 overflow-hidden group cursor-pointer relative"
              onMouseEnter={() => setHoveredMeal(meal.id)}
              onMouseLeave={() => setHoveredMeal(null)}
            >
              {/* Meal Image */}
              <div className="relative">
                {getMealImage(meal.image, meal.name)}

                {/* Floating Price Badge */}
                <div className="absolute top-4 right-4 bg-[#FF6B35] text-white px-3 py-2 rounded-full font-bold shadow-lg transform transition-transform group-hover:scale-110">
                  <span style={{ fontFamily: 'Inter, sans-serif' }}>
                    ${meal.price}
                  </span>
                </div>

                {/* Like Button */}
                <button
                  onClick={e => {
                    e.stopPropagation()
                    handleLike(meal.id)
                  }}
                  className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${likedMeals.has(meal.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                  />
                </button>

                {/* Chef Badge - Only visible on hover */}
                <div
                  className={`absolute bottom-4 left-4 bg-[#D4B46A] text-[#0F2B1E] px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${hoveredMeal === meal.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                >
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>
                      {meal.chef}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 space-y-6">
                {/* Rating & Reviews */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span
                        className="font-bold text-[#0F2B1E]"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {meal.rating}
                      </span>
                    </div>
                    <span
                      className="text-sm text-[#0A2418]/60"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      ({meal.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#D4B46A]">
                    <Clock className="w-4 h-4" />
                    <span
                      className="text-sm font-medium"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {meal.prepTime}
                    </span>
                  </div>
                </div>

                {/* Meal Name */}
                <h3
                  className="text-2xl lg:text-3xl font-bold text-[#0F2B1E] tracking-tight group-hover:text-[#D4B46A] transition-colors duration-300"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {meal.name}
                </h3>

                {/* Description - Shows on hover */}
                <p
                  className={`text-base text-[#0A2418]/70 leading-relaxed transition-all duration-300 ${hoveredMeal === meal.id ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {meal.description}
                </p>

                {/* Dietary Tags */}
                <div className="flex flex-wrap gap-2">
                  {meal.dietaryTags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs font-semibold text-[#0F2B1E] bg-[#F5EEDC] px-3 py-1 rounded-full border border-[#D4B46A]/30"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {tag}
                    </span>
                  ))}
                  {/* Spice Level Indicator */}
                  <div className="flex items-center gap-1 bg-[#FF6B35]/10 px-3 py-1 rounded-full">
                    {[...Array(3)].map((_, index) => (
                      <Flame
                        key={index}
                        className={`w-3 h-3 ${index < meal.spiceLevel ? 'text-[#FF6B35] fill-[#FF6B35]' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Nutrition Info */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-base font-semibold text-[#D4B46A] bg-[#D4B46A]/10 px-4 py-2 rounded-full"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {meal.nutrition}
                  </span>
                  <button className="p-2 hover:bg-[#F5EEDC] rounded-full transition-colors group/view">
                    <Eye className="w-5 h-5 text-[#0A2418]/60 group-hover/view:text-[#D4B46A] transition-colors" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(meal)}
                  className="w-full bg-[#0F2B1E] hover:bg-[#0A2418] text-[#F5F2E8] font-bold py-4 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg flex items-center justify-center gap-3 group/button transform relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4B46A]/20 to-transparent -skew-x-12 transform -translate-x-full group-hover/button:translate-x-full transition-transform duration-500"></div>
                  <ShoppingCart className="w-5 h-5 group-hover/button:scale-110 transition-transform relative z-10" />
                  <span
                    className="text-lg relative z-10"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Add to Cart - ${meal.price}
                  </span>
                </button>
              </div>

              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-[#D4B46A]/10 via-transparent to-[#D4B46A]/10 rounded-2xl transition-opacity duration-300 pointer-events-none ${hoveredMeal === meal.id ? 'opacity-100' : 'opacity-0'}`}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            className="bg-[#D4B46A] hover:bg-[#D4B46A]/90 text-[#0F2B1E] font-bold px-12 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg text-xl"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  )
}

export default PopularMeals
