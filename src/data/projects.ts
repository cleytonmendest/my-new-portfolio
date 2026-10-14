import { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'tiffany',
    name: 'Tiffany & Co. Brazil',
    description: {
      en: 'Complete e-commerce implementation on VTEX platform. Developed account page features and refined homepage structure and design.',
      pt: 'Implementação completa de e-commerce na plataforma VTEX. Desenvolvi funcionalidades da página de conta e refinei a estrutura e design da homepage.',
    },
    technologies: ['React', 'TypeScript', 'Sass', 'VTEX IO'],
    image: '/projects/logo-tiffany.svg',
    url: 'https://www.tiffany.com.br/',
    featured: true,
    // The desktop site blocks automated captures, so only the mobile one is available.
    screenshots: { mobile: '/projects/tiffany/mobile.jpg', capturedAt: '2026-10-11' },
  },
  {
    slug: 'vitaminese',
    name: 'Vitaminese',
    description: {
      en: 'E-commerce development with custom quiz application. Built a dynamic React quiz to recommend products based on user responses with conditional logic flows.',
      pt: 'Desenvolvimento de e-commerce com aplicação de quiz personalizado. Construí um quiz dinâmico em React para recomendar produtos baseado nas respostas dos usuários com fluxos lógicos condicionais.',
    },
    technologies: ['React', 'TypeScript', 'Sass', 'VTEX IO'],
    image: '/projects/logo-vitaminese.svg',
    url: 'https://www.vitaminese.com.br/',
    featured: true,
    // No screenshots: the store was in maintenance when the others were captured (2026-10-11).
  },
  {
    slug: 'ultrafeu',
    name: 'Ultrafeu',
    description: {
      en: 'Built from scratch using Deco.cx and VTEX with focus on SEO and performance optimization, resulting in significant sales increase.',
      pt: 'Desenvolvido do zero usando Deco.cx e VTEX com foco em SEO e otimização de performance, resultando em aumento significativo nas vendas.',
    },
    technologies: ['Preact', 'TypeScript', 'Tailwind CSS', 'VTEX IO'],
    image: '/projects/logo-ultrafeu.png',
    url: 'https://www.ultrafeu.com.br/',
    featured: true,
    screenshots: {
      desktop: '/projects/ultrafeu/desktop.jpg',
      mobile: '/projects/ultrafeu/mobile.jpg',
      capturedAt: '2026-10-11',
    },
  },
];
