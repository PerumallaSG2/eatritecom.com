import React from 'react'

/**
 * Footer component with site navigation and required developer credit
 * Includes comprehensive links and contact information
 */
const Footer = () => {
  const currentYear = new Date().getFullYear()

  // Footer navigation sections organized logically
  const footerSections = [
    {
      title: 'Company',
      links: [
        { text: 'About Eatrite', href: '#about' },
        { text: 'How It Works', href: '#how-it-works' },
        { text: 'Our Mission', href: '#mission' },
        { text: 'Careers', href: '#careers' }
      ]
    },
    {
      title: 'Support',
      links: [
        { text: 'Help Center', href: '#help' },
        { text: 'Contact Support', href: '#contact' },
        { text: 'FAQ', href: '#faq' },
        { text: 'Live Chat', href: '#chat' }
      ]
    },
    {
      title: 'Services',
      links: [
        { text: 'Nutrition Plans', href: '#nutrition-plans' },
        { text: 'Meal Delivery', href: '#delivery' },
        { text: 'Gift Subscriptions', href: '#gifts' },
        { text: 'Corporate Wellness', href: '#corporate' }
      ]
    }
  ]

  // Handle navigation clicks with smooth scrolling
  const handleNavigation = (href, event) => {
    event.preventDefault()
    if (href.startsWith('#')) {
      const targetElement = document.querySelector(href)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          {/* Brand section */}
          <div className="footer-brand">
            <div className="brand-info">
              <h3>🍃 Eatrite</h3>
              <p className="brand-tagline">
                Transforming lives through personalized nutrition and fresh meal delivery. 
                Your health journey starts with the right food choices.
              </p>
            </div>
            <div className="social-media">
              <a href="#facebook" className="social-icon" aria-label="Follow on Facebook">📘</a>
              <a href="#instagram" className="social-icon" aria-label="Follow on Instagram">📷</a>
              <a href="#twitter" className="social-icon" aria-label="Follow on Twitter">🐦</a>
              <a href="#linkedin" className="social-icon" aria-label="Connect on LinkedIn">💼</a>
            </div>
          </div>

          {/* Navigation sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="footer-section">
              <h4 className="footer-heading">{section.title}</h4>
              <ul className="footer-links">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <a 
                      href={link.href}
                      className="footer-link"
                      onClick={(e) => handleNavigation(link.href, e)}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact information */}
          <div className="footer-section">
            <h4 className="footer-heading">Get in Touch</h4>
            <div className="contact-details">
              <p className="contact-item">
                <span className="contact-icon">📧</span>
                sairam.perumalla@eatrite.com
              </p>
              <p className="contact-item">
                <span className="contact-icon">📞</span>
                1-800-EATRITE
              </p>
              <p className="contact-item">
                <span className="contact-icon">📍</span>
                San Francisco, CA
              </p>
            </div>
          </div>
        </div>

        {/* Footer bottom with copyright and developer credit */}
        <div className="footer-bottom">
          <div className="footer-separator"></div>
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} Eatrite. All rights reserved.</p>
            </div>
            
            {/* Required developer credit */}
            <div className="developer-credit">
              <p>Web Design by <strong>Sairam Perumalla</strong></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer