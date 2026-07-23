# Naitik Jasani — Portfolio

A portfolio for a backend software engineer, designed to feel *engineered*: a
premium, dark, minimal interface with a distributed-systems point of view —
deployed-service experience cards, a live network-graph background, custom
signal/architecture visuals, a ⌘K command palette, and a print-ready résumé.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**,
**Framer Motion**, **Radix UI / shadcn** primitives, and **Lucide** icons.

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

## Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `pnpm dev`       | Start the dev server                 |
| `pnpm build`     | Production build                     |
| `pnpm start`     | Serve the production build           |
| `pnpm lint`      | Lint with ESLint (next config)       |
| `pnpm typecheck` | Type-check with `tsc --noEmit`       |

## Configure

All identity, links and SEO live in [`src/lib/site.ts`](src/lib/site.ts).
Update these before deploying:

- `url` — your deployed domain (drives canonical URLs, sitemap, OG tags)
- `socials.github`, `socials.linkedin` — your profiles
- `email` — your contact address

All page content (experience, projects, stack, timeline, philosophy) lives in
[`src/lib/data.ts`](src/lib/data.ts).

## Structure

```
src/
├── app/               # routes, metadata, SEO files, generated icons & OG
│   ├── layout.tsx     # fonts, metadata, JSON-LD, command palette provider
│   ├── page.tsx       # single-page composition
│   ├── resume/        # print-ready résumé route
│   ├── opengraph-image.tsx  icon.tsx  apple-icon.tsx
│   ├── robots.ts  sitemap.ts  manifest.ts
│   └── globals.css    # design tokens
├── components/
│   ├── sections/      # hero, about, experience, projects, …
│   ├── layout/        # navbar, footer, command menu
│   ├── backgrounds/   # network canvas, grid
│   ├── visuals/       # BLE signal map, service architecture
│   ├── shared/        # section shell, reveal, status dot, tech pill
│   └── ui/            # button, dialog, tooltip, command
├── hooks/             # scroll spy, reduced motion, media query
└── lib/               # site config, content model, utils
```

## Notes

- Fully responsive (desktop-first), keyboard accessible, and honors
  `prefers-reduced-motion`.
- SEO via Next metadata: Open Graph + Twitter cards, `robots.txt`,
  `sitemap.xml`, web manifest, and `Person` structured data.
- The Open Graph, favicon and apple-touch icons are generated at build time
  from `next/og` — no binary assets to maintain.

## License

MIT
