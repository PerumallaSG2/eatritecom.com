import { useState } from 'react'
import { Calendar, Clock, CheckCircle, Star, ArrowRight, User, Phone, Video, MessageCircle } from 'lucide-react'

const NutritionCoachingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('individual')

  const coachingPlans = [
    {
      id: 'individual',
      name: 'Individual Coaching',
      description: 'One-on-one personalized nutrition coaching',
      price: 89.99,
      duration: '60 minutes',
      features: [
        'Personalized nutrition assessment',
        'Custom meal planning',
        'Goal setting & tracking',
        'Follow-up support via email',
        'Recipe recommendations'
      ],
      popular: true
    },
    {
      id: 'package',
      name: 'Coaching Package',
      description: '3-session comprehensive program',
      price: 229.99,
      duration: '3 sessions',
      features: [
        'Initial 90-minute assessment',
        'Two 45-minute follow-ups',
        'Personalized nutrition plan',
        'Weekly meal prep guidance',
        'Continuous chat support',
        'Progress tracking tools'
      ],
      popular: false
    },
    {
      id: 'group',
      name: 'Group Coaching',
      description: 'Small group nutrition workshops',
      price: 39.99,
      duration: '90 minutes',
      features: [
        'Interactive group sessions (max 8 people)',
        'Educational workshops',
        'Peer support community',
        'Group challenges & motivation',
        'Shared resources & tips'
      ],
      popular: false
    }
  ]

  const dietitians = [
    {
      id: 'valentina',
      name: 'Valentina Rodriguez, RD, LDN, CSSD',
      title: 'Sports Nutrition Specialist',
      experience: '8 years',
      specialties: ['Sports Nutrition', 'Weight Management', 'Metabolic Health'],
      description: 'Valentina specializes in sports nutrition and sustainable weight management. She believes in flexible eating approaches and evidence-based strategies for long-term health success.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&auto=format',
      rating: 4.9,
      sessions: 500
    },
    {
      id: 'deandrea',
      name: 'DeAndrea Thompson, MS, RDN, LDN',
      title: 'Clinical Nutrition Expert',
      experience: '12 years',
      specialties: ['Clinical Nutrition', 'Digestive Health', 'Diabetes Management'],
      description: 'DeAndrea promotes flexible eating without rigid restrictions, focusing on balanced nutrition for sustainable lifestyle changes and optimal health outcomes.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&auto=format',
      rating: 4.8,
      sessions: 750
    },
    {
      id: 'jordan',
      name: 'Jordan Kim, MS, RDN, LDN',
      title: 'Behavioral Nutrition Specialist',
      experience: '6 years',
      specialties: ['Behavioral Change', 'Bariatric Surgery Support', 'Mindful Eating'],
      description: 'Jordan focuses on behavioral change and sustainable habits. She helps clients develop healthy relationships with food through evidence-based counseling techniques.',
      image: 'https://images.unsplash.com/photo-1594824942280-d4fee3dee5f5?w=400&h=400&fit=crop&auto=format',
      rating: 4.9,
      sessions: 380
    }
  ]

  const sessionTypes = [
    {
      icon: Video,
      name: 'Video Consultation',
      description: 'Face-to-face virtual sessions via secure video platform'
    },
    {
      icon: Phone,
      name: 'Phone Consultation',
      description: 'Convenient phone sessions that fit your schedule'
    },
    {
      icon: MessageCircle,
      name: 'Chat Support',
      description: 'Ongoing support via secure messaging between sessions'
    }
  ]

  const testimonials = [
    {
      text: "My dietitian helped me completely transform my relationship with food. The personalized approach made all the difference in reaching my health goals sustainably.",
      author: "Amanda K.",
      rating: 5,
      plan: "Individual Coaching"
    },
    {
      text: "The coaching package was incredible value. Having multiple sessions really helped me build lasting habits and see consistent progress over time.",
      author: "Devon M.", 
      rating: 5,
      plan: "Coaching Package"
    },
    {
      text: "Group coaching was perfect for me. Learning alongside others with similar goals provided amazing motivation and accountability.",
      author: "Holly R.",
      rating: 5,
      plan: "Group Coaching"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* 🎯 Hero Section */}
      <section className="section section-hero">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-green-700">
              Expert Nutrition Coaching
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Work with registered dietitians to create personalized nutrition plans that fit your lifestyle. 
              Get the guidance and support you need to achieve lasting health results.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Registered Dietitians</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Personalized Plans</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Ongoing Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📋 Coaching Plans */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Choose Your Coaching Plan</h2>
            <p className="text-gray-600">Flexible options to match your needs and goals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {coachingPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`card hover-lift p-8 cursor-pointer transition-all ${
                  selectedPlan === plan.id ? 'ring-2 ring-green-500 bg-green-50' : ''
                } ${plan.popular ? 'ring-2 ring-orange-400' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-green-700 mb-1">${plan.price}</div>
                    <div className="text-gray-500">{plan.duration}</div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`}>
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 👥 Meet Our Dietitians */}
      <section className="section section-alternate">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Meet Your Expert Dietitians</h2>
            <p className="text-gray-600">Registered professionals with specialized expertise in nutrition and wellness</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dietitians.map((dietitian) => (
              <div key={dietitian.id} className="card p-6 text-center hover-lift">
                <img
                  src={dietitian.image}
                  alt={dietitian.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                
                <h3 className="text-xl font-bold text-gray-800 mb-1">{dietitian.name}</h3>
                <p className="text-green-600 font-medium mb-2">{dietitian.title}</p>
                <p className="text-sm text-gray-500 mb-4">{dietitian.experience} experience</p>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {dietitian.specialties.map((specialty, idx) => (
                    <span key={idx} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 text-sm mb-4">{dietitian.description}</p>

                <div className="flex items-center justify-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{dietitian.rating}</span>
                  </div>
                  <div>{dietitian.sessions}+ sessions</div>
                </div>

                <button className="btn btn-outline w-full">
                  Book with {dietitian.name.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📱 Session Types */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Flexible Session Options</h2>
            <p className="text-gray-600">Choose the consultation format that works best for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sessionTypes.map((type, idx) => (
              <div key={idx} className="card p-8 text-center hover-lift">
                <type.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-3">{type.name}</h3>
                <p className="text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💬 Testimonials */}
      <section className="section section-alternate">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">What Our Clients Say</h2>
            <p className="text-gray-600">Real results from real people working with our nutrition experts</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="card p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-800">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.plan}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 CTA Section */}
      <section className="section section-hero">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6 text-green-700">
            Ready to Transform Your Nutrition?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take the first step towards better health with personalized nutrition coaching 
            from registered dietitians who care about your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg">
              Book Your Session
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="btn btn-outline btn-lg">
              Free Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NutritionCoachingPage