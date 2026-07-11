import { expect, test, type Page } from "@playwright/test";

const routes = [
  { path: "/", name: "home" },
  { path: "/blog/", name: "blog-index" },
  { path: "/about/", name: "about" },
  { path: "/blog/new-astro-blog/", name: "blog-post" },
] as const;

const viewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 390, height: 844 },
] as const;

async function waitForPageReady(page: Page, settleImages: boolean) {
  await page.evaluate(() => document.fonts.ready);
  if (!settleImages) {
    return;
  }

  // GIFs on the sample post need decode + a scroll pass before fullPage height is stable.
  await page.evaluate(async () => {
    await Promise.all(
      Array.from(document.images).map((image) =>
        image.decode().catch(() => undefined),
      ),
    );
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((resolve) => requestAnimationFrame(resolve));
    window.scrollTo(0, 0);
    await new Promise((resolve) => requestAnimationFrame(resolve));
  });
}

for (const route of routes) {
  for (const viewport of viewports) {
    test(`${route.name} ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto(route.path);
      await waitForPageReady(page, route.name === "blog-post");
      await expect(page).toHaveScreenshot(`${route.name}-${viewport.name}.png`, {
        fullPage: true,
      });
    });
  }
}
