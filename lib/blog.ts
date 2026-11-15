import { blogPosts } from "@/content/blog-posts";

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  publishedAt: string;
};

export function getPublishedPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPublishedPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}

export function readingTime(content: string) {
  return `${Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))} min read`;
}
