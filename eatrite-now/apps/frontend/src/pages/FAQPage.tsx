const FAQPage = () => {
  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      color: 'bg-factor-green-100',
    },
    {
      id: 'managing-subscription',
      title: 'Managing My Subscription',
      color: 'bg-blue-100',
    },
    {
      id: 'nutrition-ingredients',
      title: 'Nutrition & Ingredients',
      color: 'bg-factor-orange-100',
    },
    {
      id: 'receiving-meals',
      title: 'Receiving My Meals',
      color: 'bg-purple-100',
    },
    {
      id: 'weight-management',
      title: 'Weight Management Program',
      color: 'bg-pink-100',
    },
    {
      id: 'enjoying-meals',
      title: 'Enjoying My Meals',
      color: 'bg-yellow-100',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-factor-heading text-factor-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
        </div>

        {/* FAQ Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {faqCategories.map(category => (
            <div
              key={category.id}
              className={`${category.color} rounded-factor-lg p-6 hover:shadow-factor-md transition-shadow cursor-pointer`}
            >
              <h3 className="text-lg font-semibold text-factor-gray-900 uppercase tracking-wide">
                {category.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Popular Questions */}
        <div className="space-y-8 mb-16">
          <h2 className="text-factor-3xl font-bold text-factor-gray-900 mb-8">
            Popular Questions
          </h2>

          <div className="card-factor p-6">
            <h3 className="text-xl font-semibold text-factor-gray-900 mb-4">
              What types of meals does Factor offer?
            </h3>
            <p className="text-factor-gray-600">
              Factor offers chef-prepared, fresh meals across 8 dietary
              preferences including High Protein, Keto, Carb Conscious, Calorie
              Smart, and more. All meals are fully prepared and ready to eat in
              just 2 minutes.
            </p>
          </div>

          <div className="card-factor p-6">
            <h3 className="text-xl font-semibold text-factor-gray-900 mb-4">
              Are Factor prepared meals fresh or frozen?
            </h3>
            <p className="text-factor-gray-600">
              All Factor meals are fresh, never frozen. They're prepared by our
              chefs and delivered in insulated packaging to maintain freshness.
            </p>
          </div>

          <div className="card-factor p-6">
            <h3 className="text-xl font-semibold text-factor-gray-900 mb-4">
              How long do the meals stay fresh?
            </h3>
            <p className="text-factor-gray-600">
              Factor meals stay fresh in your refrigerator for up to 7 days from
              delivery, giving you flexibility in your meal planning.
            </p>
          </div>

          <div className="card-factor p-6">
            <h3 className="text-xl font-semibold text-factor-gray-900 mb-4">
              Can I skip weeks or cancel anytime?
            </h3>
            <p className="text-factor-gray-600">
              Yes! You can skip weeks, pause, or cancel your subscription
              anytime with no fees or commitments. Manage everything easily
              through your account.
            </p>
          </div>

          <div className="card-factor p-6">
            <h3 className="text-xl font-semibold text-factor-gray-900 mb-4">
              What if I have allergies or dietary restrictions?
            </h3>
            <p className="text-factor-gray-600">
              Factor offers meals for various dietary needs. Each meal is
              clearly labeled with allergen information and nutritional details.
              We recommend consulting with our nutrition team for personalized
              guidance.
            </p>
          </div>

          <div className="card-factor p-6">
            <h3 className="text-xl font-semibold text-factor-gray-900 mb-4">
              How does delivery work?
            </h3>
            <p className="text-factor-gray-600">
              Your fresh meals arrive in an insulated, recyclable box 2-3 times
              per week depending on your plan. We deliver nationwide and you can
              track your delivery through our app.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-factor-gray-50 rounded-factor-lg p-8">
          <h2 className="text-factor-2xl font-bold text-factor-gray-900 mb-4">
            Can't find your answer?
          </h2>
          <p className="text-factor-gray-600 mb-6">
            Our customer support team is here to help with any questions you
            might have.
          </p>
          <button className="btn-factor-primary">Contact Us</button>
        </div>
      </div>
    </div>
  )
}

export default FAQPage
