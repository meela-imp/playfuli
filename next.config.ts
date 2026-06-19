import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  async redirects() {
    return [{ source: '/', destination: '/coming-soon', permanent: false }];
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: '/coming-soon', destination: '/coming-soon.html' }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
