## austinabbott.dev

A minimalist blog built with Astro and hosted on Cloudflare Pages

## Visual tests

Visual snapshot tests catch unintended layout changes from Astro or dependency updates. They compare full-page screenshots of key routes against committed baselines in `tests/visual.spec.ts-snapshots/`.

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

Renovate or Astro dependency bumps may fail this check. Updating snapshots is how you approve a new visual baseline.

### Update snapshots

When a layout change is intentional:

1. On the branch with the change, run:

   ```bash
   npm run test:visual:update
   ```

2. Review the changed PNGs under `tests/visual.spec.ts-snapshots/` in your git diff.
3. Commit the updated snapshots with your layout change.
4. Push. CI re-runs `npm run test:visual` and should pass.

### Required status check

After this workflow is on `master`, mark **Visual snapshot tests** as a required status check in GitHub branch protection so pull requests cannot merge when screenshots differ.
