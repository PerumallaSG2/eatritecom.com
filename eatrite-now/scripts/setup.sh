#!/bin/bash

# EatRite Now - Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up EatRite Now development environment..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first:"
    echo "npm install -g pnpm@latest"
    exit 1
fi

echo "✅ pnpm found"

# Check if PostgreSQL is running
if ! pg_isready -q; then
    echo "⚠️  PostgreSQL is not running. Please start PostgreSQL first."
    echo "You can use Docker: docker run --name eatrite-postgres -e POSTGRES_USER=eatrite -e POSTGRES_PASSWORD=password -e POSTGRES_DB=eatrite_now -p 5432:5432 -d postgres:14"
    exit 1
fi

echo "✅ PostgreSQL is running"

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Copy environment files
echo "📝 Setting up environment files..."
if [ ! -f apps/backend/.env ]; then
    cp apps/backend/.env.example apps/backend/.env
    echo "⚠️  Please update apps/backend/.env with your database credentials"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
pnpm --filter backend db:generate

# Run database migrations
echo "🗄️  Running database migrations..."
pnpm --filter backend db:migrate

# Seed database
echo "🌱 Seeding database with sample data..."
pnpm --filter backend db:seed

echo ""
echo "🎉 Setup complete! You can now start the development servers:"
echo ""
echo "  # Start both frontend and backend:"
echo "  pnpm dev"
echo ""
echo "  # Or start individually:"
echo "  pnpm --filter frontend dev    # http://localhost:3000"
echo "  pnpm --filter backend dev     # http://localhost:3001"
echo ""
echo "📚 Check the README.md for more information."