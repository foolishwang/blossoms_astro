import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://www.blossoms.com",
  output: "server",
  adapter: cloudflare(),
  trailingSlash: "ignore",
});
