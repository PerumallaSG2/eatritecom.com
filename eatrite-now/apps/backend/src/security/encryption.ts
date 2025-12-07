/**
 * EatRite Work - Encryption Module
 * 
 * Field-level encryption using AES-256-GCM (Galois/Counter Mode).
 * Provides authenticated encryption with additional data (AEAD).
 * 
 * Use Cases:
 * - Billing contact email
 * - Billing address
 * - Payment metadata (non-Stripe)
 * - Any PII/sensitive data at rest
 * 
 * Security Properties:
 * - Confidentiality: AES-256 encryption
 * - Authenticity: GCM authentication tag prevents tampering
 * - Uniqueness: Random IV per encryption operation
 * - Versioning: Key rotation support via keyVersion field
 * 
 * @module security/encryption
 */

import crypto from 'crypto';
import { getEncryptionKey } from './keyManager.js';

/**
 * Encryption algorithm configuration
 */
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // 128 bits for GCM
const AUTH_TAG_LENGTH = 16; // 128 bits authentication tag
const KEY_LENGTH = 32; // 256 bits for AES-256

/**
 * Encrypted payload structure
 * 
 * Contains all information needed for decryption:
 * - keyVersion: Which key was used (for rotation)
 * - iv: Initialization vector (random, unique per encryption)
 * - authTag: GCM authentication tag (prevents tampering)
 * - ciphertext: The encrypted data
 */
export interface EncryptedPayload {
  keyVersion: number;
  iv: string; // base64
  authTag: string; // base64
  ciphertext: string; // base64
}

/**
 * Encrypt sensitive data using AES-256-GCM
 * 
 * Process:
 * 1. Get current encryption key (from key manager)
 * 2. Generate random IV (never reuse)
 * 3. Encrypt plaintext
 * 4. Generate authentication tag
 * 5. Return versioned payload
 * 
 * @param plaintext - The sensitive data to encrypt
 * @param keyVersion - Optional key version (defaults to current)
 * @returns Encrypted payload with all metadata
 * 
 * @example
 * ```typescript
 * const encrypted = await encrypt('user@example.com');
 * await prisma.billing.create({
 *   data: {
 *     contactEmail: JSON.stringify(encrypted)
 *   }
 * });
 * ```
 * 
 * @throws {Error} If encryption fails
 */
