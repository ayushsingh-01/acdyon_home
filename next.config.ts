import type { NextConfig } from "next";

const onGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: onGitHubPages ? "/acdyon_home" : undefined,
  assetPrefix: onGitHubPages ? "/acdyon_home/" : undefined,
  images: { unoptimized: true }
};

export default nextConfig;
