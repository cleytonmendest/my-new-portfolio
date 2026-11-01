# SEO

What the site does for search engines and link previews, and what is left.

**Site:** https://cleyton-mendes.vercel.app (set `NEXT_PUBLIC_SITE_URL` when moving to a custom domain)

*Last updated: 2026-11-01*

## In place

### Metadata (`src/lib/metadata.ts`, `src/app/[locale]/layout.tsx`)
- Title and description per locale and per page (`site.meta`, page `generateMetadata`)
- Canonical URL and hreflang alternates (`en`, `pt`, `x-default` → `en`) via `localeAlternates`
- Open Graph and X tags: each page's own title and description, `summary_large_image`
- Icons: `favicon.ico`, `icon.svg`, `apple-icon.png` in `src/app`; `public/manifest.json`

### Share images
- `opengraph-image.tsx` renders a 1200×630 card in the terminal style per locale (home and the
  pages without their own) and per case study, prerendered at build (`src/lib/share-image.tsx`)

### Structured data (`src/components/structured-data.tsx`)
- Every page: `Person` and `WebSite`, in the page's language
- Home: `ProfilePage`
- `/experience`, `/projects`, `/education` and case studies: `BreadcrumbList` of real pages
- `worksFor` still says GrupoQ until QuestEdu vs GrupoQ is decided

### Crawling
- `sitemap.xml`: every portfolio page in both locales with hreflang, no build-time dates
- `robots.txt`: allows everything and points to the sitemap
- `/tools` pages are `noindex`; the WhatsApp bot policy pages stay at their registered URLs

### Checks
- The e2e suite (`e2e/seo.spec.ts`) covers the structured data, share images and sitemap
- Lighthouse in production, mobile (Nov 2026): SEO 100, accessibility 100, performance 93
  (home) and 94 (case study)

## To do

- [ ] Submit the sitemap in Google Search Console and Bing Webmaster Tools
- [ ] Custom domain, then `NEXT_PUBLIC_SITE_URL`
- [ ] Content that ranks: richer case studies with results, more projects, the planned blog
- [ ] Link the portfolio from GitHub, LinkedIn and the email signature

## Tools

- Rich Results Test: https://search.google.com/test/rich-results
- PageSpeed Insights: https://pagespeed.web.dev
- Open Graph preview: https://www.opengraph.xyz
