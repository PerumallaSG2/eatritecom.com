// @ts-nocheck
/**
 * EatRite Work - Security Integration Examples
 * 
 * Demonstrates how to integrate password hashing and field-level encryption
 * into your services and database operations.
 * 
 * ⚠️ NOTE: This file contains TEMPLATE CODE with generic examples.
 * The actual database schema uses different model names (User, Company, PaymentRecord, etc.)
 * Adapt these patterns to match your actual Prisma schema.
 * 
 * @module examples/securityIntegration
 */

import { PrismaClient } from '@prisma/client';
import {
  hashPassword,
  verifyPassword,
  needsRehash,
  validatePasswordStrength,
} from '../security/password.js';
import {
  encryptField,
  decryptField,
  encryptFields,
  decryptFields,
  isEncrypted,
} from '../security/encryption.js';

const prisma = new PrismaClient();

/**
 * ========================================
 * EXAMPLE 1: USER AUTHENTICATION
 * ========================================
 */

/**
 * Register new user with hashed password
 */
export async function registerUser(
  email: string,
  plainPassword: string,
  name: string
) {
  // Validate password strength
  const validation = validatePasswordStrength(plainPassword);
  if (!validation.valid) {
    throw new Error(`Weak password: ${validation.messages.join(', ')}`);
  }

  // Hash password before storage
  const passwordHash = await hashPassword(plainPassword);

  // Create user (password never stored in plaintext)
  const user = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
      name,
    },
  });

  console.log(`✅ User registered: ${email}`);
  return { id: user.id, email: user.email, name: user.name };
}

/**
 * Authenticate user and check if password needs upgrade
 */
export async function loginUser(email: string, plainPassword: string) {
  // Fetch user from database
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Verify password (constant-time comparison)
  const isValid = await verifyPassword(plainPassword, user.password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  // Check if password hash needs upgrade (proactive security)
  const needsUpgrade = await needsRehash(user.password);
  if (needsUpgrade) {
    console.log(`🔄 Password hash outdated, upgrading for user ${email}`);
    const newHash = await hashPassword(plainPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: newHash },
    });
  }

  console.log(`✅ User authenticated: ${email}`);
  return { id: user.id, email: user.email, name: user.name };
}

/**
 * Change user password with validation
 */
export async function changePassword(
  userId: string,
  oldPassword: string,
  newPassword: string
) {
  // Fetch user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Verify old password
  const isValid = await verifyPassword(oldPassword, user.password);
  if (!isValid) {
    throw new Error('Current password is incorrect');
  }

  // Validate new password strength
  const validation = validatePasswordStrength(newPassword);
  if (!validation.valid) {
    throw new Error(`Weak password: ${validation.messages.join(', ')}`);
  }

  // Hash and update
  const newHash = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: userId },
    data: { password: newHash },
  });

  console.log(`✅ Password changed for user ${userId}`);
}

/**
 * ========================================
 * EXAMPLE 2: BILLING INFORMATION ENCRYPTION
 * ========================================
 */

/**
 * Create customer with encrypted billing information
 */
export async function createCustomer(
  name: string,
  billingEmail: string,
  billingAddress: string,
  shippingAddress: string
) {
  // Encrypt sensitive fields before storage
  const encryptedEmail = await encryptField(billingEmail);
  const encryptedBillingAddress = await encryptField(billingAddress);
  const encryptedShippingAddress = await encryptField(shippingAddress);

  // Store encrypted data
  const customer = await prisma.customer.create({
    data: {
      name,
      billing_email: encryptedEmail,
      billing_address: encryptedBillingAddress,
      shipping_address: encryptedShippingAddress,
    },
  });

  console.log(`✅ Customer created with encrypted data: ${customer.id}`);
  return customer.id;
}

/**
 * Retrieve customer with decrypted billing information
 */
