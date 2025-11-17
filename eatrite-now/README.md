# EatRite Now

A modern meal delivery platform inspired by Factor75, built with React, TypeScript, Node.js, and PostgreSQL in a monorepo structure.

## 🚀 Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for blazing fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Query** for state management and API calls
- **Framer Motion** for animations

### Backend

- **Node.js** with TypeScript
- **Express.js** framework
- **PostgreSQL** database
- **Prisma ORM** for database operations
- **JWT** authentication
- **Stripe** for payments
- **Nodemailer** for email services

### DevOps & Tools

- **pnpm** monorepo management
- **ESLint** & **Prettier** for code quality
- **Husky** for git hooks
- **Docker** for containerization

## 📁 Project Structure

```
eatrite-now/
├── apps/
│   ├── frontend/          # React TypeScript app
│   └── backend/           # Node.js TypeScript API
├── packages/              # Shared packages (future)
├── docker/                # Docker configurations
└── scripts/               # Utility scripts
```

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL 14+
- Git

### Installation

1. **Clone and navigate to project:**

   ```bash
   cd eatrite-now
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   ```bash
   # Backend
   cp apps/backend/.env.example apps/backend/.env
   # Edit apps/backend/.env with your database and service credentials
   ```

4. **Set up database:**

   ```bash
   # Generate Prisma client
   pnpm --filter backend db:generate

   # Run migrations
   pnpm --filter backend db:migrate

   # Seed database with sample data
   pnpm --filter backend db:seed
   ```

5. **Start development servers:**

   ```bash
   # Start both frontend and backend
   pnpm dev

   # Or start individually:
   pnpm --filter frontend dev    # http://localhost:3000
   pnpm --filter backend dev     # http://localhost:3001
   ```

## 🗄️ Database Setup

### Using Docker (Recommended)

```bash
# Start PostgreSQL container
docker run --name eatrite-postgres \
  -e POSTGRES_USER=eatrite \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=eatrite_now \
  -p 5432:5432 \
  -d postgres:14

# Update your .env file:
DATABASE_URL="postgresql://eatrite:password@localhost:5432/eatrite_now?schema=public"
```

### Local PostgreSQL

1. Install PostgreSQL 14+
2. Create database: `createdb eatrite_now`
3. Update `DATABASE_URL` in `.env`

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev                    # Start both apps
pnpm --filter frontend dev  # Frontend only
pnpm --filter backend dev   # Backend only

# Building
pnpm build                  # Build all apps
pnpm --filter frontend build
pnpm --filter backend build

# Database
pnpm --filter backend db:migrate    # Run migrations
pnpm --filter backend db:generate   # Generate Prisma client
pnpm --filter backend db:seed       # Seed database
pnpm --filter backend db:studio     # Open Prisma Studio

# Code Quality
pnpm lint                   # Lint all code
pnpm type-check            # TypeScript checks

# Cleanup
pnpm clean                 # Clean all node_modules and build files
```

### Environment Variables

#### Backend (.env)

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/eatrite_now"

# Authentication
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# Server
PORT=3001
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000"

# Email
EMAIL_HOST="smtp.gmail.com"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"

# Payments
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## 📦 Features

### 🎯 Core Features

- [ ] User registration and authentication
- [ ] Meal browsing and filtering
- [ ] Subscription management
- [ ] Order placement and tracking
- [ ] Payment processing with Stripe
- [ ] User preferences and dietary goals
- [ ] Admin dashboard

### 🍽️ Meal Management

- [ ] Dynamic meal categories
- [ ] Nutritional information
- [ ] Allergen tracking
- [ ] Meal customization

### 🔄 Subscription System

- [ ] Flexible meal plans (6, 8, 10, 12 meals/week)
- [ ] Pause/resume subscriptions
- [ ] Delivery scheduling
- [ ] Plan modifications

### 📊 Analytics & Admin

- [ ] Order analytics
- [ ] User behavior tracking
- [ ] Inventory management
- [ ] Customer support tools

## 🚀 Deployment

### Using Docker

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Run migrations
docker-compose exec backend pnpm db:migrate
```

### Manual Deployment

```bash
# Build applications
pnpm build

# Start production server
pnpm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Documentation

The API documentation is available at `http://localhost:3001/api/docs` when running in development mode.

### Key Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/meals` - List meals
- `GET /api/plans` - List subscription plans
- `POST /api/orders` - Create order

## 🐛 Troubleshooting

### Common Issues

1. **Database connection errors:**
   - Verify PostgreSQL is running
   - Check DATABASE_URL in .env
   - Ensure database exists

2. **Port already in use:**
   - Kill process: `lsof -ti:3001 | xargs kill -9`
   - Change PORT in .env

3. **Prisma issues:**
   - Regenerate client: `pnpm --filter backend db:generate`
   - Reset database: `pnpm --filter backend db:migrate reset`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Factor75's user experience
- Built with modern web technologies
- Community-driven development

---

**Happy coding! 🍽️✨**
