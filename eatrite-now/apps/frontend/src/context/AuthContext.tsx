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
      // Call backend login API
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Login failed')
      }

      // Create user object from response
      const loggedInUser: User = {
        id: result.data.user.id,
        name: `${result.data.user.firstName} ${result.data.user.lastName}`,
        email: result.data.user.email,
        avatar: `https://ui-avatars.com/api/?name=${result.data.user.firstName}+${result.data.user.lastName}&background=D4B46A&color=0F2B1E`,
      }

      // Store in localStorage
      localStorage.setItem('eatrite_user', JSON.stringify(loggedInUser))
      localStorage.setItem('eatrite_token', result.data.token)

      setUser(loggedInUser)
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed. Please check your credentials.')
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
      // Split name into first and last name
      const [firstName, ...lastNameParts] = data.name.split(' ')
      const lastName = lastNameParts.join(' ') || 'User'

      // Call backend registration API
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: data.email,
          password: data.password,
        }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Registration failed')
      }

      // Create user object from response
      const newUser: User = {
        id: result.data.user.id,
        name: `${result.data.user.firstName} ${result.data.user.lastName}`,
        email: result.data.user.email,
        avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=D4B46A&color=0F2B1E`,
      }

      // Store in localStorage
      localStorage.setItem('eatrite_user', JSON.stringify(newUser))
      localStorage.setItem('eatrite_token', result.data.token)

      setUser(newUser)
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Signup failed. Please try again.')
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
