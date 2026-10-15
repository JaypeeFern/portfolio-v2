import type { NextConfig } from "next";
import { getSeoConfig } from "./src/lib/seo/config";

void getSeoConfig();

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
};

export default nextConfig;
