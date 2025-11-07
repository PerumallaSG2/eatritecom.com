import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>🍃 Eatrite</h3>
              <p>Transforming lives through personalized nutrition and healthy meal delivery.</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#plans">Plans & Pricing</a></li>
              <li><a href="#questionnaire">Get Started</a></li>
              <li><a href="#about">About Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#nutrition">Nutrition Resources</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
              <li><a href="#refund">Refund Policy</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#facebook" aria-label="Facebook">📘</a>
              <a href="#instagram" aria-label="Instagram">📷</a>
              <a href="#twitter" aria-label="Twitter">🐦</a>
              <a href="#youtube" aria-label="YouTube">📺</a>
            </div>
            <p className="contact-info">
              📧 sairam.perumalla@eatrite.com<br/>
              📞 1-800-EAT-RITE
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>&copy; 2025 Eatrite. All rights reserved.</p>
            <p className="developer-credit">
              Designed & Developed by <strong>Sairam Perumalla</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer