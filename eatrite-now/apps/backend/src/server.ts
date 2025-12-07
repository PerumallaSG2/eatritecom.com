import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Import routes
import categoryRoutes from './routes/categories.js'
import mealRoutes from './routes/meals.js'
import planRoutes from './routes/plans.js'
import orderRoutes from './routes/orders.js'
import userRoutes from './routes/users.js'
import paymentRoutes from './routes/payments.js'
import paymentsEnhanced from './routes/paymentsEnhanced.js'
import cardTesting from './routes/cardTesting.js'
import moneyFlow from './routes/moneyFlow.js'
// import analyticsRoutes from './routes/analytics.js' // Disabled - visitor tracking not critical
import billingRoutes from './routes/billing.js'
import onboardingRoutes from './routes/onboarding.js'
import adminRoutes from './routes/admin.js'
import employeeRoutes from './routes/employee.js'

// Import middleware
import { errorHandler } from './middleware/errorHandler.js'
import { notFound } from './middleware/notFound.js'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 4005

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
)
// CORS configuration - Dynamic origin handling
const corsOrigin = (
  origin: string | undefined,
  callback: (err: Error | null, allow?: boolean) => void
) => {
  // Allow requests with no origin (mobile apps, postman, etc.)
  if (!origin) return callback(null, true)

  // Allow all localhost origins in development
  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true)
    }
  }

  // Allow specific origins in production
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://eatrite.com', // Add your production domain
    'https://www.eatrite.com',
  ].filter(Boolean)

  if (allowedOrigins.includes(origin)) {
    return callback(null, true)
  }

  // Reject origin
  callback(new Error('Not allowed by CORS'))
}

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
)
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  })
})

// Routes
app.use('/api/categories', categoryRoutes)
app.use('/api/meals', mealRoutes)
app.use('/api/plans', planRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/payments/v2', paymentsEnhanced)
app.use('/api/payments/test', cardTesting)
app.use('/api/payments/money-flow', moneyFlow)
// app.use('/api/analytics', analyticsRoutes) // Disabled - visitor tracking not critical
app.use('/api/v1/billing', billingRoutes)
app.use('/api/v1/onboarding', onboardingRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/employee', employeeRoutes)

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Initialize database and start server
const startServer = async () => {
  try {
    // Start server first
    app.listen(PORT, () => {
      console.log(`🚀 EatRite API server running on port ${PORT}`)
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
      console.log(`📡 API URL: http://localhost:${PORT}`)
      console.log(`🌐 CORS: Dynamic localhost detection enabled`)
      if (process.env.FRONTEND_URL) {
        console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL}`)
      }
    })

    // Initialize PostgreSQL database connection via Prisma
    try {
      const prismaModule = await import('@prisma/client')
      // @ts-ignore - Dynamic import pattern for Prisma
      const { PrismaClient } = prismaModule.default
      const prisma = new PrismaClient()
      await prisma.$connect()
      console.log('✅ PostgreSQL Database connected via Prisma!')
    } catch (dbError) {
      console.warn('⚠️  Database connection failed:', dbError instanceof Error ? dbError.message : String(dbError))
      console.warn('ℹ️  Server will continue with mock data. Set DATABASE_URL to connect.')
      // Don't exit - allow server to run with mock data
    }
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...')
  try {
    // Disconnect Prisma
    await prisma.$disconnect()
  } catch (error) {
    console.error('Error closing database:', error)
  }
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...')
  try {
    // Disconnect Prisma
    await prisma.$disconnect()
  } catch (error) {
    console.error('Error closing database:', error)
  }
  process.exit(0)
})

startServer()

// export { prisma }; // We'll add this back with SQL Server
export default app
