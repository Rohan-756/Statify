import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*", // What frontend calls (e.g. /api/callback)
        destination: "http://localhost:4000/:path*", // What backend handles (e.g. /callback)
      },
    ];
  },
};

export default nextConfig;
