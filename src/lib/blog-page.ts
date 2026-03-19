import { normalizeInternalHrefHtml } from "./url-utils";
import type { BlogPostRecord } from "./posts";

const BLOSSOMS_ORIGIN = "https://www.blossoms.com";

export function absolutizeBlossomsAssets(content = "") {
  return content
    .replaceAll(
      'src="/wp-content/uploads/',
      `src="${BLOSSOMS_ORIGIN}/wp-content/uploads/`,
    )
    .replaceAll(
      "src='/wp-content/uploads/",
      `src='${BLOSSOMS_ORIGIN}/wp-content/uploads/`,
    )
    .replaceAll(
      'href="/wp-content/uploads/',
      `href="${BLOSSOMS_ORIGIN}/wp-content/uploads/`,
    )
    .replaceAll(
      "href='/wp-content/uploads/",
      `href='${BLOSSOMS_ORIGIN}/wp-content/uploads/`,
    )
    .replaceAll(
      'poster="/wp-content/uploads/',
      `poster="${BLOSSOMS_ORIGIN}/wp-content/uploads/`,
    )
    .replaceAll(
      "poster='/wp-content/uploads/",
      `poster='${BLOSSOMS_ORIGIN}/wp-content/uploads/`,
    )
    .replaceAll(
      "url('/wp-content/uploads/",
      `url('${BLOSSOMS_ORIGIN}/wp-content/uploads/`,
    )
    .replaceAll(
      'url("/wp-content/uploads/',
      `url("${BLOSSOMS_ORIGIN}/wp-content/uploads/`,
    )
    .replaceAll(
      "url(/wp-content/uploads/",
      `url(${BLOSSOMS_ORIGIN}/wp-content/uploads/`,
    )
    .replace(/(?<!:)\/\/www\.blossoms\.com\//g, "https://www.blossoms.com/");
}

export function decodeHtml(value = "") {
  return value
    .replaceAll("&#038;", "&")
    .replaceAll("&#8211;", "–")
    .replaceAll("&#8217;", "'")
    .replaceAll("&#8220;", '"')
    .replaceAll("&#8221;", '"')
    .replaceAll("&#8230;", "...")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'");
}

export function stripTags(value = "") {
  return decodeHtml(
    value
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

export function slugify(value = "") {
  return value
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractFirstImage(content = "") {
  const pictureMatch = absolutizeBlossomsAssets(content).match(
    /<img[^>]+src="([^"]+)"/i,
  );
  return pictureMatch?.[1] || "";
}

export function removeLeadFigure(content = "", featuredImage = "") {
  if (!featuredImage) return content;
  return content.replace(
    new RegExp(
      `<figure[^>]*>[\\s\\S]*?<img[^>]+src=["']${featuredImage.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][\\s\\S]*?<\\/figure>\\s*`,
      "i",
    ),
    "",
  );
}

export function addHeadingAnchors(content = "") {
  return content.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level, attrs, inner) => {
      if (/id=/.test(attrs)) return match;
      const text = stripTags(inner);
      const id = slugify(text);
      if (!id) return match;
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    },
  );
}

export function upgradeNumberedLeadParagraphs(content = "") {
  return content.replace(
    /<p>\s*<strong>\s*((?:\d+|[A-Z])[\.\):]\s*[\s\S]*?)<\/strong>\s*<\/p>/gi,
    (match, inner) => {
      const text = stripTags(inner).trim();
      if (!text || text.length > 140) return match;
      return `<h2>${inner.trim()}</h2>`;
    },
  );
}

export function extractHeadings(content = "") {
  return [
    ...content.matchAll(/<h([23])[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi),
  ].map((match) => ({
    level: Number(match[1]),
    id: match[2],
    text: stripTags(match[3]),
  }));
}

export function estimateReadingMinutes(content = "") {
  const words = stripTags(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function buildPostContent(contentHtml = "", featuredImage = "") {
  return addHeadingAnchors(
    absolutizeBlossomsAssets(
      normalizeInternalHrefHtml(
        upgradeNumberedLeadParagraphs(
          removeLeadFigure(contentHtml, featuredImage),
        ),
      ),
    ),
  );
}

export function mapBlogListPost(post: BlogPostRecord) {
  return {
    title: post.title,
    href: post.route,
    date: post.publishedAt || post.updatedAt,
    excerpt: stripTags(post.excerpt || post.description).slice(0, 190),
    image: post.featuredImageUrl || extractFirstImage(post.contentHtml),
  };
}

export function mapRelatedPost(post: BlogPostRecord) {
  return {
    title: post.title,
    href: post.route,
    date: post.publishedAt || post.updatedAt,
    excerpt: stripTags(post.excerpt || post.description).slice(0, 150),
    image: post.featuredImageUrl || extractFirstImage(post.contentHtml),
  };
}

