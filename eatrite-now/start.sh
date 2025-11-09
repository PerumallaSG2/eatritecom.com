#!/bin/bash

# EatRite Now Development Startup Script
echo "🚀 Starting EatRite Now..."

# Check if required directories exist
if [ ! -d "apps/frontend" ] || [ ! -d "apps/backend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ Error: pnpm is not installed. Please install it first:"
    echo "   npm install -g pnpm"
    exit 1
fi

# Start the development servers
echo "📦 Installing dependencies..."
pnpm install

echo "🔄 Starting both frontend and backend servers..."
pnpm dev