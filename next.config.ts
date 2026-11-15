import type { NextConfig } from "next";

// `npm run build:pages` exports a static site for GitHub Pages.
const isPagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = isPagesBuild
  ? {
      output: "export",
      basePath: process.env.NEXT_PUBLIC_BASE_PATH,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
