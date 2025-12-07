/**
 * Tests for Auth Middleware
 * 
 * Coverage: authenticateToken, requireRole, requireCompanyAdmin, requireSuperAdmin
 */

import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import jwt from 'jsonwebtoken';
import {
  authenticateToken,
  requireRole,
  requireCompanyAdmin,
  requireSuperAdmin,
  UserRole,
  AuthRequest,
} from '../auth.js';
import type { Response, NextFunction } from 'express';

// Mock Prisma Client
const mockFindUnique = jest.fn<any>();
const mockConnect = jest.fn<any>();

const mockPrisma = {
  user: {
    findUnique: mockFindUnique,
  },
  $connect: mockConnect,
};

// Mock the Prisma import
jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}));

describe('Auth Middleware', () => {
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  const testSecret = 'test-jwt-secret';

  beforeEach(() => {
    // Reset mocks
    mockRequest = {
      headers: {},
      user: undefined,
    };
    
    mockResponse = {
      status: jest.fn().mockReturnThis() as any,
      json: jest.fn().mockReturnThis() as any,
    };
    
    mockNext = jest.fn() as NextFunction;

    // Set JWT secret
    process.env.JWT_SECRET = testSecret;

    // Reset Prisma mock
    mockFindUnique.mockReset();
  });

  describe('authenticateToken', () => {
    const validUser = {
      id: 'user-123',
      email: 'test@example.com',
      companyId: 'company-456',
      role: UserRole.EMPLOYEE,
      deletedAt: null,
    };

    it('should authenticate valid token and attach user to request', async () => {
      const token = jwt.sign(
        {
          userId: validUser.id,
          email: validUser.email,
          companyId: validUser.companyId,
          role: validUser.role,
        },
        testSecret,
        { expiresIn: '1h' }
      );

      mockRequest.headers = { authorization: `Bearer ${token}` };
      mockFindUnique.mockResolvedValue(validUser);

      await authenticateToken(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: validUser.id },
        select: expect.any(Object),
      });
      expect(mockRequest.user).toEqual({
        id: validUser.id,
        email: validUser.email,
        companyId: validUser.companyId,
        role: validUser.role,
      });
      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should reject request without authorization header', async () => {
      mockRequest.headers = {};

      await authenticateToken(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Authentication required',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should reject request with malformed authorization header', async () => {
      mockRequest.headers = { authorization: 'InvalidFormat' };

      await authenticateToken(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should reject expired token', async () => {
      const token = jwt.sign(
        {
          userId: validUser.id,
          email: validUser.email,
          companyId: validUser.companyId,
          role: validUser.role,
        },
        testSecret,
        { expiresIn: '-1h' } // Already expired
      );

      mockRequest.headers = { authorization: `Bearer ${token}` };

      await authenticateToken(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Token expired' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should reject invalid token signature', async () => {
      const token = jwt.sign(
        {
          userId: validUser.id,
          email: validUser.email,
          companyId: validUser.companyId,
          role: validUser.role,
        },
        'wrong-secret', // Different secret
        { expiresIn: '1h' }
      );

      mockRequest.headers = { authorization: `Bearer ${token}` };

      await authenticateToken(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid token' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should reject token for deleted user', async () => {
      const token = jwt.sign(
        {
          userId: validUser.id,
          email: validUser.email,
          companyId: validUser.companyId,
          role: validUser.role,
        },
        testSecret,
        { expiresIn: '1h' }
      );

      mockRequest.headers = { authorization: `Bearer ${token}` };
      mockFindUnique.mockResolvedValue({
        ...validUser,
        deletedAt: new Date(),
      });

      await authenticateToken(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'User account not found or deactivated',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should reject token for non-existent user', async () => {
      const token = jwt.sign(
        {
          userId: 'nonexistent-user',
          email: 'fake@example.com',
          companyId: 'company-456',
          role: UserRole.EMPLOYEE,
        },
        testSecret,
        { expiresIn: '1h' }
      );

      mockRequest.headers = { authorization: `Bearer ${token}` };
      mockFindUnique.mockResolvedValue(null);

      await authenticateToken(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'User account not found or deactivated',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should reject completely invalid token', async () => {
      mockRequest.headers = { authorization: 'Bearer invalid.token.here' };

      await authenticateToken(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid token' });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('requireRole', () => {
    beforeEach(() => {
      mockRequest.user = {
        id: 'user-123',
        email: 'test@example.com',
        companyId: 'company-456',
        role: UserRole.EMPLOYEE,
      };
    });

    it('should allow access for user with required role', () => {
      const middleware = requireRole([UserRole.EMPLOYEE, UserRole.COMPANY_ADMIN]);

      middleware(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should deny access for user without required role', () => {
      const middleware = requireRole([UserRole.COMPANY_ADMIN, UserRole.SUPER_ADMIN]);

      middleware(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Insufficient permissions',
        required: [UserRole.COMPANY_ADMIN, UserRole.SUPER_ADMIN],
        current: UserRole.EMPLOYEE,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should deny access if user not authenticated', () => {
      mockRequest.user = undefined;
      const middleware = requireRole([UserRole.EMPLOYEE]);

      middleware(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Authentication required',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should allow access for SUPER_ADMIN when any role allowed', () => {
      mockRequest.user!.role = UserRole.SUPER_ADMIN;
      const middleware = requireRole([UserRole.SUPER_ADMIN]);

      middleware(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
    });

    it('should allow access for COMPANY_ADMIN when company admin required', () => {
      mockRequest.user!.role = UserRole.COMPANY_ADMIN;
      const middleware = requireRole([UserRole.COMPANY_ADMIN, UserRole.SUPER_ADMIN]);

      middleware(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('requireCompanyAdmin', () => {
    beforeEach(() => {
      mockRequest.user = {
        id: 'user-123',
        email: 'admin@example.com',
        companyId: 'company-456',
        role: UserRole.COMPANY_ADMIN,
      };
    });

    it('should allow COMPANY_ADMIN access', () => {
      requireCompanyAdmin(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should allow SUPER_ADMIN access', () => {
      mockRequest.user!.role = UserRole.SUPER_ADMIN;

      requireCompanyAdmin(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
    });

    it('should deny EMPLOYEE access', () => {
      mockRequest.user!.role = UserRole.EMPLOYEE;

      requireCompanyAdmin(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should deny FINANCE_USER access', () => {
      mockRequest.user!.role = UserRole.FINANCE_USER;

      requireCompanyAdmin(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(403);
    });
  });

  describe('requireSuperAdmin', () => {
    beforeEach(() => {
      mockRequest.user = {
        id: 'user-123',
        email: 'superadmin@example.com',
        companyId: 'company-456',
        role: UserRole.SUPER_ADMIN,
      };
    });

    it('should allow SUPER_ADMIN access', () => {
      requireSuperAdmin(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should deny COMPANY_ADMIN access', () => {
      mockRequest.user!.role = UserRole.COMPANY_ADMIN;

      requireSuperAdmin(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should deny EMPLOYEE access', () => {
      mockRequest.user!.role = UserRole.EMPLOYEE;

      requireSuperAdmin(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(403);
    });
  });

  describe('Integration - Full Auth Flow', () => {
    const validUser = {
      id: 'user-123',
      email: 'admin@example.com',
      companyId: 'company-456',
      role: UserRole.COMPANY_ADMIN,
      deletedAt: null,
    };

    it('should complete full auth flow: token → user → role check → access', async () => {
      // 1. Generate valid token
      const token = jwt.sign(
        {
          userId: validUser.id,
          email: validUser.email,
          companyId: validUser.companyId,
          role: validUser.role,
        },
        testSecret,
        { expiresIn: '1h' }
      );

      mockRequest.headers = { authorization: `Bearer ${token}` };
      mockFindUnique.mockResolvedValue(validUser);

      // 2. Authenticate token
      await authenticateToken(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockRequest.user).toBeDefined();
      expect(mockNext).toHaveBeenCalledTimes(1);

      // Reset next mock for role check
      (mockNext as jest.Mock).mockClear();

      // 3. Check admin role
      requireCompanyAdmin(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should block employee from admin route', async () => {
      const employeeUser = { ...validUser, role: UserRole.EMPLOYEE };
      const token = jwt.sign(
        {
          userId: employeeUser.id,
          email: employeeUser.email,
          companyId: employeeUser.companyId,
          role: employeeUser.role,
        },
        testSecret,
        { expiresIn: '1h' }
      );

      mockRequest.headers = { authorization: `Bearer ${token}` };
      mockFindUnique.mockResolvedValue(employeeUser);

      // Authenticate
      await authenticateToken(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockRequest.user).toBeDefined();
      (mockNext as jest.Mock).mockClear();

      // Try admin route
      requireCompanyAdmin(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
