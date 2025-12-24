export function StructuredData() {
  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://cleyton-mendes.com/#person',
    name: 'Cleyton Mendes',
    alternateName: 'Cleyton Mendes',
    url: 'https://cleyton-mendes.com',
    image: 'https://cleyton-mendes.com/cleyton-mendes.png',
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
      'Software Engineer with 4+ years of experience specializing in e-commerce solutions. Expert in React, TypeScript, Node.js, Ruby on Rails, VTEX, Shopify, and modern web technologies.',
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
      experienceRequirements: '4+ years',
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
    '@id': 'https://cleyton-mendes.com/#website',
    url: 'https://cleyton-mendes.com',
    name: 'Cleyton Mendes - Software Engineer Portfolio',
    description:
      'Professional portfolio of Cleyton Mendes, a Software Engineer specializing in e-commerce solutions with 4+ years of experience.',
    inLanguage: ['en', 'pt-BR'],
    author: {
      '@id': 'https://cleyton-mendes.com/#person',
    },
  };

  const profilePageData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': 'https://cleyton-mendes.com/#profilepage',
    url: 'https://cleyton-mendes.com',
    name: 'Cleyton Mendes - Software Engineer',
    description:
      'Professional portfolio showcasing projects, skills, and experience in software engineering and e-commerce development.',
    mainEntity: {
      '@id': 'https://cleyton-mendes.com/#person',
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
        item: 'https://cleyton-mendes.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Experience',
        item: 'https://cleyton-mendes.com#experience',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Projects',
        item: 'https://cleyton-mendes.com#projects',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Skills',
        item: 'https://cleyton-mendes.com#skills',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact',
        item: 'https://cleyton-mendes.com#contact',
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
