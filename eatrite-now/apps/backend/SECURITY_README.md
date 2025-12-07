# EatRite Work - Security Hardening Documentation

## Overview

This document describes the enterprise-grade security infrastructure for password hashing, field-level encryption, and key management implemented in the EatRite Work backend.

**Security Standards:**
- OWASP Password Storage Cheat Sheet 2024
- FIPS 140-2 Approved Algorithms
- NIST SP 800-175B (Key Management)
- PCI DSS Compliance (for payment data)

---

## Table of Contents

1. [Architecture](#architecture)
2. [Password Security](#password-security)
3. [Field-Level Encryption](#field-level-encryption)
4. [Key Management](#key-management)
5. [Key Rotation Workflow](#key-rotation-workflow)
6. [Integration Guide](#integration-guide)
7. [Environment Setup](#environment-setup)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                     │
│  (Services, Routes, Controllers)                        │
└────────────┬────────────────────────────────────┬───────┘
             │                                    │
             ▼                                    ▼
┌─────────────────────────┐      ┌─────────────────────────┐
│   PASSWORD SECURITY     │      │   FIELD ENCRYPTION      │
│   (password.ts)         │      │   (encryption.ts)       │
│                         │      │                         │
│  - hashPassword()       │      │  - encrypt()            │
│  - verifyPassword()     │      │  - decrypt()            │
│  - needsRehash()        │      │  - encryptField()       │
│  - validateStrength()   │      │  - decryptField()       │
└────────────┬────────────┘      └────────┬────────────────┘
             │                            │
             │                            ▼
             │                  ┌─────────────────────────┐
             │                  │   KEY MANAGEMENT        │
             │                  │   (keyManager.ts)       │
             │                  │                         │
             │                  │  - getEncryptionKey()   │
             │                  │  - listKeyVersions()    │
             │                  │  - isKeyDeprecated()    │
             │                  └────────┬────────────────┘
             │                           │
             ▼                           ▼
┌─────────────────────────────────────────────────────────┐
│                   ENVIRONMENT SECRETS                   │
│  - ENCRYPTION_KEY_V1 (current)                          │
│  - ENCRYPTION_KEY_V2 (future)                           │
│  - JWT_SECRET                                           │
└─────────────────────────────────────────────────────────┘
```

---

## Password Security

### Module: `src/security/password.ts`

Implements bcrypt-based password hashing with automatic salt generation and constant-time comparison.

#### Key Features

- **Cost Factor 12**: Industry-standard work factor (recommended by OWASP 2024)
- **Automatic Salting**: Unique salt per password (bcrypt handles this)
- **Constant-Time Comparison**: Prevents timing attacks during verification
- **Proactive Rehashing**: Detects outdated hashes and upgrades transparently
- **Password Strength Validation**: Enforces enterprise password policy

#### API

```typescript
import {
  hashPassword,
  verifyPassword,
  needsRehash,
  validatePasswordStrength,
} from './security/password.js';

// Register user
const validation = validatePasswordStrength('MyPass123!');
if (!validation.valid) {
  throw new Error(validation.messages.join(', '));
}

const hash = await hashPassword('MyPass123!');
await prisma.user.create({ data: { email, password: hash } });

// Login user
const user = await prisma.user.findUnique({ where: { email } });
const isValid = await verifyPassword('MyPass123!', user.password);

if (isValid && await needsRehash(user.password)) {
  // Upgrade hash during successful login
  const newHash = await hashPassword('MyPass123!');
  await prisma.user.update({
    where: { id: user.id },
    data: { password: newHash },
  });
}
```

#### Password Requirements

- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)
- At least 1 special character (!@#$%^&*()_+-=[]{}|;:,.<>?)

---

## Field-Level Encryption

### Module: `src/security/encryption.ts`

Implements AES-256-GCM encryption for sensitive database fields (billing emails, addresses, payment metadata).

#### Key Features

- **AES-256-GCM**: Authenticated encryption (confidentiality + integrity)
- **Random IV**: Unique initialization vector per encryption (16 bytes)
- **Auth Tag**: Prevents tampering (16 bytes)
- **Key Versioning**: Supports key rotation without downtime
- **Base64 Encoding**: Safe for JSON/database storage
- **Bulk Operations**: Parallel encryption for performance

#### API

```typescript
import {
  encrypt,
  decrypt,
  encryptField,
  decryptField,
  encryptFields,
  decryptFields,
  isEncrypted,
} from './security/encryption.js';

// Encrypt single field (for database storage)
const encryptedEmail = await encryptField('customer@example.com');
await prisma.customer.create({
  data: {
    name: 'Acme Corp',
    billing_email: encryptedEmail, // JSON string
  },
});

// Decrypt single field (after database read)
const customer = await prisma.customer.findUnique({ where: { id } });
const billingEmail = await decryptField(customer.billing_email);

// Bulk operations (parallel encryption)
const encrypted = await encryptFields({
  billing_email: 'customer@example.com',
  billing_address: '123 Main St, NY 10001',
  shipping_address: '456 Oak Ave, NY 11201',
});
await prisma.customer.create({ data: { ...encrypted } });

// Check if field needs encryption (migration helper)
if (!isEncrypted(customer.billing_email)) {
  const encrypted = await encryptField(customer.billing_email);
  await prisma.customer.update({
    where: { id },
    data: { billing_email: encrypted },
  });
}
```

#### Data Format

Encrypted fields are stored as JSON strings:

```json
{
  "keyVersion": 1,
  "iv": "base64-encoded-16-byte-iv",
  "authTag": "base64-encoded-16-byte-tag",
  "ciphertext": "base64-encoded-encrypted-data"
}
```

---

## Key Management

### Module: `src/security/keyManager.ts`

Manages versioned encryption keys with support for rotation without service downtime.

#### Key Versioning Strategy

- **V1**: Current production key (ENCRYPTION_KEY_V1)
- **V2**: Future key for rotation (ENCRYPTION_KEY_V2)
- **V3+**: Additional keys as needed

#### API

```typescript
import {
  getEncryptionKey,
  getCurrentKeyVersion,
  isKeyDeprecated,
  listKeyVersions,
  generateEncryptionKey,
} from './security/keyManager.js';

// Get current key for encryption
const { key, version } = await getEncryptionKey();
console.log(`Using key version ${version}`);

// Get specific key for decryption
const { key: oldKey } = await getEncryptionKey(1);

// Check if key is deprecated
if (isKeyDeprecated(1)) {
  console.log('Key V1 is deprecated, schedule re-encryption');
}

// Generate new key (for rotation setup)
const newKey = generateEncryptionKey();
console.log('Add to .env as ENCRYPTION_KEY_V2:');
console.log(newKey);
```

---

## Key Rotation Workflow

### 7-Step Process for Zero-Downtime Key Rotation

#### Step 1: Generate New Key

```bash
# Option A: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option B: OpenSSL
openssl rand -base64 32

# Option C: Using our utility
import { generateEncryptionKey } from './security/keyManager.js';
const newKey = generateEncryptionKey();
```

**Output Example:** `xK7+9fQ2pL8mN3vR5tY1wZ4bC6dE8gH0iJ2kL4nM6oP=`

#### Step 2: Add Key to Environment

```bash
# .env file (PRODUCTION)
ENCRYPTION_KEY_V1=current-production-key-base64
ENCRYPTION_KEY_V2=xK7+9fQ2pL8mN3vR5tY1wZ4bC6dE8gH0iJ2kL4nM6oP=  # NEW KEY
```

#### Step 3: Update Current Key Version

Edit `src/security/keyManager.ts`:

```typescript
// Change from:
const CURRENT_KEY_VERSION = 1;

// To:
const CURRENT_KEY_VERSION = 2;
```

#### Step 4: Deploy Application

```bash
# All new encryptions will use V2 key
# All existing data can still decrypt with V1 key

git add .
git commit -m "feat: rotate encryption key to V2"
git push origin main

# Deploy to production (via CI/CD or manual)
```

#### Step 5: Run Re-encryption Migration

```typescript
// scripts/rotateEncryptionKeys.ts
import { PrismaClient } from '@prisma/client';
import { migrateEncryptedRecord, needsKeyRotation } from './security/rotation.js';

const prisma = new PrismaClient();
const BATCH_SIZE = 100;

async function rotateKeys() {
  const totalCustomers = await prisma.customer.count();
  console.log(`Rotating keys for ${totalCustomers} customers...`);

  let processed = 0;
  let migrated = 0;

  while (processed < totalCustomers) {
    const customers = await prisma.customer.findMany({
      take: BATCH_SIZE,
      skip: processed,
    });

    for (const customer of customers) {
      const fields = ['billing_email', 'billing_address', 'shipping_address'];
      
      if (await needsKeyRotation(customer, fields)) {
        const migratedData = await migrateEncryptedRecord(customer, fields);
        await prisma.customer.update({
          where: { id: customer.id },
          data: migratedData,
        });
        migrated++;
      }
    }

    processed += customers.length;
    console.log(`Progress: ${processed}/${totalCustomers} (${migrated} migrated)`);
  }

  console.log(`✅ Rotation complete: ${migrated} records migrated`);
}

rotateKeys().then(() => process.exit(0));
```

Run migration:

```bash
tsx scripts/rotateEncryptionKeys.ts
```

#### Step 6: Verify Migration

```typescript
// Query for records still using old key
import { isKeyDeprecated } from './security/keyManager.js';

const customers = await prisma.customer.findMany();
const oldKeyCount = customers.filter((c) => {
  const payload = JSON.parse(c.billing_email);
  return isKeyDeprecated(payload.keyVersion);
}).length;

console.log(`Records still using old key: ${oldKeyCount}`);
// Should be 0
```

#### Step 7: Retire Old Key (After 30+ Days)

```bash
# Remove old key from environment
# .env file (PRODUCTION)
ENCRYPTION_KEY_V1=  # DELETE THIS LINE
ENCRYPTION_KEY_V2=current-production-key-base64

# Update code to remove V1 references
# Only after verifying NO data uses V1 key
```

---

## Integration Guide

### User Authentication

```typescript
import { hashPassword, verifyPassword, needsRehash } from './security/password.js';

// Registration
export async function register(email: string, password: string) {
  const hash = await hashPassword(password);
  return prisma.user.create({
    data: { email, password: hash },
  });
}

// Login
export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const valid = await verifyPassword(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  // Proactive hash upgrade
  if (await needsRehash(user.password)) {
    const newHash = await hashPassword(password);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: newHash },
    });
  }

  return { id: user.id, email: user.email };
}
```

### Billing Information

```typescript
import { encryptField, decryptField } from './security/encryption.js';

// Create customer
export async function createCustomer(billingEmail: string) {
  const encrypted = await encryptField(billingEmail);
  return prisma.customer.create({
    data: { billing_email: encrypted },
  });
}

// Get customer
export async function getCustomer(id: string) {
  const customer = await prisma.customer.findUnique({ where: { id } });
  const billingEmail = await decryptField(customer.billing_email);
  return { ...customer, billingEmail };
}
```

---

## Environment Setup

### Development (.env.development)

```bash
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/eatrite_dev"

# Encryption Keys (NEVER commit to git)
ENCRYPTION_KEY_V1="generate-with-openssl-rand-base64-32"

# JWT
JWT_SECRET="your-jwt-secret-min-32-chars"
JWT_EXPIRY="7d"

# Server
PORT=4005
NODE_ENV=development
```

### Production (.env.production)

```bash
# Database (use connection pooling)
DATABASE_URL="postgresql://user:pass@production-host:5432/eatrite_prod?connection_limit=10"

# Encryption Keys (use secrets manager in production)
ENCRYPTION_KEY_V1="production-key-v1-base64"
ENCRYPTION_KEY_V2="production-key-v2-base64"  # For rotation

# JWT
JWT_SECRET="production-jwt-secret-min-64-chars"
JWT_EXPIRY="7d"

# Server
PORT=4005
NODE_ENV=production
```

### AWS Secrets Manager (Recommended for Production)

```typescript
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({ region: 'us-east-1' });

async function getSecret(secretName: string) {
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await client.send(command);
  return JSON.parse(response.SecretString);
}

// Load secrets at startup
const secrets = await getSecret('eatrite/encryption-keys');
process.env.ENCRYPTION_KEY_V1 = secrets.ENCRYPTION_KEY_V1;
process.env.ENCRYPTION_KEY_V2 = secrets.ENCRYPTION_KEY_V2;
```

---

## Troubleshooting

### Issue: "Cannot find module 'bcrypt'"

**Solution:**
```bash
cd apps/backend
pnpm add bcrypt @types/bcrypt
```

### Issue: "ENCRYPTION_KEY_V1 is required in environment"

**Solution:**
Generate and add key to .env:
```bash
openssl rand -base64 32
# Add output to .env as ENCRYPTION_KEY_V1=...
```

### Issue: "Decryption failed: Invalid key version 2"

**Cause:** Key V2 not available in environment.

**Solution:**
Add ENCRYPTION_KEY_V2 to .env or use key V1 for decryption.

### Issue: "Password verification too slow"

**Cause:** bcrypt cost factor 12 takes ~300ms (intentional).

**Solution:**
- This is by design for security (prevents brute force)
- Do NOT lower cost factor
- Consider caching authenticated sessions (JWT)

### Issue: "Migration script hangs"

**Cause:** Large dataset or database lock.

**Solution:**
- Reduce BATCH_SIZE (e.g., 10-50 instead of 100)
- Run during off-peak hours
- Add progress logging every 10 records
- Use database connection pooling

---

## Best Practices

### Security

1. **NEVER commit secrets to version control**
   - Use .env files (add to .gitignore)
   - Use secrets management in production (AWS Secrets Manager, Azure Key Vault)

2. **NEVER log sensitive data**
   - Don't log plaintext passwords
   - Don't log decrypted values
   - Don't log encryption keys
   - Use structured logging with field redaction

3. **Rotate keys regularly**
   - Recommended: Every 90 days
   - After security incident: Immediately
   - Keep old keys until all data migrated

4. **Use separate keys per environment**
   - Dev: One set of keys
   - Staging: Different keys
   - Production: Unique, secure keys

5. **Audit key access**
   - Log when keys are loaded
   - Monitor key usage metrics
   - Alert on unusual patterns

### Performance

1. **Encrypt/decrypt in parallel**
   - Use `encryptFields()` instead of multiple `encryptField()` calls
   - Use `Promise.all()` for bulk operations

2. **Cache decrypted values carefully**
   - Only in memory (never disk)
   - Clear on logout/session end
   - Use TTL (time-to-live) limits

3. **Batch migrations**
   - Process 50-100 records at a time
   - Add delays between batches (avoid DB overload)
   - Use database transactions

4. **Index non-encrypted fields**
   - Don't index encrypted fields (useless)
   - Index fields used for queries (id, created_at, etc.)

### Development

1. **Test locally first**
   - Generate test keys for development
   - Test rotation on small dataset
   - Verify decryption after migration

2. **Use TypeScript**
   - Type safety prevents errors
   - IDE autocomplete
   - Compile-time checks

3. **Write integration tests**
   - Test encryption/decryption round-trip
   - Test key rotation
   - Test error handling

4. **Document changes**
   - Update this README
   - Comment complex logic
   - Track key rotation history

---

## Compliance

### OWASP Compliance

✅ **OWASP Password Storage Cheat Sheet 2024**
- bcrypt cost factor ≥ 12
- Automatic salt generation
- Constant-time comparison
- Proactive hash upgrades

### FIPS 140-2 Compliance

✅ **FIPS 140-2 Approved Algorithms**
- AES-256-GCM (FIPS 197 approved)
- bcrypt (derived from Blowfish, FIPS approved for key derivation)
- HMAC-SHA256 (for JWT signing, FIPS 180-4 approved)

### PCI DSS Compliance

✅ **PCI DSS Requirements**
- Requirement 3.4: Render PAN unreadable (encrypted payment metadata)
- Requirement 8.2: Strong authentication (bcrypt password hashing)
- Requirement 3.6: Key management (versioned keys, rotation)

---

## Support

For security issues or questions:
- Email: security@eatrite.work
- Slack: #security-team
- Docs: https://docs.eatrite.work/security

**Report vulnerabilities:**
- Email: security-reports@eatrite.work
- PGP Key: https://eatrite.work/.well-known/pgp-key.txt

---

## License

Internal use only - EatRite Work proprietary software.
© 2024 EatRite Work. All rights reserved.
