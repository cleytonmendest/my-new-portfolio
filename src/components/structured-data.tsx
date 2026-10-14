import { SITE_URL } from '@/lib/metadata';

/** JSON-LD for search engines: the person, the website, the profile page and the home sections. */
export function StructuredData({ locale }: { locale: string }) {
  const home = `${SITE_URL}/${locale}`;

  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Cleyton Mendes',
    alternateName: 'Cleyton Mendes',
    url: home,
    image: `${SITE_URL}/cleyton-mendes.png`,
    sameAs: [
      'https://github.com/cleytonmendest',
      'https://www.linkedin.com/in/cleyton-mendes',
    ],
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'GrupoQ',
      url: 'https://grupoq.com.br',
    },
    description:
      'Software Engineer with 5+ years of experience specializing in e-commerce solutions. Expert in React, TypeScript, Node.js, Ruby on Rails, VTEX, Shopify, and modern web technologies.',
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
      name: 'Software Engineer',
      occupationLocation: {
        '@type': 'City',
        name: 'Rio de Janeiro',
      },
      skills: 'React, TypeScript, Node.js, Next.js, E-commerce, VTEX',
      experienceRequirements: '5+ years',
    },
    email: 'cleyton.mendest@gmail.com',
    telephone: '+5521974219271',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rio de Janeiro',
      addressRegion: 'RJ',
      addressCountry: 'BR',
    },
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: home,
    name: 'Cleyton Mendes - Software Engineer Portfolio',
    description:
      'Professional portfolio of Cleyton Mendes, a Software Engineer specializing in e-commerce solutions with 5+ years of experience.',
    inLanguage: ['en', 'pt-BR'],
    author: {
      '@id': `${SITE_URL}/#person`,
    },
  };

  const profilePageData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profilepage`,
    url: home,
    name: 'Cleyton Mendes - Software Engineer',
    description:
      'Professional portfolio showcasing projects, skills, and experience in software engineering and e-commerce development.',
    mainEntity: {
      '@id': `${SITE_URL}/#person`,
    },
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: home,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Experience',
        item: `${home}#experience`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Projects',
        item: `${home}#projects`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Skills',
        item: `${home}#skills`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact',
        item: `${home}#contact`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
