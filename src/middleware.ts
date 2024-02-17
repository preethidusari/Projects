import { authMiddleware } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  if (url.pathname.startsWith("/secure")) {
    const shellToken = req.cookies.get("shell_token")?.value;
    if (!shellToken) {
      url.pathname = "/secure";
      return NextResponse.rewrite(url);
    }
    try {
      const verified = (
        await jwtVerify(
          shellToken,
          new TextEncoder().encode(process.env.SHELL_SECRET)
        )
      ).payload as { userId: string };
      if (verified.userId) {
        url.pathname = "/secure/shell"
        return NextResponse.rewrite(url);
      } else {
        url.pathname = "/secure"
        return NextResponse.rewrite(url);
      }
    } catch (error) {
      url.pathname = "/secure"
      return NextResponse.rewrite(url);
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth-callback", "/secure/:path*"],
};

export default authMiddleware;
