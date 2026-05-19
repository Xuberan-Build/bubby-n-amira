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
      { source: "/shop", destination: "/available", permanent: true },
      { source: "/products", destination: "/available", permanent: true },
      { source: "/store", destination: "/available", permanent: true },
      { source: "/product/wall-brush", destination: "/product/grooming-brush", permanent: true },
    ];
  },
};

export default nextConfig;
