/**
 * EatRite Work - Encryption Key Management Module
 * 
 * Manages versioned encryption keys for field-level encryption.
 * Supports key rotation without service downtime.
 * 
 * Key Versioning Strategy:
 * - V1: Current production key (ENCRYPTION_KEY_V1)
 * - V2: Future key for rotation (ENCRYPTION_KEY_V2)
 * - V3+: Additional keys as needed
 * 
 * Rotation Workflow:
 * 1. Deploy new key version to environment
 * 2. Update CURRENT_KEY_VERSION
 * 3. New encryptions use new key
 * 4. Old data decrypts with old keys
 * 5. Background job re-encrypts data
 * 6. Retire old keys after migration
 * 
 * @module security/keyManager
 */

import crypto from 'crypto';

/**
 * Key configuration interface
 */
interface EncryptionKeyConfig {
  version: number;
  key: Buffer;
  createdAt: Date;
  deprecated?: boolean;
}

/**
 * Current encryption key version (change this during rotation)
 */
const CURRENT_KEY_VERSION = 1;

/**
 * Key length for AES-256 (32 bytes = 256 bits)
 */
const KEY_LENGTH = 32;

/**
 * In-memory key cache (loaded once per process)
 * In production, consider using a secure key management service (AWS KMS, Azure Key Vault, etc.)
 */
let keyCache: Map<number, EncryptionKeyConfig> | null = null;

/**
 * Load encryption keys from environment variables
 * 
 * Keys are stored as base64-encoded strings in environment:
 * - ENCRYPTION_KEY_V1 (required, current production key)
 * - ENCRYPTION_KEY_V2 (optional, future key for rotation)
 * - ENCRYPTION_KEY_V3 (optional, additional keys as needed)
 * 
 * @returns Map of key versions to key configurations
 * @throws {Error} If required keys are missing or invalid
 */
