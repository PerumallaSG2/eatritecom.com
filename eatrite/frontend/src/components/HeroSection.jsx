import React from 'react'

/**
 * Hero section component with navigation and main call-to-action
 * Features the primary value proposition and navigation menu
 */
const HeroSection = () => {
  // Smooth scroll to specific sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero">
      {/* Navigation Header */}
      <nav className="navigation">
        <div className="nav-container">
          <div className="brand">
            <h2>🍃 Eatrite</h2>
          </div>
          <ul className="nav-links">
            <li>
              <button onClick={() => scrollToSection('how-it-works')} className="nav-link">
                How It Works
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('questionnaire')} className="nav-link">
                Get Started
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('plans')} className="nav-link">
                Plans
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Hero Content */}
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Transform Your Health with 
            <span className="highlight"> Personalized Nutrition</span>
          </h1>
          <p className="hero-description">
            Discover custom meal plans designed specifically for your body, lifestyle, and health goals. 
            Fresh, delicious meals delivered right to your door.
          </p>
          <div className="hero-actions">
            <button 
              className="cta-primary"
              onClick={() => scrollToSection('questionnaire')}
            >
              Start Your Journey
            </button>
            <button 
              className="cta-secondary"
              onClick={() => scrollToSection('how-it-works')}
            >
              Learn More
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="nutrition-showcase">
            <div className="meal-icon">🥗</div>
            <h3>Healthy Meals</h3>
            <p>Crafted by nutritionists</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection