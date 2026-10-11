import { getTranslations } from 'next-intl/server';
import { personalInfo, socialLinks } from '@/data/personal';
import { siteUrl } from '@/lib/site';
import type { Locale } from '@/i18n/routing';

const languageTag: Record<Locale, string> = { en: 'en', pt: 'pt-BR' };

const sections = ['experience', 'projects', 'skills', 'contact'] as const;

interface StructuredDataProps {
  locale: Locale;
}

export async function StructuredData({ locale }: StructuredDataProps) {
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const pageUrl = `${siteUrl}/${locale}`;
  const personId = `${siteUrl}/#person`;

  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: personalInfo.name,
    url: pageUrl,
    image: `${siteUrl}/cleyton-mendes.png`,
    sameAs: socialLinks.map((link) => link.url),
    jobTitle: personalInfo.title,
    worksFor: {
      '@type': 'Organization',
      name: 'GrupoQ',
      url: 'https://grupoq.com.br',
    },
    description: tMeta('description'),
    knowsAbout: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Ruby on Rails',
      'VTEX',
      'Shopify',
      'Deco.cx',
      'E-commerce Development',
      'Web Development',
      'Frontend Development',
      'Software Engineering',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: personalInfo.title,
      occupationLocation: {
        '@type': 'City',
        name: personalInfo.location.city,
      },
      skills: 'React, TypeScript, Node.js, Next.js, E-commerce, VTEX',
    },
    email: personalInfo.email,
    telephone: personalInfo.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: personalInfo.location.city,
      addressRegion: personalInfo.location.state,
      addressCountry: 'BR',
    },
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: pageUrl,
    name: `${personalInfo.name} - ${personalInfo.title} Portfolio`,
    description: tMeta('description'),
    inLanguage: languageTag[locale],
    author: { '@id': personId },
  };

  const profilePageData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${pageUrl}#profilepage`,
    url: pageUrl,
    name: tMeta('title'),
    description: tMeta('description'),
    inLanguage: languageTag[locale],
    mainEntity: { '@id': personId },
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: tNav('home'), item: pageUrl },
      ...sections.map((section, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: tNav(section),
        item: `${pageUrl}#${section}`,
      })),
    ],
  };

  return (
    <>
      {[personData, websiteData, profilePageData, breadcrumbData].map((data) => (
        <script
          key={data['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
