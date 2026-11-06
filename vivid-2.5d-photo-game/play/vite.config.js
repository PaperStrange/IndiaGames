import { defineConfig } from "vite";
import { readFileSync } from "node:fs";

const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

export default defineConfig({
  base: "./",
  plugins: [{
    name: "package-version",
    transformIndexHtml: html => html.replaceAll("%PACKAGE_VERSION%", version),
  }],
  build: { target: "es2022", chunkSizeWarningLimit: 650 },
});
