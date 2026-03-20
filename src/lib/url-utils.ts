import localAssetMap from "../data/local-asset-map.json";

const SITE_ORIGIN = "https://www.blossoms.com";
const SITE_PROTOCOL_RELATIVE_ORIGIN = "//www.blossoms.com";
const LOCAL_BLOSSOMS_ASSET_PREFIX = "/assets/wp";
const BLOSSOMS_ASSET_MAP = localAssetMap as Record<string, string>;

function normalizeBlossomsAssetReference(value = "") {
  return value.replace(
    `${SITE_ORIGIN}/blog/wp-content/`,
    `${SITE_ORIGIN}/wp-content/`,
  );
}

function toMappedBlossomsAssetUrl(normalized = "", fallback = "") {
  if (
    normalized.startsWith("/wp-content/") ||
    normalized.startsWith("/wp-includes/")
  ) {
    return BLOSSOMS_ASSET_MAP[`${SITE_ORIGIN}${normalized}`] || fallback;
  }

  try {
    const parsed = new URL(normalized);
    if (
      parsed.origin === SITE_ORIGIN &&
      (parsed.pathname.startsWith("/wp-content/") ||
        parsed.pathname.startsWith("/wp-includes/"))
    ) {
      const key = `${SITE_ORIGIN}${parsed.pathname}${parsed.search}`;
      return (
        BLOSSOMS_ASSET_MAP[key] ||
        BLOSSOMS_ASSET_MAP[`${SITE_ORIGIN}${parsed.pathname}`] ||
        fallback
      );
    }
  } catch {}

  return fallback;
}

export function toAbsoluteSiteUrl(value = "") {
  if (!value) return value;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.startsWith("/")) {
    return `${SITE_ORIGIN}${value}`;
  }

  return `${SITE_ORIGIN}/${value.replace(/^\/+/, "")}`;
}

export function toRelativeSiteUrl(value = "") {
  if (!value) return value;

  if (value.startsWith(SITE_ORIGIN)) {
    const next = value.slice(SITE_ORIGIN.length);
    return next || "/";
  }

  return value;
}

export function toProtocolRelativeSiteUrl(value = "") {
  if (!value) return value;

  if (value.startsWith(SITE_ORIGIN)) {
    return `${SITE_PROTOCOL_RELATIVE_ORIGIN}${value.slice(SITE_ORIGIN.length)}`;
  }

  return value;
}

export function toLocalBlossomsAssetUrl(value = "") {
  if (!value) return value;

  if (value.startsWith(LOCAL_BLOSSOMS_ASSET_PREFIX)) {
    return value;
  }

  const normalized = normalizeBlossomsAssetReference(
    value.startsWith(SITE_PROTOCOL_RELATIVE_ORIGIN) ? `https:${value}` : value,
  );
  return toMappedBlossomsAssetUrl(normalized, value);
}

export function localizeBlossomsAssetHtml(html = "") {
  if (!html) return html;

  return html
    .replace(
      /(?<!\/assets\/wp)(?:(https?:)?\/\/www\.blossoms\.com)?((?:\/wp-content\/|\/wp-includes\/)[^"'()\s,>]+)/g,
      (match, protocol, path) => {
        const key = `${SITE_ORIGIN}${path}`;
        return BLOSSOMS_ASSET_MAP[key] || match;
      },
    )
    .replaceAll(
      `${SITE_ORIGIN}/blog/wp-content/`,
      `${SITE_ORIGIN}/wp-content/`,
    );
}

export function normalizeInternalHrefHtml(html = "") {
  if (!html) return html;

  return html
    .replaceAll(SITE_ORIGIN, SITE_PROTOCOL_RELATIVE_ORIGIN)
    .replaceAll(`href="${SITE_PROTOCOL_RELATIVE_ORIGIN}`, 'href="')
    .replaceAll(`href='${SITE_PROTOCOL_RELATIVE_ORIGIN}`, "href='")
    .replaceAll(`action="${SITE_PROTOCOL_RELATIVE_ORIGIN}`, 'action="')
    .replaceAll(`action='${SITE_PROTOCOL_RELATIVE_ORIGIN}`, "action='");
}
