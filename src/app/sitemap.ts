import type { MetadataRoute } from "next";
import { getSeoConfig } from "@/lib/seo/config";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const { isIndexable, siteUrl } = getSeoConfig();

  if (!isIndexable) {
    return [];
  }

  return [{ url: siteUrl }];
}
