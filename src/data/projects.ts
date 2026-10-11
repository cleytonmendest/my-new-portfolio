import { Project } from './types';

export const projects: Project[] = [
  {
    name: 'Tiffany & Co. Brazil',
    description: {
      en: 'Complete e-commerce implementation on VTEX platform. Developed account page features and refined homepage structure and design.',
      pt: 'Implementação completa de e-commerce na plataforma VTEX. Desenvolvi funcionalidades da página de conta e refinei a estrutura e design da homepage.',
    },
    role: {
      en: 'Account page features, homepage structure and design',
      pt: 'Funcionalidades da página de conta, estrutura e design da homepage',
    },
    platform: 'VTEX IO',
    stack: ['React', 'TypeScript', 'Sass', 'VTEX IO'],
    image: '/projects/logo-tiffany.svg',
    // Header and jewellery sections only: the campaign photos on the home page are left out.
    screenshot: { src: '/projects/tiffany.webp', width: 1440, height: 2435 },
    url: 'https://www.tiffany.com.br/',
    status: 'live',
    featured: true,
  },
  {
    name: 'Vitaminese',
    description: {
      en: 'E-commerce development with custom quiz application. Built a dynamic React quiz to recommend products based on user responses with conditional logic flows.',
      pt: 'Desenvolvimento de e-commerce com aplicação de quiz personalizado. Construí um quiz dinâmico em React para recomendar produtos baseado nas respostas dos usuários com fluxos lógicos condicionais.',
    },
    role: {
      en: 'Product recommendation quiz with conditional flows',
      pt: 'Quiz de recomendação de produtos com fluxos condicionais',
    },
    platform: 'VTEX IO',
    stack: ['React', 'TypeScript', 'Sass', 'VTEX IO'],
    image: '/projects/logo-vitaminese.svg',
    url: 'https://www.vitaminese.com.br/',
    // The site showed a maintenance page when last checked (October 2026).
    status: 'maintenance',
    featured: true,
  },
  {
    name: 'Ultrafeu',
    description: {
      en: 'Built from scratch using Deco.cx and VTEX with focus on SEO and performance optimization, resulting in significant sales increase.',
      pt: 'Desenvolvido do zero usando Deco.cx e VTEX com foco em SEO e otimização de performance, resultando em aumento significativo nas vendas.',
    },
    role: {
      en: 'Storefront built from scratch, focused on SEO and performance',
      pt: 'Loja construída do zero, com foco em SEO e performance',
    },
    platform: 'Deco.cx and VTEX',
    stack: ['Preact', 'TypeScript', 'Tailwind CSS', 'VTEX IO'],
    image: '/projects/logo-ultrafeu.png',
    screenshot: { src: '/projects/ultrafeu.webp', width: 1440, height: 4213 },
    url: 'https://www.ultrafeu.com.br/',
    status: 'live',
    featured: true,
  },
];
