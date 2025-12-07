#!/usr/bin/env tsx
/**
 * EatRite Work - Generate Encryption Keys
 * 
 * This script generates cryptographically secure encryption keys
 * for use with the field-level encryption system.
 * 
 * Usage:
 *   tsx scripts/generateEncryptionKeys.ts
 * 
 * Output:
 *   Two new encryption keys (V1 and V2) in base64 format
 *   Copy these to your .env file
 * 
 * SECURITY WARNING:
 *   - Run this only on secure machines
 *   - Never commit output to version control
 *   - Store keys in secrets management system
 *   - Use separate keys for dev/staging/production
 */

// @ts-ignore - Crypto is a built-in Node.js module
import * as crypto from 'crypto';
import { generateEncryptionKey, validateEncryptionKey } from '../src/security/keyManager.js';

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║       EatRite Work - Encryption Key Generator               ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

console.log('⚠️  SECURITY WARNING:');
console.log('   - Store these keys securely (secrets manager, not git)');
console.log('   - Use separate keys for dev/staging/production');
console.log('   - Never share keys via email, Slack, or insecure channels\n');

// Generate V1 key
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('ENCRYPTION_KEY_V1 (Primary Production Key)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

const keyV1 = generateEncryptionKey();
const validationV1 = validateEncryptionKey(keyV1);

console.log(`Generated: ${keyV1}`);
console.log(`Length: 44 characters (32 bytes base64-encoded)`);
console.log(`Algorithm: AES-256-GCM`);
console.log(`Valid: ${validationV1.valid ? '✅ YES' : '❌ NO'}`);

if (!validationV1.valid) {
  console.error(`Error: ${validationV1.error}`);
  throw new Error('Key validation failed');
}

console.log('\nAdd to .env file:');
console.log(`ENCRYPTION_KEY_V1="${keyV1}"\n`);

// Generate V2 key (for rotation)
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('ENCRYPTION_KEY_V2 (Future Key for Rotation)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

const keyV2 = generateEncryptionKey();
const validationV2 = validateEncryptionKey(keyV2);

console.log(`Generated: ${keyV2}`);
console.log(`Length: 44 characters (32 bytes base64-encoded)`);
console.log(`Algorithm: AES-256-GCM`);
console.log(`Valid: ${validationV2.valid ? '✅ YES' : '❌ NO'}`);

if (!validationV2.valid) {
  console.error(`Error: ${validationV2.error}`);
  throw new Error('Key validation failed');
}

console.log('\nAdd to .env file:');
console.log(`ENCRYPTION_KEY_V2="${keyV2}"\n`);

// Full .env template
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Complete .env Template');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

console.log(`
# Encryption Keys (Field-Level Encryption)
ENCRYPTION_KEY_V1="${keyV1}"
ENCRYPTION_KEY_V2="${keyV2}"

# JWT Configuration
JWT_SECRET="${crypto.randomBytes(64).toString('base64')}"
JWT_EXPIRY="7d"

# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/eatrite_dev"

# Server
PORT=4005
NODE_ENV=development
`);

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Next Steps');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

console.log(`
1. Copy the keys above to your .env file
2. Add .env to .gitignore (NEVER commit secrets)
3. For production: use AWS Secrets Manager or Azure Key Vault
4. Test encryption with: tsx scripts/testEncryption.ts
5. Read full docs: apps/backend/SECURITY_README.md

⚠️  REMEMBER: These keys protect sensitive data. Treat them like passwords!
`);

console.log('✅ Key generation complete!\n');
