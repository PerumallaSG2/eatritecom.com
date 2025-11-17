/**
 * EatRite Splash Screen
 * Luxury loading screen with premium branding
 */

import React, { useEffect, useState } from 'react'
import { EatRiteIcon } from '../eatrite/EatRiteComponentLibrary'
import { EatRiteDesignTokens } from '../../styles/design-system/eatrite-design-tokens'

interface SplashScreenProps {
  onLoadingComplete: () => void
  duration?: number
}

export const EatRiteSplashScreen: React.FC<SplashScreenProps> = ({
  onLoadingComplete,
  duration = 3000,
}) => {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setFadeOut(true)
            setTimeout(onLoadingComplete, 500)
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, duration / 50)

    return () => clearInterval(interval)
  }, [duration, onLoadingComplete])

  const splashStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${EatRiteDesignTokens.colors.surface.darkGreen} 0%, ${EatRiteDesignTokens.colors.surface.darkGreenDark} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    opacity: fadeOut ? 0 : 1,
    transition: 'opacity 0.5s ease-out',
  }

  const logoContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: EatRiteDesignTokens.spacing['4xl'],
    animation: 'fadeInScale 1.5s ease-out',
  }

  const logoTextStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: '4rem',
    fontWeight: 700,
    background: EatRiteDesignTokens.colors.gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginTop: EatRiteDesignTokens.spacing.xl,
    textAlign: 'center',
    letterSpacing: '-0.02em',
  }

  const taglineStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.bodyLarge.size,
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.body,
    textAlign: 'center',
    marginTop: EatRiteDesignTokens.spacing.md,
    maxWidth: '300px',
    lineHeight: 1.6,
  }

  const progressContainerStyles: React.CSSProperties = {
    width: '200px',
    height: '4px',
    backgroundColor: 'rgba(212, 180, 106, 0.2)',
    borderRadius: EatRiteDesignTokens.borderRadius.full,
    overflow: 'hidden',
    marginTop: EatRiteDesignTokens.spacing['3xl'],
  }

  const progressBarStyles: React.CSSProperties = {
    height: '100%',
    background: EatRiteDesignTokens.colors.gradients.primary,
    borderRadius: EatRiteDesignTokens.borderRadius.full,
    width: `${progress}%`,
    transition: 'width 0.1s ease-out',
    boxShadow: EatRiteDesignTokens.shadows.goldGlow.sm,
  }

  const loadingTextStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.tertiary,
    fontSize: EatRiteDesignTokens.typography.scale.caption.size,
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.body,
    textAlign: 'center',
    marginTop: EatRiteDesignTokens.spacing.lg,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  }

  return (
    <>
      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(212, 180, 106, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(212, 180, 106, 0.6));
          }
        }

        .logo-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div style={splashStyles}>
        <div style={logoContainerStyles}>
          <div className="logo-pulse">
            <EatRiteIcon size="2xl" color="gold" />
          </div>
          <h1 style={logoTextStyles}>EatRite</h1>
          <p style={taglineStyles}>Premium Nutrition & Wellness Platform</p>
        </div>

        <div style={progressContainerStyles}>
          <div style={progressBarStyles} />
        </div>

        <p style={loadingTextStyles}>Loading Your Wellness Journey...</p>
      </div>
    </>
  )
}

export default EatRiteSplashScreen
