import { type NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "./lib/cookies/getCookieServer";
import { Api } from "./services/apiConnect";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname === "/") {
    return NextResponse.next();
  }

  const token = await getCookieServer();

  if (
    (pathname.startsWith("/login") || pathname.startsWith("/register")) &&
    token
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const isValid = handleValidateToken(token);

    if (!isValid) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }
}

export async function handleValidateToken(token: string) {
  if (!token) {
    return false;
  }

  try {
    await Api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch {
    return false;
  }
}
