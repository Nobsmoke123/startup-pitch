import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  // experimental: {
  //   ppr: "incremental",
  // },
  // devIndicators: {
  //   buildActivity: true,
  //   appIsrStatus: true,
  //   buildActivityPosition: "bottom-right",
  // },
};

export default nextConfig;
