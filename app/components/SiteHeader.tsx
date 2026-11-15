import { getPublishedPosts } from "@/lib/blog";
import Link from "next/link";

type SiteHeaderProps = {
  current?: "home" | "testimonials" | "blog";
};

const navigation = [
  { label: "Home", href: "/", key: "home" },
  { label: "Videos", href: "/#videos", key: "videos" },
  { label: "Testimonials", href: "/#testimonials", key: "testimonials" },
  { label: "Blog", href: "/blog", key: "blog" },
  { label: "About", href: "/#about", key: "about" },
  { label: "Contact", href: "/#contact", key: "contact" },
] as const;

export function SiteHeader({ current }: SiteHeaderProps) {
  const hasBlog = getPublishedPosts().length > 0;
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Sania Asif home">
        <span className="brand-mark" aria-hidden="true">SA</span>
        <span className="brand-copy">
          <strong>Sania Asif</strong>
          <small>Clinical Psychologist</small>
        </span>
      </Link>

      <nav className="primary-nav" aria-label="Primary navigation">
        {navigation.filter(item => item.key !== "blog" || hasBlog).map((item) => (
          <Link
            className={current === item.key ? "is-current" : undefined}
            aria-current={current === item.key ? "page" : undefined}
            href={item.href}
            key={item.key}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link className="header-action" href="/#contact">Get in touch</Link>
    </header>
  );
}
