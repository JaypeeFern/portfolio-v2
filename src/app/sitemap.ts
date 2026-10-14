import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getSeoConfig } from "@/lib/seo/config";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const requestHeaders = await headers();
  const { isIndexable, siteUrl } = getSeoConfig(
    process.env,
    requestHeaders.get("host"),
  );

  if (!isIndexable) {
    return [];
  }

  return [{ url: siteUrl }];
}
