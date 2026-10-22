# Cleyton Mendes - Portfolio

Personal portfolio of Cleyton Mendes, software engineer. Bilingual (English and Portuguese), with
case studies of the storefronts he built, his experience, stack and education, and a contact form.

Live at https://cleyton-mendes.vercel.app

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack) and React 19
- TypeScript in strict mode
- [Tailwind CSS 4](https://tailwindcss.com/), configured in `src/app/globals.css`
- [shadcn/ui](https://ui.shadcn.com/) and [Lucide](https://lucide.dev/) icons
- [Motion](https://motion.dev/) (framer-motion) plus CSS keyframes
- [next-intl](https://next-intl.dev/), with the locale in the URL (`/en`, `/pt`)
- MDX case studies compiled at build time with `next-mdx-remote`
- React Hook Form and Zod; the contact form posts to [Web3Forms](https://web3forms.com)

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000, redirects to /en or /pt
```

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Serve the production build
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run type-check   # TypeScript
```

Run `lint`, `type-check` and `build` before every commit.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Yes | Contact form. Get a free key at https://web3forms.com |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_SITE_URL` | No | Public URL for canonical links, hreflang, sitemap and JSON-LD. Defaults to the Vercel production URL, or `http://localhost:3000` locally |

These values are inlined at build time. On Vercel, set them for Production and Preview and
redeploy after any change.

## Project structure

```
content/projects/<slug>/   Case study body per locale (en.mdx, pt.mdx)
public/                    CV files, portrait, project logos and screenshots
src/app/[locale]/          Portfolio pages, statically generated for /en and /pt
src/app/(legacy)/          Personal tools and WhatsApp bot legal pages (no locale in the URL)
src/components/            terminal/ design system, home/ sections, sections/ shared blocks, ui/ shadcn
src/data/                  Typed bilingual content: experience, projects, skills, education
src/messages/              UI strings (en.json, pt.json)
src/proxy.ts               Adds the locale prefix to unprefixed URLs
```

[CLAUDE.md](./CLAUDE.md) documents the design system, conventions and how to add a project.

## Deployment

Deployed on Vercel: every push to `main` goes to production and pull requests get preview
deployments. A `Dockerfile` and `docker-compose.yml` are kept for self-hosting:

```bash
docker-compose up -d
```

## License

This project is private and not licensed for public use.
