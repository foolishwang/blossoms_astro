import { mkdir, readFile, stat, unlink, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://www.blossoms.com";
const API_BASE = `${SITE_URL}/wp-json/wp/v2`;
const OUTPUT_DIR = new URL("../src/data/", import.meta.url);
const PUBLIC_DIR = new URL("../public/", import.meta.url);
const LOCAL_ASSET_PREFIX = "/assets/wp";
const IMAGE_URL_PATTERN = /https:\/\/www\.blossoms\.com\/[^"'()\s]+?\.(?:png|jpe?g|webp|gif|svg|avif|ico)(?:\?[^"'()\s]*)?/gi;
const FALLBACK_GLOBAL = {
  siteTitle: "Cherry Blossoms",
  bodyClass: "",
  headerHtml: "",
  footerHtml: "",
  stylesheetLinks: [],
  inlineStyles: []
};
const SEEDED_ASSET_URLS = [
  "https://www.blossoms.com/wp-content/uploads/2025/05/cherry-blossoms-dating-logo.png",
  "https://www.blossoms.com/wp-content/uploads/2025/02/cropped-blossoms-icon-1-150x150.png",
  "https://www.blossoms.com/wp-content/uploads/2025/02/cropped-blossoms-icon-1-300x300.png",
  "https://www.blossoms.com/wp-content/uploads/2025/02/location1-dating-site-online-couple-david-and-phoebe.png",
  "https://www.blossoms.com/wp-content/uploads/2025/02/location1-dating-site-online-couple-john-and-sienna.png",
  "https://www.blossoms.com/wp-content/uploads/2025/02/location1-dating-site-online-couple-doug-and-jheng.png",
  "https://www.blossoms.com/wp-content/uploads/2025/02/fox-news-asian-dating-site-philippines-review.png",
  "https://www.blossoms.com/wp-content/uploads/2025/02/yahoo-news-philippines-dating-site-review.png",
  "https://www.blossoms.com/wp-content/uploads/2025/02/bloomberg-philippines-dating-website-reviews.png",
  "https://www.blossoms.com/wp-content/uploads/2025/06/AboutUsBlossomsDatin-1.mp4",
  "https://www.blossoms.com/wp-content/uploads/2025/06/cherry-blossoms-dating-video.jpg",
  "https://www.blossoms.com/wp-content/uploads/2025/02/blossoms-dating-site-philippines-members.jpg",
  "https://www.blossoms.com/wp-content/uploads/2025/03/get-blossoms-asian-dating-app-in-play-store.png",
  "https://www.blossoms.com/wp-content/uploads/2025/02/Depositphotos_230654110_XL-scaled.jpg",
  "https://www.blossoms.com/wp-content/uploads/2025/02/blossoms-asian-dating-site-philippines-2.jpg"
];

const REQUEST_HEADERS = {
  Accept: "application/json, text/html;q=0.9,*/*;q=0.8",
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
};
const SHOULD_LOCALIZE_IMAGES = process.env.LOCALIZE_IMAGES === "1";

function curlRequest(args) {
  return execFileSync("curl", args, { encoding: "utf8" });
}

function curlDownload(url, outputPath) {
  execFileSync(
    "curl",
    [
      "-sL",
      "--connect-timeout",
      "10",
      "--max-time",
      "20",
      "-A",
      REQUEST_HEADERS["User-Agent"],
      "-H",
      `Accept: ${REQUEST_HEADERS.Accept}`,
      "-o",
      outputPath,
      url
    ],
    { stdio: "pipe" }
  );
}

async function fetchJson(url) {
  try {
    const response = await fetch(url, { headers: REQUEST_HEADERS });
    if (response.ok) {
      return response.json();
    }
  } catch {}

  try {
    const raw = curlRequest([
      "-sL",
      "-A",
      REQUEST_HEADERS["User-Agent"],
      "-H",
      `Accept: ${REQUEST_HEADERS.Accept}`,
      String(url)
    ]);

    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Failed to fetch ${url}`, { cause: error });
  }
}

async function fetchText(url) {
  const response = await fetch(url, { headers: REQUEST_HEADERS });
  if (response.ok) {
    return response.text();
  }

  try {
    return curlRequest([
      "-sL",
      "-A",
      REQUEST_HEADERS["User-Agent"],
      "-H",
      `Accept: ${REQUEST_HEADERS.Accept}`,
      url
    ]);
  } catch (error) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`, { cause: error });
  }
}

async function fetchAll(endpoint, params) {
  const firstUrl = new URL(`${API_BASE}/${endpoint}`);
  Object.entries({ ...params, per_page: "100", page: "1" }).forEach(([key, value]) => {
    firstUrl.searchParams.set(key, value);
  });

  let totalPages = 1;

  try {
    const firstResponse = await fetch(firstUrl, { headers: REQUEST_HEADERS });
    if (!firstResponse.ok) {
      throw new Error(`Failed to fetch ${firstUrl}: ${firstResponse.status}`);
    }

    totalPages = Number(firstResponse.headers.get("x-wp-totalpages") || "1");
    const items = await firstResponse.json();

    for (let page = 2; page <= totalPages; page += 1) {
      const nextUrl = new URL(firstUrl);
      nextUrl.searchParams.set("page", String(page));
      items.push(...(await fetchJson(nextUrl)));
    }

    return items;
  } catch {
    const headers = curlRequest([
      "-sLI",
      "-A",
      REQUEST_HEADERS["User-Agent"],
      "-H",
      `Accept: ${REQUEST_HEADERS.Accept}`,
      String(firstUrl)
    ]);

    const totalPagesMatch = headers.match(/x-wp-totalpages:\s*(\d+)/i);
    totalPages = Number(totalPagesMatch?.[1] || "1");
  }

  const items = await fetchJson(firstUrl);

  for (let page = 2; page <= totalPages; page += 1) {
    const nextUrl = new URL(firstUrl);
    nextUrl.searchParams.set("page", String(page));
    items.push(...(await fetchJson(nextUrl)));
  }

  return items;
}

function decodeHtmlEntities(value = "") {
  return value
    .replaceAll("&#038;", "&")
    .replaceAll("&#8211;", "–")
    .replaceAll("&#8217;", "'")
    .replaceAll("&#8230;", "...")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#039;", "'");
}

function stripTags(value = "") {
  return decodeHtmlEntities(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function absolutizeContent(content = "") {
  return content
    .replaceAll(`href="${SITE_URL}`, 'href="')
    .replaceAll(`src="${SITE_URL}`, 'src="')
    .replaceAll(`srcset="${SITE_URL}`, 'srcset="')
    .replace(/(href|src)=["']\/(?!\/)/g, `$1="${SITE_URL}/`)
    .replace(/srcset=["']([^"']+)["']/g, (match, srcset) => {
      const next = srcset.replace(/(^|,\s*)\/(?!\/)/g, `$1${SITE_URL}/`);
      return `srcset="${next}"`;
    });
}

function normalizeSeo(rawSeo, fallback) {
  const seo = rawSeo || {};
  const canonical = seo.canonical || fallback.link;
  const description = seo.description || stripTags(fallback.excerpt || fallback.content || "");
  const title = seo.title || decodeHtmlEntities(fallback.title);
  const ogImage = seo.og_image?.[0]?.url || seo.og_image?.[0]?.src || null;

  return {
    title,
    description,
    canonical,
    robots: seo.robots || {},
    ogTitle: seo.og_title || title,
    ogDescription: seo.og_description || description,
    ogType: seo.og_type || "website",
    ogImage,
    twitterCard: seo.twitter_card || "summary_large_image",
    twitterTitle: seo.twitter_title || title,
    twitterDescription: seo.twitter_description || description,
    schema: seo.schema || null
  };
}

function routeFromLink(link) {
  const pathname = new URL(link).pathname.replace(/^\/+|\/+$/g, "");
  return pathname === "" ? "/" : `/${pathname}/`;
}

function collectAssetUrlsFromString(value, bucket) {
  if (!value) {
    return;
  }

  for (const match of value.matchAll(IMAGE_URL_PATTERN)) {
    bucket.add(match[0]);
  }
}

function collectAssetUrlsFromObject(value, bucket) {
  if (!value) {
    return;
  }

  if (typeof value === "string") {
    collectAssetUrlsFromString(value, bucket);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectAssetUrlsFromObject(item, bucket));
    return;
  }

  if (typeof value === "object") {
    Object.values(value).forEach((item) => collectAssetUrlsFromObject(item, bucket));
  }
}

function localAssetPath(url) {
  const parsed = new URL(url);
  const pathname = parsed.pathname.replace(/^\/+/, "");
  const extension = extname(pathname);
  const querySuffix = parsed.search ? `-${Buffer.from(parsed.search).toString("hex").slice(0, 12)}` : "";
  const safePath = querySuffix && extension
    ? pathname.replace(new RegExp(`${extension}$`), `${querySuffix}${extension}`)
    : `${pathname}${querySuffix}`;

  return `${LOCAL_ASSET_PREFIX}/${safePath}`;
}

async function ensureAssetDownloaded(url, localPath) {
  const target = new URL(`.${localPath}`, PUBLIC_DIR);
  const targetPath = fileURLToPath(target);

  try {
    await stat(target);
    const existing = await readFile(target);
    const head = existing.subarray(0, 512).toString("utf8").toLowerCase();
    if (head.includes("<!doctype html") || head.includes("<html")) {
      await unlink(target);
    } else {
      return true;
    }
  } catch {}

  await mkdir(dirname(targetPath), { recursive: true });
  try {
    curlDownload(url, targetPath);
    const downloaded = await readFile(target);
    const head = downloaded.subarray(0, 512).toString("utf8").toLowerCase();
    if (head.includes("<!doctype html") || head.includes("<html")) {
      await unlink(target);
      return false;
    }

    return true;
  } catch {
    try {
      await unlink(target);
    } catch {}
    return false;
  }
}

function rewriteAssetUrlsInString(value, assetMap) {
  if (!value) {
    return value;
  }

  let next = value;
  for (const [remoteUrl, localPath] of assetMap.entries()) {
    next = next.split(remoteUrl).join(localPath);
  }

  return next;
}

function rewriteAssetUrlsInObject(value, assetMap) {
  if (!value) {
    return value;
  }

  if (typeof value === "string") {
    return rewriteAssetUrlsInString(value, assetMap);
  }

  if (Array.isArray(value)) {
    return value.map((item) => rewriteAssetUrlsInObject(item, assetMap));
  }

  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, rewriteAssetUrlsInObject(item, assetMap)])
    );
  }

  return value;
}

function mapRecord(record, kind) {
  const title = decodeHtmlEntities(record.title?.rendered || "Untitled");
  const excerpt = record.excerpt?.rendered || "";
  const content = absolutizeContent(record.content?.rendered || "");
  const link = record.link;

  return {
    id: record.id,
    kind,
    slug: record.slug,
    route: routeFromLink(link),
    link,
    title,
    excerpt,
    excerptText: stripTags(excerpt),
    content,
    date: record.date || null,
    modified: record.modified || null,
    seo: normalizeSeo(record.yoast_head_json, {
      title,
      excerpt,
      content,
      link
    })
  };
}

function extractGlobalTemplate(homeHtml) {
  const titleMatch = homeHtml.match(/<title>(.*?)<\/title>/i);
  const bodyClassMatch = homeHtml.match(/<body[^>]*class="([^"]*)"/i);
  const headerMatch = homeHtml.match(/(<header id="masthead"[\s\S]*?<\/header>)/i);
  const mobileHeaderMatch = homeHtml.match(/(<div id="mobile-header"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)/i);
  const footerMatch = homeHtml.match(/(<footer[\s\S]*?<\/footer>)/i);

  const stylesheetLinks = Array.from(
    homeHtml.matchAll(/<link[^>]+rel=['"]stylesheet['"][^>]*href=['"]([^'"]+)['"][^>]*>/gi),
    (match) => match[1]
  );

  const inlineStyles = Array.from(homeHtml.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi), (match) => match[1]).slice(0, 20);

  return {
    siteTitle: decodeHtmlEntities(titleMatch?.[1] || "Cherry Blossoms"),
    bodyClass: bodyClassMatch?.[1] || "",
    headerHtml: `${headerMatch?.[1] || ""}${mobileHeaderMatch?.[1] || ""}`,
    footerHtml: footerMatch?.[1] || "",
    stylesheetLinks,
    inlineStyles
  };
}

function isChallengePage(global) {
  return !global.headerHtml && /just a moment/i.test(global.siteTitle);
}

function isUsableGlobalTemplate(global) {
  if (!global) {
    return false;
  }

  return !isChallengePage(global) && global.siteTitle && typeof global.siteTitle === "string";
}

async function readExistingJson(fileName) {
  try {
    const raw = await readFile(new URL(fileName, OUTPUT_DIR), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(PUBLIC_DIR, { recursive: true });

  const [homeHtml, pages, posts] = await Promise.all([
    fetchText(`${SITE_URL}/`),
    fetchAll("pages", {
      _fields: "id,slug,link,title,excerpt,content,yoast_head_json,date,modified"
    }),
    fetchAll("posts", {
      _fields: "id,slug,link,title,excerpt,content,yoast_head_json,date,modified"
    })
  ]);

  const extractedGlobal = extractGlobalTemplate(homeHtml);
  const existingGlobal = await readExistingJson("./global.json");
  const existingFailures = await readExistingJson("./asset-failures.json");
  const global = isUsableGlobalTemplate(extractedGlobal)
    ? extractedGlobal
    : isUsableGlobalTemplate(existingGlobal)
      ? existingGlobal
      : FALLBACK_GLOBAL;
  const mappedPages = pages.map((record) => mapRecord(record, "page"));
  const mappedPosts = posts.map((record) => mapRecord(record, "post"));
  const routes = [...mappedPages, ...mappedPosts].sort((left, right) => left.route.localeCompare(right.route));

  let localizedGlobal = global;
  let localizedRoutes = routes;
  let successfulAssets = new Map();
  let failedAssets = Array.isArray(existingFailures) ? [...existingFailures] : [];

  if (SHOULD_LOCALIZE_IMAGES) {
    const assetUrls = new Set();

    collectAssetUrlsFromString(global.headerHtml, assetUrls);
    collectAssetUrlsFromString(global.footerHtml, assetUrls);
    global.inlineStyles.forEach((css) => collectAssetUrlsFromString(css, assetUrls));
    SEEDED_ASSET_URLS.forEach((url) => assetUrls.add(url));

    for (const route of routes) {
      collectAssetUrlsFromString(route.content, assetUrls);
      collectAssetUrlsFromString(route.excerpt, assetUrls);
      collectAssetUrlsFromObject(route.seo, assetUrls);
    }

    const assetMap = new Map(
      [...assetUrls].sort((left, right) => left.localeCompare(right)).map((url) => [url, localAssetPath(url)])
    );

    const failedAssetSet = new Set(failedAssets);

    for (const [remoteUrl, localPath] of assetMap.entries()) {
      if (failedAssetSet.has(remoteUrl)) {
        continue;
      }

      const ok = await ensureAssetDownloaded(remoteUrl, localPath);
      if (ok) {
        successfulAssets.set(remoteUrl, localPath);
      } else {
        failedAssets.push(remoteUrl);
        failedAssetSet.add(remoteUrl);
      }
    }

    localizedGlobal = {
      ...global,
      headerHtml: rewriteAssetUrlsInString(global.headerHtml, successfulAssets),
      footerHtml: rewriteAssetUrlsInString(global.footerHtml, successfulAssets),
      inlineStyles: global.inlineStyles.map((css) => rewriteAssetUrlsInString(css, successfulAssets))
    };

    localizedRoutes = routes.map((route) => ({
      ...route,
      excerpt: rewriteAssetUrlsInString(route.excerpt, successfulAssets),
      content: rewriteAssetUrlsInString(route.content, successfulAssets),
      seo: rewriteAssetUrlsInObject(route.seo, successfulAssets)
    }));
  }

  await Promise.all([
    writeFile(new URL("./global.json", OUTPUT_DIR), JSON.stringify(localizedGlobal, null, 2)),
    writeFile(new URL("./routes.json", OUTPUT_DIR), JSON.stringify(localizedRoutes, null, 2)),
    writeFile(new URL("./asset-failures.json", OUTPUT_DIR), JSON.stringify(failedAssets, null, 2))
  ]);

  console.log(`Fetched ${mappedPages.length} pages and ${mappedPosts.length} posts.`);
  if (SHOULD_LOCALIZE_IMAGES) {
    console.log(`Localized ${successfulAssets.size} image assets.`);
  } else {
    console.log("Skipped image localization.");
  }
  if (SHOULD_LOCALIZE_IMAGES && failedAssets.length > 0) {
    console.log(`Skipped ${failedAssets.length} blocked image assets.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
