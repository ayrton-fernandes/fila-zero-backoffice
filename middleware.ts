import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isPublicRoute = request.nextUrl.pathname.startsWith("/public");

  // Se não for rota pública e não tiver token, redireciona para login
  if (!token && !isLoginPage && !isPublicRoute) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname);

    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set("redirectTo", request.nextUrl.pathname, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 300,
    });
    return response;
  }

  // Se tiver token e estiver na página de login, redireciona para home
  if (token && isLoginPage) {
    const redirectTo = request.cookies.get("redirectTo")?.value || "/home";
    const response = NextResponse.redirect(new URL(redirectTo, request.url));
    response.cookies.delete("redirectTo");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!login|favicon.ico|logo.*\\.png|.*\\.svg|_next/static|_next/image|fonts|icons|images|api/public).*)",
  ],
};
