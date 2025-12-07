/**
 * EatRite Work - Encryption Key Rotation Utilities
 * 
 * Provides utilities for rotating encryption keys on encrypted fields.
 * Designed for manual/scripted use - does NOT execute background jobs automatically.
 * 
 * Rotation Strategy:
 * - Re-encrypt data from old key to new key
 * - Maintain data integrity with atomic operations
 * - Track migration progress
 * - Support rollback if needed
 * 
 * Usage:
 * - Call these functions from custom migration scripts
 * - Schedule via cron/scheduled tasks externally
 * - Integrate with your job queue system (Bull, BullMQ, etc.)
 * 
 * @module security/rotation
 */

import { decrypt, encrypt, isEncrypted } from './encryption.js';
import { getEncryptionKey, isKeyDeprecated, getCurrentKeyVersion } from './keyManager.js';

/**
 * Re-encrypt a single field with new key
 * 
 * Takes encrypted field, decrypts with old key, encrypts with new key.
 * Atomic operation - either succeeds completely or fails without side effects.
 * 
 * @param encryptedValue - JSON string from database (encrypted field)
 * @param targetKeyVersion - Target key version (optional, defaults to current)
 * @returns Re-encrypted JSON string for database
 * 
 * @example
 * ```typescript
 * // Re-encrypt single field
 * const oldEncrypted = customer.billing_email;
 * const newEncrypted = await migrateEncryptedField(oldEncrypted);
 * await prisma.customer.update({
 *   where: { id: customer.id },
 *   data: { billing_email: newEncrypted }
 * });
 * ```
 * 
 * @throws {Error} If decryption or encryption fails
 */
export async function migrateEncryptedField(
  encryptedValue: string,
  targetKeyVersion?: number
): Promise<string> {
  // Validate input
  if (!encryptedValue || !isEncrypted(encryptedValue)) {
    throw new Error('Invalid encrypted value format');
  }

  try {
    // Parse payload to check current key version
    const payload = JSON.parse(encryptedValue);
    const currentKeyVersion = payload.keyVersion;

    // Get target key version (default to current)
    const targetVersion = targetKeyVersion ?? getCurrentKeyVersion();

    // Skip if already using target key
    if (currentKeyVersion === targetVersion) {
      return encryptedValue; // No migration needed
    }

    // Decrypt with old key (parse JSON string to payload)
    const parsedPayload = JSON.parse(encryptedValue);
    const plaintext = await decrypt(parsedPayload);

    // Encrypt with new key
    const newPayload = await encrypt(plaintext, targetVersion);

    // Return serialized payload
    return JSON.stringify(newPayload);
  } catch (error) {
    throw new Error(
      `Failed to migrate encrypted field: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Re-encrypt multiple fields in a record
 * 
 * Migrates all encrypted fields in an object to new key version.
 * Uses parallel encryption for performance.
 * 
 * @param record - Object with encrypted fields (JSON strings)
 * @param encryptedFields - Array of field names to migrate
 * @param targetKeyVersion - Target key version (optional, defaults to current)
 * @returns Record with re-encrypted fields
 * 
 * @example
 * ```typescript
 * // Re-encrypt customer record
 * const customer = await prisma.customer.findUnique({ where: { id } });
 * const migratedCustomer = await migrateEncryptedRecord(
 *   customer,
 *   ['billing_email', 'billing_address', 'shipping_address']
 * );
 * await prisma.customer.update({
 *   where: { id },
 *   data: migratedCustomer
 * });
 * ```
 * 
 * @throws {Error} If any field migration fails
 */
export async function migrateEncryptedRecord<T extends Record<string, any>>(
  record: T,
  encryptedFields: (keyof T)[],
  targetKeyVersion?: number
): Promise<Partial<T>> {
  const migratedData: Partial<T> = {};

  // Migrate each field in parallel
  const migrations = encryptedFields.map(async (field) => {
    const value = record[field];

    // Skip null/undefined fields
    if (value === null || value === undefined) {
      return;
    }

    // Skip non-string values (not encrypted)
    if (typeof value !== 'string') {
      return;
    }

    // Skip non-encrypted values
    if (!isEncrypted(value)) {
      return;
    }

    try {
      const migratedValue = await migrateEncryptedField(value, targetKeyVersion);
      migratedData[field] = migratedValue as T[keyof T];
    } catch (error) {
      throw new Error(
        `Failed to migrate field '${String(field)}': ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  });

  await Promise.all(migrations);

  return migratedData;
}

/**
 * Check if a record needs key rotation
 * 
 * Returns true if any encrypted field uses deprecated key.
 * Use this to identify records that need migration.
 * 
 * @param record - Object with encrypted fields (JSON strings)
 * @param encryptedFields - Array of field names to check
 * @returns True if any field uses deprecated key
 * 
 * @example
 * ```typescript
 * // Check if customer needs migration
 * const customer = await prisma.customer.findUnique({ where: { id } });
 * if (await needsKeyRotation(customer, ['billing_email', 'billing_address'])) {
 *   console.log(`Customer ${id} needs key rotation`);
 * }
 * ```
 */
