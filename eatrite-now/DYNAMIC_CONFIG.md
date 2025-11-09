# Dynamic Configuration Guide

EatRite Now uses dynamic host/port detection to avoid hardcoded URLs and make development easier.

## How It Works

### Frontend (Vite)
- Automatically detects the backend API URL based on the current frontend port
- Uses environment variables if provided, otherwise defaults to `http://localhost:4005`
- API configuration is in `src/config/api.ts`

### Backend (Express)
- Accepts CORS requests from any localhost port in development
- Uses environment variables for production configuration
- Dynamic CORS origin detection in `src/server.ts`

## Configuration Files

### Frontend Environment (`.env.local`)
```bash
# Optional - leave empty for auto-detection
VITE_API_URL=http://localhost:4005
```

### Backend Environment (`.env`)
```bash
# Server automatically finds available port starting from 4005
PORT=4005

# Database connection
DB_SERVER=localhost
DB_NAME=EATRITE
DB_USER=SA
DB_PASSWORD=#SAIRAM9440336090

# Optional - leave empty for auto-detection
FRONTEND_URL=http://localhost:4006
```

## Development Workflow

1. **Start both servers:**
   ```bash
   pnpm dev
   ```

2. **Start individually:**
   ```bash
   # Backend only
   cd apps/backend && pnpm dev
   
   # Frontend only  
   cd apps/frontend && pnpm dev
   ```

3. **The servers will automatically:**
   - Find available ports (frontend: 4006+, backend: 4005)
   - Configure CORS for localhost connections
   - Display connection URLs in console

## Benefits

- ✅ No hardcoded URLs
- ✅ Works on any available port
- ✅ Easy to switch between environments
- ✅ Multiple developers can run simultaneously
- ✅ Production-ready with environment variables

## Troubleshooting

If you encounter CORS errors:
1. Check that both servers are running
2. Verify ports in browser console (look for API Base URL log)
3. Ensure no firewall blocks localhost connections
4. Clear browser cache if switching ports frequently