export async function encrypt(
  plaintext: string,
  keyVersion?: number
): Promise<EncryptedPayload> {
  if (!plaintext) {
    throw new Error('Cannot encrypt empty data');
  }

  try {
    // Get encryption key (uses keyVersion or current)
    const { key, version } = await getEncryptionKey(keyVersion);

    // Generate random IV (MUST be unique per encryption)
    const iv = crypto.randomBytes(IV_LENGTH);

    // Create cipher with key and IV
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    // Encrypt the plaintext
    const encrypted = Buffer.concat([
      cipher.update(plaintext, 'utf8'),
      cipher.final(),
    ]);

    // Get authentication tag (proves data hasn't been tampered with)
    const authTag = cipher.getAuthTag();

    // Return structured payload
    return {
      keyVersion: version,
      iv: iv.toString('base64'),
      authTag: authTag.toString('base64'),
      ciphertext: encrypted.toString('base64'),
    };
  } catch (error) {
    // Never log the plaintext in error messages
    throw new Error('Encryption failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}

/**
 * Decrypt data encrypted with AES-256-GCM
 * 
 * Process:
 * 1. Parse encrypted payload
 * 2. Get correct encryption key by version
 * 3. Verify authentication tag
 * 4. Decrypt ciphertext
 * 
 * @param payload - The encrypted payload (from database)
 * @returns Decrypted plaintext
 * 
 * @example
 * ```typescript
 * const billing = await prisma.billing.findUnique({ where: { id } });
 * const email = await decrypt(JSON.parse(billing.contactEmail));
 * ```
 * 
 * @throws {Error} If decryption fails or authentication fails
 */
export async function decrypt(payload: EncryptedPayload): Promise<string> {
  if (!payload || !payload.ciphertext || !payload.iv || !payload.authTag) {
    throw new Error('Invalid encrypted payload');
  }

  try {
    // Get encryption key by version (supports rotation)
    const { key } = await getEncryptionKey(payload.keyVersion);

    // Parse base64-encoded components
    const iv = Buffer.from(payload.iv, 'base64');
    const authTag = Buffer.from(payload.authTag, 'base64');
    const ciphertext = Buffer.from(payload.ciphertext, 'base64');

    // Create decipher with key and IV
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

    // Set authentication tag (GCM verification)
    decipher.setAuthTag(authTag);

    // Decrypt the ciphertext
    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(), // Will throw if auth tag verification fails
    ]);

    return decrypted.toString('utf8');
  } catch (error) {
    // Authentication failure or decryption error
    throw new Error('Decryption failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}

/**
 * Encrypt a field before saving to database
 * 
 * Convenience wrapper that returns JSON string for storage.
 * Use this in Prisma create/update operations.
 * 
 * @param value - The value to encrypt
 * @returns JSON string of encrypted payload (ready for database)
 * 
 * @example
 * ```typescript
 * await prisma.billing.create({
 *   data: {
 *     contactEmail: await encryptField('user@example.com'),
 *     address: await encryptField('123 Main St')
 *   }
 * });
 * ```
 */
export async function encryptField(value: string): Promise<string> {
  const encrypted = await encrypt(value);
  return JSON.stringify(encrypted);
}

/**
 * Decrypt a field after reading from database
 * 
 * Convenience wrapper that parses JSON and decrypts.
 * Use this in Prisma read operations.
 * 
 * @param encryptedJson - JSON string from database
 * @returns Decrypted plaintext value
 * 
 * @example
 * ```typescript
 * const billing = await prisma.billing.findUnique({ where: { id } });
 * const email = await decryptField(billing.contactEmail);
 * const address = await decryptField(billing.address);
 * ```
 * 
 * @throws {Error} If JSON parsing or decryption fails
 */
export async function decryptField(encryptedJson: string): Promise<string> {
  try {
    const payload = JSON.parse(encryptedJson) as EncryptedPayload;
    return await decrypt(payload);
  } catch (error) {
    throw new Error('Failed to decrypt field: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}

/**
 * Bulk encrypt multiple fields
 * 
 * Encrypts multiple values in parallel for efficiency.
 * Useful when creating/updating records with multiple sensitive fields.
 * 
 * @param fields - Object with field names and plaintext values
 * @returns Object with field names and encrypted JSON strings
 * 
 * @example
 * ```typescript
 * const encrypted = await encryptFields({
 *   email: 'user@example.com',
 *   phone: '+1234567890',
 *   address: '123 Main St'
 * });
 * 
 * await prisma.billing.create({
 *   data: {
 *     contactEmail: encrypted.email,
 *     contactPhone: encrypted.phone,
 *     billingAddress: encrypted.address
 *   }
 * });
 * ```
 */
export async function encryptFields(
  fields: Record<string, string>
): Promise<Record<string, string>> {
  const entries = Object.entries(fields);
  const encrypted = await Promise.all(
    entries.map(async ([key, value]) => {
      const encryptedValue = await encryptField(value);
      return [key, encryptedValue] as [string, string];
    })
  );
  return Object.fromEntries(encrypted);
}

/**
 * Bulk decrypt multiple fields
 * 
 * Decrypts multiple values in parallel for efficiency.
 * Useful when reading records with multiple encrypted fields.
 * 
 * @param fields - Object with field names and encrypted JSON strings
 * @returns Object with field names and decrypted plaintext values
 * 
 * @example
 * ```typescript
 * const billing = await prisma.billing.findUnique({ where: { id } });
 * const decrypted = await decryptFields({
 *   email: billing.contactEmail,
 *   phone: billing.contactPhone,
 *   address: billing.billingAddress
 * });
 * 
 * // decrypted.email, decrypted.phone, decrypted.address are now plaintext
 * ```
 */
export async function decryptFields(
  fields: Record<string, string>
): Promise<Record<string, string>> {
  const entries = Object.entries(fields);
  const decrypted = await Promise.all(
    entries.map(async ([key, value]) => {
      const decryptedValue = await decryptField(value);
      return [key, decryptedValue] as [string, string];
    })
  );
  return Object.fromEntries(decrypted);
}

/**
 * Check if a value is encrypted
 * 
 * Useful for handling mixed encrypted/plaintext data during migration.
 * 
 * @param value - The value to check
 * @returns True if value appears to be an encrypted payload
 * 
 * @example
 * ```typescript
 * const email = billing.contactEmail;
 * const plainEmail = isEncrypted(email)
 *   ? await decryptField(email)
 *   : email;
 * ```
 */
export function isEncrypted(value: string): boolean {
  try {
    const parsed = JSON.parse(value);
    return (
      typeof parsed === 'object' &&
      parsed !== null &&
      'keyVersion' in parsed &&
      'iv' in parsed &&
      'authTag' in parsed &&
      'ciphertext' in parsed
    );
  } catch {
    return false;
  }
}

/**
 * SECURITY BEST PRACTICES:
 * 
 * 1. NEVER reuse IVs - always generate random IV per encryption
 * 2. NEVER log plaintext or decrypted values
 * 3. NEVER expose decrypted values to frontend unless required
 * 4. ALWAYS verify auth tag before trusting decrypted data
 * 5. ALWAYS use current key version for new encryptions
 * 6. ALWAYS store keyVersion with encrypted data (for rotation)
 * 
 * AES-256-GCM ADVANTAGES:
 * - Authenticated Encryption: Prevents tampering
 * - Parallelizable: Fast encryption/decryption
 * - NIST approved: FIPS 140-2 compliant
 * - No padding oracle attacks: GCM mode handles padding securely
 * 
 * KEY ROTATION WORKFLOW:
 * 1. Deploy new key (ENCRYPTION_KEY_V2)
 * 2. New encryptions use V2
 * 3. Old data can still be decrypted with V1
 * 4. Background job re-encrypts old data with V2
 * 5. After 100% migration, retire V1
 */
