import type { NextConfig } from "next";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env from root directory
config({ path: resolve(__dirname, "../.env") });

const nextConfig: NextConfig = {
  // Remove standalone output for Vercel compatibility
  // Vercel handles deployment automatically
};

export default nextConfig;
