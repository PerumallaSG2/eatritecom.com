import { useState } from 'react'
import { Star, Shield, Award, Leaf, Plus, Minus } from 'lucide-react'

const SupplementsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Supplements', count: 24 },
    { id: 'vitamins', name: 'Vitamins & Minerals', count: 8 },
    { id: 'protein', name: 'Protein & Fitness', count: 6 },
    { id: 'wellness', name: 'Wellness & Energy', count: 5 },
    { id: 'digestive', name: 'Digestive Health', count: 3 },
    { id: 'immunity', name: 'Immunity Support', count: 2 },
  ]

  const supplements = [
    {
      id: 'premium-multivitamin',
      name: 'Premium Daily Multivitamin',
      description:
        'Complete daily nutrition with 25+ essential vitamins and minerals',
      price: 34.99,
      originalPrice: 44.99,
      rating: 4.8,
      reviews: 2847,
      category: 'vitamins',
      image:
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&auto=format',
      badges: ['Best Seller', 'Doctor Approved'],
      benefits: ['Energy Support', 'Immune Health', 'Heart Health'],
      servings: 30,
    },
    {
      id: 'omega-3-fish-oil',
      name: 'Omega-3 Fish Oil Premium',
      description: 'High-potency EPA & DHA for heart and brain health',
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.9,
      reviews: 1923,
      category: 'wellness',
      image:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&auto=format',
      badges: ['Premium Quality'],
      benefits: ['Heart Health', 'Brain Function', 'Joint Support'],
      servings: 60,
    },
    {
      id: 'plant-protein-powder',
      name: 'Organic Plant Protein Powder',
      description:
        'Complete amino acid profile from organic pea and hemp protein',
      price: 42.99,
      originalPrice: 52.99,
      rating: 4.7,
      reviews: 1456,
      category: 'protein',
      image:
        'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop&auto=format',
      badges: ['Organic', 'Vegan'],
      benefits: ['Muscle Recovery', 'Weight Management', 'Digestive Health'],
      servings: 25,
    },
    {
      id: 'probiotic-complex',
      name: 'Advanced Probiotic Complex',
      description:
        '50 billion CFU with 10 diverse probiotic strains for gut health',
      price: 38.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 987,
      category: 'digestive',
      image:
        'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=400&h=400&fit=crop&auto=format',
      badges: ['Clinically Tested'],
      benefits: ['Digestive Health', 'Immune Support', 'Mood Balance'],
      servings: 30,
    },
    {
      id: 'vitamin-d3-k2',
      name: 'Vitamin D3 + K2 Complex',
      description:
        'Synergistic blend for optimal bone and cardiovascular health',
      price: 26.99,
      originalPrice: 32.99,
      rating: 4.8,
      reviews: 743,
      category: 'vitamins',
      image:
        'https://images.unsplash.com/photo-1550572017-edd951aa8855?w=400&h=400&fit=crop&auto=format',
      badges: ['High Potency'],
      benefits: ['Bone Health', 'Immune Function', 'Heart Support'],
      servings: 60,
    },
    {
      id: 'collagen-peptides',
      name: 'Grass-Fed Collagen Peptides',
      description:
        'Type I & III collagen for skin, hair, nails, and joint health',
      price: 35.99,
      originalPrice: 45.99,
      rating: 4.5,
      reviews: 1654,
      category: 'wellness',
      image:
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&auto=format',
      badges: ['Grass-Fed', 'Unflavored'],
      benefits: ['Skin Health', 'Joint Support', 'Hair & Nails'],
      servings: 30,
    },
  ]

  const filteredSupplements =
    activeCategory === 'all'
      ? supplements
      : supplements.filter(supplement => supplement.category === activeCategory)

  const qualityFeatures = [
    {
      icon: Shield,
      title: 'Third-Party Tested',
      description: 'All products independently verified for purity and potency',
    },
    {
      icon: Award,
      title: 'GMP Certified',
      description: 'Manufactured in FDA-registered, GMP-certified facilities',
    },
    {
      icon: Leaf,
      title: 'Clean Ingredients',
      description: 'No artificial colors, flavors, or unnecessary fillers',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* 🌟 Premium Supplements Hero */}
      <section className="section section-hero">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-green-700">
              Premium Health Supplements
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Scientifically-formulated supplements crafted with the same
              quality and care as our meals. Support your wellness journey with
              premium ingredients and proven results.
            </p>

            {/* Quality Badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {qualityFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-gray-600"
                >
                  <feature.icon className="w-6 h-6 text-green-600" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">
                      {feature.title}
                    </div>
                    <div className="text-sm">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex justify-center items-center gap-2 mt-8 text-sm text-gray-500">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span>4.8 stars from 8,000+ verified customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* 📂 Product Categories & Filter */}
      <section className="section">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* 🛒 Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSupplements.map(supplement => (
              <div
                key={supplement.id}
                className="card hover-lift overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={supplement.image}
                    alt={supplement.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex flex-wrap gap-2">
                      {supplement.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                  {supplement.originalPrice && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Save $
                        {(supplement.originalPrice - supplement.price).toFixed(
                          2
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {supplement.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {supplement.description}
                  </p>

                  {/* Benefits */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {supplement.benefits.slice(0, 3).map((benefit, idx) => (
                      <span
                        key={idx}
                        className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(supplement.rating) ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {supplement.rating} ({supplement.reviews} reviews)
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-700">
                        ${supplement.price}
                      </span>
                      {supplement.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${supplement.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {supplement.servings} servings
                    </div>
                  </div>

                  <button className="w-full btn btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔬 Quality Assurance */}
      <section className="section section-alternate">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Quality You Can Trust
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Every supplement is rigorously tested and manufactured to the
              highest standards, ensuring you get the purest, most effective
              products for your health journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center p-8">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Third-Party Tested
              </h3>
              <p className="text-gray-600">
                Independent laboratory verification for purity, potency, and
                safety of every batch.
              </p>
            </div>

            <div className="card text-center p-8">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                GMP Certified
              </h3>
              <p className="text-gray-600">
                Manufactured in FDA-registered facilities following Good
                Manufacturing Practices.
              </p>
            </div>

            <div className="card text-center p-8">
              <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Clean Formulation
              </h3>
              <p className="text-gray-600">
                No artificial colors, flavors, or unnecessary fillers - just
                pure, effective ingredients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 CTA Section */}
      <section className="section section-hero">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6 text-green-700">
            Ready to Enhance Your Wellness?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands who trust our premium supplements to support their
            health goals. Start your journey to optimal wellness today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg">
              Shop All Supplements
            </button>
            <button className="btn btn-outline btn-lg">
              Take Wellness Quiz
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SupplementsPage
