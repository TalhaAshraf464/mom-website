type SiteHeaderProps = {
  current?: "home" | "testimonials" | "blog";
};

const navigation = [
  { label: "Home", href: "/", key: "home" },
  { label: "Videos", href: "/#videos", key: "videos" },
  { label: "Testimonials", href: "/testimonials", key: "testimonials" },
  { label: "Blog", href: "/blog", key: "blog" },
  { label: "About", href: "/#about", key: "about" },
  { label: "Contact", href: "/#contact", key: "contact" },
] as const;

export function SiteHeader({ current }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Sania Asif home">
        <span className="brand-mark" aria-hidden="true">SA</span>
        <span className="brand-copy">
          <strong>Sania Asif</strong>
          <small>Clinical Psychologist</small>
        </span>
      </a>

      <nav className="primary-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <a
            className={current === item.key ? "is-current" : undefined}
            href={item.href}
            key={item.key}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-action" href="/#contact">Get in touch</a>
    </header>
  );
}
