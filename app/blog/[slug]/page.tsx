import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { blogPosts, getBlogPost } from "@/content/blog-posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};
  return { title: `${post.title} | Sania Asif`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <main>
      <SiteHeader current="blog" />
      <article className="article-shell">
        <header className="article-header">
          <a className="article-back" href="/blog">&#8592; All articles</a>
          <p className="eyebrow">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="article-excerpt">{post.excerpt}</p>
          <div className="article-meta"><span>By Sania Asif</span><span>{post.readTime}</span></div>
        </header>

        <div className="article-body">
          <aside>
            <span>In this article</span>
            {post.sections.map((section) => <a href={`#${section.heading.toLowerCase().replaceAll(" ", "-")}`} key={section.heading}>{section.heading}</a>)}
          </aside>
          <div className="article-content">
            {post.sections.map((section) => (
              <section id={section.heading.toLowerCase().replaceAll(" ", "-")} key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
            <div className="article-note">
              <strong>Editorial placeholder</strong>
              <p>Add a closing note, references, or a gentle invitation to contact Sania here.</p>
            </div>
          </div>
        </div>
      </article>

      <section className="related-posts">
        <p className="eyebrow">Continue reading</p>
        <div className="related-grid">
          {relatedPosts.map((item) => (
            <a href={`/blog/${item.slug}`} key={item.slug}>
              <span>{item.category}</span><strong>{item.title}</strong><i aria-hidden="true">&#8599;</i>
            </a>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
