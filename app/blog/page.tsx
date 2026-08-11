import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { blogPosts } from "@/content/blog-posts";

export const metadata: Metadata = {
  title: "Blog | Sania Asif",
  description: "Accessible articles about addiction recovery, anxiety, depression, OCD, and emotional wellbeing.",
};

export default function BlogPage() {
  return (
    <main>
      <SiteHeader current="blog" />
      <section className="inner-hero inner-hero-sage">
        <p className="eyebrow">The blog</p>
        <h1>Understanding what you are going through.</h1>
        <p>Accessible placeholder articles designed to offer clarity, context, and a thoughtful next step.</p>
      </section>

      <section className="blog-index-section">
        <div className="blog-grid blog-index-grid">
          {blogPosts.map((post) => (
            <article className="blog-card" key={post.slug}>
              <a href={`/blog/${post.slug}`}>
                <span className="blog-number">{post.number}</span>
                <div>
                  <p className="blog-category">{post.category}</p>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                </div>
                <span className="blog-read">{post.readTime} <i aria-hidden="true">&#8599;</i></span>
              </a>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
