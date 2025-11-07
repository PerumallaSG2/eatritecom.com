import React from 'react'

/**
 * Footer component with site navigation and credit information
 * Includes the required developer credit as specified
 */
const Footer = () => {
  // Current year for copyright
  const currentYear = new Date().getFullYear()

  // Footer navigation sections
  const footerSections = [
    {
      title: 'Company',
      links: [
        { text: 'About Eatrite', href: '#about' },
        { text: 'How It Works', href: '#how-it-works' },
        { text: 'Our Story', href: '#story' },
        { text: 'Careers', href: '#careers' }
      ]
    },
    {
      title: 'Support',
      links: [
        { text: 'Help Center', href: '#help' },
        { text: 'Contact Us', href: '#contact' },
        { text: 'FAQ', href: '#faq' },
        { text: 'Live Chat', href: '#chat' }
      ]
    },
    {
      title: 'Plans',
      links: [
        { text: 'Nutrition Plans', href: '#plans' },
        { text: 'Custom Meals', href: '#custom' },
        { text: 'Gift Cards', href: '#gifts' },
        { text: 'Corporate', href: '#corporate' }
      ]
    }
  ]

  // Handle footer link clicks (placeholder for navigation)
  const handleLinkClick = (href, event) => {
    event.preventDefault()
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        {/* Main footer content */}
        <div className="footer-content">
          {/* Brand section */}
          <div className="footer-brand">
            <div className="brand-logo">
              <h3>🍃 Eatrite</h3>
            </div>
            <p className="brand-description">
              Transforming lives through personalized nutrition and healthy meal delivery. 
              Your journey to better health starts here.
            </p>
            <div className="social-links">
              <a href="#facebook" className="social-link" aria-label="Facebook">📘</a>
              <a href="#instagram" className="social-link" aria-label="Instagram">📷</a>
              <a href="#twitter" className="social-link" aria-label="Twitter">🐦</a>
              <a href="#linkedin" className="social-link" aria-label="LinkedIn">💼</a>
            </div>
          </div>

          {/* Navigation sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="footer-section">
              <h4 className="section-title">{section.title}</h4>
              <ul className="footer-links">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <a 
                      href={link.href}
                      className="footer-link"
                      onClick={(e) => handleLinkClick(link.href, e)}
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
            <h4 className="section-title">Get in Touch</h4>
            <div className="contact-info">
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
          <div className="footer-divider"></div>
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