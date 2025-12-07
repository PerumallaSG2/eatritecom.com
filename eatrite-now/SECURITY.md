# Security Configuration Guide

## Database Access - CRITICAL

### Production Database User Setup

**NEVER use `sa` or sysadmin accounts.** Create a least-privilege application user:

```sql
-- Create application user with minimal permissions
USE master;
CREATE LOGIN eatrite_app_user WITH PASSWORD = '<strong-password-here>';

USE eatrite_production;
CREATE USER eatrite_app_user FOR LOGIN eatrite_app_user;

-- Grant ONLY required permissions on application schema
GRANT SELECT, INSERT, UPDATE, DELETE ON SCHEMA::dbo TO eatrite_app_user;

-- Explicitly DENY dangerous permissions
DENY CREATE TABLE, ALTER, DROP TO eatrite_app_user;
DENY EXECUTE ON SCHEMA::sys TO eatrite_app_user;
DENY VIEW ANY DATABASE TO eatrite_app_user;
```

### Why This Matters

- **SQL Injection Protection**: Limited permissions reduce attack surface
- **Compliance**: SOC 2, ISO 27001, HIPAA require least-privilege access
- **Audit Trail**: Application user activities are traceable
- **Fortune-500 Requirement**: Security teams will reject `sa` usage

## Environment Variables

### Required Secrets

Generate all secrets using cryptographically secure methods:

```bash
# JWT secrets (64-byte base64)
openssl rand -base64 64

# Session secrets
openssl rand -hex 32

# Database password (32+ characters)
openssl rand -base64 32 | tr -d "=+/" | cut -c1-32
```

### Storage

**NEVER commit `.env` to version control.**

**Production:** Use platform-specific secret management:
- **Azure**: Azure Key Vault
- **AWS**: AWS Secrets Manager
- **GCP**: Secret Manager
- **Heroku**: Config Vars
- **Vercel**: Environment Variables (encrypted)

### Rotation Schedule

| Secret Type | Rotation Frequency | Impact |
|-------------|-------------------|--------|
| Database Password | 90 days | High - requires deployment |
| JWT Secret | 180 days | High - invalidates all sessions |
| Stripe Keys | On compromise | Critical - financial risk |
| API Keys | 90 days | Medium - service disruption |

## Authentication & Authorization

### JWT Configuration

**Production Settings:**
- Token lifetime: 1-8 hours (default: 8h)
- Refresh token: 7 days maximum
- Algorithm: HS256 (symmetric) or RS256 (asymmetric for microservices)

**Never:**
- Store tokens in localStorage (XSS vulnerable)
- Use tokens > 24 hours without refresh
- Expose secret keys in client code

### Role-Based Access Control (RBAC)

User roles in order of privilege:

1. **EMPLOYEE**: Meal ordering only, no financial data access
2. **OPERATIONS_USER**: Order management, delivery tracking
3. **FINANCE_USER**: Billing, invoices, payment methods (read-only)
4. **COMPANY_ADMIN**: Full company management, user provisioning
5. **SUPER_ADMIN**: Platform-wide administration (EatRite staff only)

**Enforcement:**
- Backend: Middleware validates role on every protected route
- Frontend: UI elements hidden/disabled based on role (not security boundary)
- Database: Row-level security for multi-tenant isolation

## Payment Processing (PCI DSS)

### Stripe Integration

**CRITICAL: Never store card details on your servers.**

✅ **DO:**
- Use Stripe Elements for all card inputs
- Store only Stripe payment method IDs
- Validate webhooks with signing secrets
- Use live keys only in production

❌ **DON'T:**
- Log card numbers, CVV, or full PANs
- Store raw card data in database
- Expose secret keys in client code
- Skip webhook signature verification

### PCI DSS Compliance Level

**Stripe handles PCI compliance** - you are **Level 4 merchant** (lowest requirements):
- Use Stripe.js for all card data
- Serve site over HTTPS only
- Complete annual SAQ-A questionnaire
- No card data touches your servers

## Data Protection

### Encryption

