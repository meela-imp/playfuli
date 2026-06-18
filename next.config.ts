import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: '/', destination: '/coming-soon.html' }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
