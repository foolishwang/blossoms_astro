import type { APIRoute } from "astro";
import { createBlogPost } from "../../../lib/posts";
import { requireAdmin } from "../../../lib/auth";

function slugify(value = "") {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function asString(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const session = await requireAdmin(request.headers);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const formData = await request.formData();
  const title = asString(formData, "title");
  const manualSlug = asString(formData, "slug");
  const slug = manualSlug || slugify(title);
  const route = `/blog/${slug}/`;
  const publishedAt =
    asString(formData, "publishedAt") || new Date().toISOString();

  const post = await createBlogPost({
    route,
    slug,
    title,
    excerpt: asString(formData, "excerpt"),
    description: asString(formData, "description"),
    contentHtml: asString(formData, "contentHtml"),
    featuredImageUrl: asString(formData, "featuredImageUrl") || null,
    publishedAt,
    updatedAt: new Date().toISOString(),
    kind: "post",
    seoTitle: asString(formData, "seoTitle") || title,
    seoDescription: asString(formData, "seoDescription"),
    ogTitle: asString(formData, "ogTitle"),
    ogDescription: asString(formData, "ogDescription"),
    twitterTitle: asString(formData, "twitterTitle"),
    twitterDescription: asString(formData, "twitterDescription"),
  });

  return redirect(`/admin/posts/${post?.id}/`, 303);
};
