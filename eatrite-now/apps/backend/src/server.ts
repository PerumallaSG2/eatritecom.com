import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initializeDatabase, closeDatabase } from './services/database';

// Import routes
import authRoutes from './routes/auth';
import categoryRoutes from './routes/categories';
import mealRoutes from './routes/meals';
import planRoutes from './routes/plans';
import subscriptionRoutes from './routes/subscriptions';
import orderRoutes from './routes/orders';
import userRoutes from './routes/users';
import quizRoutes from './routes/quiz';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4005;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
// CORS configuration - Dynamic origin handling
const corsOrigin = (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
  // Allow requests with no origin (mobile apps, postman, etc.)
  if (!origin) return callback(null, true);
  
  // Allow all localhost origins in development
  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
  }
  
  // Allow specific origins in production
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://eatrite.com', // Add your production domain
    'https://www.eatrite.com'
  ].filter(Boolean);
  
  if (allowedOrigins.includes(origin)) {
    return callback(null, true);
  }
  
  // Reject origin
  callback(new Error('Not allowed by CORS'));
};

app.use(cors({
  origin: corsOrigin,
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quiz', quizRoutes);

// Direct submission endpoint for backward compatibility
app.use('/api/submit', quizRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 EatRite Now API server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`� API URL: http://localhost:${PORT}`);
      console.log(`�📱 CORS: Dynamic localhost detection enabled`);
      if (process.env.FRONTEND_URL) {
        console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL}`);
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await closeDatabase();
  process.exit(0);
});

startServer();

// export { prisma }; // We'll add this back with SQL Server
export default app;