## austinabbott.dev

A minimalist blog built with Astro and hosted on Cloudflare Pages

## Visual tests

Visual snapshot tests catch unintended layout changes from Astro or dependency updates. They compare full-page screenshots of key routes against committed baselines in `tests/visual.spec.ts-snapshots/`.

Baselines are produced and compared on Linux in CI. Screenshots generated on macOS may differ slightly.

### First-time setup

```bash
npm ci
npx playwright install chromium
```

Playwright browsers are downloaded separately from npm packages.

### Run tests

```bash
npm run test:visual
```

This builds the site, serves the production build with `astro preview`, and fails if any screenshot differs from the committed baseline.

### When CI fails

1. Open the failed GitHub Actions run for the **Visual snapshot tests** job.
2. Download the `visual-test-results` artifact. It contains actual, expected, and diff images for failed comparisons.
3. Decide whether the change is:
   - **Unintended regression** — fix the CSS or layout and push again.
   - **Intentional layout change** — update the snapshots (steps below).

### Update snapshots

Prefer refreshing baselines from CI so they match Linux rendering:

1. Download the `visual-test-results` artifact from the failed job.
2. Copy each `*-actual.png` from `test-results/` over the matching file in `tests/visual.spec.ts-snapshots/`.
3. Commit the updated PNGs and push.

For a local refresh (may still fail CI if fonts/rendering differ):

```bash
npm run test:visual:update
```

Review the changed PNGs, commit them with your layout change, and push. If CI still fails, replace baselines from the CI artifact as above.

Renovate or Astro dependency bumps may fail this check. Updating snapshots is how you approve a new visual baseline.

### Required status check

After this workflow is on `master`, mark **Visual snapshot tests** as a required status check in GitHub branch protection so pull requests cannot merge when screenshots differ.
