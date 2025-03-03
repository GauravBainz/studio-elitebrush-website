import type { NextConfig } from "next";

const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // This allows Next.js Image component to load from Sanity CDN
  },
};

export default nextConfig;
