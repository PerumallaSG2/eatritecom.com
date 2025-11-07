import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Import database and routes
import { dbManager } from './config/database.js'
import questionnaireRoutes from './routes/questionnaireRoutes.js'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Initialize RavenDB connection
async function initializeDatabase() {
  try {
    await dbManager.initialize()
    console.log('✅ RavenDB connection established successfully!')
  } catch (error) {
    console.error('❌ Failed to connect to RavenDB:', error)
    console.log('⚠️  Continuing with application startup...')
  }
}

// Middleware configuration
app.use(cors({
  origin: [
    'http://localhost:3000', // Web app (web folder with Vite on port 3000)
    'http://localhost:5173', // Web app (alternative Vite port)
    'exp://localhost:8081'    // Expo mobile app
  ],
  credentials: true
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Eatrite API Server with RavenDB is running!',
    version: '1.0.0',
    status: 'healthy',
    database: 'RavenDB',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      questionnaire: '/api/submit',
      submissions: '/api/submissions'
    }
  })
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    database: 'RavenDB',
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// API routes
app.use('/api', questionnaireRoutes)

// 404 handler for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    requestedUrl: req.originalUrl,
    availableEndpoints: [
      'GET /',
      'GET /health', 
      'POST /api/submit',
      'GET /api/submissions'
    ],
    timestamp: new Date().toISOString()
  })
})

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error('🔥 Server Error:', error)
  
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred',
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { error: error.message })
  })
})

// Start the server and initialize database
async function startServer() {
  try {
    // Initialize database connection
    await initializeDatabase()
    
    // Start HTTP server
    const server = app.listen(PORT, () => {
      console.log('\n🍃 EATRITE API SERVER STARTED')
      console.log('===============================')
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`🌐 API URL: http://localhost:${PORT}`)
      console.log(`📊 Health check: http://localhost:${PORT}/health`)
      console.log(`📝 Submit endpoint: http://localhost:${PORT}/api/submit`)
      console.log(`📋 Submissions endpoint: http://localhost:${PORT}/api/submissions`)
      console.log(`🗃️ Database: RavenDB`)
      console.log(`🕐 Started at: ${new Date().toISOString()}`)
      console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`)
      console.log('===============================\n')
    })

    // Graceful shutdown handling
    const gracefulShutdown = async (signal) => {
      console.log(`\n📡 ${signal} received, initiating graceful shutdown...`)
      
      server.close(async (err) => {
        if (err) {
          console.error('❌ Error during server shutdown:', err)
          process.exit(1)
        }
        
        try {
          await dbManager.closeConnection()
          console.log('✅ Database connection closed')
        } catch (error) {
          console.error('❌ Error closing database:', error)
        }
        
        console.log('✅ Server closed successfully')
        process.exit(0)
      })
    }

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
    process.on('SIGINT', () => gracefulShutdown('SIGINT'))
    
    return server
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

// Start the application
startServer()

export default app