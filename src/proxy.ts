import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Add standard security headers to all responses
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // 1. Skip public pages & static assets
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return response;
  }

  // 2. Allow login page & auth API endpoint
  if (pathname === "/admin/login" || pathname === "/api/admin/auth") {
    return response;
  }

  // 3. Extract Session Token from Cookie or Authorization header
  const tokenFromCookie = request.cookies.get("luxotic_admin_session")?.value;
  const authHeader = request.headers.get("authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  const token = tokenFromCookie || tokenFromHeader;

  // 4. Validate Token format and Expiry (Edge Runtime friendly)
  let isAuthenticated = false;

  if (token && token.includes(".")) {
    try {
      const [payloadBase64] = token.split(".");
      if (payloadBase64) {
        // Decode base64url payload
        const rawJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
        const payload = JSON.parse(rawJson);

        const now = Math.floor(Date.now() / 1000);
        // Check if token has not expired
        if (payload && payload.exp && payload.exp > now) {
          isAuthenticated = true;
        }
      }
    } catch (err) {
      isAuthenticated = false;
    }
  }

  // 5. Handle Unauthorized Access
  if (!isAuthenticated) {
    // For API routes: Return 401 JSON
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Invalid or expired administrator session.",
        },
        { status: 401 }
      );
    }

    // For Admin Web Pages: Redirect to /admin/login
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
