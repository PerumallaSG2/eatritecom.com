/**
 * Onboarding API Routes
 * 
 * Purpose: Guide Company Admins through complete setup before platform access
 * 
 * Business Rules:
 * - Onboarding is MANDATORY for COMPANY_ADMIN on first login
 * - All dashboards blocked until onboardingCompleted === true
 * - Every step writes to AuditLog for compliance
 * - Billing preview does NOT charge or create invoices
 * 
 * Routes:
 * - GET  /status           - Check onboarding completion status
 * - POST /company          - Step 1: Company profile setup
 * - POST /employees        - Step 2: Invite employees
 * - POST /billing-preview  - Step 3: Calculate projected costs (NO CHARGE)
 * - POST /complete         - Step 4: Mark onboarding complete
 */

import express, { Router, Response, Request } from 'express';

const router: Router = express.Router();

/* eslint-disable @typescript-eslint/no-explicit-any */

// Prisma Client (lazy-loaded)
let prisma: any = null;

async function getPrisma(): Promise<any> {
  if (!prisma) {
    const prismaModule = await import('@prisma/client');
    // @ts-ignore - Dynamic import pattern for Prisma
    const PrismaClient = prismaModule.PrismaClient || prismaModule.default?.PrismaClient;
    prisma = new PrismaClient();
    await prisma.$connect();
  }
  return prisma;
}

// Type for authenticated requests (will be used once auth middleware is added)
interface AuthRequest extends Request {
  user?: {
    id: string;
    companyId: string;
    role: string;
  };
}

/**
 * GET /api/v1/onboarding/status
 * Check if company has completed onboarding
 * Used by router guard to enforce onboarding flow
 */
router.get('/status', async (req: AuthRequest, res: Response) => {
  try {
    const prisma = await getPrisma();
    
    // TODO: Get companyId from authenticated user
    const companyId = req.query.companyId as string || req.user?.companyId;
    
    if (!companyId) {
      return res.status(400).json({ error: 'Company ID required' });
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: {
        id: true,
        name: true,
        onboardingCompleted: true,
        onboardingCompletedAt: true,
      },
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json({
      onboardingCompleted: company.onboardingCompleted,
      onboardingCompletedAt: company.onboardingCompletedAt,
      companyName: company.name,
    });
  } catch (error) {
    console.error('Onboarding status error:', error);
    res.status(500).json({ error: 'Failed to fetch onboarding status' });
  }
});

/**
 * POST /api/v1/onboarding/company
 * Step 1: Company profile setup
 * 
 * Request body:
 * {
 *   "name": "Acme Corp",
 *   "industry": "Technology",
 *   "employeeCount": 150
 * }
 */
router.post('/company', async (req: AuthRequest, res: Response) => {
  try {
    const prisma = await getPrisma();
    
    const companyId = req.query.companyId as string || req.user?.companyId;
    const performedBy = req.user?.id;
    
    if (!companyId) {
      return res.status(400).json({ error: 'Company ID required' });
    }

    const { name, industry, employeeCount } = req.body;

    // Validation
    if (!name || !industry || !employeeCount) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, industry, employeeCount' 
      });
    }

    if (typeof employeeCount !== 'number' || employeeCount < 1) {
      return res.status(400).json({ 
        error: 'Employee count must be a positive number' 
      });
    }

    // Update company profile
    await prisma.$transaction(async (tx: any) => {
      await tx.company.update({
        where: { id: companyId },
        data: {
          name,
          industry,
          employeeCount,
          updatedAt: new Date(),
        },
      });

      // Audit log
      await tx.auditLog.create({
        data: {
          entityType: 'COMPANY',
          entityId: companyId,
          action: 'COMPANY_PROFILE_UPDATED',
          performedBy,
          metadata: {
            name,
            industry,
            employeeCount,
            onboardingStep: 1,
          },
        },
      });
    });

    res.json({ 
      success: true, 
      message: 'Company profile updated',
      step: 1,
    });
  } catch (error) {
    console.error('Company profile update error:', error);
    res.status(500).json({ error: 'Failed to update company profile' });
  }
});

