import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { ArticleContent } from "../../components/ArticleContent";
import { getPublishedPost, getPublishedPosts, readingTime } from "@/lib/blog";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  return post ? { title: `${post.title} | Sania Asif`, description: post.excerpt } : {};
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();
  const related = (await getPublishedPosts()).filter(item => item.id !== post.id).slice(0, 2);
  return <main>
    <SiteHeader current="blog" />
    <article className="article-shell">
      <header className="article-header">
        <Link className="article-back" href="/blog">← All articles</Link>
        <p className="eyebrow">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="article-excerpt">{post.excerpt}</p>
        <div className="article-meta"><span>By Sania Asif</span><span>{readingTime(post.content)}</span><time dateTime={post.publishedAt!}>{new Date(post.publishedAt!).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time></div>
      </header>
      <div className="published-content"><ArticleContent content={post.content} /><div className="article-note"><strong>A conversation can be a starting point.</strong><p>If you would like individual support, <Link className="text-link" href="/#contact">get in touch with Sania ↗</Link></p></div></div>
    </article>
    {related.length > 0 && <section className="related-posts"><p className="eyebrow">Continue reading</p><div className="related-grid">{related.map(item => <a href={`/blog/${item.slug}`} key={item.id}><span>{item.category}</span><strong>{item.title}</strong><i aria-hidden="true">↗</i></a>)}</div></section>}
    <SiteFooter />
  </main>;
}
