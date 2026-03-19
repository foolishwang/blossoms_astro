import { createClient } from "@libsql/client";
import routes from "../src/data/routes.json" with { type: "json" };

const databaseUrl =
  process.env.TURSO_DATABASE_URL || "libsql://blossomsastro-weixiyu.aws-us-west-2.turso.io";
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!authToken) {
  console.error("Missing TURSO_AUTH_TOKEN");
  process.exit(1);
}

const client = createClient({
  url: databaseUrl,
  authToken
});

const posts = routes
  .filter((route) => route.kind === "post")
  .map((post) => ({
    route: post.route,
    slug: post.route.replace(/^\/|\/$/g, ""),
    title: post.title || "",
    excerpt: post.excerptText || "",
    description: post.description || post.excerptText || "",
    contentHtml: post.content || "",
    featuredImageUrl: extractFirstImage(post.content || ""),
    publishedAt: post.date || null,
    updatedAt: post.modified || post.date || null,
    kind: post.kind || "post",
    seoTitle: post.seo?.title || post.title || "",
    seoDescription: post.seo?.description || post.description || post.excerptText || "",
    ogTitle: post.seo?.ogTitle || "",
    ogDescription: post.seo?.ogDescription || "",
    twitterTitle: post.seo?.twitterTitle || "",
    twitterDescription: post.seo?.twitterDescription || ""
  }));

function extractFirstImage(content = "") {
  const match = content.match(/<img[^>]+src="([^"]+)"/i);
  return match?.[1] || null;
}

async function main() {
  console.log(`Connecting to ${databaseUrl}`);
  console.log(`Preparing to sync ${posts.length} blog posts`);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      route TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT,
      description TEXT,
      content_html TEXT NOT NULL,
      featured_image_url TEXT,
      published_at TEXT,
      updated_at TEXT,
      kind TEXT NOT NULL DEFAULT 'post',
      seo_title TEXT,
      seo_description TEXT,
      og_title TEXT,
      og_description TEXT,
      twitter_title TEXT,
      twitter_description TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      synced_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await client.execute(
    "CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);"
  );
  await client.execute("CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);");

  for (const post of posts) {
    await client.execute({
      sql: `
        INSERT INTO blog_posts (
          route,
          slug,
          title,
          excerpt,
          description,
          content_html,
          featured_image_url,
          published_at,
          updated_at,
          kind,
          seo_title,
          seo_description,
          og_title,
          og_description,
          twitter_title,
          twitter_description,
          synced_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(route) DO UPDATE SET
          slug = excluded.slug,
          title = excluded.title,
          excerpt = excluded.excerpt,
          description = excluded.description,
          content_html = excluded.content_html,
          featured_image_url = excluded.featured_image_url,
          published_at = excluded.published_at,
          updated_at = excluded.updated_at,
          kind = excluded.kind,
          seo_title = excluded.seo_title,
          seo_description = excluded.seo_description,
          og_title = excluded.og_title,
          og_description = excluded.og_description,
          twitter_title = excluded.twitter_title,
          twitter_description = excluded.twitter_description,
          synced_at = CURRENT_TIMESTAMP
      `,
      args: [
        post.route,
        post.slug,
        post.title,
        post.excerpt,
        post.description,
        post.contentHtml,
        post.featuredImageUrl,
        post.publishedAt,
        post.updatedAt,
        post.kind,
        post.seoTitle,
        post.seoDescription,
        post.ogTitle,
        post.ogDescription,
        post.twitterTitle,
        post.twitterDescription
      ]
    });
  }

  const result = await client.execute("SELECT COUNT(*) AS count FROM blog_posts");
  console.log(`Sync complete. blog_posts rows: ${result.rows[0].count}`);

  await client.close();
}

main().catch(async (error) => {
  console.error(error);
  await client.close();
  process.exit(1);
});
