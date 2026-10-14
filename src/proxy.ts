import { NextResponse, type NextRequest } from "next/server";
import { getSeoConfig } from "@/lib/seo/config";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  if (!getSeoConfig(process.env, request.headers.get("host")).isIndexable) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