/**
 * POST /api/v1/onboarding/employees
 * Step 2: Employee invite
 * 
 * Request body:
 * {
 *   "emails": ["user1@company.com", "user2@company.com"]
 * }
 * 
 * Note: Skipping is allowed (empty emails array)
 */
router.post('/employees', async (req: AuthRequest, res: Response) => {
  try {
    const prisma = await getPrisma();
    
    const companyId = req.query.companyId as string || req.user?.companyId;
    const performedBy = req.user?.id;
    
    if (!companyId) {
      return res.status(400).json({ error: 'Company ID required' });
    }

    const { emails } = req.body;

    // Validation
    if (!Array.isArray(emails)) {
      return res.status(400).json({ error: 'Emails must be an array' });
    }

    // Skipping is allowed
    if (emails.length === 0) {
      await prisma.auditLog.create({
        data: {
          entityType: 'COMPANY',
          entityId: companyId,
          action: 'EMPLOYEE_INVITE_SKIPPED',
          performedBy,
          metadata: {
            onboardingStep: 2,
            skipped: true,
          },
        },
      });

      return res.json({
        success: true,
        message: 'Employee invite step skipped',
        step: 2,
        invited: 0,
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emails.filter((email: string) => !emailRegex.test(email));
    
    if (invalidEmails.length > 0) {
      return res.status(400).json({ 
        error: 'Invalid email format',
        invalidEmails,
      });
    }

    // Check for duplicates
    const existingUsers = await prisma.user.findMany({
      where: {
        email: { in: emails },
      },
      select: { email: true },
    });

    const existingEmails = existingUsers.map((u: any) => u.email);
    const newEmails = emails.filter((email: string) => !existingEmails.includes(email));

    if (newEmails.length === 0) {
      return res.status(400).json({ 
        error: 'All employees already exist',
        existingEmails,
      });
    }

    // Create user records with INVITED status
    await prisma.$transaction(async (tx: any) => {
      const userPromises = newEmails.map((email: string) => 
        tx.user.create({
          data: {
            email,
            firstName: '',
            lastName: '',
            password: '', // Will be set when user accepts invite
            role: 'EMPLOYEE',
            companyId,
            isActive: false, // Activated when they complete registration
          },
        })
      );

      await Promise.all(userPromises);

      // Audit log
      await tx.auditLog.create({
        data: {
          entityType: 'COMPANY',
          entityId: companyId,
          action: 'EMPLOYEES_INVITED',
          performedBy,
          metadata: {
            invitedCount: newEmails.length,
            emails: newEmails,
            existingEmails,
            onboardingStep: 2,
          },
        },
      });
    });

    // TODO: Send invite emails via email service
    console.log(`📧 Invite emails queued for: ${newEmails.join(', ')}`);

    res.json({
      success: true,
      message: `${newEmails.length} employees invited`,
      step: 2,
      invited: newEmails.length,
      skipped: existingEmails,
    });
  } catch (error) {
    console.error('Employee invite error:', error);
    res.status(500).json({ error: 'Failed to invite employees' });
  }
});

/**
 * POST /api/v1/onboarding/billing-preview
 * Step 3: Calculate projected monthly costs
 * 
 * ⚠️ CRITICAL: This does NOT charge the customer
 * ⚠️ This does NOT create invoices
 * ⚠️ This does NOT call Stripe
 * 
 * Request body:
 * {
 *   "planId": "plan_xyz"  // Optional - will use default pricing if omitted
 * }
 * 
 * Response:
 * {
 *   "projectedMonthlyCents": 45000,
 *   "costPerEmployeeCents": 300,
 *   "employeeCount": 150,
 *   "taxCents": 2925,
 *   "lineItems": [...]
 * }
 */
router.post('/billing-preview', async (req: AuthRequest, res: Response) => {
  try {
    const prisma = await getPrisma();
    
    const companyId = req.query.companyId as string || req.user?.companyId;
    const performedBy = req.user?.id;
    
    if (!companyId) {
      return res.status(400).json({ error: 'Company ID required' });
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: {
        employeeCount: true,
        name: true,
      },
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    if (!company.employeeCount) {
      return res.status(400).json({ 
        error: 'Employee count not set. Complete company setup first.' 
      });
    }

    // Default pricing: $3.00 per employee per month
    // This should come from Plan table in production
    const costPerEmployeeCents = 300; // $3.00
    const subtotalCents = costPerEmployeeCents * company.employeeCount;
    
    // Tax calculation (6.5% - should be jurisdiction-specific)
    const taxCents = Math.round(subtotalCents * 0.065);
    const totalCents = subtotalCents + taxCents;

    // Build line items
    const lineItems = [
      {
        type: 'SUBSCRIPTION',
        description: `EatRite Platform - ${company.employeeCount} employees`,
        quantity: company.employeeCount,
        unitPriceCents: costPerEmployeeCents,
        totalCents: subtotalCents,
      },
    ];

    // Audit log - User viewed billing preview
    await prisma.auditLog.create({
      data: {
        entityType: 'COMPANY',
        entityId: companyId,
        action: 'BILLING_PREVIEW_VIEWED',
        performedBy,
        metadata: {
          projectedMonthlyCents: totalCents,
          costPerEmployeeCents,
          employeeCount: company.employeeCount,
          onboardingStep: 3,
        },
      },
    });

    res.json({
      projectedMonthlyCents: totalCents,
      subtotalCents,
      taxCents,
      costPerEmployeeCents,
      employeeCount: company.employeeCount,
      currency: 'USD',
      lineItems,
      note: 'This is a projection only. You will not be charged yet.',
    });
  } catch (error) {
    console.error('Billing preview error:', error);
    res.status(500).json({ error: 'Failed to generate billing preview' });
  }
});

/**
 * POST /api/v1/onboarding/complete
 * Step 4: Mark onboarding as complete
 * 
 * This unlocks access to all dashboards and features
 */
router.post('/complete', async (req: AuthRequest, res: Response) => {
  try {
    const prisma = await getPrisma();
    
    const companyId = req.query.companyId as string || req.user?.companyId;
    const performedBy = req.user?.id;
    
    if (!companyId) {
      return res.status(400).json({ error: 'Company ID required' });
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: {
        onboardingCompleted: true,
        name: true,
        industry: true,
        employeeCount: true,
      },
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    if (company.onboardingCompleted) {
      return res.status(400).json({ 
        error: 'Onboarding already completed' 
      });
    }

    // Verify required fields
    if (!company.name || !company.industry || !company.employeeCount) {
      return res.status(400).json({ 
        error: 'Company profile incomplete. Complete all steps first.' 
      });
    }

    // Mark onboarding complete
    await prisma.$transaction(async (tx: any) => {
      await tx.company.update({
        where: { id: companyId },
        data: {
          onboardingCompleted: true,
          onboardingCompletedAt: new Date(),
        },
      });

      // Audit log
      await tx.auditLog.create({
        data: {
          entityType: 'COMPANY',
          entityId: companyId,
          action: 'ONBOARDING_COMPLETED',
          performedBy,
          metadata: {
            completedAt: new Date().toISOString(),
            companyName: company.name,
            industry: company.industry,
            employeeCount: company.employeeCount,
          },
        },
      });
    });

    console.log(`✅ Onboarding completed for company: ${company.name}`);

    res.json({
      success: true,
      message: 'Onboarding complete! Welcome to EatRite.',
      redirectTo: '/app/dashboard',
    });
  } catch (error) {
    console.error('Complete onboarding error:', error);
    res.status(500).json({ error: 'Failed to complete onboarding' });
  }
});

export default router;
