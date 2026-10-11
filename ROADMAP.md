# Roadmap

What is done is described in [CLAUDE.md](CLAUDE.md) (status table) and the git history. This file only lists what comes next.

## Needs the owner

- [ ] Rotate the Easypanel deploy token (the old one is in the public git history), create the `EASYPANEL_DEPLOY_WEBHOOK_URL` GitHub secret and set the three build arguments in Easypanel.
- [ ] Real CVs: replace `public/cleyton-mendes-en.pdf` and `cleyton-mendes-pt.pdf` (they are currently identical copies).
- [ ] Vitaminese: the site is under maintenance. Add captures to `public/projects/` and set `screenshot` and `status` in `src/data/projects.ts`.
- [ ] Confirm that the Tiffany captures may be shown publicly.
- [ ] A photo without the orange disc for the About section (`public/about/cleyton.webp` is a crop of the current one).
- [ ] Decide whether to state a project count again; the "50+ projects" claim was removed because it was not verified.
- [ ] Confirm the contact e-mail in `src/data/personal.ts` (currently the personal address).

## Next features

- [ ] Blog in MDX, bilingual, with tags.
- [ ] A page per project (case study) with the screenshot gallery.
- [ ] Analytics events (CV download, project visit, form sent).
- [ ] PWA: service worker and offline page (the manifest already exists).
- [ ] Unit tests for the data helpers and form schema (Vitest), if they grow.
