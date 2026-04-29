# Jasher Chan — Portfolio

Source for [jasherchan.truehubsolutions.com](https://jasherchan.truehubsolutions.com) — the personal site of an AI Automation Engineer based in Bacolod, Philippines.

## Stack

- **Framework:** [Next.js 16.2.4](https://nextjs.org) (App Router, static export)
- **UI:** React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide icons
- **Hosting:** Cloudflare Pages (static)
- **OG image generation:** Sharp (Node script — see [scripts/generate-og.js](scripts/generate-og.js))
- **Form backend:** [n8n](https://n8n.io) webhook → Notion (with email-based dedup) → Gmail draft
- **Booking:** [Cal.com](https://cal.com/truehubsolutions/career-chat)

## Local development

```bash
npm install
cp .env.local.example .env.local   # fill in NEXT_PUBLIC_N8N_RESUME_WEBHOOK
npm run dev                         # http://localhost:3000
```

## Build & deploy

```bash
npm run build                       # produces ./out (static export)

# Deploy to Cloudflare Pages (requires CLOUDFLARE_API_TOKEN env var):
npx wrangler pages deploy out --project-name=jasher-portfolio
```

The deploy token is **not** committed. Set it in your shell before deploying:

```bash
export CLOUDFLARE_API_TOKEN=...
```

## Project structure

```
jasher-portfolio/
├── public/                 # static assets (favicon, OG image, CV PDF, ATS docx)
├── scripts/
│   ├── fonts/              # bundled fonts for OG generation
│   └── generate-og.js      # regenerates og-image.png (1200×630)
└── src/
    ├── app/                # Next.js App Router (layout.tsx, page.tsx, sitemap, robots, JSON-LD)
    ├── components/         # React components (sections, cards, motion wrappers)
    └── lib/                # utilities
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production static export → `./out` |
| `npm run lint` | ESLint via [eslint-config-next](https://www.npmjs.com/package/eslint-config-next) |
| `npm run typecheck` | `tsc --noEmit` — verifies the build will type-check |
| `npm run generate:og` | Regenerate `public/og-image.png` from React markup |

## OG image regeneration

Run `npm run generate:og` after changing the headshot, headline, or palette. After redeploy, **force LinkedIn to re-cache** by inspecting the URL at [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/inspect/) — otherwise previews will stay stale for 24–48 hours.

## CI

GitHub Actions runs `typecheck` and `build` on every push and pull request. See [.github/workflows/ci.yml](.github/workflows/ci.yml).

**Known issue:** `npm run lint` currently fails to load the eslint config — a circular-reference error between `@eslint/eslintrc` 9 and `eslint-config-next` 16's `FlatCompat` shim. Lint is therefore disabled in CI, pending an upstream fix or a config rewrite that drops `FlatCompat` in favour of native flat config.

## Notes

- This is a static site — no server-side rendering, no API routes. The resume form posts directly to an n8n webhook on the same infrastructure.
- Fonts (Space Grotesk for headings, DM Sans for body) are self-hosted via `next/font` to avoid external font loads.
- The CV PDF in [public/jasher-cv.pdf](public/jasher-cv.pdf) is generated separately via the visual-CV pipeline (Playwright HTML → PDF) — not built here.

## License

All rights reserved. The source is published for transparency and reference, not for reuse. If you'd like to use any of it, [get in touch](mailto:jasherjoshuachan@gmail.com).
