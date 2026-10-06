import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  async redirects() {
    return [
      // Home is the store. Temporary so it can be reverted without browsers
      // caching the hop; src/app/page.tsx is kept intact behind it.
      { source: "/", destination: "/available", permanent: false },
      { source: "/shop", destination: "/available", permanent: true },
      { source: "/products", destination: "/available", permanent: true },
      { source: "/store", destination: "/available", permanent: true },
      // Dropshipped products retired Oct 2026 — send old links to the store.
      { source: "/product/wall-brush", destination: "/available", permanent: true },
      { source: "/product/grooming-brush", destination: "/available", permanent: true },
      { source: "/product/bubby-blanket", destination: "/available", permanent: true },
    ];
  },
};

export default nextConfig;
