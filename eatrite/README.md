# 🍃 Eatrite - Multi-Platform Nutrition & Meal Delivery Platform

A comprehensive full-stack application featuring a **responsive website**, **mobile app**, and **backend API** for personalized nutrition and meal delivery services.

**Web Design by Sairam Perumalla**

---

## 📱 Platform Overview

**Eatrite** is a complete nutrition platform that works seamlessly across devices:
- **Web App**: Responsive React + Vite website
- **Mobile App**: React Native + Expo mobile application  
- **Backend API**: Node.js + Express server with modular architecture

### 🎯 Core Features
- Health questionnaire for personalized nutrition plans
- Responsive design with shared color scheme and branding
- Real-time form submission to backend API
- Mobile-first approach with native navigation
- Modular backend with proper separation of concerns

---

## 🏗️ Project Structure

```
eatrite/
├── web/                    # React + Vite Website
│   ├── src/
│   │   ├── components/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── QuestionnaireForm.jsx
│   │   │   ├── NutritionPlans.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── mobile/                 # React Native + Expo App
│   ├── components/
│   │   ├── HomeScreen.js
│   │   ├── QuestionnaireScreen.js
│   │   └── PlansScreen.js
│   ├── assets/
│   ├── App.js
│   ├── app.json
│   └── package.json
├── backend/                # Node.js + Express API
│   ├── controllers/
│   │   └── questionnaireController.js
│   ├── routes/
│   │   └── questionnaireRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── README.md
├── .gitignore
└── LICENSE
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI** (for mobile development): `npm install -g @expo/cli`
- **VS Code** (recommended)

### 1. Setup Backend Server

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Start development server
npm run dev
```

The backend will start on **http://localhost:3001**

### 2. Setup Web Application

```bash
# Navigate to web directory (new terminal)
cd web

# Install dependencies
npm install

# Start development server
npm run dev
```

The web app will start on **http://localhost:3000**

### 3. Setup Mobile Application

```bash
# Navigate to mobile directory (new terminal)
cd mobile

# Install dependencies
npm install

# Start Expo development server
npx expo start
```

Use the Expo Go app on your phone or simulator to view the mobile app.

---

## 🛠️ Development Commands

### Backend Commands
```bash
cd backend
npm start        # Production server
npm run dev      # Development with nodemon
npm run test     # Run tests (when implemented)
```

### Web Commands
```bash
cd web
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Lint code
```

### Mobile Commands
```bash
cd mobile
npx expo start           # Start Expo dev server
npx expo start --android # Run on Android
npx expo start --ios     # Run on iOS
npx expo start --web     # Run web version
```

---

## 🌐 API Endpoints

The backend provides the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API welcome and info |
| `GET` | `/health` | Health check status |
| `POST` | `/api/submit` | Submit questionnaire data |
| `GET` | `/api/stats` | Get submission statistics |

### Example API Usage

**Submit Questionnaire:**
```javascript
const response = await fetch('http://localhost:3001/api/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    goal: 'weight-loss',
    dietaryPreferences: 'vegetarian',
    activityLevel: 'moderate',
    allergies: 'No allergies'
  })
});

const result = await response.json();
```

---

## 🎨 Shared Design System

### Color Palette
- **Primary Green**: `#48bb78`
- **Primary Dark**: `#38a169`
- **Text Dark**: `#2d3748`
- **Secondary Gray**: `#718096`
- **Background Light**: `#f7fafc`
- **Background White**: `#ffffff`

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto')
- **Web Headings**: 2.5rem - 3.5rem
- **Mobile Headings**: 24px - 28px
- **Body Text**: 16px with 1.6 line height

### Components
- **Buttons**: Rounded corners (8px/12px), consistent padding
- **Forms**: Clean input styling with focus states
- **Cards**: Subtle shadows and rounded corners
- **Navigation**: Fixed header with backdrop blur (web)

---

## 📱 Platform-Specific Features

### Web Application
- **Responsive Design**: Mobile-first CSS with breakpoints
- **Smooth Scrolling**: JavaScript navigation between sections
- **Hero Section**: Large visual impact with gradient backgrounds
- **Footer Credit**: "Web Design by Sairam Perumalla"

