import type { APIRoute } from "astro";
import { getDb } from "../../../../lib/db";
import { requireAdmin } from "../../../../lib/auth";
import { updateBlogPost } from "../../../../lib/posts";

function slugify(value = "") {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function asString(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const session = await requireAdmin(request.headers);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const id = Number(params.id);
  if (!Number.isFinite(id)) return new Response("Invalid id", { status: 400 });

  const formData = await request.formData();
  const intent = asString(formData, "_intent");

  if (intent === "delete") {
    await getDb().execute({
      sql: "DELETE FROM blog_posts WHERE id = ?",
      args: [id]
    });
    return redirect("/admin/posts/", 303);
  }

  const title = asString(formData, "title");
  const manualSlug = asString(formData, "slug");
  const slug = manualSlug || slugify(title);
  const route = `/blog/${slug}/`;

  await updateBlogPost(id, {
    route,
    slug,
    title,
    excerpt: asString(formData, "excerpt"),
    description: asString(formData, "description"),
    contentHtml: asString(formData, "contentHtml"),
    featuredImageUrl: asString(formData, "featuredImageUrl") || null,
    publishedAt: asString(formData, "publishedAt") || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    kind: "post",
    seoTitle: asString(formData, "seoTitle") || title,
    seoDescription: asString(formData, "seoDescription"),
    ogTitle: asString(formData, "ogTitle"),
    ogDescription: asString(formData, "ogDescription"),
    twitterTitle: asString(formData, "twitterTitle"),
    twitterDescription: asString(formData, "twitterDescription")
  });

  return redirect(`/admin/posts/${id}/`, 303);
};
