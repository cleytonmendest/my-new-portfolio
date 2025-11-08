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
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    description:
      'Full Stack Developer with 4+ years of experience specializing in e-commerce solutions. Expert in Next.js, React, TypeScript, Node.js, and modern web technologies.',
    knowsAbout: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'E-commerce Development',
      'Web Development',
      'Full Stack Development',
    ],
    email: 'cleyton.mendest@gmail.com',
    address: {
      '@type': 'PostalAddress',
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
