import { expect, test, type Page } from "@playwright/test";

const routes = [
  { path: "/", name: "home" },
  { path: "/blog/", name: "blog-index" },
  { path: "/about/", name: "about" },
  { path: "/blog/react-key/", name: "blog-post" },
] as const;

const viewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 390, height: 844 },
] as const;

async function waitForPageReady(page: Page) {
  await page.evaluate(() => document.fonts.ready);
}

for (const route of routes) {
  for (const viewport of viewports) {
    test(`${route.name} ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto(route.path);
      await waitForPageReady(page);
      await expect(page).toHaveScreenshot(`${route.name}-${viewport.name}.png`, {
        fullPage: true,
      });
    });
  }
}
