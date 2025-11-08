# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for a senior developer with 4+ years of experience in e-commerce development. The portfolio is bilingual (English/Portuguese) targeting international job opportunities and freelance projects.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x (strict mode)
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Icons**: lucide-react (from shadcn)
- **Internationalization**: next-intl
- **Theme**: next-themes (dark/light mode)
- **Deployment**: Docker on personal VPS

## Core Principles

### Code Quality
- **No overengineering**: Keep code simple and straightforward
- **No `any` types**: Strict TypeScript typing required
- **Zero lint errors**: Code must pass ESLint checks
- **Type safety**: Always use proper TypeScript types

### Development Workflow
- **Atomic commits**: One feature per commit
- **Complete features only**: Never commit half-implemented features
- **If broken, revert**: If implementation has unresolved errors, undo changes
- **Small features**: Break large features into small, testable pieces

### Code Standards
- **Easy to read**: Clear variable/function names
- **Easy to maintain**: Well-structured, documented code
- **Easy to implement**: Simple patterns, avoid complexity
- **Consistent structure**: Follow documented folder structure

## Design Guidelines

### Visual Style
- **Simple and functional**: No unnecessary animations or complexity
- **Neutral colors**: Avoid absolute black (#000) or white (#FFF)
- **Accent color**: #E6972E or similar warm orange for highlights
- **Reference**: https://cleyton-mendes-dev.netlify.app/

### Component Requirements
- Use shadcn/ui for all UI components
- Visual confirmation required when completing sections/features
- Take inspiration from modern portfolio designs online
- Maintain consistency across all pages

## Project Structure

```
my-portfolio/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── [locale]/         # Internationalized routes
│   │   ├── globals.css       # Global styles
│   │   └── layout.tsx        # Root layout
│   ├── components/           # React components
│   │   ├── ui/               # shadcn/ui components
│   │   └── ...               # Custom components
│   ├── lib/                  # Utility functions
│   ├── types/                # TypeScript type definitions
│   └── messages/             # i18n translation files
│       ├── en.json
│       └── pt.json
├── public/                   # Static assets
├── docker/                   # Docker configuration
├── Dockerfile
└── docker-compose.yml
```

## Commands

### Development
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

### Docker
```bash
docker-compose up -d                    # Start container in detached mode
docker-compose down                     # Stop container
docker-compose logs -f                  # View logs
docker-compose build --no-cache         # Rebuild without cache
```

## Features

### Implemented
- [x] Base Next.js setup with TypeScript
- [x] Tailwind CSS 4 configuration

### In Progress
- [ ] shadcn/ui setup and configuration
- [ ] next-intl internationalization (EN/PT)
- [ ] Dark/light theme with next-themes
- [ ] Docker configuration for VPS deployment

### Planned
- [ ] Hero section with introduction
- [ ] Experience/projects showcase
- [ ] Blog system with headless CMS
- [ ] Contact form with email integration
- [ ] Analytics integration
- [ ] SEO optimization for both languages

## Internationalization

- **Languages**: English (en), Portuguese (pt)
- **Default**: English
- **URL structure**: `/en/...` and `/pt/...`
- **Library**: next-intl
- **Translation files**: `src/messages/en.json` and `src/messages/pt.json`

## Component Development

### shadcn/ui
- Install components only when needed: `npx shadcn@latest add [component]`
- Customize theme in `tailwind.config.ts`
- Use lucide-react for icons

### Creating New Components
1. Create in `src/components/[category]/`
2. Use TypeScript interfaces for props
3. Export from index file for clean imports
4. Document complex components with JSDoc

## Testing Before Commit

1. Run `npm run lint` - must pass with no errors
2. Run `npm run type-check` - must pass with no errors
3. Run `npm run build` - must build successfully
4. Test functionality in browser
5. Verify responsive design (mobile/tablet/desktop)
6. Test both dark and light themes
7. Test both English and Portuguese versions

## Deployment

### Docker Build
The project uses Docker for deployment on a personal VPS:
- Production-optimized Next.js build
- Multi-stage Docker build for smaller image size
- Environment variables configured via `.env`
- Nginx reverse proxy ready

### Environment Variables
Create `.env.local` for development:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Add CMS keys, email service keys, analytics keys, etc.
```

## Common Patterns

### Internationalized Component
```typescript
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('MyComponent');

  return <h1>{t('title')}</h1>;
}
```

### Theme-aware Component
```typescript
import { useTheme } from 'next-themes';

export function MyComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle theme
    </button>
  );
}
```

## Important Notes

- **Never use absolute black or white**: Use #0a0a0a for dark, #fafafa for light
- **Accent color consistency**: Always use #E6972E or very close variants
- **Mobile-first**: Design for mobile, enhance for desktop
- **Accessibility**: Proper semantic HTML, ARIA labels, keyboard navigation
- **Performance**: Optimize images, lazy load when appropriate
- **SEO**: Proper meta tags, sitemap, robots.txt for both languages

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [next-intl](https://next-intl.dev)
- [Lucide Icons](https://lucide.dev)
