import type { NextConfig } from "next";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env from root directory
config({ path: resolve(__dirname, "../.env") });

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
