import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
      protocol: "https",
      hostname: "cdn.sanity.io",
  },
],domains: ['img.clerk.com','m.media-amazon.com']
  },
};

export default nextConfig;
