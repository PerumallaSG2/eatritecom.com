import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

export interface DietaryProfile {
  restrictions: string[]
  preferences: string[]
  allergies: string[]
  calorieGoal: number
  proteinGoal: number
  carbPreference: 'low' | 'moderate' | 'high'
  goals: string[]
}

export interface UserPreferences {
  id?: string
  name: string
  email: string
  dietaryProfile: DietaryProfile
  favoriteMeals: string[]
  dislikedMeals: string[]
  mealPlanPreferences: {
    mealsPerWeek: number
    deliveryDay: string
    portion: 'regular' | 'large'
    variety: 'adventurous' | 'familiar'
  }
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
    reminders: boolean
  }
  lastUpdated: string
}

export interface UserPreferencesContextType {
  preferences: UserPreferences | null
  updatePreferences: (newPreferences: Partial<UserPreferences>) => void
  updateDietaryProfile: (profile: Partial<DietaryProfile>) => void
  addFavoriteMeal: (mealId: string) => void
  removeFavoriteMeal: (mealId: string) => void
  addDislikedMeal: (mealId: string) => void
  removeDislikedMeal: (mealId: string) => void
  getPersonalizedRecommendations: (meals: any[]) => any[]
  isLoading: boolean
  hasProfile: boolean
}

const defaultDietaryProfile: DietaryProfile = {
  restrictions: [],
  preferences: [],
  allergies: [],
  calorieGoal: 2000,
  proteinGoal: 150,
  carbPreference: 'moderate',
  goals: [],
}

const defaultPreferences: UserPreferences = {
  name: '',
  email: '',
  dietaryProfile: defaultDietaryProfile,
  favoriteMeals: [],
  dislikedMeals: [],
  mealPlanPreferences: {
    mealsPerWeek: 8,
    deliveryDay: 'Tuesday',
    portion: 'regular',
    variety: 'adventurous',
  },
  notifications: {
    email: true,
    sms: false,
    push: true,
    reminders: true,
  },
  lastUpdated: new Date().toISOString(),
}

const UserPreferencesContext = createContext<
  UserPreferencesContextType | undefined
>(undefined)

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext)
  if (!context) {
    throw new Error(
      'useUserPreferences must be used within a UserPreferencesProvider'
    )
  }
  return context
}

interface UserPreferencesProviderProps {
  children: ReactNode
}

export const UserPreferencesProvider: React.FC<
  UserPreferencesProviderProps
> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load preferences from localStorage on mount
  useEffect(() => {
    const loadPreferences = () => {
      try {
        const stored = localStorage.getItem('eatrite-user-preferences')
        if (stored) {
          const parsed = JSON.parse(stored)
          setPreferences(parsed)
        }
      } catch (error) {
        console.error('Failed to load user preferences:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPreferences()
  }, [])

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    if (preferences && !isLoading) {
      try {
        localStorage.setItem(
          'eatrite-user-preferences',
          JSON.stringify(preferences)
        )
      } catch (error) {
        console.error('Failed to save user preferences:', error)
      }
    }
  }, [preferences, isLoading])

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => ({
      ...defaultPreferences,
      ...prev,
      ...newPreferences,
      lastUpdated: new Date().toISOString(),
    }))
  }

  const updateDietaryProfile = (profile: Partial<DietaryProfile>) => {
    setPreferences(prev => ({
      ...defaultPreferences,
      ...prev,
      dietaryProfile: {
        ...defaultDietaryProfile,
        ...(prev?.dietaryProfile || {}),
        ...profile,
      },
      lastUpdated: new Date().toISOString(),
    }))
  }

  const addFavoriteMeal = (mealId: string) => {
    setPreferences(prev => {
      const current = prev || defaultPreferences
      const favorites = [...current.favoriteMeals]

      if (!favorites.includes(mealId)) {
        favorites.push(mealId)
      }

      // Remove from dislikes if it exists there
      const dislikes = current.dislikedMeals.filter(id => id !== mealId)

      return {
        ...current,
        favoriteMeals: favorites,
        dislikedMeals: dislikes,
        lastUpdated: new Date().toISOString(),
      }
    })
  }

  const removeFavoriteMeal = (mealId: string) => {
    setPreferences(prev => {
      const current = prev || defaultPreferences
      return {
        ...current,
        favoriteMeals: current.favoriteMeals.filter(id => id !== mealId),
        lastUpdated: new Date().toISOString(),
      }
    })
  }

  const addDislikedMeal = (mealId: string) => {
    setPreferences(prev => {
      const current = prev || defaultPreferences
      const dislikes = [...current.dislikedMeals]

      if (!dislikes.includes(mealId)) {
        dislikes.push(mealId)
      }

      // Remove from favorites if it exists there
      const favorites = current.favoriteMeals.filter(id => id !== mealId)

      return {
        ...current,
        favoriteMeals: favorites,
        dislikedMeals: dislikes,
        lastUpdated: new Date().toISOString(),
      }
    })
  }

  const removeDislikedMeal = (mealId: string) => {
    setPreferences(prev => {
      const current = prev || defaultPreferences
      return {
        ...current,
        dislikedMeals: current.dislikedMeals.filter(id => id !== mealId),
        lastUpdated: new Date().toISOString(),
      }
    })
  }

  const getPersonalizedRecommendations = (meals: any[]) => {
    if (!preferences) return meals

    const { dietaryProfile, favoriteMeals, dislikedMeals } = preferences

    return meals
      .filter(meal => {
        // Filter out disliked meals
        if (dislikedMeals.includes(meal.id)) return false

        // Filter by dietary restrictions
        const mealTags = meal.dietary_tags?.toLowerCase() || ''

        // Check allergies (must not contain)
        for (const allergy of dietaryProfile.allergies) {
          if (mealTags.includes(allergy.toLowerCase())) {
            return false
          }
        }

        // Check dietary restrictions (must contain if specified)
        if (dietaryProfile.restrictions.length > 0) {
          const hasRequired = dietaryProfile.restrictions.some(restriction =>
            mealTags.includes(restriction.toLowerCase())
          )
          if (!hasRequired) return false
        }

        return true
      })
      .sort((a, b) => {
        // Prioritize favorite meals
        const aIsFavorite = favoriteMeals.includes(a.id)
        const bIsFavorite = favoriteMeals.includes(b.id)

        if (aIsFavorite && !bIsFavorite) return -1
        if (bIsFavorite && !aIsFavorite) return 1

        // Then sort by calorie goal proximity
        const aCalorieDiff = Math.abs(a.calories - dietaryProfile.calorieGoal)
        const bCalorieDiff = Math.abs(b.calories - dietaryProfile.calorieGoal)

        if (aCalorieDiff !== bCalorieDiff) {
          return aCalorieDiff - bCalorieDiff
        }

        // Then by protein goal proximity
        const aProteinDiff = Math.abs(a.protein - dietaryProfile.proteinGoal)
        const bProteinDiff = Math.abs(b.protein - dietaryProfile.proteinGoal)

        return aProteinDiff - bProteinDiff
      })
  }

  const hasProfile = preferences !== null && preferences.name !== ''

  const value: UserPreferencesContextType = {
    preferences,
    updatePreferences,
    updateDietaryProfile,
    addFavoriteMeal,
    removeFavoriteMeal,
    addDislikedMeal,
    removeDislikedMeal,
    getPersonalizedRecommendations,
    isLoading,
    hasProfile,
  }

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  )
}
