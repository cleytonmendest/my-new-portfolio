# Cleyton Mendes - portfolio

Personal portfolio of Cleyton Mendes, Software Engineer focused on e-commerce (VTEX, Shopify, Deco) since 2021. Two languages (English and Portuguese, each on its own URL), light and dark themes, and motion in three places only: a 3D storefront scene in the hero, a scrolling screenshot frame in the projects, and a 3D confirmation after the contact form is sent.

Working rules for contributors and AI assistants live in [CLAUDE.md](CLAUDE.md). That file is the source of truth for the design system, motion and workflow; this one covers running, testing and deploying.

## Stack

Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict), Tailwind CSS 4, shadcn/ui, next-intl, next-themes, React Hook Form + Zod, Web3Forms, Three.js (React Three Fiber), GSAP, Google Analytics 4. Deployed as a Docker image (`output: 'standalone'`) on a VPS through Easypanel.

## Run it

Needs Node.js 20 or newer and npm (this repository uses npm only).

```bash
npm ci
cp .env.example .env.local   # then fill in the values, see Environment
npm run dev                  # http://localhost:3000 redirects to /en or /pt
```

| Script | What it does |
|---|---|
| `npm run dev` / `build` / `start` | Next.js development server, production build, production server |
| `npm run lint` | ESLint and Stylelint, including the design system rules |
| `npm run type-check` | TypeScript compiler without emitting |
| `npm run test:e2e` | Playwright smoke tests and axe, against the production build (run `npm run build` first) |
| `npm run brand-assets` | Regenerates the icons and Open Graph images from the "CM" monogram (needs `npx playwright install chromium` and network for Google Fonts) |

Before every commit: `npm run lint`, `npm run type-check`, `npm run build`. CI runs the same three, then the smoke tests.

## Environment

`NEXT_PUBLIC_*` values are inlined at build time, so on Docker and Easypanel they must be **build arguments**, not only runtime variables (the Dockerfile and `docker-compose.yml` declare them).

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph. Defaults to `https://cleyton-mendes.com` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 id. Empty disables analytics |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Contact form. Free key from [web3forms.com](https://web3forms.com); it ships in the client bundle by design. Without it the form cannot send |

## Structure

```
src/
├── app/
│   ├── [locale]/          # Localized site: layout, home page, 404, redirects (/en, /pt)
│   ├── (utility)/         # Portuguese-only pages without i18n: /tools, /whatsapp-bot, /design-system
│   ├── sitemap.ts         # Both languages with hreflang alternates
│   └── globals.css
├── proxy.ts               # next-intl: picks the language for unprefixed URLs
├── i18n/                  # Routing config (single source) and request config
├── messages/              # en.json and pt.json, identical keys
├── styles/tokens.css      # Design tokens, the only place for colours and custom properties
├── components/
│   ├── ui/                # shadcn/ui, adapted to the tokens (Radix only here)
│   ├── sections/          # Hero, projects, experience, skills, certifications, about, contact
│   ├── motion/            # GSAP and pointer animation (animation libraries only here)
│   ├── three/             # Three.js scenes (three and @react-three/* only here)
│   └── layout/, legal/    # Section layout, legal pages
├── data/                  # Typed content: projects, experience, skills, education, personal
└── lib/                   # Helpers: tokens reader, WebGL check, site URL, form schema
e2e/                       # Playwright specs
scripts/                   # Brand asset generator
public/                    # Images, CV PDFs, icons, og/ images, manifest, robots.txt
```

## Content

Texts live in `src/messages/*.json` (interface) and `src/data/*.ts` (`{ en, pt }` objects). Contact data comes from one place, `src/data/personal.ts`. Project captures are WebP files in `public/projects/`; the hero uses 800x600 crops of them in `public/hero/`.

## SEO

Each language has its own URL with `hreflang` alternates and a canonical, a sitemap for both, per-language JSON-LD (Person, WebSite, ProfilePage, BreadcrumbList), Open Graph and Twitter `summary_large_image` images per language (`public/og/`), and a web manifest. The home page is generated statically (`/en` and `/pt` are SSG).

After a deploy, once:

1. Submit `https://cleyton-mendes.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
2. Check the structured data with the [Rich Results Test](https://search.google.com/test/rich-results) and the share images with the LinkedIn Post Inspector.

## Deploy

```bash
docker build -t my-portfolio \
  --build-arg NEXT_PUBLIC_SITE_URL=https://cleyton-mendes.com \
  --build-arg NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX \
  --build-arg NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-key .
docker run -p 3000:3000 my-portfolio
```

`docker-compose up -d` does the same reading the variables from the shell or a `.env` file. A push to `main` runs CI and, when it passes, triggers the Easypanel deployment through the `EASYPANEL_DEPLOY_WEBHOOK_URL` repository secret. Never commit that URL.

## Roadmap

See [ROADMAP.md](ROADMAP.md).

## License

Private. Not licensed for reuse.
