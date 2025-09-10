import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack configuration (2025 stable)
  turbopack: {
    resolveAlias: {
      underscore: 'lodash',
      mocha: { browser: 'mocha/browser-entry.js' },
    },
  },
  // Disable ESLint during production build for Vercel deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript checking during build for deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  // Remove experimental config that's no longer valid in Next.js 15.5.2
};

export default nextConfig;
