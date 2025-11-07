# 🚀 Eatrite Project - Setup & Running Instructions

## 📋 Prerequisites

Before running the Eatrite project, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)
- **VS Code** (recommended editor)

## 🔽 Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/PerumallaSG2/eatritecom.com.git

# Navigate to the project directory
cd eatritecom.com
```

## 📁 Step 2: Project Structure Overview

The project has multiple platforms. You'll need to run them separately:

```
eatrite/
├── web/        # React + Vite Web Application (MAIN)
├── backend/    # Node.js + Express API Server
├── mobile/     # React Native + Expo Mobile App
├── frontend/   # Alternative frontend setup
└── client/     # Alternative client setup
```

## 🌐 Step 3: Start the Backend API Server

**Terminal 1 - Backend Server:**

```bash
# Navigate to backend directory
cd eatrite/backend

# Install dependencies
npm install

# Start the backend server
npm start
```

**Expected Output:**
```
🍃 EATRITE API SERVER STARTED
===============================
🚀 Server running on port 3001
🌐 API URL: http://localhost:3001
📊 Health check: http://localhost:3001/health
📝 Submit endpoint: http://localhost:3001/api/submit
🕐 Started at: [timestamp]
🔧 Environment: development
===============================
```

**✅ Backend Running:** http://localhost:3001

---

## 💻 Step 4: Start the Web Application

**Terminal 2 - Web Application:**

```bash
# Navigate to web directory (open new terminal)
cd eatrite/web

# Install dependencies
npm install

# Start the development server
npm run dev
```

**Expected Output:**
```
VITE v5.4.21  ready in XXXms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.x.x:3000/
➜  press h + enter to show help
```

**✅ Web App Running:** http://localhost:3000

---

## 📱 Step 5: Start the Mobile Application (Optional)

**Terminal 3 - Mobile App:**

```bash
# Navigate to mobile directory (open new terminal)
cd eatrite/mobile

# Install dependencies
npm install

# Start Expo development server
npx expo start
```

**Expected Output:**
```
Starting project at /path/to/eatrite/mobile
Starting Metro Bundler

[QR Code Display]

➜ Metro waiting on exp://localhost:8081
➜ Scan the QR code above with Expo Go (Android) or Camera app (iOS)
➜ Web is waiting on http://localhost:8081
```

**✅ Mobile App:** Scan QR code with Expo Go app

---

## 🔗 Step 6: Access the Applications

### 🌐 Web Application
- **URL:** http://localhost:3000/
- **Features:** Complete responsive website
- **Test:** Fill out the questionnaire form

### 🔧 Backend API
- **Health Check:** http://localhost:3001/health
- **API Endpoint:** http://localhost:3001/api/submit
- **Status:** Check terminal for request logs

### 📱 Mobile Application
- **Install Expo Go:** Download from App Store/Google Play
- **Scan QR Code:** Use Expo Go app to scan the QR code
- **Alternative:** Press 'w' in terminal for web version

---

## ✅ Verification Steps

### 1. Test Backend API
```bash
# Test health endpoint
curl http://localhost:3001/health

# Test form submission
curl -X POST http://localhost:3001/api/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","goal":"weight-loss"}'
```

### 2. Test Web Application
- Open http://localhost:3000/ in browser
- Navigate through all sections
- Fill out and submit the questionnaire
- Check for success message

### 3. Test Mobile Application
- Scan QR code with Expo Go app
- Navigate between screens
- Test form submission

---

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Kill processes on specific ports
lsof -ti:3000 | xargs kill -9  # Web app
lsof -ti:3001 | xargs kill -9  # Backend API
```

### CORS Errors
- Ensure backend is running on port 3001
- Verify web app is on port 3000
- Check CORS configuration in `backend/server.js`

### Dependencies Issues
```bash
# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Expo/Mobile Issues
```bash
# Clear Expo cache
npx expo start -c

# Install Expo CLI globally if needed
npm install -g @expo/cli
```

---

## 🎯 Quick Start Commands

**All-in-One Setup (3 terminals):**

```bash
# Terminal 1: Backend
cd eatrite/backend && npm install && npm start

# Terminal 2: Web App
cd eatrite/web && npm install && npm run dev

# Terminal 3: Mobile App (optional)
cd eatrite/mobile && npm install && npx expo start
```

---

## 🌟 What You Should See

### ✅ Successful Setup Indicators:

1. **Backend Terminal:** Server startup message with port 3001
2. **Web Terminal:** Vite ready message with localhost:3000
3. **Browser:** Eatrite website loads with green theme
4. **Form Submission:** Success message after filling questionnaire
5. **Backend Logs:** Request logs appear when submitting forms

### 🎨 Expected Features:

- **Responsive Design:** Works on mobile and desktop
- **Smooth Navigation:** Clicking nav links scrolls to sections
- **Form Validation:** Proper error messages for invalid input
- **API Integration:** Form submissions logged in backend terminal
- **Professional UI:** Clean design with "Web Design by Sairam Perumalla" footer

---

## 📞 Support

If you encounter issues:

1. **Check Prerequisites:** Ensure Node.js v16+ is installed
2. **Verify Ports:** Make sure ports 3000 and 3001 are available
3. **Clear Cache:** Delete node_modules and reinstall
4. **Check Logs:** Look at terminal output for error messages

---

## 🎉 Success!

When everything is running correctly, you should have:

- ✅ **Backend API** on http://localhost:3001
- ✅ **Web Application** on http://localhost:3000  
- ✅ **Mobile App** via Expo QR code
- ✅ **Working form submission** between frontend and backend
- ✅ **Responsive design** across all devices

**Enjoy exploring your Eatrite nutrition platform!** 🍃