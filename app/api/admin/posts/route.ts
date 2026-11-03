import { authenticated, json, readBody, sameOrigin } from "@/lib/admin";
import { database, type BlogPost } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await authenticated(request)))
    return json({ error: "Please sign in." }, 401);
  const db = await database();
  return json({
    posts: (
      await db
        .prepare("SELECT * FROM blog_posts ORDER BY updatedAt DESC")
        .all<BlogPost>()
    ).results,
  });
}

export async function POST(request: Request) {
  if (!sameOrigin(request) || !(await authenticated(request)))
    return json({ error: "Please sign in again." }, 401);
  try {
    const data = await readBody(request);
    const db = await database();
    const id = typeof data.id === "string" ? data.id : crypto.randomUUID();
    const existing = await db
      .prepare("SELECT * FROM blog_posts WHERE id = ?")
      .bind(id)
      .first<BlogPost>();
    const title = String(data.title ?? "").trim();
    const content = String(data.content ?? "").trim();
    const excerpt = String(data.excerpt ?? "").trim();
    const category = String(data.category ?? "Wellbeing").trim() || "Wellbeing";
    const slug = String(data.slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const status = data.status === "published" ? "published" : "draft";
    if (
      !title ||
      title.length > 160 ||
      !slug ||
      slug.length > 180 ||
      category.length > 80 ||
      excerpt.length > 500 ||
      content.length > 100000
    )
      return json(
        {
          error:
            "Add a title and a valid URL. Keep the title under 160 characters and the summary under 500.",
        },
        400,
      );
    if (status === "published" && (!content || !excerpt))
      return json(
        { error: "Add an article and a short summary before publishing." },
        400,
      );
    const duplicate = await db
      .prepare("SELECT id FROM blog_posts WHERE slug = ? AND id != ?")
      .bind(slug, id)
      .first();
    if (duplicate)
      return json(
        { error: "This article URL is already in use. Please choose another." },
        409,
      );
    const now = new Date().toISOString();
    const publishedAt =
      existing?.publishedAt ?? (status === "published" ? now : null);
    await db
      .prepare(
        "INSERT INTO blog_posts (id, slug, title, category, excerpt, content, status, publishedAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET slug = excluded.slug, title = excluded.title, category = excluded.category, excerpt = excluded.excerpt, content = excluded.content, status = excluded.status, publishedAt = excluded.publishedAt, updatedAt = excluded.updatedAt",
      )
      .bind(
        id,
        slug,
        title,
        category,
        excerpt,
        content,
        status,
        publishedAt,
        now,
      )
      .run();
    return json({
      post: await db
        .prepare("SELECT * FROM blog_posts WHERE id = ?")
        .bind(id)
        .first<BlogPost>(),
    });
  } catch {
    return json(
      { error: "Your article could not be saved. Please try again." },
      400,
    );
  }
}

export async function DELETE(request: Request) {
  if (!sameOrigin(request) || !(await authenticated(request)))
    return json({ error: "Please sign in again." }, 401);
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return json({ error: "Choose an article." }, 400);
  const db = await database();
  await db.prepare("DELETE FROM blog_posts WHERE id = ?").bind(id).run();
  return json({ ok: true });
}
