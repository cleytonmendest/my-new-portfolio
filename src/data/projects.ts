import { Project } from './types';

export const projects: Project[] = [
  {
    name: 'Tiffany & Co. Brazil',
    description: {
      en: 'Complete e-commerce implementation on VTEX platform. Developed account page features and refined homepage structure and design.',
      pt: 'Implementação completa de e-commerce na plataforma VTEX. Desenvolvi funcionalidades da página de conta e refinei a estrutura e design da homepage.',
    },
    technologies: ['React', 'TypeScript', 'Sass', 'Vtex IO'],
    image: '/projects/logo-tiffany.svg',
    bgColor: '#81d8d0',
    url: 'https://www.tiffany.com.br/',
    featured: true,
  },
  {
    name: 'Vitaminese',
    description: {
      en: 'E-commerce development with custom quiz application. Built a dynamic React quiz to recommend products based on user responses with conditional logic flows.',
      pt: 'Desenvolvimento de e-commerce com aplicação de quiz personalizado. Construí um quiz dinâmico em React para recomendar produtos baseado nas respostas dos usuários com fluxos lógicos condicionais.',
    },
    technologies: ['React', 'TypeScript', 'Sass', 'Vtex IO'],
    image: '/projects/logo-vitaminese.svg',
    bgColor: '#f3e7ff',
    url: 'https://www.vitaminese.com.br/',
    featured: true,
  },
  {
    name: 'Ultrafeu',
    description: {
      en: 'Built from scratch using Deco.cx and VTEX with focus on SEO and performance optimization, resulting in significant sales increase.',
      pt: 'Desenvolvido do zero usando Deco.cx e VTEX com foco em SEO e otimização de performance, resultando em aumento significativo nas vendas.',
    },
    technologies: ['Preact', 'Typescript', 'Tailwind CSS', 'Vtex IO'],
    image: '/projects/logo-ultrafeu.png',
    bgColor: '#FFF',
    url: 'https://www.ultrafeu.com.br/',
    featured: true,
  },
];
