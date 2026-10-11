import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// The experience, projects and education pages became sections of the home page. The proxy
// then sends `/` to the visitor's language and the fragment survives the redirect chain.
const sectionRedirects = [
  { source: '/experience', destination: '/#experience' },
  { source: '/projects', destination: '/#projects' },
  { source: '/education', destination: '/#certifications' },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return sectionRedirects.map((redirect) => ({ ...redirect, permanent: true }));
  },
};

export default withNextIntl(nextConfig);
