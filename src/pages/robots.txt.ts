import routes from "../data/routes.json";

export function GET() {
  const lines = [
    "User-agent: *",
    "Allow: /",
    "",
    "Disallow: /wp-admin/",
    "Disallow: /wp-login.php",
    "Disallow: /admin/",
    "Disallow: /api/admin/",
    "Sitemap: https://www.blossoms.com/sitemap.xml",
  ].filter(Boolean);

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