export async function getCustomerBillingInfo(customerId: string) {
  // Fetch encrypted data from database
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
  });

  if (!customer) {
    throw new Error('Customer not found');
  }

  // Decrypt sensitive fields
  const billingEmail = await decryptField(customer.billing_email);
  const billingAddress = await decryptField(customer.billing_address);
  const shippingAddress = await decryptField(customer.shipping_address);

  console.log(`✅ Customer billing info retrieved: ${customerId}`);
  return {
    id: customer.id,
    name: customer.name,
    billingEmail,
    billingAddress,
    shippingAddress,
  };
}

/**
 * Update customer billing information
 */
export async function updateCustomerBilling(
  customerId: string,
  updates: {
    billingEmail?: string;
    billingAddress?: string;
    shippingAddress?: string;
  }
) {
  // Encrypt updated fields
  const encryptedUpdates: Record<string, string> = {};

  if (updates.billingEmail) {
    encryptedUpdates.billing_email = await encryptField(updates.billingEmail);
  }
  if (updates.billingAddress) {
    encryptedUpdates.billing_address = await encryptField(updates.billingAddress);
  }
  if (updates.shippingAddress) {
    encryptedUpdates.shipping_address = await encryptField(updates.shippingAddress);
  }

  // Update database with encrypted data
  await prisma.customer.update({
    where: { id: customerId },
    data: encryptedUpdates,
  });

  console.log(`✅ Customer billing updated: ${customerId}`);
}

/**
 * ========================================
 * EXAMPLE 3: BULK ENCRYPTION (Performance Optimized)
 * ========================================
 */

/**
 * Encrypt multiple customer records in parallel
 */
export async function bulkEncryptCustomers(customerIds: string[]) {
  console.log(`🔄 Bulk encrypting ${customerIds.length} customers...`);

  const results = await Promise.all(
    customerIds.map(async (id) => {
      try {
        // Fetch customer
        const customer = await prisma.customer.findUnique({
          where: { id },
        });

        if (!customer) {
          return { id, success: false, error: 'Not found' };
        }

        // Check if already encrypted
        if (isEncrypted(customer.billing_email)) {
          return { id, success: true, skipped: true };
        }

        // Encrypt fields in parallel
        const encrypted = await encryptFields({
          billing_email: customer.billing_email,
          billing_address: customer.billing_address,
          shipping_address: customer.shipping_address,
        });

        // Update database
        await prisma.customer.update({
          where: { id },
          data: encrypted,
        });

        return { id, success: true };
      } catch (error) {
        return {
          id,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    })
  );

  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;
  const skipped = results.filter((r) => r.skipped).length;

  console.log(
    `✅ Bulk encryption complete: ${successful} successful, ${skipped} skipped, ${failed} failed`
  );

  return results;
}

/**
 * ========================================
 * EXAMPLE 4: PAYMENT METADATA ENCRYPTION
 * ========================================
 */

/**
 * Store encrypted payment metadata
 */
export async function createPaymentRecord(
  orderId: string,
  amount: number,
  metadata: {
    cardLast4: string;
    cardBrand: string;
    billingZip: string;
    paymentIntentId: string;
  }
) {
  // Encrypt sensitive payment metadata
  const encryptedMetadata = await encryptField(JSON.stringify(metadata));

  // Store payment with encrypted metadata
  const payment = await prisma.payment.create({
    data: {
      order_id: orderId,
      amount,
      status: 'completed',
      metadata: encryptedMetadata,
    },
  });

  console.log(`✅ Payment record created with encrypted metadata: ${payment.id}`);
  return payment.id;
}

/**
 * Retrieve decrypted payment metadata
 */
export async function getPaymentMetadata(paymentId: string) {
  // Fetch payment
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
  });

  if (!payment || !payment.metadata) {
    throw new Error('Payment not found');
  }

  // Decrypt metadata
  const decryptedMetadataJson = await decryptField(payment.metadata);
  const metadata = JSON.parse(decryptedMetadataJson);

  console.log(`✅ Payment metadata retrieved: ${paymentId}`);
  return {
    id: payment.id,
    orderId: payment.order_id,
    amount: payment.amount,
    metadata,
  };
}

