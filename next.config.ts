import type { NextConfig } from "next";

/**
 * Private client documents (e.g. app/projects/[slug]/delivery/page.private.tsx) are pages
 * only when CLIENT_DOCS=1. The public build and the Pages deploy never set it, so those
 * routes are never built into out/ or published. See docs/projects.md.
 */
const clientDocs = process.env.CLIENT_DOCS === "1";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  pageExtensions: clientDocs ? ["tsx", "ts", "jsx", "js", "private.tsx"] : ["tsx", "ts", "jsx", "js"],
};

export default nextConfig;
