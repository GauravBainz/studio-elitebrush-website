/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // This is a temporary solution and should be removed once all TypeScript errors are fixed
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['cdn.sanity.io'], // This allows Next.js Image component to load from Sanity CDN
  },
};
module.exports = nextConfig;