import { NextResponse, type NextRequest } from "next/server";
import { getSeoConfig } from "@/lib/seo/config";

function createContentSecurityPolicy(nonce: string, isProduction: boolean) {
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com`,
    `style-src 'self' 'nonce-${nonce}'`,
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data: blob: https://www.google-analytics.com https://stats.g.doubleclick.net",
    "font-src 'self' data:",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://stats.g.doubleclick.net",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "trusted-types nextjs nextjs#bundler",
    "require-trusted-types-for 'script'",
  ];

  if (isProduction) {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}

export function proxy(request: NextRequest) {
  const seoConfig = getSeoConfig(process.env, request.headers);
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const contentSecurityPolicy = createContentSecurityPolicy(
    nonce,
    seoConfig.deploymentEnvironment === "production",
  );
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);

  const responseWithRequestHeaders = NextResponse.next({
    request: { headers: requestHeaders },
  });

  responseWithRequestHeaders.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicy,
  );

  if (seoConfig.deploymentEnvironment === "production") {
    responseWithRequestHeaders.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000",
    );
  }

  if (!seoConfig.isIndexable) {
    responseWithRequestHeaders.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return responseWithRequestHeaders;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
