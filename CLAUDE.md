# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Project overview

Personal portfolio of Cleyton Mendes, Software Engineer specialised in e-commerce (VTEX, Shopify, Deco; React, TypeScript, Next.js). Bilingual (English/Portuguese), aimed at international job opportunities and freelance work. The site is itself proof of the work: it must be fast, polished and move with intent.

## Tech stack

- **Framework**: Next.js 16 (App Router), React 19.2, TypeScript 5 (strict)
- **Styling**: Tailwind CSS 4, shadcn/ui (Radix) as the component base
- **i18n / theme**: next-intl, next-themes (light/dark)
- **Forms / email**: react-hook-form + zod, Web3Forms (client-side)
- **Analytics**: Google Analytics 4 via `@next/third-parties`
- **Motion (see Motion rules)**: `three` + `@react-three/fiber` (3D scenes), `gsap` + ScrollTrigger (project frame scroll)
- **Deployment**: Docker (`output: 'standalone'`) on a personal VPS through Easypanel

## Status

Work follows milestones M0 to M5. Update this table when a milestone closes.

| Milestone | Scope | Status |
|---|---|---|
| M0 | Governance and security (this file, CI, build env, hygiene) | done |
| M1 | Design system and lint enforcement | done |
| M2 | i18n by route (`/en`, `/pt`) and technical SEO | done |
| M3 | Data and content cleanup | done |
| M4 | Section redesign and motion | done |
| M5 | Quality: icons/OG, Playwright + axe, docs | pending |

The design system and motion rules below are enforced by `npm run lint`.

## Commands

Use **npm only**. `package-lock.json` is the source of truth; do not mix pnpm or yarn.

```bash
npm ci               # install exactly from the lockfile
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint         # ESLint (design system rules) and Stylelint
npm run type-check   # tsc --noEmit
```

Never run `npm audit fix --force`: its suggestions are major downgrades (for example `eslint-config-next@14`). Use plain `npm audit fix` and verify with lint, type-check and build.

## Code principles

- No overengineering: simple, readable code that matches the surrounding style.
- No `any`; strict TypeScript. Zero lint errors.
- Atomic commits: one feature per commit, never a half-implemented feature. If a change cannot be finished, revert it.
- Reuse and improve existing components before creating new ones.

## Design system rules

Source of truth: `src/styles/tokens.css`. Anything outside it is a violation and fails `npm run lint`.

- **Palette**: two neutrals inverted between themes, Névoa `#EEF1EC` and Breu `#111713`, plus Folha (secondary text), Musgo (lines), Âmbar `#E6972E` (the accent, used as a signal: links, primary action, focus, active state, never as decoration) and Âmbar-tinta `#8A4F00` (accent as text on the light theme, because Âmbar on Névoa is only 2.1:1). Never pure black or pure white.
- **Tokens only**: semantic shadcn names (`bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`, `bg-accent`, ...). Tailwind's default palette, radii and shadows are removed, so `bg-green-500` or `rounded-xl` do not exist. No arbitrary values outside `components/ui` (`w-[137px]`), no hex or `style` colors, no new CSS custom properties outside `tokens.css`. `text-accent` is forbidden: use `text-accent-ink`.
- **Colours as values** (canvas, QR code, 3D scene): read the token with `getToken('--name')` from `src/lib/design-tokens.ts`. `bg-paper`/`text-ink` and `--print-ink`/`--print-paper` do not flip with the theme (client logos, screenshots, QR codes). A section can force a theme with the `.light` or `.dark` class.
- **Components**: use `src/components/ui/*`. Improve an existing component instead of building a look-alike. Raw `<button>`, `<input>`, `<select>`, `<textarea>` only inside `ui/`. Add shadcn components with `npx shadcn@latest add <name>`.
- **Typography**: Archivo for headings and interface (its width axis is part of the identity), Source Serif 4 for long text. No monospace for labels, no ALL CAPS labels, sentence case, lines under 80 characters.
- **Layout**: left aligned, section name in a side rail, no grids of identical cards. Border radius follows the element's role (control, media, pill), not one value for everything.
- **Accessibility**: contrast AA in both themes, visible keyboard focus, semantic HTML, `prefers-reduced-motion` respected.
- **Living documentation**: `/design-system` shows every token and component in both themes. Update it when a component or token changes.
- **Design process**: use the `frontend-design` skill (plan, review against the brief, build, critique with screenshots) before designing or reshaping any section.

## Motion rules

