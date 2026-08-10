const areasOfCare = [
  {
    number: "01",
    title: "Addiction & recovery",
    description:
      "Placeholder copy for addiction rehabilitation, relapse prevention, and long-term recovery support.",
  },
  {
    number: "02",
    title: "Anxiety & depression",
    description:
      "Placeholder copy for compassionate, evidence-informed care for anxiety, depression, and emotional overwhelm.",
  },
  {
    number: "03",
    title: "OCD & related concerns",
    description:
      "Placeholder copy for assessment, treatment planning, and practical support for OCD and related concerns.",
  },
  {
    number: "04",
    title: "Family support",
    description:
      "Placeholder copy for families navigating addiction, recovery, difficult transitions, and relationship strain.",
  },
];

const videos = [
  { number: "01", title: "Understanding the recovery journey", length: "Video placeholder" },
  { number: "02", title: "When anxiety starts to take over", length: "Video placeholder" },
  { number: "03", title: "How families can offer support", length: "Video placeholder" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Sania Asif home">
          <span className="brand-mark" aria-hidden="true">SA</span>
          <span className="brand-copy">
            <strong>Sania Asif</strong>
            <small>Clinical Psychologist</small>
          </span>
        </a>

        <nav className="primary-nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#care">Areas of care</a>
          <a href="#videos">Videos</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="header-action" href="#contact">Get in touch</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">18 years of clinical experience</p>
          <h1>Sania Asif</h1>
          <p className="hero-role">Clinical Psychologist</p>
          <p className="hero-intro">
            Placeholder introduction about compassionate, confidential support for
            addiction recovery, anxiety, depression, OCD, and related concerns.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">
              Contact for help or information
            </a>
            <a className="text-link" href="#about">Explore her approach <span aria-hidden="true">&#8595;</span></a>
          </div>
          <div className="session-note">
            <span aria-hidden="true" className="status-dot" />
            In-person in Karachi <span aria-hidden="true">&middot;</span> Online worldwide
          </div>
        </div>

        <div className="hero-portrait">
          <div className="portrait-accent" aria-hidden="true" />
          <figure>
            <img
              src="/sania-asif-portrait-placeholder.png"
              alt="Placeholder portrait for Sania Asif"
            />
            <figcaption>
              <span>Clinical practice</span>
              <strong>Since 2008</strong>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="practice-strip" aria-label="Practice overview">
        <div><strong>18+</strong><span>Years of experience</span></div>
        <div><strong>Karachi</strong><span>In-person sessions</span></div>
        <div><strong>Worldwide</strong><span>Confidential online care</span></div>
        <div><strong>English</strong><span>Session language</span></div>
      </section>

      <section className="intro-section" id="about">
        <div className="section-kicker">A warm, thoughtful approach</div>
        <div className="intro-heading">
          <h2>A steadier path forward, built around you.</h2>
        </div>
        <div className="intro-copy">
          <p>
            Placeholder text introducing Sania&apos;s therapeutic philosophy,
            clinical background, and the kind of relationship she aims to build
            with every client.
          </p>
          <p>
            Add a second short paragraph here about privacy, dignity, practical
            support, and working at a pace that feels manageable.
          </p>
        </div>
      </section>

      <section className="care-section" id="care">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Areas of care</p>
            <h2>Support for the whole person.</h2>
          </div>
          <p>
            Replace this short introduction with a concise overview of the main
            concerns and recovery needs supported in practice.
          </p>
        </div>

        <div className="care-grid">
          {areasOfCare.map((area) => (
            <article className="care-item" key={area.number}>
              <span className="care-number">{area.number}</span>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <a href="#contact" aria-label={`Ask about ${area.title}`}>
                Ask about this <span aria-hidden="true">&#8599;</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="approach-band">
        <p className="eyebrow">Her approach</p>
        <blockquote>
          &ldquo;Place a short, reassuring statement here about recovery, hope,
          and creating meaningful change without judgment.&rdquo;
        </blockquote>
        <p className="quote-credit">Sania Asif, Clinical Psychologist</p>
      </section>

      <section className="video-section" id="videos">
        <div className="section-heading video-heading">
          <div>
            <p className="eyebrow">Watch &amp; learn</p>
            <h2>Helpful conversations.</h2>
          </div>
          <p>
            YouTube videos can be added here to introduce Sania&apos;s work and
            answer common questions in a clear, approachable way.
          </p>
        </div>

        <div className="video-grid">
          {videos.map((video) => (
            <article className="video-card" key={video.number}>
              <div className="video-poster">
                <span className="video-index">{video.number}</span>
                <span className="play-button" aria-hidden="true" />
                <span className="video-duration">YouTube</span>
              </div>
              <div className="video-meta">
                <h3>{video.title}</h3>
                <span>{video.length}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">Take the first step</p>
          <h2>Reach out when you feel ready.</h2>
        </div>
        <div className="contact-copy">
          <p>
            Add final contact details here for appointments, general questions,
            or more information about in-person and online sessions.
          </p>
          <div className="contact-actions">
            <a className="button button-light" href="tel:+00000000000">Call</a>
            <a className="button button-outline" href="https://wa.me/00000000000">WhatsApp</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <strong>Sania Asif</strong>
          <span>Clinical Psychologist</span>
        </div>
        <p>Karachi, Pakistan <span aria-hidden="true">&middot;</span> Online worldwide</p>
        <p className="footer-note">Contact details and social links will be added here.</p>
      </footer>
    </main>
  );
}
