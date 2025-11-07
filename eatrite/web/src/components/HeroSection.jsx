import React from 'react'

/**
 * Hero section with navigation and main value proposition
 * Sets the tone for the entire Eatrite experience
 */
const HeroSection = () => {
  // Navigate to different sections smoothly
  const navigateToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero">
      {/* Top navigation */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="logo">
            <h2>🍃 Eatrite</h2>
          </div>
          <ul className="nav-menu">
            <li>
              <button 
                onClick={() => navigateToSection('how-it-works')}
                className="nav-button"
              >
                How It Works
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateToSection('questionnaire')}
                className="nav-button"
              >
                Get Started
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateToSection('nutrition-plans')}
                className="nav-button"
              >
                Plans
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero content */}
      <div className="hero-main">
        <div className="hero-text">
          <h1>
            Transform Your Health with 
            <span className="text-highlight"> Personalized Nutrition</span>
          </h1>
          <p className="hero-subtitle">
            Get custom meal plans designed for your unique body, goals, and lifestyle. 
            Fresh, nutritious meals delivered straight to your door.
          </p>
          <div className="hero-buttons">
            <button 
              className="button-primary"
              onClick={() => navigateToSection('questionnaire')}
            >
              Start Your Journey
            </button>
            <button 
              className="button-secondary"
              onClick={() => navigateToSection('how-it-works')}
            >
              Learn More
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="food-showcase">
            <div className="food-icon">🥗</div>
            <h3>Healthy Meals</h3>
            <p>Crafted by experts</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection