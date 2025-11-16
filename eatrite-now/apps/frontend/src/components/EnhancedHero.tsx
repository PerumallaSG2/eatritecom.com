import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Star, Zap, Award } from 'lucide-react';

const EnhancedHero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0F2B1E] via-[#0A2418] to-[#0F2B1E]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute top-20 left-20 w-32 h-32 bg-[#D4B46A] rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-32 right-32 w-40 h-40 bg-[#FF6B35] rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#D4B46A] rounded-full blur-2xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            animationDelay: '0.5s'
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Icons */}
        <div className="absolute top-32 left-16 animate-bounce" style={{ animationDelay: '0s' }}>
          <Star className="w-6 h-6 text-[#D4B46A]/30" />
        </div>
        <div className="absolute top-48 right-24 animate-bounce" style={{ animationDelay: '1s' }}>
          <Zap className="w-8 h-8 text-[#FF6B35]/30" />
        </div>
        <div className="absolute bottom-48 left-32 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <Award className="w-7 h-7 text-[#D4B46A]/30" />
        </div>
        
        {/* Floating Gradient Orbs */}
        <div className="absolute top-64 right-16 w-16 h-16 bg-gradient-to-br from-[#D4B46A]/20 to-transparent rounded-full animate-ping"></div>
        <div className="absolute bottom-64 left-48 w-12 h-12 bg-gradient-to-br from-[#FF6B35]/20 to-transparent rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          
          {/* Left Side - Content */}
          <div className="space-y-12 max-w-2xl">
            {/* Large Headline */}
            <div className="space-y-6">
              <h1 
                className="text-6xl lg:text-8xl font-bold leading-tight text-[#F5F2E8] tracking-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Fresh Meals
                <br />
                <span className="text-[#D4B46A]">Delivered Daily</span>
              </h1>
              
              {/* Subheading */}
              <p 
                className="text-2xl lg:text-3xl text-[#F5F2E8]/90 leading-relaxed font-light max-w-xl"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Chef-prepared, nutritionist designed meals delivered fresh to your door.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              {/* View Menu Button - Gold */}
              <button 
                className="bg-gradient-to-r from-[#D4B46A] to-[#B8964E] hover:from-[#B8964E] hover:to-[#D4B46A] text-[#0F2B1E] font-bold px-10 py-5 rounded-full transition-all duration-500 hover:scale-110 hover:shadow-2xl shadow-xl text-xl flex items-center justify-center group relative overflow-hidden"
                style={{ fontFamily: 'Playfair Display, serif' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10">View Menu</span>
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-all duration-300 relative z-10" />
              </button>
              
              {/* How It Works Button - Off White */}
              <button 
                className="bg-[#F5F2E8] hover:bg-white text-[#0F2B1E] font-bold px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg text-xl border-2 border-[#D4B46A]/30 hover:border-[#D4B46A] group relative overflow-hidden"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4B46A]/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <span className="relative z-10">How It Works</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-6">
              <div className="flex items-center gap-2 text-[#D4B46A]">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-[#F5F2E8] font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                  4.9/5 from 12K+ reviews
                </span>
              </div>
              <div className="h-8 w-px bg-[#D4B46A]/30"></div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D4B46A]" />
                <span className="text-[#F5F2E8]/80 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Award-winning cuisine
                </span>
              </div>
            </div>

            {/* Additional descriptive text */}
            <div className="pt-8 border-t border-[#D4B46A]/20">
              <p 
                className="text-lg text-[#F5F2E8]/80 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Skip the meal prep and grocery shopping. Our expert chefs craft every meal with premium ingredients, while our nutritionists ensure perfect balance for your health goals.
              </p>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative flex items-center justify-center">
            <div className="relative">
              {/* Main Plate Image */}
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden p-8 transform hover:scale-105 transition-transform duration-500">
                {/* Placeholder for high-quality food image */}
                <div className="w-96 h-96 lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-[#F5EEDC] to-[#F5F2E8] rounded-2xl flex items-center justify-center shadow-inner">
                  <div className="text-center space-y-4">
                    {/* Food Image Placeholder - Replace with actual image */}
                    <div className="w-80 h-80 bg-gradient-to-br from-orange-100 via-green-50 to-red-50 rounded-full mx-auto shadow-2xl relative overflow-hidden">
                      {/* Simulated Chicken Breast */}
                      <div className="absolute top-20 left-20 w-40 h-24 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full transform rotate-12 shadow-lg"></div>
                      {/* Simulated Risotto */}
                      <div className="absolute bottom-24 left-16 w-44 h-20 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full shadow-md"></div>
                      {/* Simulated Spinach */}
                      <div className="absolute top-32 right-20 w-20 h-16 bg-gradient-to-br from-green-300 to-green-400 rounded-full transform -rotate-12 shadow-md"></div>
                      {/* Simulated Cherry Tomatoes */}
                      <div className="absolute bottom-32 right-24 w-8 h-8 bg-gradient-to-br from-red-400 to-red-500 rounded-full shadow-md"></div>
                      <div className="absolute bottom-28 right-16 w-6 h-6 bg-gradient-to-br from-red-400 to-red-500 rounded-full shadow-md"></div>
                    </div>
                    
                    <div className="text-center space-y-2">
                      <h3 
                        className="text-2xl font-bold text-[#0F2B1E]"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        Herb-Crusted Chicken
                      </h3>
                      <p 
                        className="text-[#0F2B1E]/70"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Over risotto with spinach & cherry tomatoes
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Price Tag */}
                <div className="absolute -top-4 -right-4 z-20">
                  <div className="relative group">
                    <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8A5C] text-white px-6 py-3 rounded-full shadow-2xl transform rotate-12 hover:rotate-6 transition-all duration-500 hover:scale-110 group-hover:shadow-3xl animate-pulse">
                      <span 
                        className="text-xl font-bold tracking-wide"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        $11.50
                      </span>
                      <span className="text-sm opacity-90 block -mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        per meal
                      </span>
                    </div>
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-[#FF6B35] rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500 -z-10 transform rotate-12 group-hover:rotate-6"></div>
                    
                    {/* Special Offer Badge */}
                    <div className="absolute -top-2 -left-2 bg-[#D4B46A] text-[#0F2B1E] text-xs font-bold px-2 py-1 rounded-full transform -rotate-12 animate-bounce">
                      NEW
                    </div>
                  </div>
                </div>
              </div>

              {/* Rich Shadow Elements */}
              <div className="absolute -bottom-6 -right-6 w-96 h-96 lg:w-[500px] lg:h-[500px] bg-[#D4B46A]/20 rounded-3xl blur-2xl z-0"></div>
              <div className="absolute -top-6 -left-6 w-96 h-96 lg:w-[500px] lg:h-[500px] bg-[#FF6B35]/10 rounded-3xl blur-3xl z-0"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-3 text-[#D4B46A]/60">
          <div className="text-sm font-medium tracking-wider uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
            Scroll
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-[#D4B46A]/60 to-transparent"></div>
          <div className="w-2 h-2 bg-[#D4B46A]/60 rounded-full animate-bounce"></div>
        </div>
      </div>
      
      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#D4B46A]/20 via-[#D4B46A]/30 to-[#D4B46A]/20 backdrop-blur-sm border-t border-[#D4B46A]/40">
        <div className="max-w-8xl mx-auto px-8 lg:px-12 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* 50K+ Customers */}
            <div className="space-y-2">
              <div 
                className="text-4xl lg:text-5xl font-bold text-[#D4B46A] tracking-wide"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                50K+
              </div>
              <div 
                className="text-lg lg:text-xl font-semibold text-[#0A2418] tracking-wide"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Customers
              </div>
            </div>

            {/* 4.8★ Rating */}
            <div className="space-y-2">
              <div 
                className="text-4xl lg:text-5xl font-bold text-[#D4B46A] tracking-wide flex items-center justify-center gap-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                4.8
                <span className="text-yellow-400">★</span>
              </div>
              <div 
                className="text-lg lg:text-xl font-semibold text-[#0A2418] tracking-wide"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Rating
              </div>
            </div>

            {/* 500+ Meals Created */}
            <div className="space-y-2">
              <div 
                className="text-4xl lg:text-5xl font-bold text-[#D4B46A] tracking-wide"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                500+
              </div>
              <div 
                className="text-lg lg:text-xl font-semibold text-[#0A2418] tracking-wide"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Meals Created
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHero;