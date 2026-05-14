import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    if (path.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/login?error=AccessDenied", req.url));
    }

    if (path.startsWith("/staff") && !["admin", "staff"].includes(token?.role as string)) {
      return NextResponse.redirect(new URL("/login?error=AccessDenied", req.url));
    }

    if (path.startsWith("/supplier") && !["admin", "supplier"].includes(token?.role as string)) {
      return NextResponse.redirect(new URL("/login?error=AccessDenied", req.url));
    }

    if (path.startsWith("/account") && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*", "/supplier/:path*", "/account/:path*"],
};
