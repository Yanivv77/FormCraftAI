import { NextResponse } from 'next/server';
import { clerkMiddleware } from "@clerk/nextjs/server";

const protectedRoutes = ['/dashboard', '/profile'];
const isProtectedRoute = (pathname) => {
  return protectedRoutes.some((route) => pathname.startsWith(route));
};

// Combine middlewares
export default async function middleware(req) {

  // Extract pathname from the request URL
  const { pathname } = req.nextUrl;
  if (isProtectedRoute(pathname)) {
    return clerkMiddleware()(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/api/(.*)'],
};