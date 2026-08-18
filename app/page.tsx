import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { blogPosts } from "@/content/blog-posts";

const videos = [
  { number: "01", title: "Understanding the recovery journey", length: "Featured video" },
  { number: "02", title: "When anxiety starts to take over", length: "Video placeholder" },
  { number: "03", title: "How families can offer support", length: "Video placeholder" },
];

export default function Home() {
  return (
    <main>
      <SiteHeader current="home" />

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
              src="/sania-asif-portrait.jpeg"
              alt="Sania Asif, Clinical Psychologist"
            />
            <figcaption>
              <span>Clinical practice</span>
              <strong>Since 2008</strong>
            </figcaption>
          </figure>
        </div>

        <a className="scroll-cue" href="#videos">
          <span>Scroll to watch</span>
          <span className="scroll-cue-line" aria-hidden="true" />
        </a>
      </section>

      <section className="video-section video-section-featured" id="videos">
        <div className="section-heading video-heading">
          <div>
            <p className="eyebrow">Watch &amp; learn</p>
            <h2>Start with a conversation.</h2>
          </div>
          <p>
            YouTube videos can be added here to introduce Sania&apos;s work and
            answer common questions in a clear, approachable way.
          </p>
        </div>

        <div className="video-grid video-grid-featured">
          {videos.map((video, index) => (
            <article className={`video-card${index === 0 ? " is-featured" : ""}`} key={video.number}>
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

      <section className="testimonial-gateway" id="testimonials">
        <div className="testimonial-gateway-copy">
          <p className="eyebrow">Shared in confidence</p>
          <h2>Stories from people who found a way forward.</h2>
          <p>
            Placeholder introduction for anonymous written and video testimonials
            from past patients and their families.
          </p>
        </div>
        <div className="testimonial-links">
          <a href="/testimonials#stories">
            <span>01</span>
            <strong>Read anonymous stories</strong>
            <i aria-hidden="true">&#8599;</i>
          </a>
          <a href="/testimonials#video-stories">
            <span>02</span>
            <strong>Watch video testimonials</strong>
            <i aria-hidden="true">&#8599;</i>
          </a>
        </div>
      </section>

      <section className="blog-preview" id="blog">
        <div className="section-heading">
          <div>
            <p className="eyebrow">From the blog</p>
            <h2>Clear guidance for difficult moments.</h2>
          </div>
          <div className="section-side-copy">
            <p>Explore placeholder articles about common concerns, recovery, and emotional wellbeing.</p>
            <a className="text-link" href="/blog">View all articles <span aria-hidden="true">&#8599;</span></a>
          </div>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article className="blog-card" key={post.slug}>
              <a href={`/blog/${post.slug}`}>
                <span className="blog-number">{post.number}</span>
                <div>
                  <p className="blog-category">{post.category}</p>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
                <span className="blog-read">Read article <i aria-hidden="true">&#8599;</i></span>
              </a>
            </article>
          ))}
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

      <section className="approach-band">
        <p className="eyebrow">Her approach</p>
        <blockquote>
          &ldquo;Place a short, reassuring statement here about recovery, hope,
          and creating meaningful change without judgment.&rdquo;
        </blockquote>
        <p className="quote-credit">Sania Asif, Clinical Psychologist</p>
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

      <SiteFooter />
    </main>
  );
}
