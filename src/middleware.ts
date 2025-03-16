import type {
  NextFetchEvent,
  NextRequest,
  NextResponse as NextResponseType,
} from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  const response = NextResponse.next();

  const role = req.cookies.get("role")?.value?.toLowerCase();
  const isLoggedIn = req.cookies.get("token")?.value;

  if (pathname.startsWith("/admin")) {
    return adminAuth(req, response, role, isLoggedIn);
  } else {
    return merchantAuth(req, response, role, isLoggedIn);
  }
}

function adminAuth(
  req: NextRequest,
  response: NextResponseType,
  role: string | undefined,
  isLoggedIn: string | undefined
) {
  const { pathname } = req.nextUrl;

  // Redirect if user is NOT logged in or is NOT an admin
  // if (!isLoggedIn || role !== "admin") {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // If admin is already logged in and tries to access "/login", redirect to dashboard
  // if (pathname === "/login") {
  //   return NextResponse.redirect(new URL("/admin/user", req.url));
  // }

  return response;
}

function merchantAuth(
  req: NextRequest,
  response: NextResponseType,
  role: string | undefined,
  isLoggedIn: string | undefined
) {
  const { pathname } = req.nextUrl;

  // if (!isLoggedIn) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // if (role === "user" && pathname === "/login") {
  //   return NextResponse.redirect(new URL("/company-info", req.url));
  // }

  return response;
}

export const config = {
  matcher: [
    "/((?!auth|api|_next/static|_next/image|favicon.ico|socket|forgot-password|reset-password|change-password|sign-up).*)",
    "/",
  ],
};
