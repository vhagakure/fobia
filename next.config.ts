import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  ...(process.env.STATIC_EXPORT === "1"
    ? { output: "export", images: { unoptimized: true }, trailingSlash: true }
    : {}),
};
export default config;