export async function needsKeyRotation<T extends Record<string, any>>(
  record: T,
  encryptedFields: (keyof T)[]
): Promise<boolean> {
  for (const field of encryptedFields) {
    const value = record[field];

    // Skip null/undefined/non-string fields
    if (value === null || value === undefined || typeof value !== 'string') {
      continue;
    }

    // Skip non-encrypted values
    if (!isEncrypted(value)) {
      continue;
    }

    try {
      const payload = JSON.parse(value);
      if (isKeyDeprecated(payload.keyVersion)) {
        return true; // Found deprecated key
      }
    } catch {
      // Invalid encrypted format, skip
      continue;
    }
  }

  return false;
}

/**
 * Migration progress tracker
 * 
 * Use this interface to track migration progress across batches.
 * Store in database or memory as needed.
 */
export interface MigrationProgress {
  /** Total records to migrate */
  totalRecords: number;
  /** Records migrated successfully */
  migratedRecords: number;
  /** Records failed to migrate */
  failedRecords: number;
  /** Migration start time */
  startedAt: Date;
  /** Migration end time (if completed) */
  completedAt?: Date;
  /** Last processed record ID (for resumption) */
  lastProcessedId?: string;
  /** Error messages from failed migrations */
  errors: Array<{ recordId: string; error: string }>;
}

/**
 * Create new migration progress tracker
 * 
 * @param totalRecords - Total number of records to migrate
 * @returns Initialized progress tracker
 * 
 * @example
 * ```typescript
 * const progress = createMigrationProgress(1000);
 * console.log(`Starting migration of ${progress.totalRecords} records`);
 * ```
 */
export function createMigrationProgress(totalRecords: number): MigrationProgress {
  return {
    totalRecords,
    migratedRecords: 0,
    failedRecords: 0,
    startedAt: new Date(),
    errors: [],
  };
}

/**
 * Update migration progress after batch
 * 
 * @param progress - Current progress tracker
 * @param batchSize - Number of records processed in batch
 * @param failures - Failed record IDs with error messages
 * @param lastId - Last processed record ID (for resumption)
 * @returns Updated progress tracker
 * 
 * @example
 * ```typescript
 * const failures = [{ recordId: '123', error: 'Decryption failed' }];
 * progress = updateMigrationProgress(progress, 100, failures, 'record-100');
 * console.log(`Progress: ${progress.migratedRecords}/${progress.totalRecords}`);
 * ```
 */
export function updateMigrationProgress(
  progress: MigrationProgress,
  batchSize: number,
  failures: Array<{ recordId: string; error: string }>,
  lastId?: string
): MigrationProgress {
  const successCount = batchSize - failures.length;

  return {
    ...progress,
    migratedRecords: progress.migratedRecords + successCount,
    failedRecords: progress.failedRecords + failures.length,
    lastProcessedId: lastId,
    errors: [...progress.errors, ...failures],
  };
}

/**
 * Complete migration progress
 * 
 * @param progress - Current progress tracker
 * @returns Completed progress tracker with timestamp
 * 
 * @example
 * ```typescript
 * progress = completeMigrationProgress(progress);
 * console.log(`Migration completed in ${progress.completedAt - progress.startedAt}ms`);
 * ```
 */
export function completeMigrationProgress(
  progress: MigrationProgress
): MigrationProgress {
  return {
    ...progress,
    completedAt: new Date(),
  };
}

