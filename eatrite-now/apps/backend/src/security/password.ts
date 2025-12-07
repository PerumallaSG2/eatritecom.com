/**
 * EatRite Work - Password Security Module
 * 
 * Enterprise-grade password hashing using bcrypt with cost factor 12.
 * Ensures passwords are never stored or logged in plaintext.
 * 
 * Security Standards:
 * - bcrypt cost factor: 12 (OWASP recommended minimum for 2024)
 * - Automatic salt generation per password
 * - Constant-time comparison to prevent timing attacks
 * 
 * @module security/password
 */

import bcrypt from 'bcrypt';

/**
 * bcrypt cost factor (work factor)
 * 
 * Cost factor 12 = 2^12 = 4,096 iterations
 * This provides strong security while maintaining acceptable performance
 * (~250-350ms per hash on modern hardware)
 * 
 * OWASP 2024 recommendation: minimum 12, recommended 14+ for high-security
 */
const BCRYPT_COST_FACTOR = 12;

/**
 * Hash a plaintext password using bcrypt
 * 
 * Automatically generates a unique salt for each password.
 * The salt is embedded in the hash output (no separate storage needed).
 * 
 * @param plaintextPassword - The password to hash (NOT logged or stored)
 * @returns Promise resolving to bcrypt hash string (60 characters)
 * 
 * @example
 * ```typescript
 * const hashedPassword = await hashPassword('userPassword123');
 * // Returns: $2b$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW
 * ```
 * 
 * @throws {Error} If password is empty or undefined
 */
export async function hashPassword(plaintextPassword: string): Promise<string> {
  if (!plaintextPassword || plaintextPassword.trim().length === 0) {
    throw new Error('Password cannot be empty');
  }

  // Validate password meets minimum requirements
  if (plaintextPassword.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  try {
    // bcrypt.hash automatically generates salt and returns combined hash
    const hash = await bcrypt.hash(plaintextPassword, BCRYPT_COST_FACTOR);
    return hash;
  } catch (error) {
    // Never log the actual password
    throw new Error('Password hashing failed');
  }
}

/**
 * Verify a plaintext password against a stored bcrypt hash
 * 
 * Uses constant-time comparison to prevent timing attacks.
 * Automatically extracts salt from the stored hash.
 * 
 * @param plaintextPassword - The password to verify (NOT logged)
 * @param storedHash - The bcrypt hash from database
 * @returns Promise resolving to true if password matches, false otherwise
 * 
 * @example
 * ```typescript
 * const isValid = await verifyPassword('userPassword123', storedHash);
 * if (isValid) {
 *   // Allow login
 * }
 * ```
 * 
 * @throws {Error} If inputs are invalid
 */
export async function verifyPassword(
  plaintextPassword: string,
  storedHash: string
): Promise<boolean> {
  if (!plaintextPassword || !storedHash) {
    throw new Error('Password and hash are required for verification');
  }

  try {
    // bcrypt.compare uses constant-time comparison to prevent timing attacks
    const isMatch = await bcrypt.compare(plaintextPassword, storedHash);
    return isMatch;
  } catch (error) {
    // Never log passwords or hashes in error messages
    throw new Error('Password verification failed');
  }
}

/**
 * Check if a stored hash needs rehashing (e.g., cost factor changed)
 * 
 * Use this to proactively upgrade password security when users log in.
 * If cost factor has increased, rehash on next successful login.
 * 
 * @param storedHash - The bcrypt hash from database
 * @returns Promise resolving to true if rehashing is recommended
 * 
 * @example
 * ```typescript
 * if (await needsRehash(user.passwordHash)) {
 *   const newHash = await hashPassword(plaintextPassword);
 *   await updateUserPassword(user.id, newHash);
 * }
 * ```
 */
export async function needsRehash(storedHash: string): Promise<boolean> {
  try {
    // Extract cost factor from hash (format: $2b$12$...)
    const hashParts = storedHash.split('$');
    if (hashParts.length < 4) {
      return true; // Invalid format, definitely needs rehash
    }

    const costFactorStr = hashParts[2];
    if (!costFactorStr) {
      return true; // Missing cost factor, needs rehash
    }

    const currentCostFactor = parseInt(costFactorStr, 10);
    return currentCostFactor < BCRYPT_COST_FACTOR;
  } catch (error) {
    // If we can't parse the hash, assume it needs rehashing
    return true;
  }
}

/**
 * Validate password strength (enterprise requirements)
 * 
 * Returns detailed validation result for user feedback.
 * Does NOT hash the password - call this BEFORE hashing.
 * 
 * @param password - Password to validate
 * @returns Validation result with success flag and messages
 * 
 * @example
 * ```typescript
 * const validation = validatePasswordStrength('weakpass');
 * if (!validation.valid) {
 *   return { error: validation.messages.join(', ') };
 * }
 * ```
 */
export function validatePasswordStrength(password: string): {
  valid: boolean;
  messages: string[];
} {
  const messages: string[] = [];

  if (!password || password.length < 8) {
    messages.push('Password must be at least 8 characters');
  }

  if (password.length > 128) {
    messages.push('Password must not exceed 128 characters');
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    messages.push('Password must contain at least one uppercase letter');
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    messages.push('Password must contain at least one lowercase letter');
  }

  // Check for at least one number
  if (!/[0-9]/.test(password)) {
    messages.push('Password must contain at least one number');
  }

  // Check for at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    messages.push('Password must contain at least one special character');
  }

  return {
    valid: messages.length === 0,
    messages,
  };
}

/**
 * SECURITY NOTES:
 * 
 * 1. NEVER log plaintext passwords or password hashes
 * 2. Always use hashPassword() before storing - NEVER store plaintext
 * 3. Use verifyPassword() for authentication - NEVER compare directly
 * 4. Consider implementing rate limiting on password verification
 * 5. Implement account lockout after N failed attempts
 * 6. Use HTTPS to protect passwords in transit
 * 7. Clear password variables from memory when possible
 * 
 * BCRYPT ADVANTAGES:
 * - Adaptive: Can increase cost factor as hardware improves
 * - Salt: Automatically generated per password (prevents rainbow tables)
 * - Slow: Designed to be computationally expensive (prevents brute force)
 * - Battle-tested: Industry standard since 1999
 * 
 * ROTATION STRATEGY:
 * - No rotation needed for bcrypt hashes (each has unique salt)
 * - Proactively rehash when cost factor increases (use needsRehash)
 * - Rehash on successful login if needsRehash() returns true
 */
