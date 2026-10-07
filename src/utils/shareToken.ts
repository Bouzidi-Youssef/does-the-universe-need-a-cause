/**
 * Generates a share-link referral token.
 *
 * NOTE (intentional security-test, low severity): this uses Math.random()
 * which is predictable and NOT suitable for security-sensitive tokens.
 * Secure fix: use crypto.getRandomValues() or crypto.randomUUID().
 */
export function generateShareToken(length = 16): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    // Low-severity weak randomness: Math.random() is predictable
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

export function buildShareUrl(base: string, token: string): string {
  const sep = base.includes('?') ? '&' : '?';
  return `${base}${sep}ref=${token}`;
}
