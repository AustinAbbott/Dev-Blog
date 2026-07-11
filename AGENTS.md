# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single static **Astro** blog (`austinabbott.dev`, package name `dev-blog`), deployed to Cloudflare Pages. There is no backend, database, or other service — the only "service" is the Astro dev/build process. Commands are the npm scripts in `package.json` (`dev`/`start`, `build`, `preview`, `astro`).

- Node: `.nvmrc` pins Node `24.18.0`, which is installed and set as the nvm default. A login shell (`bash -lc '...'`) picks up Node 24 automatically. Astro 6 also works on the base Node 22, so either is fine.
- Run dev: `npm run dev` serves the site at `http://localhost:4321/` with hot reload. Editing/adding Markdown under `src/content/blog/` is the core "content authoring" flow and hot-reloads into the blog index and post pages.
- Build: `npm run build` runs `astro check` (type check) first, then `astro build` into `dist/`. This is the closest thing to a lint step — there is **no ESLint/Prettier** configured, and there is **no test framework** (no test command exists).
- Preview production build: `npm run preview` serves `dist/` (requires a prior build).
- Non-obvious: `npm install` under npm 11+ prints a benign `allow-scripts` warning that `esbuild` and `sharp` install scripts were skipped. This does **not** break anything — `sharp` image optimization works via prebuilt `@img/sharp-*` platform packages, confirmed by a successful `npm run build`. Do not attempt interactive `npm approve-scripts`.
