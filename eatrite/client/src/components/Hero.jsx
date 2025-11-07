import React from 'react'

const Hero = () => {
  return (
    <section className="hero">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>🍃 Eatrite</h2>
          </div>
          <ul className="nav-menu">
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#plans">Plans</a></li>
            <li><a href="#questionnaire">Get Started</a></li>
          </ul>
        </div>
      </nav>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1>Transform Your Health with <span className="highlight">Personalized Nutrition</span></h1>
          <p>Get custom meal plans and healthy food delivery tailored specifically to your body, goals, and lifestyle. Start your journey to better health today.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => document.getElementById('questionnaire').scrollIntoView({behavior: 'smooth'})}>
              Start Your Journey
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('how-it-works').scrollIntoView({behavior: 'smooth'})}>
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-placeholder">
            <span>🥗</span>
            <p>Healthy Meals</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero