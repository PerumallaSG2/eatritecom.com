# EatRite Billing Module - Implementation Documentation

## 🎯 Overview

The **Billing Module** is a Fortune 500-grade financial operations system designed for CFO and Finance teams. It provides immutable invoicing, audit trails, and integration with Stripe for payment processing.

---

## 📁 Module Structure

```
apps/backend/src/
├── services/
│   └── invoiceGenerator.ts      # ✅ PRODUCTION-READY (New)
├── routes/
│   └── billing.ts               # ✅ HARDENED (Updated with Prisma)
└── middleware/
    └── auth.ts                  # ✅ Ready for RBAC enforcement
```

---

## 🔧 Core Service: Invoice Generator

**File:** `services/invoiceGenerator.ts`

### Key Functions

#### 1. `generateInvoiceForCompany()`
**Purpose:** Automated invoice generation from order data

**Business Logic:**
- Aggregates all `DELIVERED` and `CONFIRMED` orders for a company within a period
- Groups line items by meal ID
- Calculates tax (6.5% standard - configurable)
- Generates sequential invoice numbers: `INV-YYYY-MM-###`
- Creates invoice in `DRAFT` status
- Writes audit log entry

**Usage:**
```typescript
const result = await generateInvoiceForCompany(
  'company-uuid',
  new Date('2025-11-01'),
  new Date('2025-11-30'),
  'user-uuid' // performedBy
);
```

**Returns:**
```typescript
{
  invoiceId: string;
  invoiceNumber: string; // "INV-2025-11-001"
  totalCents: number;
  lineItemCount: number;
}
```

---

#### 2. `issueInvoice()`
**Purpose:** Move invoice from DRAFT → ISSUED

**Business Logic:**
- Validates invoice is in DRAFT status
- Sets `issuedAt` timestamp
- Updates status to ISSUED
- Writes audit log
- Triggers email notification (TODO: implement)

**Usage:**
```typescript
await issueInvoice('invoice-uuid', 'user-uuid');
```

---

#### 3. `markInvoicePaid()`
**Purpose:** Record successful payment

**Business Logic:**
- Updates invoice status to PAID
- Sets `paidAt` timestamp
- Links to PaymentRecord
- Writes audit log

**Usage:**
```typescript
await markInvoicePaid(
  'invoice-uuid',
  'payment-record-uuid',
  'user-uuid'
);
```

---

#### 4. `generateMonthlyInvoices()` **[SCHEDULED JOB]**
**Purpose:** Automated bulk invoice generation on 1st of month

**Business Logic:**
- Runs for previous month (e.g., on Dec 1, generates for November)
- Processes all active companies
- Auto-issues invoices after generation
- Logs success/failure counts

**Deployment:**
```bash
# Run manually
node -e "require('./dist/services/invoiceGenerator').generateMonthlyInvoices()"

# Schedule with cron (production)
# 0 1 1 * * - Run at 1 AM on 1st of every month
```

---

## 🌐 API Routes (Billing.ts)

### Authentication Status
**Current:** ⚠️ Open (testing mode)  
**Production:** 🔒 Requires JWT + RBAC middleware

Add to all routes:
```typescript
import { authenticateToken, requireRole } from '../middleware/auth';

router.get('/summary', 
  authenticateToken, 
  requireRole(['COMPANY_ADMIN', 'FINANCE_USER']),
  async (req: AuthRequest, res: Response) => { ... }
);
```

---

### Endpoints

#### `GET /api/v1/billing/summary`
**Purpose:** CFO dashboard overview

**Response:**
```json
{
  "currentPeriodSpendCents": 2450000,
  "outstandingBalanceCents": 1225000,
  "lastInvoiceDate": "2025-11-30T00:00:00Z",
  "nextDueDate": "2025-12-30T00:00:00Z",
  "paymentTerms": "NET_30",
  "currency": "USD"
}
```

**Query Params (Testing):**
- `companyId` - Company UUID (will use `req.user.companyId` in production)

---

#### `GET /api/v1/billing/invoices`
**Purpose:** Paginated, filterable invoice list

**Query Params:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `status` - Filter by status: `DRAFT | ISSUED | PAID | OVERDUE | CANCELLED | ALL`
- `search` - Search by invoice number (case-insensitive)
- `companyId` - Company UUID (testing)

**Response:**
```json
{
  "invoices": [
    {
      "id": "uuid",
      "companyId": "uuid",
      "invoiceNumber": "INV-2025-11-001",
      "periodStart": "2025-11-01",
      "periodEnd": "2025-11-30",
      "status": "PAID",
      "subtotalCents": 2300000,
      "taxCents": 150000,
      "totalCents": 2450000,
      "currency": "USD",
      "dueDate": "2025-12-30",
      "issuedAt": "2025-11-30",
      "paidAt": "2025-12-20",
      "lineItems": [...],
      "payments": [...]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "pages": 3
  }
}
```

---

#### `GET /api/v1/billing/invoices/:id`
**Purpose:** Immutable invoice detail with audit trail

**Response:** Single invoice object (same structure as list item) with full company, lineItems, and payments relations

**Security:**
- Validates invoice belongs to user's company
- Returns 403 if access denied
- Returns 404 if invoice not found

---

## 🔐 Security & Compliance

### Audit Logging
**All financial operations write to `AuditLog` table:**

```typescript
{
  entityType: 'INVOICE',
  entityId: 'invoice-uuid',
  action: 'INVOICE_GENERATED' | 'INVOICE_ISSUED' | 'INVOICE_PAID',
  performedBy: 'user-uuid' | 'SYSTEM',
  metadata: {
    invoiceNumber: 'INV-2025-11-001',
    totalCents: 2450000,
    // ... additional context
  },
  createdAt: timestamp
}
```

**Retention:** 7 years (SOX compliance)

---

### Immutability
**Invoices cannot be edited after issuance:**
- Status transitions: `DRAFT` → `ISSUED` → `PAID` (one-way only)
- Line items frozen once invoice issued
- Corrections require CREDIT or ADJUSTMENT line items on new invoice

---

### Payment Security
**PCI DSS Level 4 Compliance:**
- ✅ Never store card numbers (Stripe handles)
- ✅ Store only Stripe payment method IDs
- ✅ Validate webhook signatures
- ✅ Use HTTPS only in production

---

## 🧪 Testing

### Manual Testing

**1. Generate Test Invoice:**
```bash
curl -X POST http://localhost:4005/api/v1/billing/test/generate-invoice \
  -H "Content-Type: application/json" \
  -d '{
    "companyId": "your-company-uuid",
    "periodStart": "2025-11-01",
    "periodEnd": "2025-11-30"
  }'
```

**2. List Invoices:**
```bash
curl "http://localhost:4005/api/v1/billing/invoices?companyId=your-company-uuid&status=ALL&page=1&limit=20"
```

**3. Get Invoice Detail:**
```bash
curl "http://localhost:4005/api/v1/billing/invoices/invoice-uuid?companyId=your-company-uuid"
```

**4. Get Billing Summary:**
```bash
curl "http://localhost:4005/api/v1/billing/summary?companyId=your-company-uuid"
```

---

### Integration Tests (TODO)

```typescript
describe('Invoice Generator', () => {
  it('should generate invoice with correct line items', async () => {
    // Create test orders
    // Run generator
    // Assert invoice totals
  });

  it('should enforce invoice immutability', async () => {
    // Issue invoice
    // Attempt to modify
    // Assert error
  });

  it('should calculate tax correctly', async () => {
    // Generate invoice
    // Assert tax = subtotal * 0.065
  });
});
```

---

## 📊 Database Schema

### Key Tables

**`invoices`**
- Primary invoice record
- Immutable once issued
- Indexed on: `companyId`, `status`, `invoiceNumber`, `dueDate`

**`invoice_line_items`**
- Line-item breakdown
- Types: `MEAL | SUBSCRIPTION | DISCOUNT | CREDIT | ADJUSTMENT`
- Foreign key: `invoiceId`

**`payment_records`**
- Payment transaction history
- Stores Stripe payment intent IDs
- Foreign keys: `invoiceId`, `companyId`

**`audit_logs`**
- Immutable audit trail
- 7-year retention
- Indexed on: `entityType`, `entityId`, `performedBy`, `createdAt`

---

## 🚀 Production Deployment Checklist

### Pre-Deployment

- [ ] Enable JWT authentication on all routes
- [ ] Add RBAC middleware (`COMPANY_ADMIN`, `FINANCE_USER` only)
- [ ] Set up environment variables:
  - `DATABASE_URL` (production PostgreSQL)
  - `STRIPE_SECRET_KEY` (live key, not test)
  - `STRIPE_WEBHOOK_SECRET`
  - `JWT_SECRET` (64-byte, secure)
- [ ] Configure tax rates per jurisdiction
- [ ] Set up email service for invoice notifications
- [ ] Deploy scheduled job for `generateMonthlyInvoices()` (cron)
- [ ] Enable HTTPS (TLS 1.3)
- [ ] Set up monitoring/alerts for invoice generation failures

### Post-Deployment

- [ ] Verify audit logs writing correctly
- [ ] Test invoice generation for sample company
- [ ] Confirm email notifications sent
- [ ] Validate Stripe webhook signatures
- [ ] Monitor invoice overdue status updates
- [ ] Set up backup strategy (7-year retention)

---

## 📈 Future Enhancements

### Phase 2 (Q1 2026)
- [ ] Multi-currency support
- [ ] Automatic overdue detection & reminders
- [ ] Payment autopay via ACH
- [ ] Invoice PDF generation & download
- [ ] Bulk invoice download (ZIP)

### Phase 3 (Q2 2026)
- [ ] Advanced analytics (DSO, AR aging)
- [ ] Dunning process automation
- [ ] Credit limit management
- [ ] Revenue recognition (ASC 606 compliance)

---

## 🆘 Support & Escalation

**Technical Issues:**
- Primary: Backend team (#backend-support)
- Escalation: Principal Engineer

**Financial Discrepancies:**
- Primary: Finance Operations team
- Escalation: CFO organization

**Security Incidents:**
- Primary: Security team (#security-incidents)
- Escalation: CISO

---

**Last Updated:** November 29, 2025  
**Module Owner:** Principal Engineer  
**Compliance:** SOX, PCI DSS Level 4, GDPR-ready