function loadEncryptionKeys(): Map<number, EncryptionKeyConfig> {
  if (keyCache !== null) {
    return keyCache;
  }

  const keys = new Map<number, EncryptionKeyConfig>();

  // Load V1 key (required)
  const keyV1 = process.env.ENCRYPTION_KEY_V1;
  if (!keyV1) {
    throw new Error('ENCRYPTION_KEY_V1 is required in environment');
  }

  try {
    const keyBuffer = Buffer.from(keyV1, 'base64');
    if (keyBuffer.length !== KEY_LENGTH) {
      throw new Error(`ENCRYPTION_KEY_V1 must be ${KEY_LENGTH} bytes (base64 encoded)`);
    }

    keys.set(1, {
      version: 1,
      key: keyBuffer,
      createdAt: new Date(),
      deprecated: CURRENT_KEY_VERSION > 1,
    });
  } catch (error) {
    throw new Error('Invalid ENCRYPTION_KEY_V1 format: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }

  // Load V2 key (optional, for rotation)
  const keyV2 = process.env.ENCRYPTION_KEY_V2;
  if (keyV2) {
    try {
      const keyBuffer = Buffer.from(keyV2, 'base64');
      if (keyBuffer.length !== KEY_LENGTH) {
        throw new Error(`ENCRYPTION_KEY_V2 must be ${KEY_LENGTH} bytes (base64 encoded)`);
      }

      keys.set(2, {
        version: 2,
        key: keyBuffer,
        createdAt: new Date(),
        deprecated: CURRENT_KEY_VERSION > 2,
      });
    } catch (error) {
      throw new Error('Invalid ENCRYPTION_KEY_V2 format: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  // Load V3 key (optional, future expansion)
  const keyV3 = process.env.ENCRYPTION_KEY_V3;
  if (keyV3) {
    try {
      const keyBuffer = Buffer.from(keyV3, 'base64');
      if (keyBuffer.length !== KEY_LENGTH) {
        throw new Error(`ENCRYPTION_KEY_V3 must be ${KEY_LENGTH} bytes (base64 encoded)`);
      }

      keys.set(3, {
        version: 3,
        key: keyBuffer,
        createdAt: new Date(),
        deprecated: CURRENT_KEY_VERSION > 3,
      });
    } catch (error) {
      throw new Error('Invalid ENCRYPTION_KEY_V3 format: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  // Cache keys for future use
  keyCache = keys;

  return keys;
}

/**
 * Get encryption key by version
 * 
 * If no version specified, returns current key version.
 * Used by encryption module to encrypt/decrypt data.
 * 
 * @param version - Key version to retrieve (optional, defaults to current)
 * @returns Key configuration with Buffer and version
 * 
 * @example
 * ```typescript
 * // Get current key for encryption
 * const { key, version } = await getEncryptionKey();
 * 
 * // Get specific key for decryption
 * const { key } = await getEncryptionKey(1);
 * ```
 * 
 * @throws {Error} If requested key version doesn't exist
 */
export async function getEncryptionKey(
  version?: number
): Promise<{ key: Buffer; version: number }> {
  const keys = loadEncryptionKeys();

  // Use current version if not specified
  const requestedVersion = version ?? CURRENT_KEY_VERSION;

  const keyConfig = keys.get(requestedVersion);
  if (!keyConfig) {
    throw new Error(`Encryption key version ${requestedVersion} not found`);
  }

  return {
    key: keyConfig.key,
    version: keyConfig.version,
  };
}

/**
 * Get current encryption key version
 * 
 * Use this when encrypting new data to ensure you're using the latest key.
 * 
 * @returns Current key version number
 * 
 * @example
 * ```typescript
 * const currentVersion = getCurrentKeyVersion();
 * console.log(`Encrypting with key version ${currentVersion}`);
 * ```
 */
export function getCurrentKeyVersion(): number {
  return CURRENT_KEY_VERSION;
}

/**
 * Check if a key version is deprecated
 * 
 * Deprecated keys can still decrypt old data but should not be used for new encryptions.
 * Use this to identify data that needs re-encryption.
 * 
 * @param version - Key version to check
 * @returns True if key is deprecated
 * 
 * @example
 * ```typescript
 * if (isKeyDeprecated(payload.keyVersion)) {
 *   // Schedule re-encryption job
 *   await scheduleReEncryption(recordId);
 * }
 * ```
 */
export function isKeyDeprecated(version: number): boolean {
  const keys = loadEncryptionKeys();
  const keyConfig = keys.get(version);
  return keyConfig?.deprecated ?? false;
}

/**
 * List all available key versions
 * 
 * Useful for administrative tasks and monitoring.
 * 
 * @returns Array of available key version numbers
 * 
 * @example
 * ```typescript
 * const versions = listKeyVersions();
 * console.log(`Available key versions: ${versions.join(', ')}`);
 * ```
 */
export function listKeyVersions(): number[] {
  const keys = loadEncryptionKeys();
  return Array.from(keys.keys()).sort((a, b) => a - b);
}

/**
 * Generate a new encryption key (for setup/rotation)
 * 
 * Generates a cryptographically secure random key.
 * Returns base64-encoded string for environment variable storage.
 * 
 * ⚠️ SECURITY: Only run this in secure environment (not in production code)
 * ⚠️ Store output securely in secrets management system
 * 
 * @returns Base64-encoded 256-bit encryption key
 * 
 * @example
 * ```typescript
 * // Run once to generate new key for rotation
 * const newKey = generateEncryptionKey();
 * console.log('Add to .env as ENCRYPTION_KEY_V2:');
 * console.log(newKey);
 * ```
 */
export function generateEncryptionKey(): string {
  const key = crypto.randomBytes(KEY_LENGTH);
  return key.toString('base64');
}

/**
 * Validate encryption key format
 * 
 * Checks if a base64 string is a valid encryption key.
 * Use this to validate keys before deployment.
 * 
 * @param keyBase64 - Base64-encoded key to validate
 * @returns Validation result with success and error message
 * 
 * @example
 * ```typescript
 * const validation = validateEncryptionKey(process.env.NEW_KEY);
 * if (!validation.valid) {
 *   throw new Error(validation.error);
 * }
 * ```
 */
export function validateEncryptionKey(keyBase64: string): {
  valid: boolean;
  error?: string;
} {
  try {
    const keyBuffer = Buffer.from(keyBase64, 'base64');
    if (keyBuffer.length !== KEY_LENGTH) {
      return {
        valid: false,
        error: `Key must be ${KEY_LENGTH} bytes (${KEY_LENGTH * 8} bits), got ${keyBuffer.length} bytes`,
      };
    }
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: 'Invalid base64 encoding',
    };
  }
}

/**
 * Clear key cache (for testing or key rotation)
 * 
 * Forces keys to be reloaded from environment on next access.
 * Useful during key rotation deployment.
 * 
 * @example
 * ```typescript
 * // After deploying new key to environment
 * clearKeyCache();
 * // Next encryption will use new key
 * ```
 */
export function clearKeyCache(): void {
  keyCache = null;
}

/**
 * SECURITY BEST PRACTICES:
 * 
 * 1. NEVER commit encryption keys to version control
 * 2. NEVER log encryption keys
 * 3. Store keys in secure secrets management (AWS Secrets Manager, Azure Key Vault, etc.)
 * 4. Rotate keys regularly (recommended: every 90 days)
 * 5. Keep deprecated keys available until all data is re-encrypted
 * 6. Use separate keys for dev/staging/production
 * 7. Audit key access and usage
 * 8. Implement key rotation automation
 * 
 * KEY GENERATION:
 * ```bash
 * # Generate new encryption key (Node.js)
 * node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
 * 
 * # Generate new encryption key (OpenSSL)
 * openssl rand -base64 32
 * ```
 * 
 * ENVIRONMENT SETUP:
 * ```bash
 * # .env file (NEVER commit this file)
 * ENCRYPTION_KEY_V1=your-base64-encoded-key-here
 * ENCRYPTION_KEY_V2=your-new-base64-encoded-key-here
 * ```
 * 
 * KEY ROTATION STEPS:
 * 1. Generate new key: `generateEncryptionKey()`
 * 2. Add as ENCRYPTION_KEY_V2 in environment
 * 3. Update CURRENT_KEY_VERSION to 2
 * 4. Deploy application
 * 5. Run re-encryption job (see rotation.ts)
 * 6. Verify all data migrated
 * 7. Remove deprecated keys from environment
 */
