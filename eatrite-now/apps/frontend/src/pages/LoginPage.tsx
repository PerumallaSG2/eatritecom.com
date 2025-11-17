import React, { useState } from 'react'
import {
  LoginScreen,
  SignupScreen,
  ForgotPasswordScreen,
} from '../components/screens/AuthenticationScreens'

type AuthScreen = 'login' | 'signup' | 'forgot-password'

const LoginPage: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState(false)

  const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // For demo purposes, accept any email/password
      if (email && password) {
        console.log('Login successful:', { email })
        // Here you would typically redirect to the account page or dashboard
        window.location.href = '/account'
      } else {
        throw new Error('Please enter valid credentials')
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.')
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log('Signup successful:', data)
      // Here you would typically create the account and redirect
      window.location.href = '/account'
    } catch (err) {
      setError('Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
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
