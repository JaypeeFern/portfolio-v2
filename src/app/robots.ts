import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getSeoConfig } from "@/lib/seo/config";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const requestHeaders = await headers();
  const { isIndexable, siteUrl } = getSeoConfig(process.env, requestHeaders);

  if (!isIndexable) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: siteUrl + "/sitemap.xml",
  };
}
