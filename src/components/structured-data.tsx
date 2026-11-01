import { getTranslations } from 'next-intl/server';
import { personalInfo, socialLinks } from '@/data/personal';
import { SITE_URL } from '@/lib/metadata';

const PERSON_ID = `${SITE_URL}/#person`;

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', ...data }) }}
    />
  );
}

/** JSON-LD on every portfolio page: the person and the website, in the page's language. */
export async function StructuredData({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'site.meta' });

  return (
    <>
      <JsonLd
        data={{
          '@type': 'Person',
          '@id': PERSON_ID,
          name: personalInfo.name,
          url: SITE_URL,
          image: `${SITE_URL}/cleyton-mendes.png`,
          jobTitle: personalInfo.title,
          description: t('description'),
          // The site shows QuestEdu and the CV says GrupoQ: kept as it was until that is decided.
          worksFor: { '@type': 'Organization', name: 'GrupoQ', url: 'https://grupoq.com.br' },
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
            'Software Engineering',
          ],
          email: personalInfo.email,
          telephone: personalInfo.phone,
          address: {
            '@type': 'PostalAddress',
            addressLocality: personalInfo.location.city,
            addressRegion: personalInfo.location.state,
            addressCountry: 'BR',
          },
          sameAs: socialLinks.map((link) => link.url),
        }}
      />
      <JsonLd
        data={{
          '@type': 'WebSite',
          '@id': `${SITE_URL}/${locale}#website`,
          url: `${SITE_URL}/${locale}`,
          name: t('title'),
          description: t('description'),
          inLanguage: locale === 'pt' ? 'pt-BR' : 'en',
          author: { '@id': PERSON_ID },
        }}
      />
    </>
  );
}

/** ProfilePage for the home page, the page about the person. */
export async function ProfilePageData({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'site.meta' });

  return (
    <JsonLd
      data={{
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/${locale}#profilepage`,
        url: `${SITE_URL}/${locale}`,
        name: t('title'),
        description: t('description'),
        inLanguage: locale === 'pt' ? 'pt-BR' : 'en',
        mainEntity: { '@id': PERSON_ID },
      }}
    />
  );
}

interface Crumb {
  name: string;
  /** Path without the locale, e.g. '/projects'. */
  path: string;
}

/** BreadcrumbList for a page below the home: the site name, then each level of `trail`. */
export function BreadcrumbData({ locale, trail }: { locale: string; trail: Crumb[] }) {
  const crumbs: Crumb[] = [{ name: personalInfo.name, path: '' }, ...trail];

  return (
    <JsonLd
      data={{
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: `${SITE_URL}/${locale}${crumb.path}`,
        })),
      }}
    />
  );
}
