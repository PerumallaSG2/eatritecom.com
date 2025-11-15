/**
 * Premium EatRite Homepage
 * Luxury homepage with brand-matching gold-on-dark-green aesthetic
 */

import React from 'react';
import { ArrowRight, Star, Shield, Truck, Leaf, Crown, CheckCircle } from 'lucide-react';
import { PremiumButton, PremiumCard, PremiumBadge } from '../components/premium/PremiumComponents';
import { PremiumNavbar } from '../components/premium/PremiumNavbar';

// Brand colors
const BRAND_COLORS = {
  gold: '#D4B46A',
  darkGreen: '#0F2B1E',
  softBlack: '#0A0A0A',
  offWhite: '#F5F2E8',
  surfaceSecondary: '#152D22',
  surfaceTertiary: '#1A3327',
  textSecondary: '#E0DDD5',
  textTertiary: '#B8B5AD',
};

export const PremiumHomePage: React.FC = () => {
  const pageStyle: React.CSSProperties = {
    backgroundColor: BRAND_COLORS.darkGreen,
    color: BRAND_COLORS.offWhite,
    minHeight: '100vh',
    fontFamily: '"Inter", sans-serif',
  };

  const heroStyle: React.CSSProperties = {
    background: `linear-gradient(135deg, ${BRAND_COLORS.darkGreen} 0%, ${BRAND_COLORS.surfaceSecondary} 100%)`,
    padding: '120px 24px 80px',
    textAlign: 'center' as const,
    position: 'relative' as const,
    overflow: 'hidden',
  };

  const heroContentStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative' as const,
    zIndex: 2,
  };

  const heroTitleStyle: React.CSSProperties = {
    fontFamily: '"Playfair Display", serif',
    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: '24px',
    background: `linear-gradient(135deg, ${BRAND_COLORS.gold}, #E6CD7A)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: `0 0 40px rgba(212, 180, 106, 0.3)`,
  };

  const heroSubtitleStyle: React.CSSProperties = {
    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
    lineHeight: 1.6,
    marginBottom: '40px',
    color: BRAND_COLORS.textSecondary,
    maxWidth: '600px',
    margin: '0 auto 40px',
  };

  const sectionStyle: React.CSSProperties = {
    padding: '80px 24px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: '"Playfair Display", serif',
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 600,
    textAlign: 'center' as const,
    marginBottom: '16px',
    color: BRAND_COLORS.offWhite,
  };

  const sectionSubtitleStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    textAlign: 'center' as const,
    marginBottom: '64px',
    color: BRAND_COLORS.textSecondary,
    maxWidth: '600px',
    margin: '0 auto 64px',
  };

  // Featured meals data
  const featuredMeals = [
    {
      id: 1,
      name: 'Truffle Risotto',
      description: 'Luxury Italian risotto with black truffle and gold leaf',
      price: 45,
      image: '/api/placeholder/300/200',
      badge: 'Premium',
    },
    {
      id: 2,
      name: 'Wagyu Beef Bowl',
      description: 'Premium Japanese wagyu with seasonal vegetables',
      price: 65,
      image: '/api/placeholder/300/200',
      badge: 'Exclusive',
    },
    {
      id: 3,
      name: 'Lobster Thermidor',
      description: 'Classic French lobster with herb butter sauce',
      price: 55,
      image: '/api/placeholder/300/200',
      badge: 'Chef\'s Choice',
    },
  ];

  const benefits = [
    {
      icon: <Crown size={32} />,
      title: 'Premium Quality',
      description: 'Michelin-starred chefs craft every meal with the finest ingredients.',
    },
    {
      icon: <Shield size={32} />,
      title: 'Health Guaranteed',
      description: 'Nutritionist-approved meals that nourish your body and soul.',
    },
    {
      icon: <Truck size={32} />,
      title: 'White-Glove Delivery',
      description: 'Elegant packaging delivered fresh to your doorstep daily.',
    },
    {
      icon: <Leaf size={32} />,
      title: 'Sustainable Luxury',
      description: 'Eco-conscious sourcing with zero compromise on quality.',
    },
  ];

  return (
    <div style={pageStyle}>
      {/* Premium Navigation */}
      <PremiumNavbar cartCount={3} />

      {/* Hero Section */}
      <section style={heroStyle}>
        {/* Floating gold particles background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `radial-gradient(circle at 20% 30%, ${BRAND_COLORS.gold} 1px, transparent 1px),
                       radial-gradient(circle at 80% 70%, ${BRAND_COLORS.gold} 1px, transparent 1px),
                       radial-gradient(circle at 40% 80%, ${BRAND_COLORS.gold} 1px, transparent 1px)`,
          backgroundSize: '100px 100px, 150px 150px, 120px 120px',
          animation: 'gentle-float 20s ease-in-out infinite',
        }} />

        <div style={heroContentStyle}>
          <h1 style={heroTitleStyle}>
            Luxury Meals, Delivered Fresh
          </h1>
          
          <p style={heroSubtitleStyle}>
            Experience culinary excellence with our premium meal delivery service. 
            Crafted by award-winning chefs using the world's finest ingredients.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <PremiumButton size="lg" rightIcon={<ArrowRight size={20} />}>
              Explore Premium Meals
            </PremiumButton>
            
            <PremiumButton variant="secondary" size="lg">
              View Our Story
            </PremiumButton>
          </div>

          {/* Social Proof */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '24px', 
            marginTop: '48px',
            flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill={BRAND_COLORS.gold} color={BRAND_COLORS.gold} />
              ))}
              <span style={{ color: BRAND_COLORS.textSecondary, marginLeft: '8px' }}>
                4.9/5 from 10,000+ customers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Meals Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Featured Luxury Collection</h2>
        <p style={sectionSubtitleStyle}>
          Handpicked premium meals that represent the pinnacle of culinary artistry
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '32px',
          marginBottom: '48px',
        }}>
          {featuredMeals.map((meal) => (
            <PremiumCard key={meal.id} variant="elevated" goldAccent>
              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <img
                  src={meal.image}
                  alt={meal.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    backgroundColor: BRAND_COLORS.surfaceTertiary,
                  }}
                />
                <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                  <PremiumBadge variant="primary" size="sm">
                    {meal.badge}
                  </PremiumBadge>
                </div>
              </div>
              
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.5rem',
                fontWeight: 600,
                marginBottom: '8px',
                color: BRAND_COLORS.offWhite,
              }}>
                {meal.name}
              </h3>
              
              <p style={{
                color: BRAND_COLORS.textSecondary,
                marginBottom: '20px',
                lineHeight: 1.6,
              }}>
                {meal.description}
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: BRAND_COLORS.gold,
                }}>
                  ${meal.price}
                </span>
                
                <PremiumButton size="sm">
                  Add to Cart
                </PremiumButton>
              </div>
            </PremiumCard>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <PremiumButton variant="secondary" size="lg" rightIcon={<ArrowRight size={20} />}>
            View Full Menu
          </PremiumButton>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{
        ...sectionStyle,
        backgroundColor: BRAND_COLORS.surfaceSecondary,
        margin: '0',
        padding: '80px 24px',
      }}>
        <h2 style={sectionTitleStyle}>The EatRite Promise</h2>
        <p style={sectionSubtitleStyle}>
          Experience the difference that luxury and attention to detail can make
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
        }}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center' as const,
                padding: '32px 20px',
              }}
            >
              <div style={{
                color: BRAND_COLORS.gold,
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
              }}>
                {benefit.icon}
              </div>
              
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.5rem',
                fontWeight: 600,
                marginBottom: '12px',
                color: BRAND_COLORS.offWhite,
              }}>
                {benefit.title}
              </h3>
              
              <p style={{
                color: BRAND_COLORS.textSecondary,
                lineHeight: 1.6,
              }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        ...sectionStyle,
        textAlign: 'center' as const,
        background: `linear-gradient(135deg, ${BRAND_COLORS.darkGreen}, ${BRAND_COLORS.softBlack})`,
        margin: '0',
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          <h2 style={{
            ...sectionTitleStyle,
            marginBottom: '24px',
          }}>
            Ready to Elevate Your Dining?
          </h2>
          
          <p style={{
            ...sectionSubtitleStyle,
            marginBottom: '40px',
          }}>
            Join thousands of discerning customers who trust EatRite for their premium meal experience.
          </p>

          <PremiumButton size="xl" rightIcon={<ArrowRight size={24} />}>
            Start Your Culinary Journey
          </PremiumButton>

          {/* Trust indicators */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            marginTop: '48px',
            flexWrap: 'wrap',
            color: BRAND_COLORS.textTertiary,
            fontSize: '14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} color={BRAND_COLORS.gold} />
              <span>No commitment</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} color={BRAND_COLORS.gold} />
              <span>Free delivery</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} color={BRAND_COLORS.gold} />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};