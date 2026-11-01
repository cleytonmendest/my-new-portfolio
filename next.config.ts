import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    // Default sizes plus 560: the case study's mobile screenshot shows at 280px, and at 2x the next
    // default width (640) was about 25 KB heavier than needed.
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 560],
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
