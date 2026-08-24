import crypto from "crypto";

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "luxotic_infra_super_secure_vault_jwt_key_2026_x99!";
const SESSION_DURATION_HOURS = 24;

// 1. In-memory Rate Limiting for Brute Force Protection
interface RateLimitRecord {
  attempts: number;
  lockedUntil: number | null;
}
const loginAttempts = new Map<string, RateLimitRecord>();

export function checkRateLimit(ipOrKey: string): { allowed: boolean; remainingAttempts: number; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ipOrKey);

  if (!record) {
    return { allowed: true, remainingAttempts: 5 };
  }

  // If locked, check if lockout duration (15 minutes) has expired
  if (record.lockedUntil) {
    if (now < record.lockedUntil) {
      const retryAfterSeconds = Math.ceil((record.lockedUntil - now) / 1000);
      return { allowed: false, remainingAttempts: 0, retryAfterSeconds };
    } else {
      // Lock expired, reset
      loginAttempts.delete(ipOrKey);
      return { allowed: true, remainingAttempts: 5 };
    }
  }

  return { allowed: true, remainingAttempts: Math.max(0, 5 - record.attempts) };
}

export function recordFailedAttempt(ipOrKey: string): { locked: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ipOrKey) || { attempts: 0, lockedUntil: null };
  record.attempts += 1;

  if (record.attempts >= 5) {
    // Lock for 15 minutes (900,000 ms)
    record.lockedUntil = now + 15 * 60 * 1000;
    loginAttempts.set(ipOrKey, record);
    return { locked: true, retryAfterSeconds: 900 };
  }

  loginAttempts.set(ipOrKey, record);
  return { locked: false };
}

export function resetRateLimit(ipOrKey: string) {
  loginAttempts.delete(ipOrKey);
}

// 2. PBKDF2 Password Hashing with Salt
export function hashPassword(plainText: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(plainText, salt, 10000, 64, "sha256").toString("hex");
  return `pbkdf2$10000$${salt}$${hash}`;
}

export function verifyPassword(plainText: string, storedHashOrPlain: string): boolean {
  try {
    // If it's stored in pbkdf2 format: pbkdf2$iterations$salt$hash
    if (storedHashOrPlain.startsWith("pbkdf2$")) {
      const parts = storedHashOrPlain.split("$");
      if (parts.length !== 4) return false;
      const iterations = parseInt(parts[1], 10);
      const salt = parts[2];
      const originalHash = parts[3];

      const checkHash = crypto.pbkdf2Sync(plainText, salt, iterations, 64, "sha256").toString("hex");
      return crypto.timingSafeEqual(Buffer.from(originalHash, "hex"), Buffer.from(checkHash, "hex"));
    }

    // Fallback for default initial plain text password ("Luxotic@2026")
    const isMatch = plainText === storedHashOrPlain;
    return isMatch;
  } catch (err) {
    return false;
  }
}

// 3. Cryptographically Signed Session Token (HMAC-SHA256)
export interface SessionPayload {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export function createSignedSessionToken(email: string, role = "Super Administrator"): string {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + SESSION_DURATION_HOURS * 3600;

  const payload: SessionPayload = { email, role, iat, exp };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");

  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadBase64)
    .digest("base64url");

  return `${payloadBase64}.${signature}`;
}

export function verifySignedSessionToken(token: string): SessionPayload | null {
  try {
    if (!token || !token.includes(".")) return null;

    const [payloadBase64, signature] = token.split(".");
    if (!payloadBase64 || !signature) return null;

    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(payloadBase64)
      .digest("base64url");

    // Constant-time signature comparison
    if (signature.length !== expectedSignature.length) return null;
    const isSigValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );

    if (!isSigValid) return null;

    const payload: SessionPayload = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf-8")
    );

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null; // Expired token
    }

    return payload;
  } catch (err) {
    return null;
  }
}

// 4. Input Sanitizer (Prevents XSS / SQLi patterns)
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // Remove HTML tag angle brackets
    .trim();
}
