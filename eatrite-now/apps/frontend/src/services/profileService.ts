/**
 * Profile Service - API client for user profile operations
 */

// ============================================================================
// TYPES
// ============================================================================

interface PersonalInfo {
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say'
  phone: string
}

interface HealthMetrics {
  heightCm: number
  weightKg: number
  activityLevel: 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active'
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced'
}

interface GoalsAndPreferences {
  healthGoals: string[]
  dietaryRestrictions: string[]
  allergies: string[]
  medicalConditions: string[]
  weightGoal: 'lose' | 'maintain' | 'gain'
  targetWeightKg: number
}

interface NutritionTargets {
  dailyCalories: number
  proteinPercentage: number
  carbsPercentage: number
  fatPercentage: number
  waterIntakeMl: number
  mealsPerDay: number
}

interface UserProfile {
  userId: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say'
  phone?: string
  heightCm?: number
  weightKg?: number
  activityLevel?: 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active'
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced'
  healthGoals?: string[]
  dietaryRestrictions?: string[]
  allergies?: string[]
  medicalConditions?: string[]
  dailyCalories?: number
  proteinPercentage?: number
  carbsPercentage?: number
  fatPercentage?: number
  waterIntakeMl?: number
  mealsPerDay?: number
  weightGoal?: 'lose' | 'maintain' | 'gain'
  targetWeightKg?: number
  updatedAt?: string
}

interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
}

// ============================================================================
// API CLIENT
// ============================================================================

const getAuthHeaders = () => {
  const token = localStorage.getItem('eatrite_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export const profileService = {
  // Get user profile
  async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const response = await fetch(`/api/users/profile/${userId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      })

      const result: ApiResponse<UserProfile> = await response.json()
      
      if (result.success && result.data) {
        return result.data
      }
      
      return null
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      return null
    }
  },

  // Create or update profile
  async updateProfile(
    userId: string,
    profileData: Partial<UserProfile>
  ): Promise<UserProfile | null> {
    try {
      const response = await fetch(`/api/users/profile/${userId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData),
      })

      const result: ApiResponse<UserProfile> = await response.json()
      
      if (result.success && result.data) {
        return result.data
      }
      
      throw new Error(result.message || 'Profile update failed')
    } catch (error) {
      console.error('Failed to update profile:', error)
      throw error
    }
  },

  // Create complete profile from onboarding data
  async createCompleteProfile(
    userId: string,
    profileData: {
      personalInfo: PersonalInfo
      healthMetrics: HealthMetrics
      goalsAndPreferences: GoalsAndPreferences
      nutritionTargets: NutritionTargets
    }
  ): Promise<UserProfile | null> {
    try {
      // Combine all profile data into single update
      const completeProfile: Partial<UserProfile> = {
        dateOfBirth: profileData.personalInfo.dateOfBirth,
        gender: profileData.personalInfo.gender,
        phone: profileData.personalInfo.phone,
        heightCm: profileData.healthMetrics.heightCm,
        weightKg: profileData.healthMetrics.weightKg,
        activityLevel: profileData.healthMetrics.activityLevel,
        fitnessLevel: profileData.healthMetrics.fitnessLevel,
        healthGoals: profileData.goalsAndPreferences.healthGoals,
        dietaryRestrictions: profileData.goalsAndPreferences.dietaryRestrictions,
        allergies: profileData.goalsAndPreferences.allergies,
        medicalConditions: profileData.goalsAndPreferences.medicalConditions,
        weightGoal: profileData.goalsAndPreferences.weightGoal,
        targetWeightKg: profileData.goalsAndPreferences.targetWeightKg,
        dailyCalories: profileData.nutritionTargets.dailyCalories,
        proteinPercentage: profileData.nutritionTargets.proteinPercentage,
        carbsPercentage: profileData.nutritionTargets.carbsPercentage,
        fatPercentage: profileData.nutritionTargets.fatPercentage,
        waterIntakeMl: profileData.nutritionTargets.waterIntakeMl,
        mealsPerDay: profileData.nutritionTargets.mealsPerDay,
      }

      return await this.updateProfile(userId, completeProfile)
    } catch (error) {
      console.error('Failed to create complete profile:', error)
      throw error
    }
  },

  // Get user settings
  async getSettings(userId: string) {
    try {
      const response = await fetch(`/api/users/settings/${userId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      })

      const result = await response.json()
      
      if (result.success && result.data) {
        return result.data
      }
      
      return null
    } catch (error) {
      console.error('Failed to fetch settings:', error)
      return null
    }
  },

  // Update user settings
  async updateSettings(userId: string, settings: any) {
    try {
      const response = await fetch(`/api/users/settings/${userId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(settings),
      })

      const result = await response.json()
      
      if (result.success) {
        return result.data
      }
      
      throw new Error(result.message || 'Settings update failed')
    } catch (error) {
      console.error('Failed to update settings:', error)
      throw error
    }
  },

  // Get user addresses
  async getAddresses(userId: string) {
    try {
      const response = await fetch(`/api/users/addresses/${userId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      })

      const result = await response.json()
      
      if (result.success && result.data) {
        return result.data
      }
      
      return []
    } catch (error) {
      console.error('Failed to fetch addresses:', error)
      return []
    }
  },

  // Add user address
  async addAddress(userId: string, addressData: any) {
    try {
      const response = await fetch(`/api/users/addresses/${userId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(addressData),
      })

      const result = await response.json()
      
      if (result.success) {
        return result.data
      }
      
      throw new Error(result.message || 'Address creation failed')
    } catch (error) {
      console.error('Failed to add address:', error)
      throw error
    }
  },
}

export default profileService