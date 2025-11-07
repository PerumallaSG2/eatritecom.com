import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Import routes
import questionnaireRoutes from './routes/questionnaireRoutes.js'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

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
    message: 'Eatrite API Server is running!',
    version: '1.0.0',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      questionnaire: '/api/submit'
    }
  })
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
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
      'POST /api/submit'
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

// Start the server
const server = app.listen(PORT, () => {
  console.log('\n🍃 EATRITE API SERVER STARTED')
  console.log('===============================')
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`🌐 API URL: http://localhost:${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`📝 Submit endpoint: http://localhost:${PORT}/api/submit`)
  console.log(`🕐 Started at: ${new Date().toISOString()}`)
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log('===============================\n')
})

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`\n📡 ${signal} received, initiating graceful shutdown...`)
  
  server.close((err) => {
    if (err) {
      console.error('❌ Error during server shutdown:', err)
      process.exit(1)
    }
    
    console.log('✅ Server closed successfully')
    process.exit(0)
  })
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

export default app