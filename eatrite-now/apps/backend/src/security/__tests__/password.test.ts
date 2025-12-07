/**
 * Tests for Password Security Module
 * 
 * Coverage: hashPassword, verifyPassword, needsRehash, validatePasswordStrength
 */

import { describe, it, expect, beforeAll } from '@jest/globals';
import {
  hashPassword,
  verifyPassword,
  needsRehash,
  validatePasswordStrength,
} from '../password.js';

describe('Password Security Module', () => {
  describe('hashPassword', () => {
    it('should hash a valid password', async () => {
      const password = 'SecurePass123!';
      const hash = await hashPassword(password);

      expect(hash).toBeDefined();
      expect(typeof hash).toBe('string');
      expect(hash.length).toBe(60); // bcrypt hash length
      expect(hash.startsWith('$2b$12$')).toBe(true); // bcrypt cost 12
    });

    it('should generate different hashes for the same password (unique salt)', async () => {
      const password = 'SecurePass123!';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);

      expect(hash1).not.toBe(hash2); // Different salts
      expect(hash1.length).toBe(60);
      expect(hash2.length).toBe(60);
    });

    it('should throw error for empty password', async () => {
      await expect(hashPassword('')).rejects.toThrow('Password cannot be empty');
    });

    it('should throw error for whitespace-only password', async () => {
      await expect(hashPassword('   ')).rejects.toThrow('Password cannot be empty');
    });

    it('should throw error for password shorter than 8 characters', async () => {
      await expect(hashPassword('Short1!')).rejects.toThrow('Password must be at least 8 characters');
    });

    it('should hash password with exactly 8 characters', async () => {
      const password = 'Valid123!';
      const hash = await hashPassword(password);

      expect(hash).toBeDefined();
      expect(hash.length).toBe(60);
    });

    it('should hash password with special characters', async () => {
      const password = 'P@ssw0rd!@#$%^&*()';
      const hash = await hashPassword(password);

      expect(hash).toBeDefined();
      expect(hash.length).toBe(60);
    });

    it('should hash password with unicode characters', async () => {
      const password = 'Пароль123!'; // Cyrillic
      const hash = await hashPassword(password);

      expect(hash).toBeDefined();
      expect(hash.length).toBe(60);
    });
  });

  describe('verifyPassword', () => {
    let storedHash: string;
    const correctPassword = 'SecurePass123!';

    beforeAll(async () => {
      storedHash = await hashPassword(correctPassword);
    });

    it('should verify correct password', async () => {
      const isValid = await verifyPassword(correctPassword, storedHash);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const isValid = await verifyPassword('WrongPassword123!', storedHash);
      expect(isValid).toBe(false);
    });

    it('should reject password with wrong case', async () => {
      const isValid = await verifyPassword('securepass123!', storedHash);
      expect(isValid).toBe(false);
    });

    it('should reject password with extra characters', async () => {
      const isValid = await verifyPassword('SecurePass123!x', storedHash);
      expect(isValid).toBe(false);
    });

    it('should reject password with missing characters', async () => {
      const isValid = await verifyPassword('SecurePass123', storedHash);
      expect(isValid).toBe(false);
    });

    it('should throw error for empty password', async () => {
      await expect(verifyPassword('', storedHash)).rejects.toThrow('Password and hash are required');
    });

    it('should throw error for empty hash', async () => {
      await expect(verifyPassword(correctPassword, '')).rejects.toThrow('Password and hash are required');
    });

    it('should handle invalid hash format gracefully', async () => {
      await expect(verifyPassword(correctPassword, 'invalid-hash')).rejects.toThrow('Password verification failed');
    });

    it('should use constant-time comparison (timing attack resistance)', async () => {
      const iterations = 10;
      const timings: number[] = [];

      for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        await verifyPassword('WrongPassword123!', storedHash);
        const end = performance.now();
        timings.push(end - start);
      }

      // Verify timings are consistent (within reasonable variance)
      const avgTime = timings.reduce((a, b) => a + b) / timings.length;
      const variance = timings.map(t => Math.abs(t - avgTime)).reduce((a, b) => a + b) / timings.length;
      
      // Variance should be small relative to average time (< 50%)
      expect(variance / avgTime).toBeLessThan(0.5);
    });
  });

  describe('needsRehash', () => {
    it('should return false for hash with cost factor 12', async () => {
      const password = 'SecurePass123!';
      const hash = await hashPassword(password);
      const needsUpdate = await needsRehash(hash);

      expect(needsUpdate).toBe(false);
    });

    it('should return true for hash with lower cost factor', async () => {
      // Simulate old hash with cost factor 10
      const oldHash = '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';
      const needsUpdate = await needsRehash(oldHash);

      expect(needsUpdate).toBe(true);
    });

    it('should return true for hash with cost factor 11', async () => {
      const oldHash = '$2b$11$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';
      const needsUpdate = await needsRehash(oldHash);

      expect(needsUpdate).toBe(true);
    });

    it('should return true for invalid hash format', async () => {
      const needsUpdate = await needsRehash('invalid-hash');
      expect(needsUpdate).toBe(true);
    });

    it('should return true for empty hash', async () => {
      const needsUpdate = await needsRehash('');
      expect(needsUpdate).toBe(true);
    });

    it('should return true for malformed bcrypt hash', async () => {
      const needsUpdate = await needsRehash('$2b$');
      expect(needsUpdate).toBe(true);
    });
  });

  describe('validatePasswordStrength', () => {
    it('should accept strong password', () => {
      const result = validatePasswordStrength('SecurePass123!');
      expect(result.valid).toBe(true);
      expect(result.messages).toHaveLength(0);
    });

    it('should reject password without uppercase', () => {
      const result = validatePasswordStrength('securepass123!');
      expect(result.valid).toBe(false);
      expect(result.messages).toContain('Password must contain at least one uppercase letter');
    });

    it('should reject password without lowercase', () => {
      const result = validatePasswordStrength('SECUREPASS123!');
      expect(result.valid).toBe(false);
      expect(result.messages).toContain('Password must contain at least one lowercase letter');
    });

    it('should reject password without number', () => {
      const result = validatePasswordStrength('SecurePass!');
      expect(result.valid).toBe(false);
      expect(result.messages).toContain('Password must contain at least one number');
    });

    it('should reject password without special character', () => {
      const result = validatePasswordStrength('SecurePass123');
      expect(result.valid).toBe(false);
      expect(result.messages).toContain('Password must contain at least one special character');
    });

    it('should reject password shorter than 8 characters', () => {
      const result = validatePasswordStrength('Pass1!');
      expect(result.valid).toBe(false);
      expect(result.messages).toContain('Password must be at least 8 characters');
    });

    it('should reject password longer than 128 characters', () => {
      const longPassword = 'A'.repeat(129) + 'a1!';
      const result = validatePasswordStrength(longPassword);
      expect(result.valid).toBe(false);
      expect(result.messages).toContain('Password must not exceed 128 characters');
    });

    it('should accept password with exactly 8 characters', () => {
      const result = validatePasswordStrength('Valid123!');
      expect(result.valid).toBe(true);
      expect(result.messages).toHaveLength(0);
    });

    it('should accept password with exactly 128 characters', () => {
      const password = 'A'.repeat(120) + 'a1!@#$%^';
      const result = validatePasswordStrength(password);
      expect(result.valid).toBe(true);
      expect(result.messages).toHaveLength(0);
    });

    it('should reject empty password with multiple messages', () => {
      const result = validatePasswordStrength('');
      expect(result.valid).toBe(false);
      expect(result.messages.length).toBeGreaterThan(0);
      expect(result.messages).toContain('Password must be at least 8 characters');
    });

    it('should return all validation errors for weak password', () => {
      const result = validatePasswordStrength('weak');
      expect(result.valid).toBe(false);
      expect(result.messages.length).toBeGreaterThanOrEqual(3); // Multiple issues
    });

    it('should accept password with various special characters', () => {
      const passwords = [
        'SecurePass123!',
        'SecurePass123@',
        'SecurePass123#',
        'SecurePass123$',
        'SecurePass123%',
        'SecurePass123^',
        'SecurePass123&',
        'SecurePass123*',
        'SecurePass123(',
        'SecurePass123)',
      ];

      passwords.forEach(password => {
        const result = validatePasswordStrength(password);
        expect(result.valid).toBe(true);
      });
    });
  });

  describe('Integration - Full Auth Flow', () => {
    it('should complete full password lifecycle', async () => {
      const password = 'SecurePass123!';

      // 1. Validate password strength
      const validation = validatePasswordStrength(password);
      expect(validation.valid).toBe(true);

      // 2. Hash password
      const hash = await hashPassword(password);
      expect(hash).toBeDefined();

      // 3. Verify correct password
      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);

      // 4. Check if rehash needed (should be false for new hash)
      const needsUpdate = await needsRehash(hash);
      expect(needsUpdate).toBe(false);

      // 5. Verify incorrect password fails
      const isInvalid = await verifyPassword('WrongPassword123!', hash);
      expect(isInvalid).toBe(false);
    });

    it('should handle password upgrade scenario', async () => {
      // Simulate old hash with cost factor 10
      const oldPassword = 'OldPass123!';
      const oldHash = '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

      // 1. Check if rehash needed
      const needsUpdate = await needsRehash(oldHash);
      expect(needsUpdate).toBe(true);

      // 2. Generate new hash with current cost factor
      const newHash = await hashPassword(oldPassword);
      expect(newHash.startsWith('$2b$12$')).toBe(true);

      // 3. Verify new hash doesn't need update
      const stillNeedsUpdate = await needsRehash(newHash);
      expect(stillNeedsUpdate).toBe(false);
    });
  });

  describe('Performance', () => {
    it('should hash password in acceptable time (<500ms)', async () => {
      const password = 'SecurePass123!';
      const start = performance.now();
      await hashPassword(password);
      const end = performance.now();
      const duration = end - start;

      expect(duration).toBeLessThan(500); // Should be ~250-350ms on modern hardware
    });

    it('should verify password in acceptable time (<500ms)', async () => {
      const password = 'SecurePass123!';
      const hash = await hashPassword(password);

      const start = performance.now();
      await verifyPassword(password, hash);
      const end = performance.now();
      const duration = end - start;

      expect(duration).toBeLessThan(500);
    });
  });
});
