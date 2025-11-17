/**
 * Premium EatRite Navigation Bar
 * Luxury dark green navbar with gold accents and elegant typography
 */

import React, { useState } from 'react'
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react'

// Brand colors
const BRAND_COLORS = {
  gold: '#D4B46A',
  darkGreen: '#0F2B1E',
  softBlack: '#0A0A0A',
  offWhite: '#F5F2E8',
  surfaceSecondary: '#152D22',
  textSecondary: '#E0DDD5',
}

interface PremiumNavbarProps {
  cartCount?: number
  onCartClick?: () => void
  onProfileClick?: () => void
  onSearchClick?: () => void
}

export const PremiumNavbar: React.FC<PremiumNavbarProps> = ({
  cartCount = 0,
  onCartClick,
  onProfileClick,
  onSearchClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('home')

  const navbarStyle: React.CSSProperties = {
    background: `linear-gradient(135deg, ${BRAND_COLORS.darkGreen}, ${BRAND_COLORS.surfaceSecondary})`,
    backdropFilter: 'blur(10px)',
    borderBottom: `1px solid rgba(212, 180, 106, 0.2)`,
    boxShadow:
      '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 50,
    padding: '0 24px',
    height: '80px',
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  }

  const logoStyle: React.CSSProperties = {
    fontFamily: '"Playfair Display", serif',
    fontSize: '28px',
    fontWeight: 700,
    color: BRAND_COLORS.gold,
    textDecoration: 'none',
    letterSpacing: '-0.025em',
    textShadow: `0 0 10px rgba(212, 180, 106, 0.3)`,
  }

  const navLinksStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  }

  const linkStyle: React.CSSProperties = {
    fontFamily: '"Inter", sans-serif',
    fontSize: '16px',
    fontWeight: 500,
    textDecoration: 'none',
    color: BRAND_COLORS.offWhite,
    transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    padding: '8px 16px',
    borderRadius: '8px',
    position: 'relative' as const,
  }

  const activeLinkStyle: React.CSSProperties = {
    ...linkStyle,
    color: BRAND_COLORS.gold,
    backgroundColor: 'rgba(212, 180, 106, 0.1)',
  }

  const iconButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: BRAND_COLORS.offWhite,
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: 'relative' as const,
  }

  const cartBadgeStyle: React.CSSProperties = {
    position: 'absolute' as const,
    top: '-2px',
    right: '-2px',
    backgroundColor: BRAND_COLORS.gold,
    color: BRAND_COLORS.softBlack,
    fontSize: '12px',
    fontWeight: 600,
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 0 10px rgba(212, 180, 106, 0.5)`,
  }

  const mobileMenuStyle: React.CSSProperties = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(20px)',
    zIndex: 100,
    display: mobileMenuOpen ? 'flex' : 'none',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '32px',
  }

  const mobileMenuItemStyle: React.CSSProperties = {
    fontFamily: '"Playfair Display", serif',
    fontSize: '24px',
    fontWeight: 500,
    color: BRAND_COLORS.offWhite,
    textDecoration: 'none',
    padding: '16px 32px',
    borderRadius: '12px',
    transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  }

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'menu', label: 'Menu', href: '/menu' },
    { id: 'plans', label: 'Plans', href: '/plans' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ]

  const handleLinkClick = (linkId: string) => {
    setActiveLink(linkId)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav style={navbarStyle}>
        <div style={containerStyle}>
          {/* Logo */}
          <a
            href="/"
            style={logoStyle}
            onMouseEnter={e => {
              e.currentTarget.style.textShadow = `0 0 20px rgba(212, 180, 106, 0.6)`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.textShadow = `0 0 10px rgba(212, 180, 106, 0.3)`
            }}
          >
            EatRite
          </a>

          {/* Desktop Navigation */}
          <ul
            style={{
              ...navLinksStyle,
              display: window.innerWidth >= 768 ? 'flex' : 'none',
            }}
          >
            {navItems.map(item => (
              <li key={item.id}>
                <a
                  href={item.href}
                  style={activeLink === item.id ? activeLinkStyle : linkStyle}
                  onClick={() => handleLinkClick(item.id)}
                  onMouseEnter={e => {
                    if (activeLink !== item.id) {
                      e.currentTarget.style.color = BRAND_COLORS.gold
                      e.currentTarget.style.backgroundColor =
                        'rgba(212, 180, 106, 0.05)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeLink !== item.id) {
                      e.currentTarget.style.color = BRAND_COLORS.offWhite
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Search Button */}
            <button
              style={iconButtonStyle}
              onClick={onSearchClick}
              onMouseEnter={e => {
                e.currentTarget.style.color = BRAND_COLORS.gold
                e.currentTarget.style.backgroundColor =
                  'rgba(212, 180, 106, 0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = BRAND_COLORS.offWhite
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <Search size={20} />
            </button>

            {/* Cart Button */}
            <button
              style={iconButtonStyle}
              onClick={onCartClick}
              onMouseEnter={e => {
                e.currentTarget.style.color = BRAND_COLORS.gold
                e.currentTarget.style.backgroundColor =
                  'rgba(212, 180, 106, 0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = BRAND_COLORS.offWhite
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span style={cartBadgeStyle}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Profile Button */}
            <button
              style={iconButtonStyle}
              onClick={onProfileClick}
              onMouseEnter={e => {
                e.currentTarget.style.color = BRAND_COLORS.gold
                e.currentTarget.style.backgroundColor =
                  'rgba(212, 180, 106, 0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = BRAND_COLORS.offWhite
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <User size={20} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              style={{
                ...iconButtonStyle,
                display: window.innerWidth < 768 ? 'block' : 'none',
                marginLeft: '8px',
              }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={e => {
                e.currentTarget.style.color = BRAND_COLORS.gold
                e.currentTarget.style.backgroundColor =
                  'rgba(212, 180, 106, 0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = BRAND_COLORS.offWhite
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div style={mobileMenuStyle}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={logoStyle}>EatRite</span>
        </div>

        {navItems.map(item => (
          <a
            key={item.id}
            href={item.href}
            style={mobileMenuItemStyle}
            onClick={() => handleLinkClick(item.id)}
            onMouseEnter={e => {
              e.currentTarget.style.color = BRAND_COLORS.gold
              e.currentTarget.style.backgroundColor = 'rgba(212, 180, 106, 0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = BRAND_COLORS.offWhite
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            {item.label}
          </a>
        ))}

        {/* Close Button */}
        <button
          style={{
            ...iconButtonStyle,
            position: 'absolute' as const,
            top: '32px',
            right: '32px',
            padding: '12px',
          }}
          onClick={() => setMobileMenuOpen(false)}
          onMouseEnter={e => {
            e.currentTarget.style.color = BRAND_COLORS.gold
            e.currentTarget.style.backgroundColor = 'rgba(212, 180, 106, 0.1)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = BRAND_COLORS.offWhite
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          <X size={24} />
        </button>
      </div>
    </>
  )
}
