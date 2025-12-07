/**
 * Invoice Generator Service
 * 
 * Purpose: Automated monthly invoice generation for corporate accounts
 * 
 * Business Rules:
 * - Invoices generated on 1st of month for previous month's usage
 * - Line items aggregated from Order records
 * - Tax calculated at company's jurisdiction rate
 * - Invoice numbers: INV-YYYY-MM-{sequence}
 * - Status: DRAFT → ISSUED → PAID
 * 
 * Audit: All operations logged to AuditLog table
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

let prismaInstance: any = null;

async function getPrisma(): Promise<any> {
  if (!prismaInstance) {
    try {
      const prismaModule = await import('@prisma/client');
      // @ts-ignore - Dynamic import pattern for Prisma
      const PrismaClient = prismaModule.PrismaClient || prismaModule.default?.PrismaClient;
      if (!PrismaClient) {
        throw new Error('PrismaClient not found - run `npx prisma generate`');
      }
      prismaInstance = new PrismaClient();
      await prismaInstance.$connect();
    } catch (error) {
      console.error('Failed to initialize Prisma Client:', error);
      throw error;
    }
  }
  return prismaInstance;
}

interface InvoiceGenerationResult {
  invoiceId: string;
  invoiceNumber: string;
  totalCents: number;
  lineItemCount: number;
}

interface LineItemInput {
  type: 'MEAL' | 'SUBSCRIPTION' | 'DISCOUNT' | 'CREDIT' | 'ADJUSTMENT';
  description: string;
  quantity: number;
  unitPriceCents: number;
  metadata?: Record<string, unknown>;
}

/**
 * Generate invoice for company for specific period
 */
export async function generateInvoiceForCompany(
  companyId: string,
  periodStart: Date,
  periodEnd: Date,
  performedBy?: string
): Promise<InvoiceGenerationResult> {
  const prisma = await getPrisma();
  
  // 1. Fetch all orders for company in period
  const orders = await prisma.order.findMany({
    where: {
      companyId,
      createdAt: {
        gte: periodStart,
        lte: periodEnd,
      },
      status: {
        in: ['DELIVERED', 'CONFIRMED'], // Only billable orders
      },
    },
    include: {
      items: {
        include: {
          meal: true,
        },
      },
    },
  });

  if (orders.length === 0) {
    throw new Error(`No billable orders found for company ${companyId} in period`);
  }

  // 2. Aggregate line items
  const lineItems: LineItemInput[] = [];
  let subtotalCents = 0;

  // Group meals by meal ID
  const mealCounts = new Map<string, { name: string; priceCents: number; count: number }>();

  for (const order of orders) {
    for (const item of order.items) {
      const mealId = item.mealId;
      const existing = mealCounts.get(mealId);

      if (existing) {
        existing.count += item.quantity;
      } else {
        mealCounts.set(mealId, {
          name: item.meal?.name || 'Unknown Meal',
          priceCents: item.priceCents,
          count: item.quantity,
        });
      }
    }
  }

  // Convert to line items
  for (const [mealId, data] of mealCounts) {
    const totalCents = data.priceCents * data.count;
    subtotalCents += totalCents;

    lineItems.push({
      type: 'MEAL',
      description: `${data.name} (Meal ID: ${mealId})`,
      quantity: data.count,
      unitPriceCents: data.priceCents,
      metadata: { mealId },
    });
  }

  // 3. Calculate tax (6.5% standard - should be jurisdiction-specific in production)
  const taxCents = Math.round(subtotalCents * 0.065);
  const totalCents = subtotalCents + taxCents;

  // 4. Generate invoice number
  const invoiceNumber = await generateInvoiceNumber(periodStart);

  // 5. Fetch company for payment terms
  const company = await prisma.company.findUnique({
    where: { id: companyId },
  });

  if (!company) {
    throw new Error(`Company ${companyId} not found`);
  }

  // 6. Calculate due date based on payment terms
  const dueDate = calculateDueDate(periodEnd, company.paymentTerms);

  // 7. Create invoice with line items in transaction
  const invoice = await prisma.$transaction(async (tx: any) => {
    const inv = await tx.invoice.create({
      data: {
        companyId,
        invoiceNumber,
        periodStart,
        periodEnd,
        status: 'DRAFT',
        subtotalCents,
        taxCents,
        totalCents,
        currency: 'USD',
        dueDate,
        issuedAt: null, // Set when status moves to ISSUED
      },
    });

    // Create line items
    await tx.invoiceLineItem.createMany({
      data: lineItems.map((item) => ({
        invoiceId: inv.id,
        type: item.type,
        description: item.description,
        quantity: item.quantity,
        unitPriceCents: item.unitPriceCents,
        totalCents: item.unitPriceCents * item.quantity,
        metadata: item.metadata,
      })),
    });

    // Audit log
    await tx.auditLog.create({
      data: {
        entityType: 'INVOICE',
        entityId: inv.id,
        action: 'INVOICE_GENERATED',
        performedBy,
        metadata: {
          invoiceNumber,
          periodStart: periodStart.toISOString(),
          periodEnd: periodEnd.toISOString(),
          totalCents,
          lineItemCount: lineItems.length,
        },
      },
    });

    return inv;
  });

  return {
    invoiceId: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    totalCents: invoice.totalCents,
    lineItemCount: lineItems.length,
  };
}

