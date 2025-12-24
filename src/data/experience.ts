import { Experience } from './types';

export const experiences: Experience[] = [
  {
    position: 'Front-end Engineer',
    company: 'GrupoQ',
    companyUrl: 'https://grupoq.com.br',
    period: {
      en: 'Jul 2025 - Present',
      pt: 'Jul 2025 - Presente',
    },
    description: {
      en: 'Working on maintenance and evolution of legacy code in Ruby on Rails, ensuring platform stability and implementing new features.',
      pt: 'Atuo na manutenção e evolução de código legado em Ruby on Rails, garantindo a estabilidade da plataforma e implementando novas funcionalidades.',
    },
    achievements: [
      {
        en: 'Maintained and evolved legacy Ruby on Rails codebase',
        pt: 'Mantive e evoluí codebase legado em Ruby on Rails',
      },
      {
        en: 'Developed solutions to enhance CRM filters and user segmentation',
        pt: 'Desenvolvi soluções para aprimorar filtros e segmentação de usuários no CRM',
      },
      {
        en: 'Actively participated in expansion projects like Qconcursos México and Pro Universitários',
        pt: 'Participei ativamente de projetos de expansão como Qconcursos México e Pro Universitários',
      },
    ],
  },
  {
    position: 'Front-end Developer',
    company: 'We.digi',
    companyUrl: 'https://we.digi',
    period: {
      en: 'Sep 2023 - Jun 2025',
      pt: 'Set 2023 - Jun 2025',
    },
    description: {
      en: 'Developed custom React components for e-commerce platforms and integrated Deco system with VTEX and Shopify.',
      pt: 'Desenvolvi componentes React personalizados para plataformas de e-commerce e integrei sistema Deco com VTEX e Shopify.',
    },
    achievements: [
      {
        en: 'Built custom React components to meet specific client needs',
        pt: 'Construí componentes React personalizados para atender necessidades específicas dos clientes',
      },
      {
        en: 'Used Node.js as middleware to connect to VTEX backend',
        pt: 'Utilizei Node.js como middleware para conectar ao backend da VTEX',
      },
      {
        en: 'Integrated Deco system with VTEX and Shopify platforms',
        pt: 'Integrei sistema Deco com plataformas VTEX e Shopify',
      },
    ],
  },
];
