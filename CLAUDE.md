# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio of Cleyton Mendes, a software engineer with 5+ years of experience. Most of it is e-commerce (VTEX IO, Shopify, Deco.cx for brands like Tiffany & Co. and Hugo Boss); currently at QuestEdu working with Ruby on Rails and React. The site positions him as a software engineer who builds storefronts but also web apps, APIs and bots. It is bilingual (English/Portuguese) and targets international roles and freelance projects.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, `output: 'standalone'`)
- **React**: 19.2
- **TypeScript**: 5.x (strict mode)
- **Styling**: Tailwind CSS 4, configured CSS-first in `src/app/globals.css` (there is no `tailwind.config`)
- **UI Components**: shadcn/ui (new-york style) with lucide-react icons
- **Motion**: framer-motion 12 plus CSS keyframes
- **Forms**: react-hook-form with its built-in validation rules (no schema library, to keep the bundle small); the contact form posts to Web3Forms from the client
- **Internationalization**: next-intl 4, locale in the URL (`/en/...`, `/pt/...`)
- **Content**: MDX files in `content/`, compiled at build time with `next-mdx-remote`
- **Theme**: next-themes, used only by the legacy pages (see Design)
- **Analytics**: Google Analytics through `@next/third-parties`
- **Deployment**: Vercel (Hobby plan, https://cleyton-mendes.vercel.app), deployed by the Vercel GitHub integration on every push to `main`; pull requests get preview deployments. The Dockerfile is kept for self-hosting

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
- **Consistent structure**: Follow the folder structure below

## Design

The site has two visual systems:

1. **Portfolio pages** (`src/app/[locale]`: home, experience, projects and case studies, education) use the **terminal design**, based on a Tinybird-style DESIGN.md: a developer console look. These pages are always dark; the scope is set by `theme-terminal dark` on `<body>` in `src/app/[locale]/layout.tsx`.
2. **Legacy pages** (`src/app/(legacy)`: `/tools/*`, `/whatsapp-bot/*`) keep the previous shadcn theme: light/dark toggle, orange accent `#E6972E`, `Navigation` and `Footer` components.

### Terminal design tokens (`@theme` in `globals.css`)
- **Colors**: canvas `console-black #0a0a0a`, panel `panel-charcoal #151515`, card `card-graphite #262626`, border `border-smoke #353535`, secondary text `muted-ash #8d8d8d`, light text `highlight-mist #d9d9d9`, primary text `console-white #fafafa`, accent `cursor-green #27f795`
- **Fonts**: Roboto (`font-roboto`) for prose and headlines, Roboto Mono (`font-roboto-mono`) for tags, labels, dates and numbers. Loaded with `next/font` in `src/lib/fonts.ts`
- **Type scale**: `text-caption`, `text-body-sm`, `text-body`, `text-subheading`, `text-heading-sm`, `text-headline`, `text-stat`, `text-display`
- **Radius**: `rounded-tag` (4px) for buttons and tags, `rounded-card` (8px) for cards
- Inside `.theme-terminal`, the shadcn tokens (`--primary`, `--border`, `--ring`…) are remapped to this palette, so shadcn components pick it up
- `cn()` uses `extendTailwindMerge` so the custom text and radius tokens merge correctly. Register new tokens there too

### Terminal design rules
- One chromatic color: green `#27f795`, only for the primary CTA, links and small highlights. The green fill is reserved for the main action
- Never absolute black or white: use `#0a0a0a` and `#fafafa`
- 1px hairline borders in `#353535`; no shadows or glows; no radius above 8px
- Square brackets for log-like labels (`[2024]`, `[in progress]`, `[github]`)
- Sentence case; uppercase only for stat labels. No middle dots (`A · B`) in copy. Arrows only where they carry meaning (`↗` external link, `↓` download)
- Numbered markers only when the content really is a sequence
- Hover effects only on interactive elements
- Keyboard focus: 2px green outline (global rule for `a`, `button` and tab panels inside `.theme-terminal`)
- Motion: the page-load cascade in the hero is CSS (`entrance()`), so it works before hydration. The headline and summary use `rise()` (slide without fade): text painted at opacity 0 does not count as the Largest Contentful Paint, so never fade in the largest text above the fold. The headline uses `Typewriter`. Use `Reveal` for scroll entrances: content stays visible in the server HTML and is only hidden while fully off-screen. `CountUp` plays once. Motion that answers a user action (tabs, menu, form) is welcome. Always respect `prefers-reduced-motion`

### Component requirements
- Use shadcn/ui for UI primitives, styled with the tokens above
- Visual confirmation required when completing sections/features (screenshots of desktop and mobile)
- Maintain consistency across all portfolio pages

## Project Structure

```
content/
└── projects/<slug>/           # Case study body per locale: en.mdx, pt.mdx
public/projects/               # Project logos and <slug>/desktop.jpg, <slug>/mobile.jpg screenshots
src/
├── app/
│   ├── [locale]/              # Portfolio, statically generated for /en and /pt
│   │   ├── layout.tsx         # <html lang>, fonts, header, footer, motion, metadata per locale
│   │   ├── page.tsx           # Home
│   │   ├── experience/
│   │   ├── projects/          # Project list and [slug]/ case studies
│   │   ├── education/
│   │   ├── not-found.tsx      # Localized 404 ([...rest]/ sends unknown paths here)
│   │   └── [...rest]/
│   ├── (legacy)/              # Tools and WhatsApp bot legal pages: no locale in the URL
│   │   ├── layout.tsx         # <html>, Geist fonts, theme provider, locale from the cookie
│   │   ├── tools/
│   │   └── whatsapp-bot/
│   ├── layout.tsx             # Pass-through (the two layouts above render <html>)
│   ├── not-found.tsx          # Global 404 for paths outside both groups
│   ├── globals.css            # Tailwind 4 theme, terminal tokens, shadcn tokens
│   ├── favicon.ico, icon.svg, apple-icon.png   # Site icons (green square-terminal mark)
│   ├── sitemap.ts             # Every portfolio page in both locales with hreflang
│   └── robots.ts              # Allows crawling and points to the sitemap
├── proxy.ts                   # next-intl: redirects / and unprefixed paths to /en or /pt
├── components/
│   ├── terminal/              # Design-system pieces: SiteHeader, SiteFooter, Reveal, CountUp,
│   │                          #   Typewriter, GhostLink, Tag, SectionHeading, Portrait
│   ├── home/                  # Home-only sections (hero, stats, experience steps, …)
│   ├── sections/              # Content blocks shared by home and standalone pages
│   │                          #   (ExperienceDetails, ProjectCard, EducationList, mdxComponents)
│   ├── ui/                    # shadcn/ui
│   ├── legal/                 # Layout for the legal pages
│   └── navigation.tsx, footer.tsx, theme-*.tsx, …   # Legacy chrome for tools and legal pages
├── data/                      # Typed content: experience, projects, skills, certifications,
│                              #   education, personal (bilingual fields use LocalizedString)
├── i18n/                      # routing (locales, locale-aware Link/router), request config
├── messages/                  # en.json, pt.json
├── actions/locale.ts          # Sets the locale cookie (used by the legacy language switcher)
└── lib/                       # cn(), fonts, metadata helpers, MDX loader, form rules,
                               #   keepHyphenatedWords (no line break inside "e-commerce")
```

Each component folder exports from an `index.ts`. Document non-obvious components with JSDoc.

## Commands

### Development
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
npm run test:e2e     # Playwright end-to-end tests against the production build (run `npm run build` first)
```

The e2e suite lives in `e2e/` (routes and 404s, layout on small phones, skip link, sticky header, contact form, hero typewriter). It reads expected strings from `src/messages`. With `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` set, the contact test requires the Web3Forms path; without it, it checks the email fallback. CI runs it on every pull request.

### Docker (optional self-hosting)
```bash
docker-compose up -d                    # Start container in detached mode
docker-compose down                     # Stop container
docker-compose logs -f                  # View logs
docker-compose build --no-cache         # Rebuild without cache
```

## Features

### Implemented
- [x] Terminal-design home: typed hero, stats, experience timeline, projects, stack, education, contact
- [x] Standalone pages: `/experience`, `/projects`, `/education`
- [x] Project case studies at `/projects/[slug]` (MDX body + screenshots of the live store)
- [x] Bilingual site with the locale in the URL (`/en`, `/pt`), hreflang and a language switch
- [x] Contact form (Web3Forms) with validation, plus WhatsApp and email links
- [x] SEO metadata per locale, JSON-LD structured data, sitemap and robots.txt
- [x] Google Analytics
- [x] Deployed on Vercel; Dockerfile kept for self-hosting
- [x] Personal tools (QR code, prompt generator) and WhatsApp bot legal pages

### Planned
- [ ] Blog at `/blog` and `/blog/[slug]`, reusing the MDX pipeline (`content/blog/<slug>/<locale>.mdx`)
- [ ] Richer case studies (context, challenge, results) and more projects, including QuestEdu work
- [ ] More QuestEdu experience and an updated stack list
- [ ] Screenshots still missing: Tiffany desktop (the site blocks automated captures), Vitaminese (store was offline)
- [ ] Optionally migrate the tools and legal pages to the terminal design

## Internationalization

- **Languages**: English (en), Portuguese (pt); default English
- **URLs**: portfolio pages always carry the locale (`/en/...`, `/pt/...`). `src/proxy.ts` redirects `/` and unprefixed paths using the `NEXT_LOCALE` cookie, then the browser language
- **Links**: import `Link`, `useRouter` and `usePathname` from `@/i18n/routing` (not `next/link`) and write hrefs without the locale; it is added automatically
- **Pages**: every page and layout under `[locale]` calls `setRequestLocale(locale)` so it can be statically generated; use `getTranslations` in async pages. Set `alternates` with `localeAlternates(locale, path)` from `@/lib/metadata`
- **Legacy pages** (`/tools`, `/whatsapp-bot`) are excluded from the proxy and read the locale from the cookie. The bot's policy URLs are registered externally; do not move them
- **UI strings**: `src/messages/{en,pt}.json`. Portfolio pages use the `site.*` namespace; `nav`, `footer` and `common` serve the legacy chrome
- **Content**: data files in `src/data/` hold both languages in `LocalizedString` fields (`{ en, pt }`), read with `getLocalizedText(text, locale)`

## Adding a Project

1. Add an entry to `src/data/projects.ts` with a unique `slug`, the logo in `public/projects/`, and `featured: true` to show it on the home page
2. Write the case study in `content/projects/<slug>/en.mdx` and `pt.mdx` (a missing translation falls back to English). The page header already shows the name, summary, stack and link, so the MDX holds the story: context, challenge, what you did, result
3. Optional screenshots: `public/projects/<slug>/desktop.jpg` (1440×900) and `mobile.jpg` (390×844 at 2x), referenced in `screenshots` with the capture date
4. The page and its sitemap entries are generated at build time; unknown slugs return 404

## Environment Variables

Create `.env.local` for development:
```env
NEXT_PUBLIC_SITE_URL=                  # Public URL for canonical, hreflang, sitemap, robots and JSON-LD.
                                       #   Optional: on Vercel it defaults to the production URL,
                                       #   locally to http://localhost:3000. Set it for a custom domain
NEXT_PUBLIC_GA_ID=                     # Google Analytics measurement ID (optional)
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=      # Contact form. Without it, submitting opens the visitor's email app instead
```

`NEXT_PUBLIC_*` values are inlined at build time. On Vercel, set them for Production and Preview and redeploy after a change.

## Common Patterns

### Translated component (server or client)
```typescript
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('site.hero');

  return <h1>{t('headlinePrefix')}</h1>;
}
```

### Page under `[locale]`
```typescript
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localeAlternates } from '@/lib/metadata';

