const SITE_ORIGIN = "https://www.blossoms.com";
const SITE_PROTOCOL_RELATIVE_ORIGIN = "//www.blossoms.com";

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

export function normalizeInternalHrefHtml(html = "") {
  if (!html) return html;

  return html
    .replaceAll(SITE_ORIGIN, SITE_PROTOCOL_RELATIVE_ORIGIN)
    .replaceAll(`href="${SITE_PROTOCOL_RELATIVE_ORIGIN}`, 'href="')
    .replaceAll(`href='${SITE_PROTOCOL_RELATIVE_ORIGIN}`, "href='")
    .replaceAll(`action="${SITE_PROTOCOL_RELATIVE_ORIGIN}`, 'action="')
    .replaceAll(`action='${SITE_PROTOCOL_RELATIVE_ORIGIN}`, "action='");
}