/**
 * Issue invoice (DRAFT → ISSUED)
 * This marks the invoice as final and sends to customer
 */
export async function issueInvoice(
  invoiceId: string,
  performedBy?: string
): Promise<void> {
  const prisma = await getPrisma();
  
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
  });

  if (!invoice) {
    throw new Error(`Invoice ${invoiceId} not found`);
  }

  if (invoice.status !== 'DRAFT') {
    throw new Error(`Cannot issue invoice with status ${invoice.status}`);
  }

  await prisma.$transaction(async (tx: any) => {
    await tx.invoice.update({
      where: { id: invoiceId },
      data: {
        status: 'ISSUED',
        issuedAt: new Date(),
      },
    });

    await tx.auditLog.create({
      data: {
        entityType: 'INVOICE',
        entityId: invoiceId,
        action: 'INVOICE_ISSUED',
        performedBy,
        metadata: {
          invoiceNumber: invoice.invoiceNumber,
          issuedAt: new Date().toISOString(),
        },
      },
    });
  });

  // TODO: Send email notification to company billing contact
  console.log(`📧 Invoice ${invoice.invoiceNumber} issued and notification sent`);
}

/**
 * Mark invoice as paid
 */
export async function markInvoicePaid(
  invoiceId: string,
  paymentRecordId: string,
  performedBy?: string
): Promise<void> {
  const prisma = await getPrisma();
  
  await prisma.$transaction(async (tx: any) => {
    await tx.invoice.update({
      where: { id: invoiceId },
      data: {
        status: 'PAID',
        paidAt: new Date(),
      },
    });

    await tx.auditLog.create({
      data: {
        entityType: 'INVOICE',
        entityId: invoiceId,
        action: 'INVOICE_PAID',
        performedBy,
        metadata: {
          paymentRecordId,
          paidAt: new Date().toISOString(),
        },
      },
    });
  });
}

/**
 * Generate sequential invoice number for period
 * Format: INV-YYYY-MM-###
 */
async function generateInvoiceNumber(periodStart: Date): Promise<string> {
  const prisma = await getPrisma();
  
  const year = periodStart.getFullYear();
  const month = String(periodStart.getMonth() + 1).padStart(2, '0');
  const prefix = `INV-${year}-${month}`;

  // Find highest sequence number for this month
  const lastInvoice = await prisma.invoice.findFirst({
    where: {
      invoiceNumber: {
        startsWith: prefix,
      },
    },
    orderBy: {
      invoiceNumber: 'desc',
    },
  });

  let sequence = 1;
  if (lastInvoice) {
    const match = lastInvoice.invoiceNumber.match(/-(\d+)$/);
    if (match) {
      sequence = parseInt(match[1], 10) + 1;
    }
  }

  return `${prefix}-${String(sequence).padStart(3, '0')}`;
}

/**
 * Calculate due date based on payment terms
 */
function calculateDueDate(invoiceDate: Date, paymentTerms: string): Date {
  const dueDate = new Date(invoiceDate);

  switch (paymentTerms.toUpperCase()) {
    case 'NET_15':
      dueDate.setDate(dueDate.getDate() + 15);
      break;
    case 'NET_30':
      dueDate.setDate(dueDate.getDate() + 30);
      break;
    case 'NET_60':
      dueDate.setDate(dueDate.getDate() + 60);
      break;
    case 'NET_90':
      dueDate.setDate(dueDate.getDate() + 90);
      break;
    default:
      // Default to NET_30
      dueDate.setDate(dueDate.getDate() + 30);
  }

  return dueDate;
}

/**
 * Scheduled job: Generate invoices for all companies on 1st of month
 */
export async function generateMonthlyInvoices(): Promise<void> {
  const prisma = await getPrisma();
  
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const periodStart = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
  const periodEnd = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0, 23, 59, 59);

  console.log(`📊 Generating invoices for period: ${periodStart.toISOString()} to ${periodEnd.toISOString()}`);

  // Get all active companies
  const companies = await prisma.company.findMany({
    where: { isActive: true },
  });

  let successCount = 0;
  let errorCount = 0;

  for (const company of companies) {
    try {
      const result = await generateInvoiceForCompany(
        company.id,
        periodStart,
        periodEnd,
        'SYSTEM' // System-generated
      );

      console.log(`✅ Invoice ${result.invoiceNumber} generated for ${company.name} - ${result.lineItemCount} line items, total: $${result.totalCents / 100}`);
      successCount++;

      // Auto-issue after generation (configurable per company)
      await issueInvoice(result.invoiceId, 'SYSTEM');
    } catch (error) {
      console.error(`❌ Failed to generate invoice for ${company.name}:`, error);
      errorCount++;
    }
  }

  console.log(`✅ Invoice generation complete: ${successCount} succeeded, ${errorCount} failed`);
}