interface MyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: MyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'site.myPage' });
  return { title: t('title'), alternates: localeAlternates(locale, '/my-page') };
}

export default async function MyPage({ params }: MyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('site.myPage');

  return <main className="flex-1 px-4 pb-20 pt-12 md:px-6 md:pt-16">{t('title')}</main>;
}
```

### Section on a portfolio page
```typescript
import { Reveal, SectionHeading } from '@/components/terminal';

export function MySection() {
  return (
    <section id="my-section" className="scroll-mt-10 px-4 md:px-6">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading title="Title" description="One line of context." />
        <Reveal className="mx-auto max-w-4xl">{/* content */}</Reveal>
      </div>
    </section>
  );
}
```

## Testing Before Commit

1. Run `npm run lint` - must pass with no errors
2. Run `npm run type-check` - must pass with no errors
3. Run `npm run build` - must build successfully
4. Run `npm run test:e2e` - must pass (add a test when you fix a bug or add a feature)
5. Test functionality in browser
6. Verify responsive design (mobile/tablet/desktop)
7. Test both English and Portuguese versions
8. Test keyboard navigation and `prefers-reduced-motion`
9. Legacy pages only: test both dark and light themes

## Important Notes

- **Mobile-first**: Design for mobile, enhance for desktop
- **Accessibility**: Semantic HTML, ARIA labels, visible keyboard focus, reduced motion
- **Performance**: Optimize images, keep above-the-fold content visible without JavaScript
- **SEO**: Proper meta tags, sitemap and robots.txt for both languages

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [next-intl](https://next-intl.dev)
- [Motion (framer-motion)](https://motion.dev)
- [Lucide Icons](https://lucide.dev)
