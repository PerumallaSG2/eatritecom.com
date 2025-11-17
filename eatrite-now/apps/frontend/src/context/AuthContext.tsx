import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: {
    name: string
    email: string
    password: string
  }) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthState = () => {
      const userData = localStorage.getItem('eatrite_user')
      const token = localStorage.getItem('eatrite_token')

      if (userData && token) {
        try {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
        } catch (error) {
          console.error('Error parsing user data:', error)
          localStorage.removeItem('eatrite_user')
          localStorage.removeItem('eatrite_token')
        }
      }

      setIsLoading(false)
    }

    checkAuthState()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Note: password validation will be implemented in production
      console.log('Login attempt with password length:', password.length)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // For demo purposes, create a mock user
      const mockUser: User = {
        id: Date.now().toString(),
        name:
          email.split('@')[0].charAt(0).toUpperCase() +
          email.split('@')[0].slice(1),
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=D4B46A&color=0F2B1E`,
      }

      // Simulate token
      const mockToken = `eatrite_token_${Date.now()}`

      // Store in localStorage
      localStorage.setItem('eatrite_user', JSON.stringify(mockUser))
      localStorage.setItem('eatrite_token', mockToken)

      setUser(mockUser)
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (data: {
    name: string
    email: string
    password: string
  }) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        avatar: `https://ui-avatars.com/api/?name=${data.name}&background=D4B46A&color=0F2B1E`,
      }

      // Simulate token
      const mockToken = `eatrite_token_${Date.now()}`

      // Store in localStorage
      localStorage.setItem('eatrite_user', JSON.stringify(newUser))
      localStorage.setItem('eatrite_token', mockToken)

      setUser(newUser)
    } catch (error) {
      throw new Error('Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('eatrite_user')
    localStorage.removeItem('eatrite_token')
    setUser(null)
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      const updatedUser = { ...user, ...updates }

      localStorage.setItem('eatrite_user', JSON.stringify(updatedUser))
      setUser(updatedUser)
    } catch (error) {
      throw new Error('Profile update failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
