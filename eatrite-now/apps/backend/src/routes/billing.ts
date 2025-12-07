import express, { Router, Response, Request } from 'express';
import { generateInvoiceForCompany, issueInvoice } from '../services/invoiceGenerator';

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
 * GET /api/v1/billing/summary
 * CFO-grade billing overview for current period
 * Access: COMPANY_ADMIN, FINANCE_USER
 * 
 * TODO: Add authenticateToken and requireRole middleware once auth is configured
 */
router.get('/summary', async (req: AuthRequest, res: Response) => {
  try {
    const prisma = await getPrisma();
    
    // TODO: Get companyId from authenticated user
    // For now, using query parameter for testing
    const companyId = req.query.companyId as string || req.user?.companyId;
    
    if (!companyId) {
      return res.status(400).json({ error: 'Company ID required' });
    }

    // Get current month's orders
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    // Calculate current period spend from orders
    const orders = await prisma.order.findMany({
      where: {
        companyId,
        createdAt: {
          gte: periodStart,
          lte: periodEnd,
        },
        status: {
          in: ['DELIVERED', 'CONFIRMED'],
        },
      },
      select: {
        totalCents: true,
      },
    });

    const currentPeriodSpendCents = orders.reduce((sum: number, order: any) => sum + order.totalCents, 0);

    // Get outstanding invoices
    const outstandingInvoices = await prisma.invoice.findMany({
      where: {
        companyId,
        status: {
          in: ['ISSUED', 'OVERDUE'],
        },
      },
      select: {
        totalCents: true,
      },
    });

    const outstandingBalanceCents = outstandingInvoices.reduce((sum: number, inv: any) => sum + inv.totalCents, 0);

    // Get last invoice
    const lastInvoice = await prisma.invoice.findFirst({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
      select: {
        issuedAt: true,
        dueDate: true,
      },
    });

    // Get company payment terms
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { paymentTerms: true },
    });

    const summary = {
      currentPeriodSpendCents,
      outstandingBalanceCents,
      lastInvoiceDate: lastInvoice?.issuedAt || null,
      nextDueDate: lastInvoice?.dueDate || null,
      paymentTerms: company?.paymentTerms || 'NET_30',
      currency: 'USD',
    };

    res.json(summary);
  } catch (error) {
    console.error('Billing summary error:', error);
    res.status(500).json({ error: 'Failed to fetch billing summary' });
  }
});

/**
 * GET /api/v1/billing/invoices
 * Searchable, filterable invoice list with pagination
 * Access: COMPANY_ADMIN, FINANCE_USER
 */
router.get('/invoices', async (req: AuthRequest, res: Response) => {
  try {
    const prisma = await getPrisma();
    
    const companyId = req.query.companyId as string || req.user?.companyId;
    
    if (!companyId) {
      return res.status(400).json({ error: 'Company ID required' });
    }

    const { page = '1', limit = '20', status, search } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = { companyId };
    
    if (status && status !== 'ALL') {
      where.status = status;
    }
    
    if (search) {
      where.invoiceNumber = {
        contains: search as string,
        mode: 'insensitive',
      };
    }

    // Get invoices with pagination
    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
        include: {
          lineItems: true,
          payments: true,
        },
      }),
      prisma.invoice.count({ where }),
    ]);

    res.json({
      invoices,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Invoice list error:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

/**
 * GET /api/v1/billing/invoices/:id
 * Immutable invoice detail with full audit trail
 * Access: COMPANY_ADMIN, FINANCE_USER
 */
router.get('/invoices/:id', async (req: AuthRequest, res: Response) => {
  try {
    const prisma = await getPrisma();
    
    const { id } = req.params;
    const companyId = req.query.companyId as string || req.user?.companyId;

    // Fetch invoice with all related data
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            billingAddress: true,
            billingEmail: true,
          },
        },
        lineItems: {
          orderBy: { createdAt: 'asc' },
        },
        payments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Security: Verify invoice belongs to user's company
    if (companyId && invoice.companyId !== companyId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(invoice);
  } catch (error) {
    console.error('Invoice detail error:', error);
    res.status(500).json({ error: 'Failed to fetch invoice details' });
  }
});

/**
 * GET /api/v1/billing/usage
 * Detailed consumption metrics for cost analysis
 * Access: COMPANY_ADMIN, FINANCE_USER, OPERATIONS_USER
 */
router.get('/usage', async (req: AuthRequest, res: Response) => {
  try {
    // Mock data - will be replaced with real database queries
    res.json({
      period: { 
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
        end: new Date() 
      },
      categoryBreakdown: [],
      dailyUsage: [],
      adoptionRate: 0,
      activeEmployees: 0,
      totalEmployees: 0
    });
  } catch (error) {
    console.error('Usage report error:', error);
    res.status(500).json({ error: 'Failed to fetch usage data' });
  }
});

/**
 * GET /api/v1/billing/payment-methods
 * List stored payment methods (Stripe-managed)
 * Access: COMPANY_ADMIN, FINANCE_USER
 */
router.get('/payment-methods', async (req: AuthRequest, res: Response) => {
  try {
    // Mock data - will integrate with Stripe
    res.json({
      paymentMethods: []
    });
  } catch (error) {
    console.error('Payment methods error:', error);
    res.status(500).json({ error: 'Failed to fetch payment methods' });
  }
});

/**
 * POST /api/v1/billing/payment-methods
 * Add new payment method via Stripe
 * Access: COMPANY_ADMIN, FINANCE_USER
 * AUDIT: Logs payment method addition
 */
router.post('/payment-methods', async (req: AuthRequest, res: Response) => {
  try {
    const { paymentMethodId } = req.body;

    if (!paymentMethodId) {
      return res.status(400).json({ error: 'Payment method ID required' });
    }

    // TODO: Integrate with Stripe API
    // TODO: Write to AuditLog table

    res.json({ 
      success: true,
      message: 'Payment method added successfully',
      paymentMethodId 
    });
  } catch (error) {
    console.error('Add payment method error:', error);
    res.status(500).json({ error: 'Failed to add payment method' });
  }
});

/**
 * DELETE /api/v1/billing/payment-methods/:id
 * Remove payment method from account
 * Access: COMPANY_ADMIN, FINANCE_USER
 * AUDIT: Logs payment method removal
 */
router.delete('/payment-methods/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // TODO: Detach from Stripe
    // TODO: Write to AuditLog table

    res.json({ success: true, message: 'Payment method removed' });
  } catch (error) {
    console.error('Remove payment method error:', error);
    res.status(500).json({ error: 'Failed to remove payment method' });
  }
});

/**
 * PUT /api/v1/billing/payment-methods/:id/default
 * Set default payment method
 * Access: COMPANY_ADMIN, FINANCE_USER
 * AUDIT: Logs default payment method change
 */
router.put('/payment-methods/:id/default', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // TODO: Update default in Stripe
    // TODO: Write to AuditLog table

    res.json({ success: true, message: 'Default payment method updated' });
  } catch (error) {
    console.error('Set default payment method error:', error);
    res.status(500).json({ error: 'Failed to update default payment method' });
  }
});

export default router;
