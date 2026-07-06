import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["fucqobtifqtwbrgslgam.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "fucqobtifqtwbrgslgam.supabase.co",
      },
    ],
  },
};

export default nextConfig;
