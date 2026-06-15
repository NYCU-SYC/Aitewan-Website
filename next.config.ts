import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? basePath : undefined,
  assetPrefix: isGithubPages ? `${basePath}/` : undefined,
  trailingSlash: isGithubPages ? true : undefined,
  images: {
    unoptimized: isGithubPages,
  },
  // Pin the workspace root to this project (a stray lockfile in the home
  // directory otherwise causes Next to infer the wrong root).
  turbopack: {
    root: process.cwd(),
  },
  ...(isGithubPages
    ? {}
    : {
        async redirects() {
          // Legacy (pre-locale) URLs → /zh-TW equivalents
          return [
            { source: "/about", destination: "/zh-TW/about", permanent: true },
            { source: "/contact", destination: "/zh-TW/contact", permanent: true },
            {
              source: "/products/deepbt-detector-plus",
              destination: "/zh-TW/products/deepbt-detector-plus",
              permanent: true,
            },
            { source: "/workflow", destination: "/zh-TW/clinical-workflow", permanent: true },
            {
              source: "/clinical-evidence",
              destination: "/zh-TW/evidence-regulatory#validation",
              permanent: true,
            },
            { source: "/regulatory", destination: "/zh-TW/evidence-regulatory", permanent: true },
            {
              source: "/patents",
              destination: "/zh-TW/evidence-regulatory#patents",
              permanent: true,
            },
            {
              source: "/services/samd-consulting",
              destination: "/zh-TW/samd-services",
              permanent: true,
            },
            { source: "/research", destination: "/zh-TW/research-publications", permanent: true },
          ];
        },
      }),
};

export default nextConfig;
