import * as cookie from "cookie";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { API_URL } from "./src/shared/constants";
import { Locale, routing } from "./src/shared/i18n/routing";

const intlMiddleware = createMiddleware(routing);

function isProtected(pathname: string): boolean {
  return (
    pathname.startsWith("/profile") ||
    routing.locales.some((locale) => pathname.startsWith(`/${locale}/profile`))
  );
}

export default async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const userAgent = request.headers.get("user-agent") || "";
  const clientIp =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "";

  const clientHeaders = {
    "User-Agent": userAgent,
    "X-Forwarded-For": clientIp,
  };

  const isProfileRoute = isProtected(pathname);
  const response = intlMiddleware(request);

  if (!accessToken && !refreshToken) {
    response.cookies.set("user", "null", { path: "/", sameSite: "lax" });
    if (isProfileRoute) return redirectToLogin(request);
    return response;
  }

  if (!accessToken && refreshToken) {
    const refreshRes = await handleRefresh(
      refreshToken,
      response,
      clientHeaders,
    );
    if (isProfileRoute && refreshRes.cookies.get("user")?.value === "null") {
      return redirectToLogin(request);
    }
    return refreshRes;
  }

  try {
    const userResponse = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        Cookie: `accessToken=${accessToken}`,
        ...clientHeaders,
      },
    });

    if (userResponse.status === 401 && refreshToken) {
      const refreshRes = await handleRefresh(
        refreshToken,
        response,
        clientHeaders,
      );
      if (isProfileRoute && refreshRes.cookies.get("user")?.value === "null") {
        return redirectToLogin(request);
      }
      return refreshRes;
    }

    if (!userResponse.ok) {
      response.cookies.set("user", "null", { path: "/", sameSite: "lax" });
      if (isProfileRoute) return redirectToLogin(request);
      return response;
    }

    const userData = await userResponse.json();
    response.cookies.set("user", JSON.stringify(userData), {
      path: "/",
      sameSite: "lax",
    });
  } catch (error) {
    console.error("Profile check error in middleware:", error);
    response.cookies.set("user", "null", { path: "/", sameSite: "lax" });
    if (isProfileRoute) return redirectToLogin(request);
    return response;
  }

  return response;
}

async function handleRefresh(
  refreshToken: string,
  response: NextResponse,
  clientHeaders: Record<string, string>,
): Promise<NextResponse> {
  try {
    const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
        ...clientHeaders,
      },
    });

    if (!refreshResponse.ok) {
      response.cookies.set("user", "null", { path: "/", sameSite: "lax" });
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }

    response.cookies.set("user", "null", { path: "/", sameSite: "lax" });

    const setCookieHeader = refreshResponse.headers.get("set-cookie");
    if (setCookieHeader) {
      const parsed = cookie.parseCookie(setCookieHeader);
      if (parsed.access_token) {
        response.cookies.set("accessToken", parsed.access_token, {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
        });
      }
      if (parsed.refresh_token) {
        response.cookies.set("refreshToken", parsed.refresh_token, {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
        });
      }
    }
  } catch (error) {
    console.error("Refresh token error in middleware:", error);
    response.cookies.set("user", "null", { path: "/", sameSite: "lax" });
  }

  return response;
}

function redirectToLogin(request: NextRequest): NextResponse {
  const segments = request.nextUrl.pathname.split("/");
  const locale = routing.locales.includes(segments[1] as Locale)
    ? segments[1]
    : "";
  const redirectUrl = new URL(
    locale ? `/${locale}/auth/login` : "/auth/login",
    request.url,
  );
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher:
    "/((?!api|trpc|_next/static|_next/image|_vercel|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)",
};