/**
 * ========================================
 * EXAMPLE 5: MIGRATION HELPER
 * ========================================
 */

/**
 * Check if database records need encryption/re-encryption
 */
export async function auditEncryptionStatus() {
  console.log('🔍 Auditing encryption status...');

  // Check customers
  const customers = await prisma.customer.findMany();
  const customersNeedingEncryption = customers.filter(
    (c) => !isEncrypted(c.billing_email)
  );

  console.log(`Customers: ${customers.length} total`);
  console.log(`  - Encrypted: ${customers.length - customersNeedingEncryption.length}`);
  console.log(`  - Need encryption: ${customersNeedingEncryption.length}`);

  // Check payments
  const payments = await prisma.payment.findMany();
  const paymentsNeedingEncryption = payments.filter(
    (p) => p.metadata && !isEncrypted(p.metadata)
  );

  console.log(`Payments: ${payments.length} total`);
  console.log(`  - Encrypted: ${payments.length - paymentsNeedingEncryption.length}`);
  console.log(`  - Need encryption: ${paymentsNeedingEncryption.length}`);

  return {
    customersNeedingEncryption: customersNeedingEncryption.map((c) => c.id),
    paymentsNeedingEncryption: paymentsNeedingEncryption.map((p) => p.id),
  };
}

/**
 * ========================================
 * USAGE EXAMPLES
 * ========================================
 */

async function runExamples() {
  try {
    // Example 1: User Authentication
    console.log('\n=== USER AUTHENTICATION ===');
    await registerUser('john@example.com', 'SecurePass123!', 'John Doe');
    await loginUser('john@example.com', 'SecurePass123!');

    // Example 2: Billing Encryption
    console.log('\n=== BILLING ENCRYPTION ===');
    const customerId = await createCustomer(
      'Acme Corp',
      'billing@acme.com',
      '123 Main St, New York, NY 10001',
      '456 Oak Ave, Brooklyn, NY 11201'
    );
    const billingInfo = await getCustomerBillingInfo(customerId);
    console.log('Decrypted billing info:', billingInfo);

    // Example 3: Payment Metadata
    console.log('\n=== PAYMENT METADATA ===');
    const paymentId = await createPaymentRecord('order-123', 5999, {
      cardLast4: '4242',
      cardBrand: 'visa',
      billingZip: '10001',
      paymentIntentId: 'pi_123456',
    });
    const paymentData = await getPaymentMetadata(paymentId);
    console.log('Decrypted payment:', paymentData);

    // Example 4: Audit
    console.log('\n=== ENCRYPTION AUDIT ===');
    await auditEncryptionStatus();
  } catch (error) {
    console.error('❌ Example failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Uncomment to run examples
// runExamples();

/**
 * INTEGRATION CHECKLIST:
 * 
 * ✅ Password Hashing:
 *    - Use hashPassword() before storing user passwords
 *    - Use verifyPassword() during authentication
 *    - Check needsRehash() after successful login
 *    - Validate password strength before accepting
 * 
 * ✅ Field Encryption:
 *    - Use encryptField() before Prisma create/update
 *    - Use decryptField() after Prisma read
 *    - Use encryptFields() for bulk operations
 *    - Use isEncrypted() to check migration status
 * 
 * ✅ Error Handling:
 *    - All functions throw errors on failure
 *    - Use try/catch for graceful error handling
 *    - Never log plaintext passwords or decrypted data
 *    - Return generic error messages to users
 * 
 * ✅ Performance:
 *    - Encrypt/decrypt fields in parallel when possible
 *    - Use bulk operations for migrations
 *    - Cache decrypted values when safe (in-memory only)
 *    - Consider database indexing on non-encrypted fields
 * 
 * ✅ Security:
 *    - NEVER log sensitive data (passwords, credit cards, etc.)
 *    - NEVER return passwords in API responses
 *    - NEVER compare passwords with ===, use verifyPassword()
 *    - Always validate input before encryption
 *    - Keep encryption keys in secure storage (env vars, secrets manager)
 */
