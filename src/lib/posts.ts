import { getDb } from "./db";

export type BlogPostRecord = {
  id: number;
  route: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  contentHtml: string;
  featuredImageUrl: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
  kind: string;
  seoTitle: string;
  seoDescription: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
};

function mapPost(row: Record<string, unknown>): BlogPostRecord {
  return {
    id: Number(row.id),
    route: String(row.route),
    slug: String(row.slug),
    title: String(row.title ?? ""),
    excerpt: String(row.excerpt ?? ""),
    description: String(row.description ?? ""),
    contentHtml: String(row.content_html ?? ""),
    featuredImageUrl: row.featured_image_url ? String(row.featured_image_url) : null,
    publishedAt: row.published_at ? String(row.published_at) : null,
    updatedAt: row.updated_at ? String(row.updated_at) : null,
    kind: String(row.kind ?? "post"),
    seoTitle: String(row.seo_title ?? ""),
    seoDescription: String(row.seo_description ?? ""),
    ogTitle: String(row.og_title ?? ""),
    ogDescription: String(row.og_description ?? ""),
    twitterTitle: String(row.twitter_title ?? ""),
    twitterDescription: String(row.twitter_description ?? "")
  };
}

export async function listBlogPosts(limit?: number) {
  const db = getDb();
  const result = await db.execute({
    sql: `
      SELECT *
      FROM blog_posts
      ORDER BY datetime(COALESCE(published_at, updated_at, created_at)) DESC
      ${limit ? "LIMIT ?" : ""}
    `,
    args: limit ? [limit] : []
  });

  return result.rows.map((row) => mapPost(row as Record<string, unknown>));
}

export async function getBlogPostByRoute(route: string) {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM blog_posts WHERE route = ? LIMIT 1",
    args: [route]
  });

  const row = result.rows[0];
  return row ? mapPost(row as Record<string, unknown>) : null;
}

export async function getBlogPostById(id: number) {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM blog_posts WHERE id = ? LIMIT 1",
    args: [id]
  });

  const row = result.rows[0];
  return row ? mapPost(row as Record<string, unknown>) : null;
}

export async function createBlogPost(input: Omit<BlogPostRecord, "id">) {
  const db = getDb();
  const result = await db.execute({
    sql: `
      INSERT INTO blog_posts (
        route, slug, title, excerpt, description, content_html,
        featured_image_url, published_at, updated_at, kind,
        seo_title, seo_description, og_title, og_description,
        twitter_title, twitter_description, synced_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `,
    args: [
      input.route,
      input.slug,
      input.title,
      input.excerpt,
      input.description,
      input.contentHtml,
      input.featuredImageUrl,
      input.publishedAt,
      input.updatedAt,
      input.kind,
      input.seoTitle,
      input.seoDescription,
      input.ogTitle,
      input.ogDescription,
      input.twitterTitle,
      input.twitterDescription
    ]
  });

  return getBlogPostById(Number(result.lastInsertRowid));
}

export async function updateBlogPost(id: number, input: Omit<BlogPostRecord, "id">) {
  const db = getDb();
  await db.execute({
    sql: `
      UPDATE blog_posts
      SET route = ?,
          slug = ?,
          title = ?,
          excerpt = ?,
          description = ?,
          content_html = ?,
          featured_image_url = ?,
          published_at = ?,
          updated_at = ?,
          kind = ?,
          seo_title = ?,
          seo_description = ?,
          og_title = ?,
          og_description = ?,
          twitter_title = ?,
          twitter_description = ?,
          synced_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
    args: [
      input.route,
      input.slug,
      input.title,
      input.excerpt,
      input.description,
      input.contentHtml,
      input.featuredImageUrl,
      input.publishedAt,
      input.updatedAt,
      input.kind,
      input.seoTitle,
      input.seoDescription,
      input.ogTitle,
      input.ogDescription,
      input.twitterTitle,
      input.twitterDescription,
      id
    ]
  });

  return getBlogPostById(id);
}
