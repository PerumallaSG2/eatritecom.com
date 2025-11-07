/**
 * User Submission Model - Database Schema
 */

export class UserSubmission {
  constructor(data) {
    this.id = data.id || this.generateId()
    this.userId = data.userId || null
    this.personalInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      age: data.age || null,
      gender: data.gender || null
    }
    this.healthGoals = {
      primaryGoal: data.goal,
      targetWeight: data.targetWeight || null,
      timeframe: data.timeframe || null,
      activityLevel: data.activityLevel,
      healthConditions: data.healthConditions || []
    }
    this.dietaryInfo = {
      preferences: data.dietaryPreferences,
      allergies: data.allergies || [],
      dislikes: data.dislikes || [],
      cuisinePreferences: data.cuisinePreferences || []
    }
    this.metadata = {
      submittedAt: data.submittedAt || new Date().toISOString(),
      clientInfo: data.clientInfo,
      status: 'received',
      processed: false,
      nutritionPlanGenerated: false,
      lastUpdated: new Date().toISOString()
    }
  }

  generateId() {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `SUB_${timestamp}_${random}`
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      personalInfo: this.personalInfo,
      healthGoals: this.healthGoals,
      dietaryInfo: this.dietaryInfo,
      metadata: this.metadata
    }
  }
}