import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Star, CheckCircle, Sparkles } from 'lucide-react';
import { 
  FadeIn, 
  StaggeredAnimation, 
  Floating, 
  MorphButton, 
  GradientText, 
  Typewriter 
} from './AnimationComponents';
import EatRiteLogo from './EatRiteLogo';

const EnhancedHero: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showTypewriter, setShowTypewriter] = useState(false);

  const testimonials = [
    { text: "Factor changed my life! Down 15 lbs in 2 months.", author: "Sarah M." },
    { text: "Finally, healthy meals that actually taste amazing.", author: "Mike R." },
    { text: "Perfect for my busy lifestyle. No prep, all flavor!", author: "Jessica L." }
  ];

  const stats = [
    { value: "2M+", label: "Meals Delivered" },
    { value: "50K+", label: "Happy Customers" },
    { value: "4.8★", label: "Average Rating" },
    { value: "30+", label: "Meal Options" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowTypewriter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Shapes */}
        <Floating intensity="subtle" speed="slow" className="absolute top-20 left-10">
          <div className="w-32 h-32 bg-gradient-to-r from-green-300/20 to-blue-300/20 rounded-full blur-xl" />
        </Floating>
        
        <Floating intensity="normal" speed="normal" className="absolute top-40 right-20">
          <div className="w-24 h-24 bg-gradient-to-r from-orange-300/20 to-pink-300/20 rounded-full blur-xl" />
        </Floating>
        
        <Floating intensity="strong" speed="fast" className="absolute bottom-32 left-1/4">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-300/20 to-blue-300/20 rounded-full blur-xl" />
        </Floating>

        {/* Sparkle Animation */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 12}%`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <Floating intensity="subtle" speed="slow">
                <Sparkles className="w-4 h-4 text-yellow-400/40" />
              </Floating>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Content */}
          <div className="space-y-8">
            
            {/* Brand Logo */}
            <FadeIn direction="down" delay={100}>
              <div className="flex items-center space-x-4 mb-4">
                <EatRiteLogo size="xl" className="drop-shadow-2xl" />
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  EatRite
                </div>
              </div>
            </FadeIn>

            {/* Badge */}
            <FadeIn direction="down" delay={200}>
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-green-200 shadow-lg">
                <Star className="w-4 h-4 text-yellow-500 mr-2 fill-current" />
                <span className="text-sm font-medium text-gray-700">
                  #1 Rated Meal Delivery Service
                </span>
              </div>
            </FadeIn>

            {/* Main Headline */}
            <div className="space-y-4">
              <FadeIn direction="up" delay={400}>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <GradientText gradient="forest" className="block">
                    Fresh Meals
                  </GradientText>
                  <span className="text-gray-900">Delivered</span>
                </h1>
              </FadeIn>

              <FadeIn direction="up" delay={600}>
                <div className="text-2xl lg:text-3xl font-medium text-gray-600 h-16">
                  {showTypewriter && (
                    <Typewriter
                      text="Chef-crafted. Nutritionist-approved. Ready in 2 minutes."
                      speed={80}
                      className="text-gray-700"
                    />
                  )}
                </div>
              </FadeIn>
            </div>

            {/* Description */}
            <FadeIn direction="up" delay={800}>
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                Skip the meal prep, planning, and cleanup. Get fresh, never-frozen, 
                fully prepared meals delivered to your door weekly.
              </p>
            </FadeIn>

            {/* Features List */}
            <FadeIn direction="up" delay={1000}>
              <StaggeredAnimation className="space-y-3" stagger={150}>
                {[
                  "Weekly menu of 30+ dietitian-approved meals",
                  "Fresh ingredients, never frozen",
                  "2-minute heat & eat convenience",
                  "Flexible subscriptions, skip or cancel anytime"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </StaggeredAnimation>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn direction="up" delay={1200}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <MorphButton 
                  variant="primary" 
                  size="lg"
                  className="group"
                >
                  <div className="flex items-center justify-center">
                    <span>Start Your Plan</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </MorphButton>
                
                <MorphButton 
                  variant="secondary" 
                  size="lg"
                  className="group bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-700 hover:bg-white"
                >
                  <div className="flex items-center justify-center">
                    <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    <span>Watch How It Works</span>
                  </div>
                </MorphButton>
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn direction="up" delay={1400}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-gray-200/50">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-green-600">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <FadeIn direction="left" delay={800}>
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=700&fit=crop&auto=format&q=80"
                    alt="Fresh prepared meals"
                    className="w-full h-96 lg:h-[500px] object-cover"
                  />
                  
                  {/* Overlay Elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Floating Rating Badge */}
                  <Floating intensity="subtle" className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-bold">4.9</span>
                      </div>
                    </div>
                  </Floating>

                  {/* Meal Info Card */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <h3 className="font-bold text-gray-900 mb-1">Mediterranean Salmon</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        with Lemon Herb Quinoa & Roasted Vegetables
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-green-600">$12.50</span>
                        <div className="text-xs text-gray-500">
                          510 cal • 36g protein
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <Floating intensity="normal" className="absolute -top-4 -left-4 z-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 blur-lg" />
                </Floating>
                
                <Floating intensity="strong" className="absolute -bottom-6 -right-6 z-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-20 blur-lg" />
                </Floating>
              </div>
            </FadeIn>

            {/* Testimonial Carousel */}
            <FadeIn direction="up" delay={1600}>
              <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div className="transition-all duration-500 ease-in-out">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">5.0</span>
                  </div>
                  
                  <blockquote className="text-gray-700 italic mb-3">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  
                  <cite className="text-sm font-semibold text-green-600">
                    — {testimonials[currentTestimonial].author}
                  </cite>
                </div>
                
                {/* Testimonial Indicators */}
                <div className="flex space-x-2 mt-4">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentTestimonial ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <FadeIn direction="up" delay={2000}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 text-gray-400">
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-gray-400" />
            <div className="animate-bounce">
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default EnhancedHero;