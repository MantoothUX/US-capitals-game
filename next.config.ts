import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true, // For faster development
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
