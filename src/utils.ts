import type { ImageMetadata } from "astro";

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/images/*.{jpeg,jpg,png,gif}"
);

export const getImageFromLibrary = (filePath: string) => {
  if (filePath && !images[filePath]) {
    throw new Error(
      `"${filePath}" does not exist in glob: "/src/images/*.{jpeg,jpg,png,gif}"`
    );
  }

  return images[filePath]();
};