**At Rest:**
- Database: Enable Transparent Data Encryption (TDE) on SQL Server
- Backups: Encrypted with AES-256
- Logs: Mask PII/PHI in all log outputs

**In Transit:**
- TLS 1.3 minimum (1.2 acceptable)
- HTTPS everywhere (no mixed content)
- Certificate pinning for mobile apps

### Audit Logging

**ALL financial operations must write to `AuditLog` table:**

```typescript
// Every invoice, payment, pricing change
await prisma.auditLog.create({
  data: {
    userId: currentUser.id,
    action: 'INVOICE_GENERATED',
    entityType: 'INVOICE',
    entityId: invoice.id,
    changes: JSON.stringify({ amount, lineItems }),
    ipAddress: request.ip,
    userAgent: request.headers['user-agent'],
  }
})
```

**Retention:** 7 years minimum (SOX compliance)

## API Security

### Rate Limiting

**Production Settings:**
- 100 requests per 15 minutes per IP
- 1000 requests per hour per authenticated user
- Burst allowance: 120% of limit for 30 seconds

**Endpoints with stricter limits:**
- `/api/v1/auth/login`: 5 attempts per 15 min (brute force prevention)
- `/api/v1/auth/otp`: 3 SMS per hour per phone (abuse prevention)
- `/api/v1/billing/invoices/download`: 10 per minute (resource protection)

### CORS Configuration

**Production: Exact origin only**

```javascript
// ❌ NEVER use wildcards in production
cors({ origin: '*' })

// ✅ Explicit allowed origins
cors({ 
  origin: [
    'https://app.eatritecorporate.com',
    'https://employee.eatritecorporate.com'
  ],
  credentials: true
})
```

## Incident Response

### Security Event Monitoring

**Immediate alerts for:**
- Failed login attempts > 5 in 5 minutes
- Database connection failures
- Stripe webhook signature failures
- Unauthorized role escalation attempts
- Bulk data access patterns

**Alert Channels:**
- Slack: #security-alerts
- Email: security@eatritecorporate.com
- PagerDuty: Critical incidents only

### Breach Response Plan

**If credentials compromised:**

1. **Immediate (< 1 hour):**
   - Rotate all secrets (database, JWT, Stripe)
   - Revoke compromised API keys
   - Force logout all users
   - Deploy updated credentials

2. **Within 24 hours:**
   - Review audit logs for suspicious activity
   - Notify affected customers if data accessed
   - Document incident timeline
   - Begin forensic analysis

3. **Within 72 hours:**
   - File breach report if required by GDPR/state laws
   - Implement additional controls
   - Update security documentation
   - Conduct postmortem with team

## Deployment Checklist

**Before production launch:**

- [ ] All secrets generated with `openssl rand`
- [ ] Database user has minimal permissions (not `sa`)
- [ ] `.env` added to `.gitignore`
- [ ] HTTPS enforced with valid certificate
- [ ] CORS restricted to exact origins
- [ ] Rate limiting enabled
- [ ] Audit logging writes to database
- [ ] Stripe live keys configured (not test)
- [ ] Webhook signatures validated
- [ ] SQL injection parameterization verified
- [ ] XSS protection headers set
- [ ] CSRF tokens on all mutations
- [ ] Security headers (CSP, HSTS, X-Frame-Options)
- [ ] Monitoring alerts configured
- [ ] Backup strategy tested (including restore)
- [ ] Incident response contacts documented

## Compliance Certifications

**Required for Fortune-500 contracts:**

- **SOC 2 Type II**: Audit security controls annually
- **ISO 27001**: Information security management system
- **HIPAA**: If handling employee health data (meal preferences as PHI)
- **GDPR**: EU data protection (if serving European companies)
- **PCI DSS Level 4**: Payment card data security (Stripe-managed)

## Security Contact

**Report vulnerabilities:** security@eatritecorporate.com

**PGP Key:** [Include public key for encrypted reports]

**Bug Bounty:** Available for responsible disclosure

---

**Last Updated:** 2024-01-09  
**Next Review:** 2024-04-09 (Quarterly)
