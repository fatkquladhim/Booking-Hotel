import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { NextResponse } from "next/server";



const ProtectedRoutes = ["/myreservation", "/checkout", "/admin"];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const roles = session?.user?.roles;
  const pathname = request.nextUrl.pathname;

  if(!isLoggedIn && ProtectedRoutes.some((route) => pathname.startsWith(route))) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signInUrl);
  }
  if(isLoggedIn && roles && pathname.startsWith("/admin") && roles !== "admin" ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if(isLoggedIn && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/myreservation/:path*", "/checkout/:path*", "/admin/:path*", "/signin", "/signup"],
};