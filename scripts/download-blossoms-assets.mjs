import { execFileSync } from "node:child_process";
import {
  mkdir,
  readFile,
  readdir,
  stat,
  unlink,
  writeFile,
} from "node:fs/promises";
import { dirname, extname, join } from "node:path";
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

const REQUEST_HEADERS = {
  Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
};

function localAssetPath(url) {
  const parsed = new URL(url);
  const pathname = parsed.pathname.replace(/^\/+/, "");
  const extension = extname(pathname);
  const querySuffix = parsed.search
    ? `-${Buffer.from(parsed.search).toString("hex").slice(0, 12)}`
    : "";
  const safePath =
    querySuffix && extension
      ? pathname.replace(
          new RegExp(`${extension}$`),
          `${querySuffix}${extension}`,
        )
      : `${pathname}${querySuffix}`;

  return `${LOCAL_ASSET_PREFIX}/${safePath}`;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === "dist") {
      continue;
    }

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
    const fullDir = join(ROOT, sourceDir);
    const files = await walk(fullDir);

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

async function ensureAssetDownloaded(url, localPath) {
  const targetPath = join(PUBLIC_DIR, localPath.replace(/^\//, ""));

  try {
    await stat(targetPath);
    return true;
  } catch {}

  await mkdir(dirname(targetPath), { recursive: true });

  try {
    const response = await fetch(url, { headers: REQUEST_HEADERS });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const head = buffer.subarray(0, 512).toString("utf8").toLowerCase();
    if (head.includes("<!doctype html") || head.includes("<html")) {
      throw new Error("Received HTML instead of asset");
    }

    await writeFile(targetPath, buffer);
    return true;
  } catch {
    try {
      execFileSync(
        "curl",
        [
          "-sL",
          "--connect-timeout",
          "10",
          "--max-time",
          "45",
          "-A",
          REQUEST_HEADERS["User-Agent"],
          "-H",
          `Accept: ${REQUEST_HEADERS.Accept}`,
          "-o",
          targetPath,
          url,
        ],
        { stdio: "pipe" },
      );

      const downloaded = await readFile(targetPath);
      const head = downloaded.subarray(0, 512).toString("utf8").toLowerCase();
      if (head.includes("<!doctype html") || head.includes("<html")) {
        await unlink(targetPath);
        return false;
      }

      return true;
    } catch {
      try {
        await unlink(targetPath);
      } catch {}
      return false;
    }
  }
}

async function main() {
  const assetUrls = await collectAssetUrls();
  const failures = [];
  const assetMap = {};
  let downloaded = 0;

  for (const assetUrl of assetUrls) {
    const localPath = localAssetPath(assetUrl);
    const ok = await ensureAssetDownloaded(assetUrl, localPath);
    if (ok) {
      downloaded += 1;
      assetMap[assetUrl] = localPath;
    } else {
      failures.push(assetUrl);
    }
  }

  await writeFile(
    join(ROOT, "src/data/asset-failures.json"),
    JSON.stringify(failures, null, 2),
  );
  await writeFile(
    join(ROOT, "src/data/local-asset-map.json"),
    JSON.stringify(assetMap, null, 2),
  );

  console.log(`Scanned ${assetUrls.length} remote blossoms assets.`);
  console.log(`Saved ${downloaded} assets to local public mirror.`);
  if (failures.length) {
    console.log(`Failed to download ${failures.length} assets.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