### Mobile Application
- **React Navigation**: Stack-based navigation between screens
- **Native Components**: Platform-optimized UI elements
- **Touch Interactions**: Proper touch targets and feedback
- **Status Bar**: Configured for optimal visibility

### Backend API
- **Express.js**: RESTful API with proper HTTP status codes
- **CORS**: Configured for both web and mobile clients
- **Validation**: Comprehensive input validation and sanitization
- **Logging**: Detailed request/response logging for debugging
- **Error Handling**: Graceful error responses with meaningful messages

---

## � Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URLs (for CORS)
WEB_URL=http://localhost:3000
MOBILE_URL=exp://localhost:8081

# Database Configuration (for future expansion)
# DATABASE_URL=mongodb://localhost:27017/eatrite

# Email Service (for future notifications)
# EMAIL_SERVICE=gmail
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASS=your-app-password
```

### VS Code Setup

Recommended VS Code extensions:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- React Native Tools (for mobile development)
- Thunder Client (for API testing)

---

## � Workflow & Development

### Development Process
1. **Backend First**: Start the backend server to handle API requests
2. **Web Development**: Build and test web components
3. **Mobile Development**: Ensure feature parity with web version
4. **Testing**: Test form submissions across all platforms

### Code Style Guidelines
- **JavaScript**: ES6+ modules, async/await patterns
- **Components**: Functional components with hooks
- **Naming**: Descriptive variable names, camelCase for JS
- **Comments**: Meaningful comments explaining business logic
- **Error Handling**: Comprehensive try-catch blocks

### Git Workflow
```bash
# Feature development
git checkout -b feature/new-feature-name
git add .
git commit -m "Add: detailed description of changes"
git push origin feature/new-feature-name

# Create pull request for review
```

---

## � Deployment

### Production Checklist

**Backend:**
- [ ] Set `NODE_ENV=production`
- [ ] Configure production database
- [ ] Set up email service
- [ ] Configure HTTPS
- [ ] Set up monitoring and logging

**Web App:**
- [ ] Run `npm run build`
- [ ] Deploy to hosting service (Vercel, Netlify)
- [ ] Configure environment variables
- [ ] Set up domain and SSL

**Mobile App:**
- [ ] Configure app store metadata
- [ ] Build production bundles
- [ ] Test on real devices
- [ ] Submit to app stores

---

## 🧪 Testing

### Manual Testing Checklist

**Web Application:**
- [ ] Navigation between sections works
- [ ] Form submission with valid data
- [ ] Form validation with invalid data
- [ ] Responsive design on mobile devices
- [ ] Footer credit is visible

**Mobile Application:**
- [ ] Navigation between screens
- [ ] Form submission functionality
- [ ] Proper error handling
- [ ] App performance on devices

**Backend API:**
- [ ] Health check endpoint responds
- [ ] Form submission logs to console
- [ ] Proper error responses
- [ ] CORS headers for web and mobile

---

## � Future Enhancements

### Phase 1: Core Features
- [ ] User authentication and accounts
- [ ] Database integration (MongoDB)
- [ ] Email notifications
- [ ] Payment processing integration

### Phase 2: Advanced Features
- [ ] AI-powered nutrition recommendations
- [ ] Real-time chat support
- [ ] Progress tracking and analytics
- [ ] Social features and community

### Phase 3: Scale & Optimize
- [ ] Microservices architecture
- [ ] Advanced caching strategies
- [ ] Performance monitoring
- [ ] Automated testing suite

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill processes on specific ports
lsof -ti:3000 | xargs kill -9  # Web app
lsof -ti:3001 | xargs kill -9  # Backend API
```

**CORS errors:**
- Ensure backend is running on port 3001
- Check CORS configuration in `server.js`
- Verify client URLs match CORS origins

**Expo/Mobile issues:**
```bash
# Clear Expo cache
npx expo start -c

# Reset Metro bundler
npx expo start --reset-cache
```

**Dependencies issues:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Support & Contact

- **Developer**: Sairam Perumalla
- **Project**: Eatrite Nutrition Platform
- **GitHub**: [Repository Link]
- **Email**: sairam.perumalla@eatrite.com (placeholder)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ for healthier living. Transform your nutrition journey with Eatrite.*