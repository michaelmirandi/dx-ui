import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.draftexpress.com',
        port: '',
        pathname: '/blue/graphics/logos/teams/**',
      },
    ],
  },
};

export default nextConfig;