/**
 * EXAMPLE MIGRATION SCRIPT:
 * 
 * This is a TEMPLATE - adapt for your specific use case.
 * Run manually, via cron, or integrate with job queue.
 * 
 * ```typescript
 * // scripts/migrateCustomerEncryption.ts
 * import { PrismaClient } from '@prisma/client';
 * import {
 *   migrateEncryptedRecord,
 *   needsKeyRotation,
 *   createMigrationProgress,
 *   updateMigrationProgress,
 *   completeMigrationProgress,
 * } from '../src/security/rotation';
 * 
 * const prisma = new PrismaClient();
 * const BATCH_SIZE = 100;
 * 
 * async function migrateCustomers() {
 *   // Count total records
 *   const totalCount = await prisma.customer.count();
 *   const progress = createMigrationProgress(totalCount);
 * 
 *   console.log(`Starting migration of ${totalCount} customers`);
 * 
 *   let lastId: string | undefined;
 *   let hasMore = true;
 * 
 *   while (hasMore) {
 *     // Fetch batch
 *     const customers = await prisma.customer.findMany({
 *       take: BATCH_SIZE,
 *       skip: lastId ? 1 : 0,
 *       cursor: lastId ? { id: lastId } : undefined,
 *       orderBy: { id: 'asc' },
 *     });
 * 
 *     if (customers.length === 0) {
 *       hasMore = false;
 *       break;
 *     }
 * 
 *     // Process batch
 *     const failures: Array<{ recordId: string; error: string }> = [];
 * 
 *     for (const customer of customers) {
 *       try {
 *         // Check if migration needed
 *         const fields = ['billing_email', 'billing_address', 'shipping_address'];
 *         if (!(await needsKeyRotation(customer, fields))) {
 *           continue; // Skip already migrated
 *         }
 * 
 *         // Migrate record
 *         const migratedData = await migrateEncryptedRecord(customer, fields);
 * 
 *         // Update database
 *         await prisma.customer.update({
 *           where: { id: customer.id },
 *           data: migratedData,
 *         });
 * 
 *       } catch (error) {
 *         failures.push({
 *           recordId: customer.id,
 *           error: error instanceof Error ? error.message : 'Unknown error',
 *         });
 *       }
 * 
 *       lastId = customer.id;
 *     }
 * 
 *     // Update progress
 *     progress = updateMigrationProgress(progress, customers.length, failures, lastId);
 * 
 *     console.log(
 *       `Progress: ${progress.migratedRecords}/${progress.totalRecords} ` +
 *       `(${progress.failedRecords} failures)`
 *     );
 * 
 *     // Check if more records exist
 *     hasMore = customers.length === BATCH_SIZE;
 *   }
 * 
 *   // Complete migration
 *   progress = completeMigrationProgress(progress);
 * 
 *   console.log(`Migration completed in ${progress.completedAt.getTime() - progress.startedAt.getTime()}ms`);
 *   console.log(`Success: ${progress.migratedRecords}, Failed: ${progress.failedRecords}`);
 * 
 *   if (progress.errors.length > 0) {
 *     console.error('Failed records:', progress.errors);
 *   }
 * 
 *   await prisma.$disconnect();
 * }
 * 
 * migrateCustomers().catch(console.error);
 * ```
 * 
 * INTEGRATION WITH JOB QUEUE (Bull/BullMQ):
 * 
 * ```typescript
 * // jobs/keyRotationJob.ts
 * import Queue from 'bull';
 * import { migrateEncryptedRecord } from '../security/rotation';
 * 
 * const rotationQueue = new Queue('key-rotation', process.env.REDIS_URL);
 * 
 * // Add job
 * export async function scheduleKeyRotation(customerId: string) {
 *   await rotationQueue.add({ customerId });
 * }
 * 
 * // Process job
 * rotationQueue.process(async (job) => {
 *   const { customerId } = job.data;
 *   const customer = await prisma.customer.findUnique({ where: { id: customerId } });
 * 
 *   const migratedData = await migrateEncryptedRecord(
 *     customer,
 *     ['billing_email', 'billing_address', 'shipping_address']
 *   );
 * 
 *   await prisma.customer.update({
 *     where: { id: customerId },
 *     data: migratedData,
 *   });
 * });
 * ```
 * 
 * TESTING ROTATION:
 * 
 * ```typescript
 * // __tests__/rotation.test.ts
 * import { migrateEncryptedField } from '../security/rotation';
 * import { encrypt, decrypt } from '../security/encryption';
 * 
 * test('migrates encrypted field to new key', async () => {
 *   // Encrypt with V1 key
 *   const original = 'test@example.com';
 *   const encryptedV1 = await encrypt(original, 1);
 *   const serializedV1 = JSON.stringify(encryptedV1);
 * 
 *   // Migrate to V2 key
 *   const serializedV2 = await migrateEncryptedField(serializedV1, 2);
 *   const encryptedV2 = JSON.parse(serializedV2);
 * 
 *   // Verify key version changed
 *   expect(encryptedV2.keyVersion).toBe(2);
 * 
 *   // Verify plaintext unchanged
 *   const decrypted = await decrypt(serializedV2);
 *   expect(decrypted).toBe(original);
 * });
 * ```
 */

/**
 * BEST PRACTICES:
 * 
 * 1. TEST IN STAGING FIRST
 *    - Run migration on staging database
 *    - Verify all data decrypts correctly
 *    - Measure performance and adjust batch sizes
 * 
 * 2. BACKUP BEFORE MIGRATION
 *    - Create database snapshot
 *    - Keep backup for rollback
 *    - Test restore procedure
 * 
 * 3. MONITOR MIGRATION
 *    - Track progress in real-time
 *    - Alert on failures
 *    - Log migration metrics
 * 
 * 4. HANDLE FAILURES GRACEFULLY
 *    - Retry failed records
 *    - Skip corrupted data
 *    - Report errors for manual review
 * 
 * 5. GRADUAL ROLLOUT
 *    - Start with small batch sizes
 *    - Increase batch size if stable
 *    - Pause if error rate spikes
 * 
 * 6. VERIFY COMPLETION
 *    - Query for records with old key versions
 *    - Verify all encrypted fields migrated
 *    - Test application with new keys
 * 
 * 7. RETIRE OLD KEYS SAFELY
 *    - Wait 30+ days after migration
 *    - Verify no old key usage in logs
 *    - Remove from environment securely
 */
