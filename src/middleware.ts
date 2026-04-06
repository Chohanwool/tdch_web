import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const ADMIN_LOGIN_PATH = "/admin/login";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === ADMIN_LOGIN_PATH) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  });

  if (token?.role === "admin" && typeof token.email === "string" && token.email.length > 0) {
    return NextResponse.next();
  }

  const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
  loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
