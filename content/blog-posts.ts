import type { BlogPost } from "@/lib/blog";

// Published articles. The blog stays hidden from the site until this list has
// at least one post. Add a post by copying the example below into the array.
//
// {
//   slug: "first-article",            // used in the address: /blog/first-article
//   title: "Article title",
//   category: "Anxiety",
//   excerpt: "One or two sentences shown on the blog cards.",
//   publishedAt: "2026-11-15",
//   content: `A paragraph of text.
//
// ## A heading
//
// Another paragraph with **bold** or *italic* words.`,
// },
export const blogPosts: BlogPost[] = [];
