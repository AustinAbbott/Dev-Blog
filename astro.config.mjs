import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://austinabbott.dev",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      // Light and dark code colors; global.css picks one based on the theme toggle.
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
});
