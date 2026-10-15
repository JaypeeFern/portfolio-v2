import type { NextConfig } from "next";
import { getSeoConfig } from "./src/lib/seo/config";

void getSeoConfig();

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
  },
};

export default nextConfig;
