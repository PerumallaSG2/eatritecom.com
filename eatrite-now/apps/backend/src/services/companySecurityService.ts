/**
 * EatRite Work - Company Security Service
 * 
 * Handles encryption/decryption of sensitive company fields.
 * Uses AES-256-GCM encryption with versioned keys.
 * 
 * @module services/companySecurityService
 */

import { PrismaClient } from '@prisma/client';
import { encryptField, decryptField } from '../security/encryption.js';

const prisma = new PrismaClient();

/**
 * Create or update company with encrypted sensitive fields
 * 
 * Encrypts:
 * - billingEmail
 * - billingAddress
 * - billingContact (if contains sensitive data)
 * 
 * @param data - Company data
 * @param companyId - Company ID (for updates)
 * @returns Created/updated company
 */
export async function createOrUpdateCompanySecure(
  data: {
    name: string;
    code: string;
    email: string;
    phone?: string;
    industry?: string;
    employeeCount?: number;
    billingAddress?: string;
    tier?: string;
    billingContact?: string;
    billingEmail?: string;
    employeeLimit?: number;
    contractStart?: Date;
    contractEnd?: Date;
    paymentTerms?: string;
  },
  companyId?: string
) {
  try {
    // Encrypt sensitive fields
    const encryptedData: any = {
      ...data,
      // Encrypt billing email if provided
      billingEmail: data.billingEmail 
        ? await encryptField(data.billingEmail)
        : null,
      // Encrypt billing address if provided
      billingAddress: data.billingAddress
        ? await encryptField(data.billingAddress)
        : null,
      // Encrypt billing contact if provided
      billingContact: data.billingContact
        ? await encryptField(data.billingContact)
        : null
    };

    // Create or update company
    if (companyId) {
      return await prisma.company.update({
        where: { id: companyId },
        data: encryptedData
      });
    } else {
      return await prisma.company.create({
        data: encryptedData
      });
    }

  } catch (error) {
    console.error('Error creating/updating company with encryption:', error);
    throw new Error('Failed to save company data securely');
  }
}

/**
 * Get company with decrypted sensitive fields
 * 
 * @param companyId - Company identifier
 * @returns Company with decrypted fields
 */
export async function getCompanySecure(companyId: string) {
  try {
    const company = await prisma.company.findUnique({
      where: { id: companyId }
    });

    if (!company) {
      return null;
    }

    // Decrypt sensitive fields
    return {
      ...company,
      billingEmail: company.billingEmail 
        ? await decryptField(company.billingEmail)
        : null,
      billingAddress: company.billingAddress
        ? await decryptField(company.billingAddress)
        : null,
      billingContact: company.billingContact
        ? await decryptField(company.billingContact)
        : null
    };

  } catch (error) {
    console.error('Error fetching company with decryption:', error);
    throw new Error('Failed to retrieve company data securely');
  }
}

/**
 * Create payment record with encrypted metadata
 * 
 * @param data - Payment record data
 * @returns Created payment record
 */
export async function createPaymentRecordSecure(data: {
  companyId: string;
  invoiceId?: string;
  amountCents: number;
  method: 'CREDIT_CARD' | 'ACH' | 'WIRE_TRANSFER' | 'NET_30' | 'NET_60';
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';
  transactionId?: string;
  metadata?: any;
  processedAt?: Date;
}) {
  try {
    // Encrypt metadata if provided
    const encryptedMetadata = data.metadata
      ? await encryptField(JSON.stringify(data.metadata))
      : null;

    return await prisma.paymentRecord.create({
      data: {
        ...data,
        metadata: encryptedMetadata as any
      }
    });

  } catch (error) {
    console.error('Error creating payment record with encryption:', error);
    throw new Error('Failed to save payment record securely');
  }
}

/**
 * Get payment record with decrypted metadata
 * 
 * @param paymentId - Payment record identifier
 * @returns Payment record with decrypted metadata
 */
export async function getPaymentRecordSecure(paymentId: string) {
  try {
    const payment = await prisma.paymentRecord.findUnique({
      where: { id: paymentId }
    });

    if (!payment) {
      return null;
    }

    // Decrypt metadata if present
    let decryptedMetadata = null;
    if (payment.metadata) {
      try {
        const decrypted = await decryptField(payment.metadata as string);
        decryptedMetadata = JSON.parse(decrypted);
      } catch (error) {
        console.error('Failed to decrypt payment metadata:', error);
        // Return null metadata if decryption fails
      }
    }

    return {
      ...payment,
      metadata: decryptedMetadata
    };

  } catch (error) {
    console.error('Error fetching payment record with decryption:', error);
    throw new Error('Failed to retrieve payment record securely');
  }
}

/**
 * List payment records for a company with decrypted metadata
 * 
 * @param companyId - Company identifier
 * @param options - Query options
 * @returns List of payment records
 */
export async function listPaymentRecordsSecure(
  companyId: string,
  options: {
    skip?: number;
    take?: number;
    status?: string;
  } = {}
) {
  try {
    const { skip = 0, take = 50, status } = options;

    const where: any = { companyId };
    if (status) {
      where.status = status;
    }

    const payments = await prisma.paymentRecord.findMany({
      where,
      skip,
      take,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Decrypt metadata for each payment
    const paymentsWithDecryptedMetadata = await Promise.all(
      payments.map(async (payment) => {
        let decryptedMetadata = null;
        if (payment.metadata) {
          try {
            const decrypted = await decryptField(payment.metadata as string);
            decryptedMetadata = JSON.parse(decrypted);
          } catch (error) {
            console.error(`Failed to decrypt metadata for payment ${payment.id}:`, error);
          }
        }
        return {
          ...payment,
          metadata: decryptedMetadata
        };
      })
    );

    return paymentsWithDecryptedMetadata;

  } catch (error) {
    console.error('Error listing payment records with decryption:', error);
    throw new Error('Failed to retrieve payment records securely');
  }
}
