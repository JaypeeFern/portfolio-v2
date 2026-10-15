import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { portfolioData } from "@/lib/portfolio";
import { getSeoConfig } from "@/lib/seo/config";
import {
  createStructuredData,
  serializeJsonLd,
} from "@/lib/seo/structured-data";

const inter = localFont({
  src: [
    {
      path: "./fonts/inter-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/inter-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/inter-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/inter-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  variable: "--font-sans",
});

const spaceGrotesk = localFont({
  src: [
    {
      path: "./fonts/space-grotesk-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/space-grotesk-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/space-grotesk-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  variable: "--font-display",
});

const { name, role, personalDescription } = portfolioData.about;

async function getRequestSeoConfig() {
  const requestHeaders = await headers();
  return getSeoConfig(process.env, requestHeaders);
}

export async function generateMetadata(): Promise<Metadata> {
  const seoConfig = await getRequestSeoConfig();
  const pageTitle = name + " | " + role;
  const socialImageUrl = new URL(
    "/opengraph-image",
    seoConfig.siteUrl,
  ).toString();
  const googleSiteVerification =
    process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined;
  const bingSiteVerification =
    process.env.BING_SITE_VERIFICATION?.trim() || undefined;

  return {
    metadataBase: new URL(seoConfig.siteUrl),
    title: pageTitle,
    description: personalDescription,
    authors: [{ name, url: seoConfig.siteUrl }],
    creator: name,
    publisher: name,
    alternates: {
      canonical: seoConfig.siteUrl,
    },
    robots: {
      index: seoConfig.isIndexable,
      follow: seoConfig.isIndexable,
      googleBot: {
        index: seoConfig.isIndexable,
        follow: seoConfig.isIndexable,
      },
    },
    verification: {
      ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
      ...(bingSiteVerification
        ? { other: { "msvalidate.01": bingSiteVerification } }
        : {}),
    },
    openGraph: {
      title: pageTitle,
      description: personalDescription,
      type: "website",
      url: seoConfig.siteUrl,
      siteName: name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: personalDescription,
      images: [socialImageUrl],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const seoConfig = await getRequestSeoConfig();
  const configuredGoogleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID?.trim();
  const googleAnalyticsId =
    seoConfig.deploymentEnvironment === "production" &&
    configuredGoogleAnalyticsId &&
    /^G-[A-Z0-9]+$/.test(configuredGoogleAnalyticsId)
      ? configuredGoogleAnalyticsId
      : undefined;
  const structuredDataJson = serializeJsonLd(
    createStructuredData(portfolioData, seoConfig.siteUrl),
  );

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className} antialiased min-h-screen bg-background text-foreground selection:bg-primary/20`}>
        {/* JSON-LD is serialized with HTML-sensitive characters escaped before insertion. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
        <div className="relative">
          {children}
        </div>
        {googleAnalyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAnalyticsId)}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(googleAnalyticsId)});`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
