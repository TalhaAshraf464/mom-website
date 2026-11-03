import { env } from "cloudflare:workers";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  status: "draft" | "published";
  publishedAt: string | null;
  updatedAt: string;
};

// No seed content: only articles explicitly published by the administrator appear.
export async function database() {
  const db = env.DB;
  if (!db)
    throw new Error("The blog requires a Cloudflare D1 database bound as DB.");
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL,
      category TEXT NOT NULL, excerpt TEXT NOT NULL, content TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('draft','published')),
      publishedAt TEXT, updatedAt TEXT NOT NULL
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS blog_admin (
      id INTEGER PRIMARY KEY CHECK(id = 1), email TEXT NOT NULL,
      passwordHash TEXT NOT NULL, salt TEXT NOT NULL
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS blog_sessions (
      tokenHash TEXT PRIMARY KEY, expiresAt INTEGER NOT NULL
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS blog_login_attempts (
      key TEXT PRIMARY KEY, attempts INTEGER NOT NULL, resetAt INTEGER NOT NULL
    )`),
  ]);
  return db;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const db = await database();
  const result = await db
    .prepare(
      "SELECT * FROM blog_posts WHERE status = 'published' ORDER BY publishedAt DESC",
    )
    .all<BlogPost>();
  return result.results;
}

export async function getPublishedPost(slug: string) {
  const db = await database();
  return db
    .prepare("SELECT * FROM blog_posts WHERE slug = ? AND status = 'published'")
    .bind(slug)
    .first<BlogPost>();
}

export function readingTime(content: string) {
  return `${Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))} min read`;
}
