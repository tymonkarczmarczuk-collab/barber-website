import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  agentRules: false,
  poweredByHeader: false,
  images: {
    // Real photography lands in /public/media as webp/avif; keep both served.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
