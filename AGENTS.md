# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single static **Astro** blog (`austinabbott.dev`, package name `dev-blog`), deployed to Cloudflare Pages. There is no backend, database, or other service — the only "service" is the Astro dev/build process. Bun is the package manager and script runner (`bun install`, `bun run <script>`, `bunx`); Astro and Playwright still run on Node. Commands are the scripts in `package.json` (`dev`/`start`, `build`, `preview`, `astro`).

- Versions: `.nvmrc` pins Node (the runtime for Astro and Playwright) and `.bun-version` pins Bun. Renovate keeps `.bun-version` current, and CI uses it. Cloudflare Pages reads Node from `.nvmrc` but ignores `.bun-version` and uses its build image's default Bun, which Cloudflare keeps up to date. Do not set `BUN_VERSION` in the dashboard, or it will need manual bumps.
- Run dev: `bun run dev` serves the site at `http://localhost:4321/` with hot reload. Editing/adding Markdown under `src/content/blog/` is the core "content authoring" flow and hot-reloads into the blog index and post pages.
- Build: `bun run build` runs `astro check` (type check) first, then `astro build` into `dist/`. This is the closest thing to a lint step — there is **no ESLint/Prettier** configured.
- Visual regression: `bun run test:visual` runs Playwright screenshot comparisons against baselines in `tests/visual.spec.ts-snapshots/` (requires a prior Chromium install via `bunx playwright install chromium`). Update baselines with `bun run test:visual:update`.
- Preview production build: `bun run preview` serves `dist/` (requires a prior build).
- Non-obvious: Bun runs dependency install scripts only for packages it trusts. Its default trusted list covers `esbuild` and `sharp`, and `bun pm untrusted` reports nothing skipped, so no `trustedDependencies` entry is needed.
- Astro 7 notes for this project: no remark/rehype plugins (Sätteri default Markdown processor is fine), no `src/fetch.ts`, and content schemas should import `z` from `astro/zod` (not `astro:content`).
