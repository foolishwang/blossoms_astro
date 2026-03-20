import routes from "../data/routes.json";
import { listBlogPosts } from "../lib/posts";
import { SITE_ORIGIN, toAbsoluteSiteUrl } from "../lib/url-utils";

function plainText(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function GET() {
  const staticRoutes = routes.filter(
    (route) =>
      !route.route.startsWith("/blog/") &&
      route.route !== "/404/" &&
      route.route !== "/login/",
  );
  const coreRoutes = [
    staticRoutes.find((route) => route.route === "/"),
    staticRoutes.find((route) => route.route === "/about-us/"),
    staticRoutes.find((route) => route.route === "/dating-safety/"),
    staticRoutes.find((route) => route.route === "/frequently-asked-questions/"),
    { route: "/blog/", title: "Cherry Blossoms Journal", excerptText: "Asian dating advice, online dating safety guidance, and long-term relationship stories." },
  ].filter(Boolean);
  const locationRoutes = staticRoutes
    .filter((route) => /-online-dating-website\/$/.test(route.route))
    .slice(0, 24);
  const latestPosts = await listBlogPosts(12);

  const body = [
    `# Cherry Blossoms Dating`,
    ``,
    `> International Asian dating platform focused on meaningful relationships, trust, online dating safety, and Filipina dating since 1974.`,
    ``,
    `Site: ${SITE_ORIGIN}`,
    ``,
    `## Core pages`,
    ...coreRoutes.map(
      (route) =>
        `- ${route.title}: ${toAbsoluteSiteUrl(route.route)}${route.excerptText ? ` - ${plainText(route.excerptText)}` : ""}`,
    ),
    ``,
    `## Popular location pages`,
    ...locationRoutes.map(
      (route) =>
        `- ${route.title}: ${toAbsoluteSiteUrl(route.route)} - ${plainText(route.excerptText || "")}`,
    ),
    ``,
    `## Latest blog posts`,
    ...latestPosts.map(
      (post) =>
        `- ${post.title}: ${toAbsoluteSiteUrl(post.route)} - ${plainText(post.excerpt || post.description)}`,
    ),
    ``,
    `## Topics the site covers`,
    `- Asian dating`,
    `- Filipina dating`,
    `- International relationships`,
    `- Online dating safety`,
    `- Dating FAQs`,
    `- Long-term matchmaking`,
    ``,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
