import { NextResponse } from "next/server";
import { getAdminAuth, saveAdminAuth } from "@/lib/admin-store";
import {
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
  hashPassword,
  verifyPassword,
  createSignedSessionToken,
  verifySignedSessionToken,
  sanitizeInput,
} from "@/lib/auth-security";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, password, newPassword } = body;

    // Get client IP for rate limiting from headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const rateLimitKey = `${clientIp}_${email || "unknown"}`;

    const authConfig = getAdminAuth();

    if (action === "login") {
      // 1. Check Rate Limit (Anti-Brute Force Protection)
      const rateLimit = checkRateLimit(rateLimitKey);
      if (!rateLimit.allowed) {
        return NextResponse.json(
          {
            success: false,
            error: `Security Lock: Too many failed login attempts. Please try again in ${rateLimit.retryAfterSeconds} seconds.`,
          },
          { status: 429 }
        );
      }

      const cleanEmail = sanitizeInput(email || "").toLowerCase();
      const cleanPassword = password || "";

      // 2. Verify Credentials using timing-safe comparison
      const isEmailValid = cleanEmail === authConfig.email.toLowerCase();
      const isPasswordValid = isEmailValid && verifyPassword(cleanPassword, authConfig.passwordHash);

      if (isEmailValid && isPasswordValid) {
        // Success: Reset failed attempts counter
        resetRateLimit(rateLimitKey);

        // If password was stored in plain text, auto-migrate to salted PBKDF2 hash!
        if (!authConfig.passwordHash.startsWith("pbkdf2$")) {
          authConfig.passwordHash = hashPassword(cleanPassword);
        }

        authConfig.lastLogin = new Date().toISOString();
        saveAdminAuth(authConfig);

        // Generate Signed HMAC-SHA256 Token
        const token = createSignedSessionToken(authConfig.email, "Super Administrator");

        const response = NextResponse.json({
          success: true,
          message: "Authentication successful.",
          user: { email: authConfig.email, role: "Super Administrator" },
          token,
        });

        // Set hardened cookie
        response.cookies.set("luxotic_admin_session", token, {
          path: "/",
          httpOnly: false, // Read by client auth handler
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24, // 24 Hours
        });

        return response;
      } else {
        // Record failed attempt
        const failureRecord = recordFailedAttempt(rateLimitKey);
        const remaining = 5 - (failureRecord.locked ? 5 : (checkRateLimit(rateLimitKey).remainingAttempts));

        return NextResponse.json(
          {
            success: false,
            error: failureRecord.locked
              ? "Security Lock: Account temporarily locked for 15 minutes due to multiple failed login attempts."
              : `Invalid email or password. (${remaining} attempts remaining before temporary lock)`,
          },
          { status: 401 }
        );
      }
    }

    if (action === "logout") {
      const response = NextResponse.json({ success: true, message: "Logged out successfully." });
      response.cookies.set("luxotic_admin_session", "", {
        path: "/",
        expires: new Date(0),
        maxAge: 0,
      });
      return response;
    }

    if (action === "change_password") {
      // Verify current password first
      if (!verifyPassword(password, authConfig.passwordHash)) {
        return NextResponse.json(
          { success: false, error: "Current password verification failed." },
          { status: 400 }
        );
      }

      if (!newPassword || newPassword.length < 8) {
        return NextResponse.json(
          { success: false, error: "New password must be at least 8 characters long for security." },
          { status: 400 }
        );
      }

      // Hash with PBKDF2 + Salt
      authConfig.passwordHash = hashPassword(newPassword);
      saveAdminAuth(authConfig);

      return NextResponse.json({
        success: true,
        message: "Admin password updated and salted securely.",
      });
    }

    return NextResponse.json({ success: false, error: "Unknown action." }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  // Check authorization header or cookie
  const authHeader = request.headers.get("authorization");
  const cookieHeader = request.headers.get("cookie") || "";
  const cookieMatch = cookieHeader.match(/luxotic_admin_session=([^;]+)/);
  const token = authHeader?.replace("Bearer ", "") || (cookieMatch ? cookieMatch[1] : "");

  const session = verifySignedSessionToken(token);

  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized session." }, { status: 401 });
  }

  const authConfig = getAdminAuth();
  return NextResponse.json({
    success: true,
    email: session.email,
    role: session.role,
    lastLogin: authConfig.lastLogin,
  });
}
