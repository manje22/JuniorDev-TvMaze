import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/api.tvmaze/**",
      },
      {
        protocol: "https",
        hostname: "static.tvmaze.com",
        port: "",
        pathname: "/uploads/images/**",
      },
    ],
  },
};

export default nextConfig;
