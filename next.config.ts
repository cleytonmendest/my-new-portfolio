import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'deco-sites-assets.s3.sa-east-1.amazonaws.com',
        pathname: '/we-digi/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