Motion is spent in three places only: the hero (Three.js scene and the name's width animation), the projects section (GSAP scroll on the screenshot frame) and the contact confirmation (3D scene after a successful send). No fade-in per section, no hover animation on every card, no decorative loops.

- Animation libraries (`framer-motion`, `gsap`) only in `src/components/motion/`; `three` and `@react-three/*` only in `src/components/three/`.
- 3D scenes are `next/dynamic` imports without SSR, mounted only when the visitor can use them: `hasWebGL()` (`src/lib/webgl.ts`), no `prefers-reduced-motion`, no data saver, wide screen for the hero. Everyone else gets the static version of the same content (`storefront-frames.tsx` for the hero).
- Scene colours come from the CSS tokens through `getToken('--name')` (`src/lib/design-tokens.ts`); no hex in scene code. Scenes pause (`frameloop: 'never'`) while off screen and use one `Canvas` at a time.
- GSAP is imported dynamically by `scroll-frame.tsx` when the frame is half a screen away, so it stays out of the initial bundle. The contact form and the parcel scene load the same way (`lazy-contact-form.tsx`, `sent-confirmation.tsx`).
- The name's width animation (`hero-name.tsx`) is a rAF lerp on `font-stretch`, enabled only with a hover pointer on wide screens and no reduced motion.
- Hero images in `public/hero/` are 800x600 WebP crops of the project captures (about 20 to 50 KB each). Re-crop from `public/projects/` instead of using the full-page captures; the hero image is the LCP element.
- `prefers-reduced-motion` turns motion off and serves the static version.
- Performance budget: Lighthouse mobile performance of at least 90 on the production build. Last measured: 93 on `/en` and `/pt` (accessibility 100, best practices 100, SEO 92, CLS 0).

## Internationalization

- Languages: English (default) and Portuguese. All user-facing strings live in `src/messages/en.json` and `src/messages/pt.json` with identical keys. Data files carry `{ en, pt }` objects.
- Each language has its own URL: `/en` and `/pt` (`localePrefix: 'always'`). `src/proxy.ts` (next-intl) redirects `/` and unprefixed paths by the visitor's language and remembers the choice in a cookie. The home page and `[locale]/layout.tsx` are statically generated (`generateStaticParams` + `setRequestLocale`); keep it that way, do not read cookies or headers there.
- Routing config and helpers live in `src/i18n/routing.ts`. Use `Link`, `usePathname`, `useRouter` from `@/i18n/routing` for internal links to localized pages, not `next/link` or `next/navigation`. In server components use `getTranslations` and pass the locale from `params`.
- Every section is on the home page (`/<locale>#experience`, `#projects`, `#skills`, `#certifications`, `#contact`). The old `/experience`, `/projects`, `/education` URLs redirect to those anchors (`next.config.ts`).
- Two root layouts: `src/app/[locale]/layout.tsx` (the localized site, metadata and JSON-LD per locale, hreflang) and `src/app/(utility)/layout.tsx` for `/tools/*`, `/whatsapp-bot/*` and `/design-system`. Those are Portuguese-only, keep their historical URLs (the legal pages are registered with Meta) and are excluded in the `src/proxy.ts` matcher. Links between utility pages use `next/link`; links back to the site use the localized `Link`.
- `NEXT_PUBLIC_SITE_URL` (through `src/lib/site.ts`) is the origin for canonical URLs, the sitemap and JSON-LD.

## Content rules

- No invented numbers, results or claims. Every metric must be verifiable by the owner. The professional title is "Software Engineer".
- One source for contact data: `src/data/personal.ts` (email, phone, title, location). Components, JSON-LD and the legal pages read it from there; never retype an email or phone number.
- Projects carry a `status` (`live`, `maintenance`, `offline`); only `live` ones link to the client's site. Screenshots are WebP files in `public/projects/` registered with their dimensions in `src/data/projects.ts`.
- Experience and skills are data, not translations: do not duplicate them in `src/messages/*.json`.
- Client material (names, logos, screenshots) only with the owner's confirmation. Screenshots are static assets in `public/projects/`, never hot-linked from third-party hosts.

## Workflow

- Develop on the branch assigned to the session. **Never push to `main` unless the owner asks**: a push to `main` deploys to production.
- Commit prefixes: `feat`, `fix`, `chore`, `docs`, `ci`, `build`. Keep messages descriptive.
- Before every commit: `npm run lint`, `npm run type-check`, `npm run build`; for visual work, also review screenshots in light and dark, EN and PT, desktop and mobile.
- `find-skills`: read a third-party skill completely and check its source and licence before installing it. Never use `-y`.
- Security: never commit secrets, tokens or webhook URLs. Use GitHub Secrets and environment variables.

## Deployment

- Multi-stage Docker build, standalone output, run with `node server.js`.
- `NEXT_PUBLIC_*` values are inlined at build time, so the Dockerfile receives them as build arguments. Without them the contact form and analytics are silently disabled.
- `.github/workflows/deploy.yml`: on pull requests and pushes to `main` it runs lint, type-check and build; on pushes to `main` it then calls the Easypanel webhook stored in the `EASYPANEL_DEPLOY_WEBHOOK_URL` secret.

## Environment variables

Create `.env.local` for development (see `.env.example`):

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-web3forms-key
```

## Resources

- [Next.js](https://nextjs.org/docs), [Tailwind CSS](https://tailwindcss.com/docs), [shadcn/ui](https://ui.shadcn.com), [next-intl](https://next-intl.dev)
- [React Three Fiber](https://r3f.docs.pmnd.rs), [GSAP](https://gsap.com/docs)
