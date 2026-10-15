import type { NextConfig } from "next";
import { getSeoConfig } from "./src/lib/seo/config";

void getSeoConfig();

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), geolocation=(), microphone=()",
          },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
