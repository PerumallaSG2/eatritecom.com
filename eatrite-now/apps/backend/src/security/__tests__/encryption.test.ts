/**
 * Tests for Encryption Module
 * 
 * Coverage: encrypt, decrypt, encryptField, decryptField
 */

import { describe, it, expect, beforeAll } from '@jest/globals';
import {
  encrypt,
  decrypt,
  encryptField,
  decryptField,
} from '../encryption.js';

describe('Encryption Module', () => {
  const sampleData = 'user@example.com';
  const samplePII = 'John Doe, 123 Main St, City, State 12345';

  describe('encrypt', () => {
    it('should encrypt plaintext data', async () => {
      const encrypted = await encrypt(sampleData);

      expect(encrypted).toBeDefined();
      expect(encrypted.keyVersion).toBeDefined();
      expect(encrypted.iv).toBeDefined();
      expect(encrypted.authTag).toBeDefined();
      expect(encrypted.ciphertext).toBeDefined();
      expect(typeof encrypted.keyVersion).toBe('number');
      expect(typeof encrypted.iv).toBe('string');
      expect(typeof encrypted.authTag).toBe('string');
      expect(typeof encrypted.ciphertext).toBe('string');
    });

    it('should generate different IV for each encryption', async () => {
      const encrypted1 = await encrypt(sampleData);
      const encrypted2 = await encrypt(sampleData);

      expect(encrypted1.iv).not.toBe(encrypted2.iv);
      expect(encrypted1.ciphertext).not.toBe(encrypted2.ciphertext);
      expect(encrypted1.authTag).not.toBe(encrypted2.authTag);
    });

    it('should encrypt different data differently', async () => {
      const encrypted1 = await encrypt('data1');
      const encrypted2 = await encrypt('data2');

      expect(encrypted1.ciphertext).not.toBe(encrypted2.ciphertext);
    });

    it('should throw error for empty string', async () => {
      await expect(encrypt('')).rejects.toThrow('Cannot encrypt empty data');
    });

    it('should encrypt long text', async () => {
      const longText = 'A'.repeat(10000);
      const encrypted = await encrypt(longText);

      expect(encrypted).toBeDefined();
      expect(encrypted.ciphertext.length).toBeGreaterThan(0);
    });

    it('should encrypt special characters', async () => {
      const specialChars = '!@#$%^&*()_+{}[]|:;<>?,./~`';
      const encrypted = await encrypt(specialChars);

      expect(encrypted).toBeDefined();
      expect(encrypted.ciphertext).toBeDefined();
    });

    it('should encrypt unicode characters', async () => {
      const unicode = '日本語 中文 한국어 Ελληνικά العربية';
      const encrypted = await encrypt(unicode);

      expect(encrypted).toBeDefined();
      expect(encrypted.ciphertext).toBeDefined();
    });

    it('should include keyVersion in payload', async () => {
      const encrypted = await encrypt(sampleData);

      expect(encrypted.keyVersion).toBeGreaterThanOrEqual(1);
      expect(Number.isInteger(encrypted.keyVersion)).toBe(true);
    });
  });

  describe('decrypt', () => {
    let encryptedPayload: any;

    beforeAll(async () => {
      encryptedPayload = await encrypt(sampleData);
    });

    it('should decrypt encrypted data correctly', async () => {
      const decrypted = await decrypt(encryptedPayload);
      expect(decrypted).toBe(sampleData);
    });

    it('should decrypt long text correctly', async () => {
      const longText = 'A'.repeat(10000);
      const encrypted = await encrypt(longText);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(longText);
    });

    it('should decrypt special characters correctly', async () => {
      const specialChars = '!@#$%^&*()_+{}[]|:;<>?,./~`';
      const encrypted = await encrypt(specialChars);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(specialChars);
    });

    it('should decrypt unicode correctly', async () => {
      const unicode = '日本語 中文 한국어 Ελληνικά العربية';
      const encrypted = await encrypt(unicode);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(unicode);
    });

    it('should throw error for tampered ciphertext', async () => {
      const tampered = { ...encryptedPayload, ciphertext: 'tampered' };
      await expect(decrypt(tampered)).rejects.toThrow();
    });

    it('should throw error for tampered authTag', async () => {
      const tampered = { ...encryptedPayload, authTag: 'dGFtcGVyZWQ=' };
      await expect(decrypt(tampered)).rejects.toThrow();
    });

    it('should throw error for tampered IV', async () => {
      const tampered = { ...encryptedPayload, iv: 'dGFtcGVyZWRpdg==' };
      await expect(decrypt(tampered)).rejects.toThrow();
    });

    it('should throw error for missing keyVersion', async () => {
      const invalid = { ...encryptedPayload, keyVersion: undefined };
      await expect(decrypt(invalid)).rejects.toThrow();
    });

    it('should throw error for invalid keyVersion', async () => {
      const invalid = { ...encryptedPayload, keyVersion: 9999 };
      await expect(decrypt(invalid)).rejects.toThrow();
    });
  });

  describe('encryptField', () => {
    it('should encrypt and return JSON string', async () => {
      const encrypted = await encryptField(sampleData);

      expect(encrypted).toBeDefined();
      expect(typeof encrypted).toBe('string');
      
      // Should be valid JSON
      const parsed = JSON.parse(encrypted);
      expect(parsed.keyVersion).toBeDefined();
      expect(parsed.iv).toBeDefined();
      expect(parsed.authTag).toBeDefined();
      expect(parsed.ciphertext).toBeDefined();
    });

    it('should handle empty string', async () => {
      await expect(encryptField('')).rejects.toThrow('Cannot encrypt empty data');
    });

    it('should encrypt PII data', async () => {
      const encrypted = await encryptField(samplePII);
      expect(encrypted).toBeDefined();
      expect(encrypted).not.toContain(samplePII); // Should not contain plaintext
    });
  });

  describe('decryptField', () => {
    let encryptedField: string;

    beforeAll(async () => {
      encryptedField = await encryptField(sampleData) as string;
    });

    it('should decrypt encrypted field correctly', async () => {
      const decrypted = await decryptField(encryptedField);
      expect(decrypted).toBe(sampleData);
    });

    it('should throw error for invalid JSON', async () => {
      await expect(decryptField('invalid-json')).rejects.toThrow();
    });

    it('should throw error for JSON without required fields', async () => {
      const invalid = JSON.stringify({ ciphertext: 'test' });
      await expect(decryptField(invalid)).rejects.toThrow();
    });

    it('should decrypt PII data correctly', async () => {
      const encrypted = await encryptField(samplePII) as string;
      const decrypted = await decryptField(encrypted);

      expect(decrypted).toBe(samplePII);
    });
  });

  describe('Round-trip encryption/decryption', () => {
    it('should maintain data integrity for email', async () => {
      const email = 'billing@company.com';
      const encrypted = await encrypt(email);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(email);
    });

    it('should maintain data integrity for address', async () => {
      const address = '123 Main St, Suite 500, New York, NY 10001';
      const encrypted = await encrypt(address);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(address);
    });

    it('should maintain data integrity for JSON data', async () => {
      const jsonData = JSON.stringify({
        cardLast4: '4242',
        brand: 'visa',
        expiry: '12/25',
      });
      const encrypted = await encrypt(jsonData);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(jsonData);
      expect(JSON.parse(decrypted)).toEqual({
        cardLast4: '4242',
        brand: 'visa',
        expiry: '12/25',
      });
    });

    it('should maintain data integrity through field helpers', async () => {
      const testData = 'Sensitive Information 123!';
      const encrypted = await encryptField(testData);
      const decrypted = await decryptField(encrypted);

      expect(decrypted).toBe(testData);
    });
  });

  describe('Key versioning', () => {
    it('should include key version in encrypted payload', async () => {
      const encrypted = await encrypt(sampleData);
      
      expect(encrypted.keyVersion).toBeDefined();
      expect(typeof encrypted.keyVersion).toBe('number');
      expect(encrypted.keyVersion).toBeGreaterThanOrEqual(1);
    });

    it('should decrypt data encrypted with older key version (if key exists)', async () => {
      // Encrypt with explicit version
      const encrypted = await encrypt(sampleData, 1);
      expect(encrypted.keyVersion).toBe(1);

      // Should be able to decrypt
      const decrypted = await decrypt(encrypted);
      expect(decrypted).toBe(sampleData);
    });
  });

  describe('Security properties', () => {
    it('should not expose plaintext in encrypted payload', async () => {
      const sensitive = 'top-secret-data';
      const encrypted = await encrypt(sensitive);
      const serialized = JSON.stringify(encrypted);

      expect(serialized).not.toContain(sensitive);
      expect(encrypted.ciphertext).not.toContain(sensitive);
    });

    it('should use different IV for each encryption (prevent IV reuse)', async () => {
      const ivs = new Set<string>();
      
      for (let i = 0; i < 100; i++) {
        const encrypted = await encrypt(`test-${i}`);
        ivs.add(encrypted.iv);
      }

      // All IVs should be unique
      expect(ivs.size).toBe(100);
    });

    it('should detect tampering via auth tag', async () => {
      const encrypted = await encrypt('important-data');
      
      // Tamper with ciphertext
      const tamperedCiphertext = Buffer.from(encrypted.ciphertext, 'base64');
      if (tamperedCiphertext.length > 0 && tamperedCiphertext[0] !== undefined) {
        tamperedCiphertext[0] = tamperedCiphertext[0] ^ 1; // Flip one bit
      }
      const tampered = {
        ...encrypted,
        ciphertext: tamperedCiphertext.toString('base64'),
      };

      // Decryption should fail (auth tag mismatch)
      await expect(decrypt(tampered)).rejects.toThrow();
    });

    it('should enforce minimum ciphertext length', async () => {
      const shortData = 'x';
      const encrypted = await encrypt(shortData);

      expect(encrypted.ciphertext.length).toBeGreaterThan(0);
      expect(encrypted.iv.length).toBeGreaterThan(0);
      expect(encrypted.authTag.length).toBeGreaterThan(0);
    });
  });

  describe('Performance', () => {
    it('should encrypt small data quickly (<100ms)', async () => {
      const start = performance.now();
      await encrypt(sampleData);
      const end = performance.now();

      expect(end - start).toBeLessThan(100);
    });

    it('should decrypt small data quickly (<100ms)', async () => {
      const encrypted = await encrypt(sampleData);
      
      const start = performance.now();
      await decrypt(encrypted);
      const end = performance.now();

      expect(end - start).toBeLessThan(100);
    });

    it('should handle bulk encryption efficiently', async () => {
      const items = Array.from({ length: 100 }, (_, i) => `item-${i}`);
      
      const start = performance.now();
      await Promise.all(items.map(item => encrypt(item)));
      const end = performance.now();

      expect(end - start).toBeLessThan(5000); // 100 items in < 5 seconds
    });
  });

  describe('Edge cases', () => {
    it('should handle empty object encryption', async () => {
      const emptyObj = JSON.stringify({});
      const encrypted = await encrypt(emptyObj);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(emptyObj);
    });

    it('should handle numeric string encryption', async () => {
      const numeric = '1234567890';
      const encrypted = await encrypt(numeric);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(numeric);
    });

    it('should handle whitespace encryption', async () => {
      const whitespace = '   spaces   \n\ttabs\t\n  ';
      const encrypted = await encrypt(whitespace);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(whitespace);
    });

    it('should handle emoji encryption', async () => {
      const emoji = '😀🎉🚀💯🔐';
      const encrypted = await encrypt(emoji);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(emoji);
    });
  });
});
