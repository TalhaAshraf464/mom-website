import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { YouTubeShort } from "./components/YouTubeShort";
import { blogPosts } from "@/content/blog-posts";

const videos = [
  { id: "PAVBdSP2xRw", number: "01", title: "Emotional Abuse" },
  { id: "FXht3EScIIQ", number: "02", title: "Video about Depression" },
  { id: "Nyqhzf3zhxw", number: "03", title: "Why intelligent kids struggle with simple tasks" },
];

const writtenTestimonials = [
  { number: "01", title: "Written testimonial 01" },
  { number: "02", title: "Written testimonial 02" },
];

const videoTestimonials = [
  { id: "hEHHrs-zUdE", number: "01", title: "Client testimonial 01" },
  { id: "cFPRjL5qYJ8", number: "02", title: "Client testimonial 02" },
];

export default function Home() {
  return (
    <main>
      <SiteHeader current="home" />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow hero-credentials">
            Psychologist | Addiction Recovery Specialist | 18+ Years of Clinical Experience
          </p>
          <h1>Sania Asif</h1>
          <p className="hero-role">Clinical Psychologist</p>
          <p className="hero-intro">
            With over 18 years of clinical experience, I combine individual
            counselling, family guidance and personalised aftercare to help
            individuals and families deal with issues such as depression,
            anxiety, OCD, addiction, schizophrenia, behavioural concerns,
            parenting and relationship difficulties.
          </p>
          <p className="hero-availability">Private &amp; Online Sessions | By Appointment Only</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">
              Contact for help or information
            </a>
            <a className="text-link" href="#about">Explore her approach <span aria-hidden="true">&#8595;</span></a>
          </div>
          <div className="session-note">
            <span aria-hidden="true" className="status-dot" />
            Online worldwide <span aria-hidden="true">&middot;</span> In-person in Karachi
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
            <h2>Let&apos;s talk about it.</h2>
          </div>
          <p>
            Short, thoughtful guidance from Sania on emotional wellbeing,
            mental health, and the challenges families can face.
          </p>
        </div>

        <div className="video-grid video-grid-featured shorts-grid">
          {videos.map((video) => (
            <YouTubeShort
              id={video.id}
              index={video.number}
              key={video.id}
              label="YouTube Short"
              title={video.title}
            />
          ))}
        </div>
      </section>

      <section className="testimonial-gateway testimonial-home" id="testimonials">
        <div className="testimonial-home-inner">
          <div className="testimonial-home-intro">
            <div className="testimonial-gateway-copy">
              <p className="eyebrow">Shared in confidence</p>
              <h2>Stories of growth and recovery.</h2>
            </div>
          </div>

          <div className="testimonial-subheading">
            <p className="eyebrow">Written experiences</p>
            <h3>Their journey their words.</h3>
          </div>
          <div className="homepage-testimonial-stories">
            {writtenTestimonials.map((testimonial) => (
              <blockquote key={testimonial.number}>
                <span>{testimonial.number}</span>
                <p>Approved testimonial text will appear here.</p>
                <cite>{testimonial.title} &middot; Shared anonymously</cite>
              </blockquote>
            ))}
          </div>

          <div className="testimonial-subheading testimonial-video-heading">
            <p className="eyebrow">Video stories</p>
            <h3>Listen to their experiences.</h3>
          </div>
          <div className="video-grid testimonial-home-video-grid shorts-grid">
            {videoTestimonials.map((video) => (
              <YouTubeShort
                id={video.id}
                index={video.number}
                key={video.id}
                label="Client story"
                title={video.title}
              />
            ))}
            <article className="video-card short-video-card testimonial-video-placeholder">
              <div className="short-video-frame testimonial-placeholder-frame" aria-label="Space reserved for a third video testimonial">
                <span>03</span>
                <p>Next client story</p>
              </div>
              <div className="video-meta">
                <div>
                  <span className="video-number">03</span>
                  <h3>Client testimonial 03</h3>
                </div>
                <span>Reserved</span>
              </div>
            </article>
          </div>
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
        <div><strong>Worldwide</strong><span>Confidential online care</span></div>
        <div><strong>Karachi</strong><span>In-person sessions</span></div>
        <div><strong>Urdu/English</strong><span>Session languages</span></div>
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
            or more information about online and in-person sessions.
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
