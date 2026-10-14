import type { NextConfig } from "next";
import { getSeoConfig } from "./src/lib/seo/config";

void getSeoConfig();

const nextConfig: NextConfig = {
  devIndicators: false,
};

export default nextConfig;
