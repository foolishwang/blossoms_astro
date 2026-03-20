import { access, readdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PUBLIC_DIR = fileURLToPath(new URL("../public/", import.meta.url));
const SITE_ORIGIN = "https://www.blossoms.com";
const LOCAL_ASSET_PREFIX = "/assets/wp";
const ASSET_PATTERN =
  /https?:\/\/www\.blossoms\.com\/[^"'()\s]+\.(?:png|jpe?g|webp|gif|svg|avif|ico|mp4|woff2?|css)(?:\?[^"'()\s]*)?/gi;
const PROTOCOL_RELATIVE_PATTERN =
  /\/\/www\.blossoms\.com\/[^"'()\s]+\.(?:png|jpe?g|webp|gif|svg|avif|ico|mp4|woff2?|css)(?:\?[^"'()\s]*)?/gi;
const ROOT_RELATIVE_PATTERN =
  /(?<!\/assets\/wp)\/(?:wp-content|wp-includes)\/[^"'()\s]+\.(?:png|jpe?g|webp|gif|svg|avif|ico|mp4|woff2?|css)(?:\?[^"'()\s]*)?/gi;
const SOURCE_DIRS = ["src", "scripts", "dist/client"];

function normalizeAssetUrl(url) {
  return url.replace("/blog/wp-content/", "/wp-content/");
}

function localAssetPath(url) {
  const parsed = new URL(url);
  return `${LOCAL_ASSET_PREFIX}${parsed.pathname}`;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === "dist") continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

async function collectAssetUrls() {
  const assetUrls = new Set();

  for (const sourceDir of SOURCE_DIRS) {
    const files = await walk(join(ROOT, sourceDir));

    for (const file of files) {
      const content = await readFile(file, "utf8");

      for (const match of content.matchAll(ASSET_PATTERN)) {
        assetUrls.add(normalizeAssetUrl(match[0]));
      }

      for (const match of content.matchAll(PROTOCOL_RELATIVE_PATTERN)) {
        assetUrls.add(normalizeAssetUrl(`https:${match[0]}`));
      }

      for (const match of content.matchAll(ROOT_RELATIVE_PATTERN)) {
        assetUrls.add(normalizeAssetUrl(`${SITE_ORIGIN}${match[0]}`));
      }
    }
  }

  return [...assetUrls].sort((left, right) => left.localeCompare(right));
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const assetUrls = await collectAssetUrls();
  const assetMap = {};

  for (const assetUrl of assetUrls) {
    const localPath = localAssetPath(assetUrl);
    const fullPath = join(PUBLIC_DIR, localPath.replace(/^\//, ""));
    if (await exists(fullPath)) {
      assetMap[assetUrl] = localPath;
    }
  }

  await writeFile(
    join(ROOT, "src/data/local-asset-map.json"),
    JSON.stringify(assetMap, null, 2),
  );

  console.log(`Wrote ${Object.keys(assetMap).length} local asset mappings.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
