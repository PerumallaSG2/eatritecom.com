const NutritionCoachingPage = () => {
  const dietitians = [
    {
      name: "Valentina, RD, LDN, CSSD",
      description: "Valentina is a registered dietitian with experience in sports nutrition and weight management. She believes that all foods can fit in a nutritious diet and that habit change is at the core of long-term success.",
      image: "👩‍⚕️"
    },
    {
      name: "DeAndrea MS, RDN, LDN, ACSM-CPT",
      description: "DeAndrea is a registered dietitian nutritionist who promotes a flexible approach to eating by encouraging individuals to enjoy diverse foods without rigid restrictions, focusing on a balanced intake to maintain a healthy lifestyle.",
      image: "👨‍⚕️"
    },
    {
      name: "Jordan, MS, RDN, LDN",
      description: "Jordan is a registered dietitian with experience in weight management and bariatric surgery. She believes that small changes in diet and lifestyle can lead to sustainable progress towards health-related goals.",
      image: "👩‍⚕️"
    }
  ]

  const testimonials = [
    {
      text: "I'm on my second box and I'm very pleased! Portioned, healthy meals readily available within 3 minutes. Such a time saver and the peace of mind is priceless! I definitely see myself reaching my weight loss goals even faster because of this service. I also love how there are updated options on a weekly basis so I can try meals I haven't tried before.",
      author: "Amanda"
    },
    {
      text: "My dietitian was very helpful, and stuck closely to what my goals for the call were. She clearly knew what she was talking about and I walked away feeling like I have an idea of what to try next!",
      author: "Devon"
    },
    {
      text: "I had a few questions and she was able to quickly and clearly answer them for me. I feel more confident in placing my next week's order that it will be perfect for my family!",
      author: "Holly"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-factor-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-factor-hero text-factor-gray-900 mb-6">
            Nutrition Coaching by Factor
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <div className="flex items-center text-factor-gray-700">
              <span className="text-factor-green-600 mr-2">✓</span>
              Free one-on-one access to your expert
            </div>
            <div className="flex items-center text-factor-gray-700">
              <span className="text-factor-green-600 mr-2">✓</span>
              Personalized meal guidance
            </div>
            <div className="flex items-center text-factor-gray-700">
              <span className="text-factor-green-600 mr-2">✓</span>
              Nutrition & lifestyle recommendations
            </div>
          </div>
          <button className="btn-factor-primary text-lg px-8 py-4">
            TALK TO A DIETITIAN
          </button>
        </div>
      </section>

      {/* What To Expect Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-factor-heading text-factor-gray-900 mb-12 text-center">
            What To Expect
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-factor-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-semibold text-factor-gray-900 mb-4">
                Free 1:1 Coaching Session
              </h3>
              <p className="text-factor-gray-600">
                Whether you are thinking about Factor or are already a customer looking for nutrition guidance, schedule a free 20 minute phone call with one of our expert dietitians!
              </p>
            </div>

            <div className="text-center">
              <div className="bg-factor-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-factor-gray-900 mb-4">
                Nutrition & Lifestyle Recommendations
              </h3>
              <p className="text-factor-gray-600">
                Reach your goals with science-based nutrition guidance - whether it's weight management, a diet revamp or supporting athletic performance.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-factor-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="text-xl font-semibold text-factor-gray-900 mb-4">
                Personalized Factor Meal Guidance
              </h3>
              <p className="text-factor-gray-600">
                We can help you choose meals that fit your nutrition goals, lifestyle, and dietary preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Team Section */}
      <section className="py-20 bg-factor-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-factor-heading text-factor-gray-900 mb-12 text-center">
            Meet The Team That's Here to Support Your Goals
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {dietitians.map((dietitian, index) => (
              <div key={index} className="card-factor p-6 text-center">
                <div className="text-6xl mb-4">{dietitian.image}</div>
                <h3 className="text-lg font-semibold text-factor-gray-900 mb-3">
                  {dietitian.name}
                </h3>
                <p className="text-factor-gray-600 text-sm">
                  {dietitian.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="btn-factor-secondary">
              VIEW THE FULL TEAM
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-factor-heading text-factor-gray-900 mb-12 text-center">
            Testimonials
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-factor p-6">
                <p className="text-factor-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="text-factor-gray-900 font-semibold">
                  - {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <section className="py-20 bg-factor-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-factor-heading text-factor-gray-900 mb-6">
            Get In Touch
          </h2>
          <p className="text-factor-subheading mb-8">
            Just have a quick question and not interested in a 1:1 yet? Ask us your questions via email.
          </p>
          
          <div className="card-factor p-8 mb-8">
            <h3 className="text-xl font-semibold text-factor-gray-900 mb-4">
              Ask Us Anything
            </h3>
            <p className="text-factor-gray-600 mb-6">
              Connect with your Registered Dietitian via email and get your nutrition questions answered
            </p>
            <button className="btn-factor-primary">
              EMAIL THE TEAM
            </button>
          </div>

          {/* FAQ Section */}
          <div className="text-left">
            <h3 className="text-factor-2xl font-bold text-factor-gray-900 mb-6">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              <div className="card-factor p-4">
                <h4 className="font-semibold text-factor-gray-900">
                  What can I expect from my Registered Dietitian (RD)?
                </h4>
              </div>
              <div className="card-factor p-4">
                <h4 className="font-semibold text-factor-gray-900">
                  Will my session be conducted via zoom, google meet or phone call?
                </h4>
              </div>
              <div className="card-factor p-4">
                <h4 className="font-semibold text-factor-gray-900">
                  What are the eligibility requirements for the coaching session?
                </h4>
              </div>
              <div className="card-factor p-4">
                <h4 className="font-semibold text-factor-gray-900">
                  How long are coaching sessions?
                </h4>
              </div>
              <div className="card-factor p-4">
                <h4 className="font-semibold text-factor-gray-900">
                  How many free nutrition coaching sessions do you offer?
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NutritionCoachingPage