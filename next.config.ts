import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  // config for Images coming from external
  images : {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com'
      }
    ]
  }
};

export default nextConfig;
