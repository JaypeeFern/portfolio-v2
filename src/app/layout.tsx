import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { portfolioData } from "@/lib/portfolio";

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
const siteUrl = portfolioData.metadata.url || undefined;

export const metadata: Metadata = {
  title: `${name} | ${role}`,
  description: personalDescription,
  keywords: portfolioData.skills,
  authors: [{ name }],
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  openGraph: {
    title: `${name} | ${role}`,
    description: personalDescription,
    type: "website",
    ...(siteUrl ? { url: siteUrl } : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className} antialiased min-h-screen bg-background text-foreground selection:bg-primary/20`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => {
            const storageKey = "portfolio-theme";
            const savedTheme = localStorage.getItem(storageKey);
            const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            const theme = savedTheme ?? preferredTheme;
            document.documentElement.classList.toggle("dark", theme === "dark");
            document.documentElement.style.colorScheme = theme;
          })();`}
        </Script>
        <div className="app-background" />
        <Navbar />
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  );
}
