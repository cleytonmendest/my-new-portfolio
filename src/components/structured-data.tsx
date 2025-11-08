export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Cleyton Mendes',
    url: 'https://cleyton-mendes.com',
    image: 'https://cleyton-mendes.com/og-image.jpg',
    sameAs: [
      'https://github.com/cleytonmendest',
      'https://www.linkedin.com/in/cleyton-mendes',
    ],
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'GrupoQ',
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
    email: 'cleyton.mendest@gmail.com',
    telephone: '+5521974219271',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rio de Janeiro',
      addressRegion: 'RJ',
      addressCountry: 'BR',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
