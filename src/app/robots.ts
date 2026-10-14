import type { MetadataRoute } from "next";
import { getSeoConfig } from "@/lib/seo/config";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const { isIndexable, siteUrl } = getSeoConfig();

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
