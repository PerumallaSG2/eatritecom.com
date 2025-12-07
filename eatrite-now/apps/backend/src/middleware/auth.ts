import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/* eslint-disable @typescript-eslint/no-explicit-any */

// Lazy-load Prisma Client
let prismaInstance: any = null;

async function getPrisma(): Promise<any> {
  if (!prismaInstance) {
    const prismaModule = await import('@prisma/client');
    // @ts-ignore - Dynamic import pattern for Prisma
    const PrismaClient = prismaModule.PrismaClient || prismaModule.default?.PrismaClient;
    prismaInstance = new PrismaClient();
    await prismaInstance.$connect();
  }
  return prismaInstance;
}

// Define UserRole enum based on your Prisma schema
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  COMPANY_ADMIN = 'COMPANY_ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  FINANCE_USER = 'FINANCE_USER',
  OPERATIONS_USER = 'OPERATIONS_USER'
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    companyId: string;
    role: UserRole;
  };
}

/**
 * Authenticate JWT token from Authorization header
 * Attaches user data to req.user
 */
export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'development-secret-change-in-production';
    
    const decoded = jwt.verify(token, secret) as {
      userId: string;
      email: string;
      companyId: string;
      role: UserRole;
    };

    // Verify user still exists and is active
    const prisma = await getPrisma();
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        companyId: true,
        role: true,
        deletedAt: true
      }
    });

    if (!user || user.deletedAt) {
      res.status(401).json({ error: 'User account not found or deactivated' });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      companyId: user.companyId,
      role: user.role
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expired' });
      return;
    }
    
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

/**
 * Require specific roles to access route
 * Must be used AFTER authenticateToken middleware
 */
export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ 
        error: 'Insufficient permissions',
        required: allowedRoles,
        current: req.user.role
      });
      return;
    }

    next();
  };
};

/**
 * Require SUPER_ADMIN role (platform administrators only)
 */
export const requireSuperAdmin = requireRole([UserRole.SUPER_ADMIN]);

/**
 * Require company administrator or higher
 */
export const requireCompanyAdmin = requireRole([UserRole.COMPANY_ADMIN, UserRole.SUPER_ADMIN]);

/**
 * Require any authenticated user (any role)
 */
export const requireAuth = authenticateToken;
