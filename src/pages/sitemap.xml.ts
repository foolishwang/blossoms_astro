import routes from "../data/routes.json";
import { listBlogPosts } from "../lib/posts";
import { toAbsoluteSiteUrl } from "../lib/url-utils";

const XML_ESCAPE_MAP = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&apos;"
};

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, (character) => XML_ESCAPE_MAP[character]);
}

export async function GET() {
  const staticPages = routes.filter(
    (route) => route.kind !== "post" && route.route !== "/404/",
  );
  const blogPosts = await listBlogPosts();

  const entries = [
    ...staticPages.map((route) => ({
      url: route.canonical || route.link || route.route,
      lastmod: route.modified || route.date,
    })),
    ...blogPosts.map((post) => ({
      url: post.route,
      lastmod: post.updatedAt || post.publishedAt,
    })),
  ];

  const urlset = entries
    .map((entry) => {
      return [
        "  <url>",
        `    <loc>${escapeXml(toAbsoluteSiteUrl(entry.url))}</loc>`,
        entry.lastmod
          ? `    <lastmod>${escapeXml(new Date(entry.lastmod).toISOString())}</lastmod>`
          : null,
        "  </url>"
      ].filter(Boolean).join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlset,
    "</urlset>"
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
