/**
 * Database Service - Handles all database operations
 */

import { DocumentStore } from 'ravendb'
import { UserSubmission } from '../models/UserSubmission.js'
import { NutritionPlan } from '../models/NutritionPlan.js'

class DatabaseService {
  constructor() {
    this.store = null
    this.isConnected = false
  }

  async initialize() {
    try {
      console.log('🗃️ Initializing RavenDB connection...')
      
      // RavenDB connection
      this.store = new DocumentStore(
        [process.env.RAVEN_DB_URL || 'http://localhost:8080'], 
        process.env.RAVEN_DB_NAME || 'EatriteDB'
      )
      
      this.store.initialize()
      
      // Test connection
      await this.testConnection()
      
      this.isConnected = true
      console.log('✅ RavenDB connected successfully!')
      console.log(`📊 Database: ${process.env.RAVEN_DB_NAME || 'EatriteDB'}`)
      console.log(`🌐 URL: ${process.env.RAVEN_DB_URL || 'http://localhost:8080'}`)
      
      return this.store
      
    } catch (error) {
      console.error('❌ RavenDB connection failed:', error.message)
      console.log('💡 Fallback: Using in-memory storage')
      this.isConnected = false
      // Don't throw error - allow fallback to memory storage
      return null
    }
  }

  async testConnection() {
    const session = this.store.openSession()
    try {
      await session.advanced.rawQuery('from @all_docs limit 1').firstOrNull()
      console.log('🔍 Database connection test successful')
    } finally {
      session.dispose()
    }
  }

  // USER SUBMISSIONS TABLE OPERATIONS
  async saveUserSubmission(submissionData) {
    if (!this.isConnected) {
      throw new Error('Database not connected')
    }

    const session = this.store.openSession()
    
    try {
      const submission = new UserSubmission(submissionData)
      
      // Save to UserSubmissions collection (table)
      await session.store(submission, `UserSubmissions/${submission.id}`)
      await session.saveChanges()

      console.log(`💾 User submission saved to database: ${submission.id}`)
      console.log(`📊 Collection: UserSubmissions`)
      
      return submission
      
    } finally {
      session.dispose()
    }
  }

  async getUserSubmissionById(submissionId) {
    if (!this.isConnected) return null
    
    const session = this.store.openSession()
    
    try {
      const submission = await session.load(`UserSubmissions/${submissionId}`)
      return submission
    } finally {
      session.dispose()
    }
  }

  async getAllUserSubmissions(page = 0, pageSize = 50) {
    if (!this.isConnected) return []
    
    const session = this.store.openSession()
    
    try {
      const submissions = await session.query({ collection: 'UserSubmissions' })
        .orderByDescending('metadata.submittedAt')
        .skip(page * pageSize)
        .take(pageSize)
        .all()
      
      return submissions
    } finally {
      session.dispose()
    }
  }

  // NUTRITION PLANS TABLE OPERATIONS  
  async saveNutritionPlan(planData) {
    if (!this.isConnected) return null
    
    const session = this.store.openSession()
    
    try {
      const plan = new NutritionPlan(planData)
      
      // Save to NutritionPlans collection (table)
      await session.store(plan, `NutritionPlans/${plan.id}`)
      await session.saveChanges()

      console.log(`🍽️ Nutrition plan saved to database: ${plan.id}`)
      console.log(`📊 Collection: NutritionPlans`)
      
      return plan
      
    } finally {
      session.dispose()
    }
  }

  // ANALYTICS AND STATISTICS
  async getDashboardStats() {
    if (!this.isConnected) {
      throw new Error('Database not connected')
    }
    
    const session = this.store.openSession()
    
    try {
      // Total submissions count
      const totalSubmissions = await session.query({ collection: 'UserSubmissions' })
        .count()

      // Today's submissions
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const todaySubmissions = await session.query({ collection: 'UserSubmissions' })
        .whereGreaterThanOrEqual('metadata.submittedAt', today.toISOString())
        .count()

      // Recent submissions
      const recentSubmissions = await session.query({ collection: 'UserSubmissions' })
        .orderByDescending('metadata.submittedAt')
        .take(10)
        .selectFields(['id', 'personalInfo.name', 'healthGoals.primaryGoal', 'metadata.submittedAt'])
        .all()

      // Active nutrition plans
      const activePlans = await session.query({ collection: 'NutritionPlans' })
        .whereEquals('metadata.status', 'active')
        .count()

      return {
        totalSubmissions,
        todaySubmissions,
        activePlans,
        recentSubmissions,
        storage: 'database',
        lastUpdated: new Date().toISOString()
      }
      
    } finally {
      session.dispose()
    }
  }

  async dispose() {
    if (this.store) {
      this.store.dispose()
      this.isConnected = false
      console.log('🔌 Database connection closed')
    }
  }
}

// Export singleton instance
export const databaseService = new DatabaseService()