import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const getAuthPndToken = request.cookies.get("next-auth.session-token")
      ?.value as string;

    if (!getAuthPndToken) {
      return NextResponse.redirect(
        new URL(`${process.env.NEXT_PUBLIC_SERVICE_URL}/login`, request.url)
      );
    }
  } catch (error) {
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_SERVICE_URL}/login`, request.url)
    );
  }
}

export const config = {
  matcher: ["/game/:path*", "/scores/:path*"],
};
