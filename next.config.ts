import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: '.next',
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'down-vn.img.susercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'flowrpool.com',
      },
      {
        protocol: 'https',
        hostname: 'shopmayphoto.com',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
      },
      {
        protocol: 'https',
        hostname: 'photocopy99.hcm.ss.bfcplatform.vn',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)', // áp dụng cho tất cả route
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              img-src 'self' data: https://down-vn.img.susercontent.com https://images.unsplash.com https://flowrpool.com https://shopmayphoto.com https://api.qrserver.com https://photocopy99.hcm.ss.bfcplatform.vn;
              connect-src 'self' http://localhost:3670 https://photocopy99.com https://www.photocopy99.com https://photocopy99.hcm.ss.bfcplatform.vn;
              object-src 'none';
              frame-ancestors 'none';
            `
              .replace(/\s{2,}/g, ' ')
              .trim(),
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
