import React, { useState } from 'react'
import {
  LoginScreen,
  SignupScreen,
  ForgotPasswordScreen,
} from '../components/screens/AuthenticationScreens'
import ProfileOnboarding from '../components/ProfileOnboarding'
import { useAuth } from '../context/AuthContext'
import { profileService } from '../services/profileService'

type AuthScreen = 'login' | 'signup' | 'forgot-password' | 'onboarding'

const LoginPage: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState(false)
  const [newUserId, setNewUserId] = useState<string>('')

  const { login, signup } = useAuth()

  const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    setError('')

    try {
      await login(email, password)
      // Redirect to account page after successful login
      window.location.href = '/account'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (data: {
    name: string
    email: string
    password: string
  }) => {
    setLoading(true)
    setError('')

    try {
      await signup(data)
      
      // Get user from localStorage to get the ID
      const userData = localStorage.getItem('eatrite_user')
      if (userData) {
        const user = JSON.parse(userData)
        setNewUserId(user.id)
        setCurrentScreen('onboarding')
      } else {
        // Fallback to account page if no onboarding
        window.location.href = '/account'
      }
      
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleProfileOnboardingComplete = async (profileData: any) => {
    try {
      if (newUserId) {
        await profileService.createCompleteProfile(newUserId, profileData)
      }
      
      // Redirect to account page after profile creation
      window.location.href = '/account'
    } catch (err) {
      console.error('Profile creation failed:', err)
      // Still redirect to account page even if profile creation fails
      window.location.href = '/account'
    }
  }

  const handleSkipOnboarding = () => {
    // Redirect to account page without creating detailed profile
    window.location.href = '/account'
  }

  const handleForgotPassword = async (email: string) => {
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      setSuccess(true)
      console.log('Password reset sent to:', email)
    } catch (err) {
      setError('Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'signup':
        return (
          <SignupScreen
            onSignup={handleSignup}
            onLoginClick={() => {
              setCurrentScreen('login')
              setError('')
              setSuccess(false)
            }}
            loading={loading}
            error={error}
          />
        )
      case 'forgot-password':
        return (
          <ForgotPasswordScreen
            onSubmit={handleForgotPassword}
            onBackToLogin={() => {
              setCurrentScreen('login')
              setError('')
              setSuccess(false)
            }}
            loading={loading}
            success={success}
            error={error}
          />
        )
      case 'onboarding':
        return (
          <ProfileOnboarding
            userId={newUserId}
            onComplete={handleProfileOnboardingComplete}
            onSkip={handleSkipOnboarding}
          />
        )
      default:
        return (
          <LoginScreen
            onLogin={handleLogin}
            onSignupClick={() => {
              setCurrentScreen('signup')
              setError('')
              setSuccess(false)
            }}
            onForgotPasswordClick={() => {
              setCurrentScreen('forgot-password')
              setError('')
              setSuccess(false)
            }}
            loading={loading}
            error={error}
          />
        )
    }
  }

  return renderScreen()
}

export default LoginPage
