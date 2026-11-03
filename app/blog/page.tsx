import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { getPublishedPosts, readingTime } from "@/lib/blog";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Sania Asif",
  description: "Accessible articles about addiction recovery, anxiety, depression, OCD, and emotional wellbeing.",
};

export default async function BlogPage() {
  const blogPosts = await getPublishedPosts();
  if (!blogPosts.length) notFound();
  return (
    <main>
      <SiteHeader current="blog" />
      <section className="inner-hero inner-hero-sage">
        <p className="eyebrow">The blog</p>
        <h1>Understanding what you are going through.</h1>
        <p>Thoughtful articles to offer clarity, a little reassurance, and a way forward.</p>
      </section>

      <section className="blog-index-section">
        <div className="blog-grid blog-index-grid">
          {blogPosts.map((post, index) => (
            <article className="blog-card" key={post.slug}>
              <a href={`/blog/${post.slug}`}>
                <span className="blog-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="blog-category">{post.category}</p>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                </div>
                <span className="blog-read">{readingTime(post.content)} <i aria-hidden="true">&#8599;</i></span>
              </a>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
