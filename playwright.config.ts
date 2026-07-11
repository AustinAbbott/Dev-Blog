import { defineConfig, devices } from "@playwright/test";

// Dedicated port so tests never attach to `astro dev` on the default 4321.
const previewUrl = "http://127.0.0.1:4173";
const previewCommand = "npx astro preview --host 127.0.0.1 --port 4173";

export default defineConfig({
  testDir: "./tests",
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["html", { open: "never" }], ["list"]] : "list",
  // Drop project/platform suffixes so macOS baselines match Linux CI.
  snapshotPathTemplate:
    "{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}{ext}",
  use: {
    baseURL: previewUrl,
    trace: "on-first-retry",
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      animations: "disabled",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    // CI builds in a prior workflow step; locally we build here.
    command: process.env.CI
      ? previewCommand
      : `npm run build && ${previewCommand}`,
    url: previewUrl,
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
