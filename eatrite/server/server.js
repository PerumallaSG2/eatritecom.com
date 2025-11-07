import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Logging
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Eatrite API Server is running!',
    version: '1.0.0',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Submit questionnaire endpoint
app.post('/api/submit', (req, res) => {
  try {
    const questionnaireData = req.body;
    
    // Log the received data (in production, you'd save this to a database)
    console.log('\n🍃 NEW QUESTIONNAIRE SUBMISSION:');
    console.log('=====================================');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Client IP:', req.ip);
    console.log('User Agent:', req.get('User-Agent'));
    console.log('\n📝 QUESTIONNAIRE DATA:');
    console.log(JSON.stringify(questionnaireData, null, 2));
    console.log('=====================================\n');
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'age', 'gender', 'height', 'weight', 'activityLevel', 'healthGoals'];
    const missingFields = requiredFields.filter(field => !questionnaireData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields,
        timestamp: new Date().toISOString()
      });
    }
    
    // Simulate processing time
    setTimeout(() => {
      // In a real application, you would:
      // 1. Save data to MongoDB/database
      // 2. Generate personalized nutrition plan
      // 3. Send confirmation email
      // 4. Calculate nutritional requirements
      // 5. Create meal recommendations
      
      res.status(200).json({
        success: true,
        message: 'Questionnaire submitted successfully!',
        data: {
          submissionId: `EAT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: questionnaireData.name,
          email: questionnaireData.email,
          estimatedPlanReady: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
          nextSteps: [
            'Our nutritionists will review your information',
            'You will receive a personalized plan within 24 hours',
            'Check your email for detailed recommendations',
            'Download our mobile app for meal tracking'
          ]
        },
        timestamp: new Date().toISOString()
      });
    }, 1000); // Simulate 1 second processing time
    
  } catch (error) {
    console.error('Error processing questionnaire:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
      timestamp: new Date().toISOString()
    });
  }
});

// Get nutrition plans endpoint (mock data)
app.get('/api/plans', (req, res) => {
  res.json({
    success: true,
    plans: [
      {
        id: 'essential',
        name: 'Essential',
        price: 99,
        features: ['Personalized meal plan', '14 meals per week', 'Basic nutrition tracking']
      },
      {
        id: 'premium',
        name: 'Premium', 
        price: 149,
        features: ['Everything in Essential', '21 meals per week', '1-on-1 nutritionist consultation'],
        popular: true
      },
      {
        id: 'elite',
        name: 'Elite',
        price: 199,
        features: ['Everything in Premium', 'Unlimited meals', 'Weekly nutritionist calls']
      }
    ],
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    requestedUrl: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n🍃 EATRITE SERVER STARTED');
  console.log('==========================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 Submit endpoint: http://localhost:${PORT}/api/submit`);
  console.log(`🕐 Started at: ${new Date().toISOString()}`);
  console.log('==========================\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

export default app;