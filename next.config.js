/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  webpack: (config, { isServer, dev }) => {
    // Only apply chunking optimizations in production builds
    if (!dev && !isServer) {
      // Import the chunking configuration
      const { configureChunking } = require('./src/lib/webpack-config');
      config = configureChunking(config);
    }
    return config;
  },
  // Enable optimizations for static pages
  experimental: {
    // Enable optimized route prefetching
    optimizeCss: true,
    // Scroll restoration for smoother navigation
    scrollRestoration: true,
  }
};

module.exports = nextConfig;
