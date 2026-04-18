import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/host"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isProtected) {
    const supabaseAuth = request.cookies.getAll().find(
      (c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token")
    );

    if (!supabaseAuth) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/host/:path*"],
};
