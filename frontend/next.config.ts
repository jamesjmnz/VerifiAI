import type { NextConfig } from "next";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env from root directory
config({ path: resolve(__dirname, "../.env") });

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
