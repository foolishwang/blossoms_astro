import type { APIRoute } from "astro";
import { mkdir, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { randomUUID } from "node:crypto";
import { requireAdmin } from "../../../lib/auth";

function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-");
}

export const POST: APIRoute = async ({ request }) => {
  const session = await requireAdmin(request.headers);
  if (!session)
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });

  const formData = await request.formData();
  const file = formData.get("image");

  if (!(file instanceof File)) {
    return new Response(JSON.stringify({ error: "Missing file" }), {
      status: 400,
    });
  }

  const uploadDir = join(process.cwd(), "public", "uploads", "admin");
  await mkdir(uploadDir, { recursive: true });

  const extension = extname(file.name) || ".png";
  const fileName = `${Date.now()}-${randomUUID()}-${sanitizeFileName(file.name.replace(extension, ""))}${extension}`;
  const targetPath = join(uploadDir, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(targetPath, buffer);

  return new Response(
    JSON.stringify({
      ok: true,
      url: `/uploads/admin/${fileName}`,
    }),
    {
      headers: {
        "content-type": "application/json",
      },
    },
  );
};
